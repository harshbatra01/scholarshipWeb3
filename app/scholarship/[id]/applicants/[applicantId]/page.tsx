"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArbitrumWalletButton } from "@/components/ArbitrumWalletButton"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { ethers } from "ethers"

interface ApplicantProfile {
  id: string
  name: string
  email: string
  gender: string
  birthMonth: string
  birthDate: string
  birthYear: string
  // Add academic fields
  institution: string
  fieldOfStudy: string
  currentCGPA: string
  instituteWallet: string
  status: "Pending" | "Accepted" | "Rejected"
  transactionHash?: string
  achievements?: string[]
  extraCurricular?: string[]
}

interface DetailRowProps {
  label: string
  value: string | number | undefined
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="grid grid-cols-2 gap-4 py-2 border-b border-[#E5FF6D] last:border-0">
      <div className="text-[#666666] uppercase text-sm font-medium">{label}</div>
      <div className="text-[#2D3021] break-words">{value || "Not specified"}</div>
    </div>
  )
}

export default function ApplicantProfilePage({
  params,
}: {
  params: { id: string; applicantId: string }
}) {
  const router = useRouter()
  const [signer, setSigner] = useState<ethers.Signer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<ApplicantProfile | null>(null)
  const [scholarshipAmount, setScholarshipAmount] = useState<string>("0")
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [manualAmount, setManualAmount] = useState<string>("")

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        setSigner(signer)
      } catch (error) {
        console.error("Failed to connect wallet:", error)
      }
    } else {
      console.error("Ethereum object not found, do you have MetaMask installed?")
    }
  }

  useEffect(() => {
    const loadData = () => {
      try {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem("contributorLoggedIn")
        if (!isLoggedIn) {
          router.push("/login/contributor")
          return
        }

        // Load applications data
        const allApplicationsData = localStorage.getItem("allApplications")
        if (!allApplicationsData) {
          setError("No applications found")
          setLoading(false)
          return
        }

        // Load scholarship data to get the grant amount
        const allScholarshipsData = localStorage.getItem("allScholarships")
        if (allScholarshipsData) {
          const allScholarships = JSON.parse(allScholarshipsData)
          const currentScholarship = allScholarships.find((s: any) => s.id === params.id)
          if (currentScholarship) {
            setScholarshipAmount(currentScholarship.eligibility.grantAmount)
          }
        }

        const allApplications = JSON.parse(allApplicationsData)
        const scholarshipApplicants = allApplications[params.id] || []
        const applicant = scholarshipApplicants.find((a: ApplicantProfile) => a.id === params.applicantId)

        if (!applicant) {
          setError("Applicant not found")
          setLoading(false)
          return
        }

        // Set the complete profile data
        setProfile(applicant)
        setLoading(false)
      } catch (err) {
        console.error("Error loading data:", err)
        setError("An error occurred while loading the data")
        setLoading(false)
      }
    }

    loadData()
  }, [params.id, params.applicantId, router])

  const updateApplicationStatus = (status: "Accepted" | "Rejected", txHash?: string) => {
    // Update application status in localStorage
    const allApplicationsData = localStorage.getItem("allApplications")
    if (allApplicationsData) {
      const allApplications = JSON.parse(allApplicationsData)
      const scholarshipApplicants = allApplications[params.id] || []
      const updatedApplicants = scholarshipApplicants.map((applicant: ApplicantProfile) => {
        if (applicant.id === params.applicantId) {
          return { ...applicant, status: status, transactionHash: txHash }
        }
        return applicant
      })
      allApplications[params.id] = updatedApplicants
      localStorage.setItem("allApplications", JSON.stringify(allApplications))

      // Update student's application status
      const studentApplications = JSON.parse(localStorage.getItem(`applications_${profile?.email}`) || "[]")
      const updatedStudentApplications = studentApplications.map((app: any) => {
        if (app.scholarshipId === params.id) {
          return { ...app, status: status, transactionHash: txHash }
        }
        return app
      })
      localStorage.setItem(`applications_${profile?.email}`, JSON.stringify(updatedStudentApplications))
    }

    toast({
      title: `Application ${status}`,
      description: `The application has been ${status.toLowerCase()}.`,
    })

    router.push(`/scholarship/${params.id}/applicants`)
  }

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address)
    toast({
      title: "Wallet Connected",
      description: `Connected to Educhain wallet: ${address.slice(0, 6)}...${address.slice(-4)}`,
    })
  }

  const handleDecision = async (decision: "approve" | "deny") => {
    if (!profile) return

    if (decision === "approve") {
      if (!signer) {
        toast({
          title: "Wallet Not Connected",
          description: "Please connect your Arbitrum wallet to approve applications.",
          variant: "destructive",
        })
        return
      }

      try {
        // Use the manual amount input by the contributor
        const amount = ethers.utils.parseEther(manualAmount || scholarshipAmount)

        // Send the transaction
        const tx = await signer.sendTransaction({
          to: profile.instituteWallet,
          value: amount,
        })

        toast({
          title: "Transaction Initiated",
          description: `Transaction hash: ${tx.hash}`,
        })

        // Wait for the transaction to be mined
        await tx.wait()

        // Update application status
        updateApplicationStatus("Accepted", tx.hash)
      } catch (error) {
        console.error("Transaction failed:", error)
        toast({
          title: "Transaction Failed",
          description: "Failed to send the scholarship amount. Please try again.",
          variant: "destructive",
        })
      }
    } else {
      // Handle denial
      updateApplicationStatus("Rejected")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFEF4] flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#FFFEF4] flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-red-500">{error || "Profile not found"}</p>
        <Button onClick={() => router.back()} className="bg-[#3b4700] hover:bg-[#3b4700]/90 text-white">
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFEF4]">
      {/* Navigation */}
      <nav className="flex justify-between items-center py-4 px-8 bg-[#FFFEF4] border-b border-[#E5FF6D]">
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
          <ArbitrumWalletButton onClick={connectWallet} />
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-12 px-4">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="mb-8 text-[#2D3021] hover:text-[#2D3021] hover:bg-[#E5FF6D]/20"
        >
          ← Back to Applications
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Personal Details Card */}
          <Card className="p-8 bg-white shadow-lg border-0 overflow-hidden">
            <h2 className="text-2xl font-bold text-[#2D3021] mb-6">{profile.name}</h2>
            <div className="space-y-6">
              <div className="border-b border-[#E5FF6D] pb-4">
                <h3 className="text-lg font-semibold text-[#2D3021] mb-3">Personal Information</h3>
                <DetailRow label="Name" value={profile.name} />
                <DetailRow label="Email" value={profile.email} />
                <DetailRow label="Gender" value={profile.gender} />
                <DetailRow
                  label="Date of Birth"
                  value={
                    profile.birthMonth && profile.birthDate && profile.birthYear
                      ? `${profile.birthMonth}/${profile.birthDate}/${profile.birthYear}`
                      : undefined
                  }
                />
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-semibold text-[#2D3021] mb-3">Academic Information</h3>
                <DetailRow label="Institution" value={profile.institution} />
                <DetailRow label="Field of Study" value={profile.fieldOfStudy} />
                <DetailRow label="Current CGPA" value={profile.currentCGPA} />
                <DetailRow label="Institute Wallet" value={profile.instituteWallet} />
              </div>
            </div>
          </Card>

          {/* Achievements and Extra Curricular */}
          <div className="space-y-8">
            {profile.achievements && profile.achievements.length > 0 && (
              <Card className="p-8 bg-white shadow-lg border-0 overflow-hidden">
                <h2 className="text-xl font-bold text-[#2D3021] mb-4">Achievements</h2>
                <ul className="list-disc pl-5 space-y-3">
                  {profile.achievements.map((achievement, index) => (
                    <li key={index} className="text-[#2D3021]">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {profile.extraCurricular && profile.extraCurricular.length > 0 && (
              <Card className="p-8 bg-white shadow-lg border-0 overflow-hidden">
                <h2 className="text-xl font-bold text-[#2D3021] mb-4">Extra Curricular Activities</h2>
                <ul className="list-disc pl-5 space-y-3">
                  {profile.extraCurricular.map((activity, index) => (
                    <li key={index} className="text-[#2D3021]">
                      {activity}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </div>

        {/* Action Buttons or Status */}
        <div className="mt-8">
          {profile.status && profile.status !== "Pending" ? (
            <div
              className={`p-4 rounded-lg ${
                profile.status === "Accepted" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              <p className="text-lg font-semibold">
                Application {profile.status === "Accepted" ? "Approved" : "Denied"}
              </p>
              {profile.status === "Accepted" && profile.transactionHash && (
                <p className="text-sm mt-2">Transaction Hash: {profile.transactionHash}</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  placeholder="Enter amount of tokens"
                  value={manualAmount}
                  onChange={(e) => setManualAmount(e.target.value)}
                  className="flex-grow"
                />
                <span className="text-sm text-gray-600">Default: {scholarshipAmount} EDU</span>
              </div>
              <div className="flex gap-4">
                <Button
                  className="flex-1 h-12 bg-[#3b4700] hover:bg-[#3b4700]/90 text-white"
                  onClick={() => handleDecision("approve")}
                  disabled={!signer}
                >
                  Approve and Send {manualAmount || scholarshipAmount} EDU
                </Button>
                <Button
                  className="flex-1 h-12 bg-[#b60000] hover:bg-[#b60000]/90 text-white"
                  onClick={() => handleDecision("deny")}
                >
                  Deny
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

