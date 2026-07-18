"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Sidebar } from "@/components/dashboard/sidebar"
import { useAuth } from "@/contexts/auth-context"
import { firestore, storage, isFirebaseConfigured } from "@/lib/firebase"
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import {
  Camera,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Edit,
  Settings,
  Shield,
  Globe,
  LogOut,
  Heart,
  Code,
  User,
  Link as LinkIcon,
  Check,
  Plus,
  Loader2,
  Sparkles,
  Briefcase,
} from "lucide-react"
import { toast } from "sonner"

interface ProfileFormState {
  displayName: string
  title: string
  bio: string
  location: string
  email: string
  phone: string
  website: string
  photoURL: string
  coverPhotoURL: string
  interests: string[]
  skills: string[]
  createdAt?: string
  lastSignIn?: string
}

const blankProfile = (): ProfileFormState => ({
  displayName: "",
  title: "",
  bio: "",
  location: "",
  email: "",
  phone: "",
  website: "",
  photoURL: "",
  coverPhotoURL: "",
  interests: [],
  skills: [],
})

const displayValue = (value?: string | null, fallback = "Complete your profile") => {
  if (typeof value === "string" && value.trim()) {
    return value
  }
  return fallback
}

function ProfileContent() {
  const { user, signOut, refreshUserProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<"profile" | "settings">("profile")
  const [profile, setProfile] = useState<ProfileFormState>(blankProfile())
  const [interestInput, setInterestInput] = useState("")
  const [skillInput, setSkillInput] = useState("")
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)

  const isOfflineMode = () => typeof navigator !== "undefined" && navigator.onLine === false

  const [settings, setSettings] = useState({
    privacy: "public",
    theme: "dark",
    language: "en",
    notifications: true,
    emailUpdates: true,
  })

  const loadProfile = async () => {
    if (!user?.uid) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    if (!isFirebaseConfigured || isOfflineMode()) {
      setProfile({
        displayName: user.displayName || "",
        title: "",
        bio: "",
        location: "",
        email: user.email || "",
        phone: "",
        website: "",
        photoURL: user.photoURL || "",
        coverPhotoURL: "",
        interests: [],
        skills: [],
        createdAt: user.metadata?.creationTime ? new Date(user.metadata.creationTime).toISOString() : undefined,
        lastSignIn: user.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toISOString() : undefined,
      })
      setIsLoading(false)
      return
    }

    try {
      const docRef = doc(firestore, "users", user.uid)
      const snapshot = await getDoc(docRef)

      if (snapshot.exists()) {
        const data = snapshot.data() as any
        const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : null
        const lastSignIn = user.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime) : null

        setProfile({
          displayName: data.displayName || user.displayName || "",
          title: data.title || "",
          bio: data.bio || "",
          location: data.location || "",
          email: data.email || user.email || "",
          phone: data.phone || "",
          website: data.website || "",
          photoURL: data.photoURL || user.photoURL || "",
          coverPhotoURL: data.coverPhotoURL || "",
          interests: Array.isArray(data.interests) ? data.interests : [],
          skills: Array.isArray(data.skills) ? data.skills : [],
          createdAt: createdAt ? createdAt.toISOString() : undefined,
          lastSignIn: lastSignIn ? lastSignIn.toISOString() : undefined,
        })
      } else {
        const initialData = {
          uid: user.uid,
          displayName: user.displayName || "",
          email: user.email || "",
          photoURL: user.photoURL || "",
          title: "",
          bio: "",
          location: "",
          phone: "",
          website: "",
          coverPhotoURL: "",
          interests: [],
          skills: [],
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }

        await setDoc(doc(firestore, "users", user.uid), initialData, { merge: true })
        setProfile({
          displayName: initialData.displayName,
          title: "",
          bio: "",
          location: "",
          email: initialData.email,
          phone: "",
          website: "",
          photoURL: initialData.photoURL,
          coverPhotoURL: "",
          interests: [],
          skills: [],
        })
      }
    } catch (error: any) {
      const isOfflineError = error?.code === "unavailable" || /offline|network|failed to fetch|client is offline/i.test(error?.message || "")

      if (!isOfflineError) {
        console.error("Error loading profile", error)
        toast.error("Could not load your profile right now")
      }

      setProfile((current) => ({
        ...current,
        displayName: current.displayName || user.displayName || "",
        email: current.email || user.email || "",
        photoURL: current.photoURL || user.photoURL || "",
      }))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProfile()
  }, [user?.uid])

  const saveProfile = async (overrides?: Partial<ProfileFormState>) => {
    if (!user?.uid) return

    if (!isFirebaseConfigured || isOfflineMode()) {
      const payload = {
        displayName: overrides?.displayName ?? profile.displayName,
        title: overrides?.title ?? profile.title,
        bio: overrides?.bio ?? profile.bio,
        location: overrides?.location ?? profile.location,
        email: overrides?.email ?? profile.email,
        phone: overrides?.phone ?? profile.phone,
        website: overrides?.website ?? profile.website,
        photoURL: overrides?.photoURL ?? profile.photoURL,
        coverPhotoURL: overrides?.coverPhotoURL ?? profile.coverPhotoURL,
        interests: overrides?.interests ?? profile.interests,
        skills: overrides?.skills ?? profile.skills,
      }

      setProfile((current) => ({ ...current, ...payload }))
      toast.success("Profile updated locally")
      setIsEditing(false)
      return
    }

    const payload = {
      displayName: overrides?.displayName ?? profile.displayName,
      title: overrides?.title ?? profile.title,
      bio: overrides?.bio ?? profile.bio,
      location: overrides?.location ?? profile.location,
      email: overrides?.email ?? profile.email,
      phone: overrides?.phone ?? profile.phone,
      website: overrides?.website ?? profile.website,
      photoURL: overrides?.photoURL ?? profile.photoURL,
      coverPhotoURL: overrides?.coverPhotoURL ?? profile.coverPhotoURL,
      interests: overrides?.interests ?? profile.interests,
      skills: overrides?.skills ?? profile.skills,
      updatedAt: serverTimestamp(),
    }

    setIsSaving(true)

    try {
      await updateDoc(doc(firestore, "users", user.uid), payload)
      setProfile((current) => ({ ...current, ...payload }))
      await refreshUserProfile()
      toast.success("Profile updated")
      setIsEditing(false)
    } catch (error: any) {
      const isOfflineError = error?.code === "unavailable" || /offline|network|failed to fetch|client is offline/i.test(error?.message || "")

      if (!isOfflineError) {
        console.error("Error saving profile", error)
        toast.error("Could not save your profile")
      } else {
        setProfile((current) => ({ ...current, ...payload }))
        toast.success("Profile updated locally")
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpload = async (file: File | null, type: "avatar" | "cover") => {
    if (!file || !user?.uid) return

    if (!isFirebaseConfigured || !storage) {
      toast.error("Storage is not configured yet")
      return
    }

    const path = type === "avatar" ? `users/${user.uid}/avatar.jpg` : `users/${user.uid}/cover.jpg`
    const imageRef = ref(storage, path)

    try {
      await uploadBytes(imageRef, file)
      const downloadURL = await getDownloadURL(imageRef)

      if (type === "avatar") {
        await saveProfile({ photoURL: downloadURL })
      } else {
        await saveProfile({ coverPhotoURL: downloadURL })
      }

      toast.success(`${type === "avatar" ? "Profile" : "Cover"} photo updated`)
    } catch (error: any) {
      console.error("Image upload failed", error)
      toast.error("Image upload failed")
    }
  }

  const addInterest = () => {
    const trimmed = interestInput.trim()
    if (!trimmed) return
    if (profile.interests.includes(trimmed)) return
    const nextInterests = [...profile.interests, trimmed]
    setProfile((current) => ({ ...current, interests: nextInterests }))
    saveProfile({ interests: nextInterests })
    setInterestInput("")
  }

  const addSkill = () => {
    const trimmed = skillInput.trim()
    if (!trimmed) return
    if (profile.skills.includes(trimmed)) return
    const nextSkills = [...profile.skills, trimmed]
    setProfile((current) => ({ ...current, skills: nextSkills }))
    saveProfile({ skills: nextSkills })
    setSkillInput("")
  }

  const handleLogout = async () => {
    try {
      await signOut()
      toast.success("Logged out successfully")
    } catch (error) {
      toast.error("Failed to logout")
    }
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings((current) => ({ ...current, [key]: value }))
    toast.success("Setting updated")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-10">
            <Skeleton className="h-80 w-full rounded-3xl" />
            <div className="flex gap-8">
              <Skeleton className="h-40 w-40 rounded-3xl" />
              <div className="flex-1 space-y-6">
                <Skeleton className="h-12 w-80" />
                <Skeleton className="h-6 w-96" />
                <Skeleton className="h-6 w-80" />
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const createdAtLabel = profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : null
  const lastSignInLabel = profile.lastSignIn ? new Date(profile.lastSignIn).toLocaleString() : null

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-8">
            <div className="h-80 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 relative rounded-3xl overflow-hidden">
              {profile.coverPhotoURL ? (
                <img src={profile.coverPhotoURL} alt="Cover" className="h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-7xl text-white/80">
                  <Sparkles />
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-6 right-6 bg-black/20 hover:bg-black/40 text-white h-12 w-12 rounded-xl"
                onClick={() => coverInputRef.current?.click()}
              >
                <Camera className="w-6 h-6" />
              </Button>
              <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e.target.files?.[0] || null, "cover")} />
            </div>

            <div className="px-8 -mt-20 relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-8 mb-8">
                <div className="relative">
                  <div className="w-40 h-40 rounded-3xl gradient-bg flex items-center justify-center border-4 border-background shadow-xl shadow-purple-500/25 overflow-hidden">
                    {profile.photoURL ? (
                      <img src={profile.photoURL} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <User className="w-16 h-16 text-white" />
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -bottom-3 -right-3 bg-background border-2 border-border rounded-full h-12 w-12"
                    onClick={() => avatarInputRef.current?.click()}
                  >
                    <Camera className="w-5 h-5" />
                  </Button>
                  <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e.target.files?.[0] || null, "avatar")} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text">{displayValue(profile.displayName, "Complete your profile")}</h1>
                    <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="h-12 px-6 rounded-xl">
                      <Edit className="w-5 h-5 mr-2" />
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                  </div>
                  <p className="text-xl text-muted-foreground mb-3">{displayValue(profile.title, "Add your role or title")}</p>
                  <div className="flex flex-wrap gap-6 text-base text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{displayValue(profile.location, "Add your location")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{createdAtLabel ? `Joined ${createdAtLabel}` : "Join date pending"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant={activeTab === "profile" ? "gradient" : "outline"} onClick={() => setActiveTab("profile")} className="h-14 px-8 rounded-xl">
                    <User className="w-5 h-5 mr-2" />
                    Profile
                  </Button>
                  <Button variant={activeTab === "settings" ? "gradient" : "outline"} onClick={() => setActiveTab("settings")} className="h-14 px-8 rounded-xl">
                    <Settings className="w-5 h-5 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {activeTab === "profile" ? (
            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <User className="w-7 h-7" />
                      About
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isEditing ? (
                      <div className="space-y-4">
                        <input value={profile.displayName} onChange={(e) => setProfile({ ...profile, displayName: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-3" placeholder="Display name" />
                        <input value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-3" placeholder="Title" />
                        <textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className="w-full min-h-32 rounded-xl border border-border bg-background px-4 py-3" placeholder="Tell people about yourself" />
                        <div className="grid md:grid-cols-2 gap-4">
                          <input value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-3" placeholder="Location" />
                          <input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-3" placeholder="Phone" />
                        </div>
                        <input value={profile.website} onChange={(e) => setProfile({ ...profile, website: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-3" placeholder="Website" />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-lg text-muted-foreground leading-relaxed">{displayValue(profile.bio, "Write a short bio to introduce yourself")}</p>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="flex items-center gap-4">
                            <Mail className="w-6 h-6 text-muted-foreground" />
                            <span className="text-base">{displayValue(profile.email)}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <Phone className="w-6 h-6 text-muted-foreground" />
                            <span className="text-base">{displayValue(profile.phone, "Add your phone number")}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <LinkIcon className="w-6 h-6 text-muted-foreground" />
                            <span className="text-base">{displayValue(profile.website, "Add your website")}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {isEditing && (
                      <Button onClick={() => saveProfile()} disabled={isSaving} className="h-14 px-8 rounded-xl">
                        {isSaving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Check className="mr-2 h-5 w-5" />} 
                        Save Changes
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <Heart className="w-7 h-7 text-pink-500" />
                      Interests
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      {profile.interests.length ? profile.interests.map((item) => <Badge key={item} variant="secondary" className="px-6 py-3 text-base rounded-xl">{item}</Badge>) : <p className="text-muted-foreground">No interests yet. Add a few to personalize your profile.</p>}
                    </div>
                    {isEditing && (
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input value={interestInput} onChange={(e) => setInterestInput(e.target.value)} className="flex-1 rounded-xl border border-border bg-background px-4 py-3" placeholder="Add an interest" />
                        <Button variant="outline" onClick={addInterest} className="rounded-xl">
                          <Plus className="w-5 h-5 mr-2" />
                          Add
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <Code className="w-7 h-7 text-blue-500" />
                      Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      {profile.skills.length ? profile.skills.map((item) => <Badge key={item} variant="secondary" className="px-6 py-3 text-base rounded-xl">{item}</Badge>) : <p className="text-muted-foreground">No skills added yet.</p>}
                    </div>
                    {isEditing && (
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} className="flex-1 rounded-xl border border-border bg-background px-4 py-3" placeholder="Add a skill" />
                        <Button variant="outline" onClick={addSkill} className="rounded-xl">
                          <Plus className="w-5 h-5 mr-2" />
                          Add
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <Briefcase className="w-7 h-7 text-amber-500" />
                      Account Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="rounded-2xl border border-border p-4">
                      <p className="text-sm text-muted-foreground">UID</p>
                      <p className="font-medium break-all">{user?.uid || "Not available"}</p>
                    </div>
                    <div className="rounded-2xl border border-border p-4">
                      <p className="text-sm text-muted-foreground">Creation time</p>
                      <p className="font-medium">{createdAtLabel ? createdAtLabel : "Not available"}</p>
                    </div>
                    <div className="rounded-2xl border border-border p-4">
                      <p className="text-sm text-muted-foreground">Last sign in</p>
                      <p className="font-medium">{lastSignInLabel ? lastSignInLabel : "Not available"}</p>
                    </div>
                    <div className="rounded-2xl border border-border p-4">
                      <p className="text-sm text-muted-foreground">Auth provider</p>
                      <p className="font-medium">{user?.providerData?.[0]?.providerId || "Email"}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ) : (
            <div className="space-y-8 max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <Shield className="w-7 h-7 text-purple-500" />
                      Privacy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">Profile Visibility</h4>
                        <p className="text-base text-muted-foreground">Control who can see your profile</p>
                      </div>
                      <select value={settings.privacy} onChange={(e) => handleSettingChange("privacy", e.target.value)} className="px-6 py-3 rounded-xl border-2 border-border bg-background text-base">
                        <option value="public">Public</option>
                        <option value="friends">Friends Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="glass-card rounded-3xl border-0 p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <Globe className="w-7 h-7 text-blue-500" />
                      Language
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">Language</h4>
                        <p className="text-base text-muted-foreground">Select your language</p>
                      </div>
                      <select value={settings.language} onChange={(e) => handleSettingChange("language", e.target.value)} className="px-6 py-3 rounded-xl border-2 border-border bg-background text-base">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Button variant="destructive" className="w-full h-14 text-lg rounded-xl" onClick={handleLogout}>
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}
