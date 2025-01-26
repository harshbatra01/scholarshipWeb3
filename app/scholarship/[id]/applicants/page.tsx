"use client"

import { useState, useEffect } from "react"
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

export default function ApplicantsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scholarship, setScholarship] = useState<Scholarship | null>(null)
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  useEffect(() => {
    const loadData = () => {
      try {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem("contributorLoggedIn")
        if (!isLoggedIn) {
          router.push("/login/contributor")
          return
        }

        // Load scholarship data
        const allScholarshipsData = localStorage.getItem("allScholarships")
        if (!allScholarshipsData) {
          setError("No scholarships found")
          setLoading(false)
          return
        }

        const allScholarships: Scholarship[] = JSON.parse(allScholarshipsData)
        const currentScholarship = allScholarships.find((s) => s.id === params.id)

        if (!currentScholarship) {
          setError("Scholarship not found")
          setLoading(false)
          return
        }

        setScholarship(currentScholarship)

        // Load applications data
        const allApplicationsData = localStorage.getItem("allApplications")
        const allApplications = allApplicationsData ? JSON.parse(allApplicationsData) : {}

        // Get applications for this specific scholarship
        const scholarshipApplicants = allApplications[params.id] || []

        setApplicants(scholarshipApplicants)

        setLoading(false)
      } catch (err) {
        console.error("Error loading data:", err)
        setError("An error occurred while loading the data")
        setLoading(false)
      }
    }

    loadData()
  }, [params.id, router])

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            setWalletAddress(accounts[0])
          }
        } catch (error) {
          console.error("Failed to get wallet address:", error)
        }
      }
    }

    checkWalletConnection()
  }, [])

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

  return (
    <div className="min-h-screen bg-[#FFFEF4]">
      {/* Navigation */}
      <nav className="flex justify-between items-center py-4 px-8">
        <Link href="/" className="text-2xl font-bold text-[#2D3021]">
          AcadGrant
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/create-scholarship" className="text-[#2D3021]">
            Create Scholarship
          </Link>
          <Link href="/dashboard" className="text-[#2D3021] font-bold">
            Dashboard
          </Link>
          <div className="text-sm text-gray-600">
            Connected:{" "}
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "No wallet connected"}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-[#2D3021] mb-8">Applications</h1>

        {scholarship && (
          <div className="space-y-6">
            {/* Scholarship Header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#d9d9d9] rounded-full" />
              <h2 className="text-2xl font-bold text-[#2D3021]">{scholarship.organizationName}</h2>
            </div>

            {/* Applicants List */}
            <div className="space-y-4">
              {applicants.length > 0 ? (
                applicants.map((applicant) => (
                  <div
                    key={applicant.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#E5FF6D]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#d9d9d9] rounded-full" />
                      <span className="text-lg font-medium text-[#2D3021]">{applicant.name}</span>
                    </div>
                    <Button
                      className="bg-[#3b4700] hover:bg-[#3b4700]/90 text-white"
                      onClick={() => router.push(`/scholarship/${params.id}/applicants/${applicant.id}`)}
                    >
                      View profile
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-xl text-[#666666]">No applicants yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

