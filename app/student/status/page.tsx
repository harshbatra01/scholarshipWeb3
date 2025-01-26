"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Application {
  scholarshipId: string
  organizationName: string
  status: "Pending" | "Accepted" | "Rejected"
}

export default function StatusPage() {
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("studentLoggedIn")
    if (!isLoggedIn) {
      router.push("/student/login")
    } else {
      const studentEmail = JSON.parse(localStorage.getItem("studentUser") || "{}").email
      const studentApplications = JSON.parse(localStorage.getItem(`applications_${studentEmail}`) || "[]")
      setApplications(studentApplications)
    }
  }, [router])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500"
      case "Accepted":
        return "text-green-500"
      case "Rejected":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(62.35%_62.35%_at_51.75%_47.39%,#F3FFB3_0%,#FFFFFF_100%)]">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white/50 backdrop-blur-sm">
        <Link href="/student/dashboard" className="text-2xl font-bold">
          AcadGrant
        </Link>
        <div className="flex items-center gap-8">
          <div className="flex gap-8">
            <Link href="/student/dashboard" className="text-gray-600 hover:text-black">
              Dashboard
            </Link>
            <Link href="/student/status" className="text-black border-b-2 border-black">
              Status
            </Link>
            <Link href="/student/profile" className="text-gray-600 hover:text-black">
              Profile
            </Link>
          </div>
          <Button
            variant="default"
            className="bg-black text-white hover:bg-black/90"
            onClick={() => {
              localStorage.removeItem("studentLoggedIn")
              router.push("/student/login")
            }}
          >
            Logout
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-8 py-12">
        <h1 className="text-4xl font-bold text-[#3B4700] mb-8">Applications</h1>

        <div className="space-y-4 max-w-3xl">
          {applications.map((application) => (
            <div
              key={application.scholarshipId}
              className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200" />
                <div>
                  <h3 className="font-semibold">{application.organizationName}</h3>
                  <p className="text-gray-600">Scholarship Application</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    application.status === "Pending"
                      ? "bg-yellow-500"
                      : application.status === "Accepted"
                        ? "bg-green-500"
                        : "bg-red-500"
                  }`}
                />
                <span className={getStatusColor(application.status)}>{application.status}</span>
              </div>
            </div>
          ))}
          {applications.length === 0 && <p className="text-gray-600">You haven't applied to any scholarships yet.</p>}
        </div>
      </main>
    </div>
  )
}

