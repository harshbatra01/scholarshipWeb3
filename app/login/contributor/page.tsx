"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

export default function ContributorLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const storedUser = localStorage.getItem("contributorUser")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      if (user.email === email && user.password === password) {
        localStorage.setItem("contributorLoggedIn", "true")
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        })
      }
    } else {
      toast({
        title: "Login Failed",
        description: "User not found",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(62.35%_62.35%_at_51.75%_47.39%,#F3FFB3_0%,#FFFFFF_100%)]">
      <Card className="w-full max-w-md border-0 shadow-xl overflow-hidden bg-white">
        <CardContent className="p-12">
          <div className="text-center space-y-6 mb-8">
            <h1 className="text-5xl font-semibold tracking-tight text-[#2D3021]">Contributor Login</h1>
            <p className="text-[#373131] text-xl leading-relaxed">Welcome back!</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-16 bg-[#E2EC9B] hover:bg-[#d4dd8f] text-[#2D3021] text-xl font-medium rounded-xl transition-colors"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#373131]">
              Don&apos;t have an account?{" "}
              <Link href="/register/contributor" className="text-[#3b4700] underline">
                Register here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

