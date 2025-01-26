"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(62.35%_62.35%_at_51.75%_47.39%,#F3FFB3_0%,#FFFFFF_100%)]">
      <div className="w-full max-w-3xl bg-[#ffffff] rounded-xl shadow-xl p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-semibold text-center mb-4">Application Form</h1>
          <p className="text-center text-[#3a3d5b] mb-12">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
            some form, by injected humour, or randomised words which don&apos;t look even slightly believable.
          </p>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-16 mb-12">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 1 ? "bg-[#000000] text-[#ffffff]" : "bg-[#a3a3a3]"
                }`}
              >
                1
              </div>
              <span className={step === 1 ? "text-[#000000]" : "text-[#a3a3a3]"}>Basic Info</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 2 ? "bg-[#000000] text-[#ffffff]" : "bg-[#a3a3a3]"
                }`}
              >
                2
              </div>
              <span className={step === 2 ? "text-[#000000]" : "text-[#a3a3a3]"}>Academic Details</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold flex gap-2 items-center mb-6">
                  <span className="w-8 h-8 rounded-full bg-[#000000] text-[#ffffff] flex items-center justify-center text-sm">
                    1
                  </span>
                  Basic Info
                </h2>
                <p className="text-[#3a3d5b] mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
                </p>
                <p className="text-sm text-[#a3a3a3] mb-8">*All fields required unless noted.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="firstName">*First name</Label>
                  <Input id="firstName" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="middleName">Middle name (as applicable)</Label>
                  <Input id="middleName" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="lastName">*Last name</Label>
                  <Input id="lastName" className="mt-2" />
                </div>

                <div>
                  <Label>What&apos;s your gender? (optional)</Label>
                  <RadioGroup className="flex gap-6 mt-2">
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
                  <Label>What&apos;s your date of birth?</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <Select>
                      <SelectTrigger className="bg-[#ffffff]">
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

                    <Select>
                      <SelectTrigger className="bg-[#ffffff]">
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

                    <Select>
                      <SelectTrigger className="bg-[#ffffff]">
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

              <Button
                onClick={() => setStep(2)}
                className="w-full h-12 bg-[#E2EC9B] hover:bg-[#E2EC9B]/90 text-[#000000] mt-8"
              >
                Next
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold flex gap-2 items-center mb-6">
                  <span className="w-8 h-8 rounded-full bg-[#000000] text-[#ffffff] flex items-center justify-center text-sm">
                    2
                  </span>
                  Academic Details
                </h2>
                <p className="text-[#3a3d5b] mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
                </p>
                <p className="text-sm text-[#a3a3a3] mb-8">*All fields required unless noted.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="academicFirstName">*First name</Label>
                  <Input id="academicFirstName" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="academicMiddleName">Middle name (as applicable)</Label>
                  <Input id="academicMiddleName" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="academicLastName">*Last name</Label>
                  <Input id="academicLastName" className="mt-2" />
                </div>

                <div>
                  <Label>What&apos;s your gender? (optional)</Label>
                  <RadioGroup className="flex gap-6 mt-2">
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
                  <Label>What&apos;s your date of birth?</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <Select>
                      <SelectTrigger className="bg-[#ffffff]">
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

                    <Select>
                      <SelectTrigger className="bg-[#ffffff]">
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

                    <Select>
                      <SelectTrigger className="bg-[#ffffff]">
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

              <div className="flex gap-4">
                <Button onClick={() => setStep(1)} variant="outline" className="w-full h-12 mt-8">
                  Back
                </Button>
                <Button
                  onClick={() => router.push("/student/dashboard")}
                  className="w-full h-12 bg-[#E2EC9B] hover:bg-[#E2EC9B]/90 text-[#000000] mt-8"
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

