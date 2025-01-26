"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Applicant {
  id: string
  name: string
  profileImage: string
}

const mockApplicants: Applicant[] = [
  {
    id: "1",
    name: "Taylor Swift",
    profileImage: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Taylor Swift",
    profileImage: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Taylor Swift",
    profileImage: "/placeholder.svg",
  },
]

export default function Applications() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#FFFEF4]">
      {/* Navigation */}
      <nav className="flex justify-between items-center py-4 px-8 bg-[#FFFEF4] border-b border-[#E5FF6D]">
        <Link href="/" className="text-2xl font-bold text-[#2D3021]">
          AcadGrant
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/create-scholarship" className="text-[#2D3021] font-medium">
            Create Scholarship
          </Link>
          <Link href="/dashboard" className="text-[#2D3021] font-bold underline underline-offset-4">
            Dashboard
          </Link>
          <Button className="bg-[#000000] text-white hover:bg-black/90 rounded-full px-6">
            <LinkIcon className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-[#2D3021] mb-8">Applications</h1>

        {/* Scholarship Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-[#d9d9d9] rounded-full" />
          <h2 className="text-2xl font-bold text-[#2D3021]">Almighty Grants Education Scheme</h2>
        </div>

        {/* Applicants List */}
        <div className="space-y-4">
          {mockApplicants.map((applicant) => (
            <Card key={applicant.id} className="p-4 bg-[#ffffff]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#d9d9d9] rounded-full" />
                  <span className="text-lg font-medium text-[#2D3021]">{applicant.name}</span>
                </div>
                <Button
                  className="bg-[#3b4700] hover:bg-[#3b4700]/90 text-white"
                  onClick={() => router.push(`/applications/${applicant.id}`)}
                >
                  View profile
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

