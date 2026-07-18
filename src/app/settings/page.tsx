"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppShell } from "@/components/dashboard/app-shell"
import { ModulePage } from "@/components/dashboard/module-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Settings as SettingsIcon, Shield, BellRing, MoonStar } from "lucide-react"

function SettingsContent() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [privateProfile, setPrivateProfile] = useState(false)

  const stats = [
    { label: "Preferences", value: "6", detail: "Configured", icon: SettingsIcon, tone: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200" },
    { label: "Privacy", value: "Balanced", detail: "Recommended", icon: Shield, tone: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-200" },
  ]

  return (
    <AppShell>
      <ModulePage
        title="Settings"
        subtitle="Control how Campus+ feels, looks, and communicates with you."
        description="Fine-tune privacy, dark mode, and notification preferences without losing the premium flow of the experience."
        badge="Controls"
        stats={stats}
        actions={<Button className="rounded-full">Save changes</Button>}
        aside={
          <Card className="rounded-3xl border-0 bg-white/80 dark:bg-slate-900/70">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Two-factor authentication and account recovery are available in your full profile settings.</p>
            </CardContent>
          </Card>
        }
      >
        <div className="space-y-4">
          <Card className="rounded-3xl border-0 bg-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:bg-slate-900/70">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h3 className="text-lg font-semibold">Notifications</h3>
                <p className="text-sm text-muted-foreground">Receive reminders about events and deadlines.</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-0 bg-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:bg-slate-900/70">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h3 className="text-lg font-semibold">Dark mode</h3>
                <p className="text-sm text-muted-foreground">Switch between light and dark appearances.</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-0 bg-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:bg-slate-900/70">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h3 className="text-lg font-semibold">Private profile</h3>
                <p className="text-sm text-muted-foreground">Control who can view your activity and profile details.</p>
              </div>
              <Switch checked={privateProfile} onCheckedChange={setPrivateProfile} />
            </CardContent>
          </Card>
        </div>
      </ModulePage>
    </AppShell>
  )
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  )
}
