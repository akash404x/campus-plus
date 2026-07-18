"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AppShell } from "@/components/dashboard/app-shell"
import { ModulePage } from "@/components/dashboard/module-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Sparkles, Download } from "lucide-react"

const certificates = [
  { title: "AI Product Design", issuer: "Campus+ Academy", date: "2026" },
  { title: "Volunteer Leadership", issuer: "Student Affairs", date: "2025" },
]

function CertificatesContent() {
  const stats = [
    { label: "Certificates", value: "8", detail: "Ready to share", icon: Award, tone: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200" },
    { label: "Downloads", value: "42", detail: "This year", icon: Download, tone: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-200" },
  ]

  return (
    <AppShell>
      <ModulePage
        title="Certificates"
        subtitle="Keep your verified learning and impact records in one polished place."
        description="Certificates are easy to share, export, and showcase in your profile and portfolio."
        badge="Verification"
        stats={stats}
        actions={<Button className="rounded-full">Export portfolio</Button>}
        aside={
          <Card className="rounded-3xl border-0 bg-white/80 dark:bg-slate-900/70">
            <CardContent className="p-6 text-sm text-muted-foreground">Each certificate includes issuer, date, and a shareable digital snapshot.</CardContent>
          </Card>
        }
      >
        <div className="space-y-4">
          {certificates.map((item) => (
            <Card key={item.title} className="rounded-3xl border-0 bg-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:bg-slate-900/70">
              <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-violet-600" />
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Issued by {item.issuer} · {item.date}</p>
                </div>
                <Button variant="outline" className="rounded-full">Download</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </ModulePage>
    </AppShell>
  )
}

export default function CertificatesPage() {
  return (
    <ProtectedRoute>
      <CertificatesContent />
    </ProtectedRoute>
  )
}
