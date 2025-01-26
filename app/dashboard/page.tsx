"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArbitrumWalletButton } from "@/components/ArbitrumWalletButton"
import { toast } from "@/components/ui/use-toast"

interface ScholarshipCard {
  id: string
  organizationName: string
  website: string
  eligibility: {
    grantAmount: string
    nationality: string
    cgpa: string
  }
  repayment: {
    maxRepayment: string
    interestRate: string
    moratoriumPeriod: string
  }
}

export default function Dashboard() {
  const router = useRouter()
  const [contributorName, setContributorName] = useState("")
  const [scholarships, setScholarships] = useState<ScholarshipCard[]>([])
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("contributorLoggedIn")
    if (!isLoggedIn) {
      router.push("/login/contributor")
    } else {
      const storedUser = localStorage.getItem("contributorUser")
      if (storedUser) {
        const user = JSON.parse(storedUser)
        setContributorName(user.organizationName)

        // Load scholarships from localStorage
        const storedScholarships = localStorage.getItem("allScholarships")
        if (storedScholarships) {
          const allScholarships = JSON.parse(storedScholarships)
          const contributorScholarships = allScholarships.filter(
            (scholarship: ScholarshipCard) => scholarship.organizationName === user.organizationName,
          )
          setScholarships(contributorScholarships)
        }
      }
    }
  }, [router])

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address)
    toast({
      title: "Wallet Connected",
      description: `Connected to wallet: ${address.slice(0, 6)}...${address.slice(-4)}`,
    })
  }

  return (
    <div className="min-h-screen bg-[#FFFEF4]">
      <nav className="flex justify-between items-center py-4 px-8 bg-[#FFFEF4] border-b border-[#E5FF6D]">
        <Link href="/" className="text-2xl font-bold">
          AcadGrant
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/create-scholarship">Create Scholarship</Link>
          <Link href="/dashboard" className="font-bold underline underline-offset-4">
            Dashboard
          </Link>
          <ArbitrumWalletButton onConnect={handleWalletConnect} />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Welcome, {contributorName}</h1>
          {walletAddress && (
            <p className="text-sm text-gray-600">
              Wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </p>
          )}
        </div>
        <h2 className="text-3xl font-bold mb-8">Your Scholarships</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
            <Card key={scholarship.id} className="bg-[#ffffff] p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#d9d9d9] rounded-full" />
                <div>
                  <h3 className="font-semibold text-xl">{scholarship.organizationName}</h3>
                  <p>{scholarship.website}</p>
                </div>
              </div>
              <ul className="list-disc pl-5">
                <li>Grant Amount: {scholarship.eligibility.grantAmount} INR</li>
                <li>Nationality: {scholarship.eligibility.nationality}</li>
                <li>Min. CGPA: {scholarship.eligibility.cgpa}</li>
                <li>Max Repayment: {scholarship.repayment.maxRepayment} years</li>
                <li>Interest Rate: {scholarship.repayment.interestRate}%</li>
                <li>Moratorium: {scholarship.repayment.moratoriumPeriod} months</li>
              </ul>
              <Button
                className="w-full bg-[#3b4700] hover:bg-[#3b4700]/90 text-[#ffffff]"
                onClick={() => {
                  console.log("Navigating to applicants for scholarship:", scholarship.id)
                  router.push(`/scholarship/${scholarship.id}/applicants`)
                }}
              >
                View Applicants
              </Button>
            </Card>
          ))}

          <Card className="bg-[#ffffff] p-6 space-y-4 flex flex-col justify-center items-center">
            <div className="w-16 h-16 bg-[#d9d9d9] rounded-full flex items-center justify-center">
              <span className="text-4xl">+</span>
            </div>
            <h3 className="font-semibold text-xl">Create New Scholarship</h3>
            <Button
              className="w-full bg-[#3b4700] hover:bg-[#3b4700]/90 text-[#ffffff]"
              onClick={() => router.push("/create-scholarship")}
            >
              Create
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

