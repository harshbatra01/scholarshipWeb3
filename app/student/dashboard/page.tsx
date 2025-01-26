"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

interface Scholarship {
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

interface Application {
  scholarshipId: string
  organizationName: string
  status: "Pending" | "Accepted" | "Rejected"
}

interface StudentData {
  id: string
  firstName: string
  lastName: string
  email: string
  basicInfo: {
    firstName: string
    middleName: string
    lastName: string
    gender: string
    birthMonth: string
    birthDate: string
    birthYear: string
  }
  academicInfo: {
    firstName: string
    middleName: string
    lastName: string
    gender: string
    birthMonth: string
    birthDate: string
    birthYear: string
  }
}

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState<StudentData | null>(null)
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("studentLoggedIn")
    if (!isLoggedIn) {
      router.push("/student/login")
    } else {
      const savedData = localStorage.getItem("studentUser")
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        setStudentData(parsedData)

        // Load all scholarships
        const allScholarships = JSON.parse(localStorage.getItem("allScholarships") || "[]")
        setScholarships(allScholarships)

        // Load student applications
        const studentApplications = JSON.parse(localStorage.getItem(`applications_${parsedData.email}`) || "[]")
        setApplications(studentApplications)
      } else {
        console.error("Student data not found in localStorage")
        router.push("/student/login")
      }
    }
  }, [router])

  const handleApply = (scholarship: Scholarship) => {
    if (!studentData) {
      console.error("Student data not available")
      return
    }

    // Get the complete student profile
    const profileData = JSON.parse(localStorage.getItem(`studentProfile_${studentData.email}`) || "{}")

    const newApplication: Application = {
      scholarshipId: scholarship.id,
      organizationName: scholarship.organizationName,
      status: "Pending",
    }

    const updatedApplications = [...applications, newApplication]
    setApplications(updatedApplications)

    // Save updated applications to localStorage
    localStorage.setItem(`applications_${studentData.email}`, JSON.stringify(updatedApplications))

    // Update the global applications data with complete student profile
    const allApplications = JSON.parse(localStorage.getItem("allApplications") || "{}")
    if (!allApplications[scholarship.id]) {
      allApplications[scholarship.id] = []
    }

    // Add the complete profile data to the application
    allApplications[scholarship.id].push({
      id: profileData.id,
      name: profileData.name,
      email: profileData.email,
      gender: profileData.basicInfo.gender,
      birthMonth: profileData.basicInfo.birthMonth,
      birthDate: profileData.basicInfo.birthDate,
      birthYear: profileData.basicInfo.birthYear,
      institution: profileData.academicInfo.institution,
      fieldOfStudy: profileData.academicInfo.fieldOfStudy,
      currentCGPA: profileData.academicInfo.currentCGPA,
      instituteWallet: profileData.academicInfo.instituteWallet,
      status: "Pending",
    })

    localStorage.setItem("allApplications", JSON.stringify(allApplications))

    toast({
      title: "Application Submitted",
      description: `You have successfully applied for the scholarship from ${scholarship.organizationName}.`,
    })
  }

  const isApplied = (scholarshipId: string) => {
    return applications.some((app) => app.scholarshipId === scholarshipId)
  }

  const handleLogout = () => {
    localStorage.removeItem("studentLoggedIn")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-[#FFFEF4]">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-4 bg-[#FFFEF4]">
        <Link href="/" className="text-2xl font-bold text-[#3b4700]">
          AcadGrant
        </Link>
        <div className="flex items-center gap-8">
          <div className="flex gap-8">
            <Link href="/student/dashboard" className="text-[#3b4700] border-b-2 border-[#3b4700]">
              Dashboard
            </Link>
            <Link href="/student/status" className="text-[#3b4700] hover:border-b-2 hover:border-[#3b4700]">
              Status
            </Link>
            <Link href="/student/profile" className="text-[#3b4700] hover:border-b-2 hover:border-[#3b4700]">
              Profile
            </Link>
          </div>
          <Button
            variant="default"
            className="bg-[#000000] text-white hover:bg-[#000000]/90 rounded-xl"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {studentData && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#3b4700] mb-4">Welcome, {studentData.firstName}!</h2>
            <p className="text-[#3b4700]">Email: {studentData.email}</p>
          </div>
        )}

        <h1 className="text-4xl font-bold text-[#3b4700] mb-8">Available Scholarships</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
            <Card key={scholarship.id} className="bg-white shadow-lg">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#d9d9d9] rounded-full" />
                  <div>
                    <h3 className="font-semibold text-[#3b4700]">{scholarship.organizationName}</h3>
                    <p className="text-[#3b4700]">{scholarship.website}</p>
                  </div>
                </div>
                <ul className="list-disc pl-5 mb-6 text-[#3b4700]">
                  <li>Grant Amount: {scholarship.eligibility.grantAmount} INR</li>
                  <li>Nationality: {scholarship.eligibility.nationality}</li>
                  <li>Min. CGPA: {scholarship.eligibility.cgpa}</li>
                  <li>Max Repayment: {scholarship.repayment.maxRepayment} years</li>
                  <li>Interest Rate: {scholarship.repayment.interestRate}%</li>
                  <li>Moratorium: {scholarship.repayment.moratoriumPeriod} months</li>
                </ul>
                <Button
                  className="w-full bg-[#3b4700] hover:bg-[#3b4700]/90 text-white"
                  onClick={() => handleApply(scholarship)}
                  disabled={isApplied(scholarship.id)}
                >
                  {isApplied(scholarship.id) ? "Applied" : "Apply Now"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

