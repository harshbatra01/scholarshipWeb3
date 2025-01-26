"use client"

import Link from "next/link"
import { LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ApplicantProfile {
  name: string
  age: number
  gender: string
  status: string
  education: string
  location: string
  occupation: string
  languages: string
  ethnicity: string
  religion: string
  achievements: string[]
  extraCurricular: string[]
}

const mockProfile: ApplicantProfile = {
  name: "Kim Jane",
  age: 27,
  gender: "Female",
  status: "Single",
  education: "Masters in Business",
  location: "Lagos",
  occupation: "Bank Manager",
  languages: "English & Yoruba",
  ethnicity: "Yoruba",
  religion: "Christianity",
  achievements: [
    "Need to find people with similar skills that can help her tackle company goals.",
    "Need to find people with similar skills that can help her tackle company goals.",
    "Need to find people with similar skills that can help her tackle company goals.",
    "Need to find people with similar skills that can help her tackle company goals.",
  ],
  extraCurricular: [
    "Need to find people with similar skills that can help her tackle.",
    "Need to find people with similar skills that can help her tackle.",
    "Need to find people with similar skills that can help her tackle.",
    "Need to find people with similar skills that can help her tackle.",
  ],
}

interface DetailRowProps {
  label: string
  value: string | number
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="grid grid-cols-2 gap-4 py-2">
      <div className="text-[#a3a3a3] uppercase text-sm">{label}</div>
      <div className="text-[#2D3021]">{value}</div>
    </div>
  )
}

export default function ApplicantProfile({ params }: { params: { id: string } }) {
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
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-[#2D3021] mb-8">Applications</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Personal Details Card */}
          <Card className="p-8 bg-[#ffffff] shadow-lg">
            <h2 className="text-2xl font-bold text-[#2D3021] mb-6">{mockProfile.name}</h2>
            <div className="space-y-2">
              <DetailRow label="Age" value={mockProfile.age} />
              <DetailRow label="Gender" value={mockProfile.gender} />
              <DetailRow label="Status" value={mockProfile.status} />
              <DetailRow label="Education" value={mockProfile.education} />
              <DetailRow label="Location" value={mockProfile.location} />
              <DetailRow label="Occupation" value={mockProfile.occupation} />
              <DetailRow label="Languages" value={mockProfile.languages} />
              <DetailRow label="Ethnicity" value={mockProfile.ethnicity} />
              <DetailRow label="Religion" value={mockProfile.religion} />
            </div>
          </Card>

          {/* Achievements and Extra Curricular */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-[#2D3021] mb-4">Achievements</h2>
              <ul className="list-disc pl-5 space-y-3">
                {mockProfile.achievements.map((achievement, index) => (
                  <li key={index} className="text-[#2D3021]">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#2D3021] mb-4">Extra Curricular Activities</h2>
              <ul className="list-disc pl-5 space-y-3">
                {mockProfile.extraCurricular.map((activity, index) => (
                  <li key={index} className="text-[#2D3021]">
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            className="flex-1 h-12 bg-[#000000] text-white hover:bg-black/90 rounded-lg"
            onClick={() => console.log("Approved")}
          >
            Approve
          </Button>
          <Button
            className="flex-1 h-12 bg-[#b60000] text-white hover:bg-[#b60000]/90 rounded-lg"
            onClick={() => console.log("Denied")}
          >
            Deny
          </Button>
        </div>
      </div>
    </div>
  )
}

