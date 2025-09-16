"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabaseClient"
import { AdminButton } from "@/components/ui/admin-button"
import { Settings, Files, LogOut } from "lucide-react"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()
    supabase.auth.getUser().then(({ data }) => {
      const email = data.user?.email || null
      setUserEmail(email)
      const ok = !!email && email === "n.aden1208@gmail.com"
      setAuthorized(ok)
      setLoading(false)
    })
  }, [])

  async function handleLogout() {
    const supabase = getSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.replace("/admin/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center site-background">
        <div className="text-muted-foreground">Checking access…</div>
      </div>
    )
  }

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center site-background px-4">
        <div className="max-w-md w-full text-center backdrop-blur-xl bg-white/5 dark:bg-black/20 border border-white/10 rounded-2xl p-8">
          <h1 className="text-2xl font-semibold mb-2">Access denied</h1>
          <p className="text-muted-foreground mb-6">You must be signed in.</p>
          <Link href="/admin/login" className="inline-block px-4 py-2 rounded-xl neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer border border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60">Go to Login</Link>
        </div>
      </div>
    )
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center site-background px-4">
        <div className="max-w-md w-full text-center backdrop-blur-xl bg-white/5 dark:bg-black/20 border border-white/10 rounded-2xl p-8">
          <h1 className="text-2xl font-semibold mb-2">Access denied</h1>
          <p className="text-muted-foreground">Your account is not authorized to access this dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center site-background px-4 relative overflow-hidden">
      {/* Subtle aurora/radial accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]">
        <div className="absolute -top-32 -left-32 size-[480px] rounded-full blur-3xl opacity-25 bg-[var(--primary)]/40" />
        <div className="absolute -bottom-40 -right-24 size-[520px] rounded-full blur-3xl opacity-20 bg-fuchsia-500/30" />
      </div>

      {/* Gradient frame card */}
      <div className="w-full max-w-xl">
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-[var(--primary)]/40 via-transparent to-transparent">
          <div className="rounded-3xl p-6 sm:p-8 backdrop-blur-xl bg-white/5 dark:bg-black/20 border border-white/10 shadow-2xl">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Welcome,
                <br className="hidden sm:block" /> {userEmail}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-white/60">You are now in the Admin Dashboard.</p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <AdminButton asChild className="w-full">
                <Link href="/admin/settings" className="flex items-center justify-center gap-2">
                  <Settings className="size-4" />
                  <span>Manage Site Settings</span>
                </Link>
              </AdminButton>

              <AdminButton asChild className="w-full">
                <Link href="/admin/content" className="flex items-center justify-center gap-2">
                  <Files className="size-4" />
                  <span>Manage Site Content</span>
                </Link>
              </AdminButton>

              <AdminButton onClick={handleLogout} className="w-full flex items-center justify-center gap-2">
                <LogOut className="size-4" />
                <span>Log Out</span>
              </AdminButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


