"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface StudentProfile {
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

export default function StudentProfile() {
  const router = useRouter()
  const [profile, setProfile] = useState<StudentProfile>({
    basicInfo: {
      firstName: "John",
      middleName: "",
      lastName: "Doe",
      gender: "male",
      birthMonth: "6",
      birthDate: "15",
      birthYear: "2000",
    },
    academicInfo: {
      firstName: "John",
      middleName: "",
      lastName: "Doe",
      gender: "male",
      birthMonth: "6",
      birthDate: "15",
      birthYear: "2000",
    },
  })

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("studentLoggedIn")
    if (!isLoggedIn) {
      router.push("/student/login")
    } else {
      const storedUser = localStorage.getItem("studentUser")
      if (storedUser) {
        const user = JSON.parse(storedUser)
        setProfile({
          basicInfo: {
            firstName: user.firstName,
            middleName: "",
            lastName: user.lastName,
            gender: "",
            birthMonth: "",
            birthDate: "",
            birthYear: "",
          },
          academicInfo: {
            firstName: user.firstName,
            middleName: "",
            lastName: user.lastName,
            gender: "",
            birthMonth: "",
            birthDate: "",
            birthYear: "",
          },
        })
      }
    }
  }, [router])

  const handleSave = () => {
    // Here you would typically make an API call to save the profile
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-[#FFFEF4]">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-4 bg-[#FFFEF4]">
        <Link href="/student/dashboard" className="text-2xl font-bold text-[#3b4700]">
          AcadGrant
        </Link>
        <div className="flex items-center gap-8">
          <div className="flex gap-8">
            <Link href="/student/dashboard" className="text-[#3b4700] hover:border-b-2 hover:border-[#3b4700]">
              Dashboard
            </Link>
            <Link href="/student/status" className="text-[#3b4700] hover:border-b-2 hover:border-[#3b4700]">
              Status
            </Link>
            <Link href="/student/profile" className="text-[#3b4700] border-b-2 border-[#3b4700]">
              Profile
            </Link>
          </div>
          <Button
            variant="default"
            className="bg-[#000000] text-white hover:bg-[#000000]/90 rounded-xl"
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
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#3b4700] mb-8">Edit Profile</h1>

        <div className="space-y-8 max-w-3xl">
          {/* Basic Info Card */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold flex gap-2 items-center mb-6">
                <span className="w-8 h-8 rounded-full bg-[#3b4700] text-white flex items-center justify-center text-sm">
                  1
                </span>
                Basic Info
              </h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    value={profile.basicInfo.firstName}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        basicInfo: { ...profile.basicInfo, firstName: e.target.value },
                      })
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="middleName">Middle name</Label>
                  <Input
                    id="middleName"
                    value={profile.basicInfo.middleName}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        basicInfo: { ...profile.basicInfo, middleName: e.target.value },
                      })
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    value={profile.basicInfo.lastName}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        basicInfo: { ...profile.basicInfo, lastName: e.target.value },
                      })
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Gender</Label>
                  <RadioGroup
                    value={profile.basicInfo.gender}
                    onValueChange={(value) =>
                      setProfile({
                        ...profile,
                        basicInfo: { ...profile.basicInfo, gender: value },
                      })
                    }
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-binary" id="non-binary" />
                      <Label htmlFor="non-binary">Non-binary</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Date of birth</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <Select
                      value={profile.basicInfo.birthMonth}
                      onValueChange={(value) =>
                        setProfile({
                          ...profile,
                          basicInfo: { ...profile.basicInfo, birthMonth: value },
                        })
                      }
                    >
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

                    <Select
                      value={profile.basicInfo.birthDate}
                      onValueChange={(value) =>
                        setProfile({
                          ...profile,
                          basicInfo: { ...profile.basicInfo, birthDate: value },
                        })
                      }
                    >
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

                    <Select
                      value={profile.basicInfo.birthYear}
                      onValueChange={(value) =>
                        setProfile({
                          ...profile,
                          basicInfo: { ...profile.basicInfo, birthYear: value },
                        })
                      }
                    >
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
              </div>
            </CardContent>
          </Card>

          {/* Academic Info Card */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold flex gap-2 items-center mb-6">
                <span className="w-8 h-8 rounded-full bg-[#3b4700] text-white flex items-center justify-center text-sm">
                  2
                </span>
                Academic Details
              </h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="academicFirstName">First name</Label>
                  <Input
                    id="academicFirstName"
                    value={profile.academicInfo.firstName}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        academicInfo: { ...profile.academicInfo, firstName: e.target.value },
                      })
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="academicMiddleName">Middle name</Label>
                  <Input
                    id="academicMiddleName"
                    value={profile.academicInfo.middleName}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        academicInfo: { ...profile.academicInfo, middleName: e.target.value },
                      })
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="academicLastName">Last name</Label>
                  <Input
                    id="academicLastName"
                    value={profile.academicInfo.lastName}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        academicInfo: { ...profile.academicInfo, lastName: e.target.value },
                      })
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Gender</Label>
                  <RadioGroup
                    value={profile.academicInfo.gender}
                    onValueChange={(value) =>
                      setProfile({
                        ...profile,
                        academicInfo: { ...profile.academicInfo, gender: value },
                      })
                    }
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="academic-female" />
                      <Label htmlFor="academic-female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="academic-male" />
                      <Label htmlFor="academic-male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-binary" id="academic-non-binary" />
                      <Label htmlFor="academic-non-binary">Non-binary</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Date of birth</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <Select
                      value={profile.academicInfo.birthMonth}
                      onValueChange={(value) =>
                        setProfile({
                          ...profile,
                          academicInfo: { ...profile.academicInfo, birthMonth: value },
                        })
                      }
                    >
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

                    <Select
                      value={profile.academicInfo.birthDate}
                      onValueChange={(value) =>
                        setProfile({
                          ...profile,
                          academicInfo: { ...profile.academicInfo, birthDate: value },
                        })
                      }
                    >
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

                    <Select
                      value={profile.academicInfo.birthYear}
                      onValueChange={(value) =>
                        setProfile({
                          ...profile,
                          academicInfo: { ...profile.academicInfo, birthYear: value },
                        })
                      }
                    >
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
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="w-full h-12 bg-[#3b4700] hover:bg-[#3b4700]/90 text-white rounded-lg">
            Save Changes
          </Button>
        </div>
      </main>
    </div>
  )
}

