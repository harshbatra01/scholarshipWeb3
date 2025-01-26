"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface FormData {
  firstName: string
  middleName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  gender: string
  birthMonth: string
  birthDate: string
  birthYear: string
  institution: string
  fieldOfStudy: string
  currentCGPA: string
  instituteWallet: string
}

export default function StudentRegister() {
  const [step, setStep] = useState(1)
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthMonth: "",
    birthDate: "",
    birthYear: "",
    institution: "",
    fieldOfStudy: "",
    currentCGPA: "",
    instituteWallet: "",
  })

  useEffect(() => {
    const savedData = localStorage.getItem("studentRegistration")
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 4) {
      setStep(step + 1)
      return
    }

    // Create a complete profile object
    const profileData = {
      id: Date.now().toString(),
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      basicInfo: {
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        gender: formData.gender,
        birthMonth: formData.birthMonth,
        birthDate: formData.birthDate,
        birthYear: formData.birthYear,
      },
      academicInfo: {
        institution: formData.institution,
        fieldOfStudy: formData.fieldOfStudy,
        currentCGPA: formData.currentCGPA,
        instituteWallet: formData.instituteWallet,
      },
    }

    // Store user credentials for login
    localStorage.setItem(
      "studentUser",
      JSON.stringify({
        id: profileData.id,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      }),
    )

    // Store complete profile data
    localStorage.setItem(`studentProfile_${formData.email}`, JSON.stringify(profileData))

    toast({
      title: "Registration Successful",
      description: "Your account has been created. You can now log in.",
    })
    router.push("/student/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(62.35%_62.35%_at_51.75%_47.39%,#F3FFB3_0%,#FFFFFF_100%)]">
      <Card className="w-full max-w-md border-0 shadow-xl overflow-hidden bg-white">
        <CardContent className="p-12">
          <div className="text-center space-y-6 mb-8">
            <h1 className="text-5xl font-semibold tracking-tight text-[#2D3021]">Student Registration</h1>
            <p className="text-[#373131] text-xl leading-relaxed">Step {step} of 4</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="middleName">Middle Name (Optional)</Label>
                  <Input
                    id="middleName"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <Label>Gender</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange("gender", value)}
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <Select onValueChange={(value) => handleSelectChange("birthMonth", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1)}>
                            {new Date(0, i).toLocaleString("default", { month: "long" })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => handleSelectChange("birthDate", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Date" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 31 }, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1)}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => handleSelectChange("birthYear", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 100 }, (_, i) => {
                          const year = new Date().getFullYear() - i
                          return (
                            <SelectItem key={year} value={String(year)}>
                              {year}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#2D3021] text-white flex items-center justify-center text-sm">
                    4
                  </div>
                  <h2 className="text-xl font-semibold">Academic Details</h2>
                </div>
                <p className="text-[#666666] mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
                <p className="text-sm text-[#666666]">*All fields required unless noted.</p>
                <div>
                  <Label htmlFor="institution">Name of the Institution</Label>
                  <Input
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="fieldOfStudy">Field of Study</Label>
                  <Input
                    id="fieldOfStudy"
                    name="fieldOfStudy"
                    value={formData.fieldOfStudy}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="currentCGPA">Current CGPA</Label>
                  <Input
                    id="currentCGPA"
                    name="currentCGPA"
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    value={formData.currentCGPA}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="instituteWallet">Institute Wallet Address</Label>
                  <Input
                    id="instituteWallet"
                    name="instituteWallet"
                    value={formData.instituteWallet}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4">
              {step > 1 && (
                <Button type="button" onClick={() => setStep(step - 1)} variant="outline" className="flex-1 h-12">
                  Back
                </Button>
              )}
              <Button
                type="submit"
                className="flex-1 h-12 bg-[#E2EC9B] hover:bg-[#d4dd8f] text-[#2D3021] text-xl font-medium rounded-xl transition-colors"
              >
                {step === 4 ? "Register" : "Next"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

