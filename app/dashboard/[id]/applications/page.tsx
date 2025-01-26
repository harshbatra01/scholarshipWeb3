"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Applicant {
  id: string
  name: string
  email: string
}

interface Scholarship {
  id: string
  organizationName: string
}

export default function ApplicationsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scholarship, setScholarship] = useState<Scholarship | null>(null)
  const [applicants, setApplicants] = useState<Applicant[]>([])

  useEffect(() => {
    const loadData = () => {
      try {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem("contributorLoggedIn")
        console.log("Contributor logged in:", isLoggedIn)
        if (!isLoggedIn) {
          router.push("/login/contributor")
          return
        }

        // Load scholarship data
        const allScholarshipsData = localStorage.getItem("allScholarships")
        console.log("All scholarships data:", allScholarshipsData)
        if (!allScholarshipsData) {
          setError("No scholarships found")
          setLoading(false)
          return
        }

        const allScholarships: Scholarship[] = JSON.parse(allScholarshipsData)
        const currentScholarship = allScholarships.find((s) => s.id === params.id)
        console.log("Current scholarship:", currentScholarship)

        if (!currentScholarship) {
          setError("Scholarship not found")
          setLoading(false)
          return
        }

        setScholarship(currentScholarship)

        // Load applications data
        const allApplicationsData = localStorage.getItem("allApplications")
        console.log("All applications data:", allApplicationsData)
        const allApplications = allApplicationsData ? JSON.parse(allApplicationsData) : {}

        // Get applications for this specific scholarship
        const scholarshipApplicants = allApplications[params.id] || []
        console.log("Scholarship applicants:", scholarshipApplicants)

        // If we have applicants, use them; otherwise use demo data
        if (scholarshipApplicants.length > 0) {
          setApplicants(scholarshipApplicants)
        } else {
          // Demo data for visual representation
          setApplicants([
            { id: "1", name: "Taylor Swift", email: "taylor@example.com" },
            { id: "2", name: "Taylor Swift", email: "taylor2@example.com" },
            { id: "3", name: "Taylor Swift", email: "taylor3@example.com" },
          ])
        }

        setLoading(false)
      } catch (err) {
        console.error("Error loading data:", err)
        setError(`An error occurred while loading the data: ${err.message}`)
        setLoading(false)
      }
    }

    console.log("Loading data for scholarship ID:", params.id)
    loadData()
  }, [params.id, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFEF4] flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FFFEF4] flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-red-500">{error}</p>
        <Button onClick={() => router.push("/dashboard")} className="bg-[#3b4700] hover:bg-[#3b4700]/90 text-white">
          Return to Dashboard
        </Button>
      </div>
    )
  }

  console.log("Rendering applications page with data:", { scholarship, applicants })
  if (!scholarship) {
    return (
      <div className="min-h-screen bg-[#FFFEF4] flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-red-500">Scholarship data could not be loaded.</p>
        <Button onClick={() => router.push("/dashboard")} className="bg-[#3b4700] hover:bg-[#3b4700]/90 text-white">
          Return to Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFEF4]">
      <nav className="flex justify-between items-center py-4 px-8">
        <Link href="/" className="text-xl font-bold">
          AcadGrant
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/create-scholarship">Create Scholarship</Link>
          <Link href="/dashboard" className="font-bold">
            Dashboard
          </Link>
          <Button className="bg-[#000000] text-white hover:bg-black/90 rounded-full px-6">Connect Wallet</Button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-[48px] font-bold mb-8">Applications</h1>

        {scholarship && (
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#d9d9d9] rounded-full" />
              <h2 className="text-xl font-bold">{scholarship.organizationName}</h2>
            </div>

            <div className="space-y-4">
              {applicants.map((applicant, index) => (
                <div key={applicant.id} className="relative">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#d9d9d9] rounded-full" />
                      <span className="text-lg">{applicant.name}</span>
                    </div>
                    <Button
                      className="bg-[#3b4700] hover:bg-[#3b4700]/90 text-white"
                      onClick={() => router.push(`/dashboard/${params.id}/applications/${applicant.id}`)}
                    >
                      View profile
                    </Button>
                  </div>
                  {index < applicants.length - 1 && (
                    <div className="absolute bottom-0 left-0 right-0 border-b border-dashed border-[#E5FF6D]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

