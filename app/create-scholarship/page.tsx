"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

type FormData = {
  grantAmount: string
  nationality: string
  cgpa: string
}

export default function CreateScholarship() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    console.log("Form data:", data)
    // Store eligibility data in localStorage
    localStorage.setItem("scholarshipEligibility", JSON.stringify(data))
    router.push("/create-scholarship/repayment")
  }

  return (
    <div className="min-h-screen bg-[#FFFEF4]">
      {/* Navigation */}
      <nav className="flex justify-between items-center py-4 px-8 bg-[#FFFEF4] border-b border-[#E5FF6D]">
        <Link href="/" className="text-2xl font-bold text-[#2D3021]">
          AcadGrant
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/create-scholarship" className="text-[#2D3021] font-bold underline underline-offset-4">
            Create Scholarship
          </Link>
          <Link href="/dashboard" className="text-[#2D3021] font-medium">
            Dashboard
          </Link>
          <Button className="bg-black text-white hover:bg-black/90 rounded-full px-6">
            <LinkIcon className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-[#2D3021] mb-8">Create Scholarship</h1>

        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-8">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-[#2D3021] text-white flex items-center justify-center text-sm mb-2">
                  1
                </div>
                <span className="text-sm text-[#2D3021]">Eligibility</span>
              </div>
              <div className="flex-1 h-[1px] bg-[#D9D9D9] mx-4" />
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-[#D9D9D9] text-[#666666] flex items-center justify-center text-sm mb-2">
                  2
                </div>
                <span className="text-sm text-[#666666]">Repayment</span>
              </div>
            </div>

            {/* Eligibility Section */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-[#2D3021] mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-[#2D3021] text-white flex items-center justify-center text-sm mr-3">
                    1
                  </span>
                  Eligibility
                </h2>
                <p className="text-[#666666] mb-6">
                  In the eligibility section, the bank must state the criteria under which a particular student is
                  eligible for taking an education loan. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut.
                </p>
                <p className="text-sm text-[#666666] mb-8">*All fields required unless noted.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="grantAmount" className="block text-sm font-medium text-[#2D3021]">
                    Grant Amount (in INR)
                  </label>
                  <Input
                    id="grantAmount"
                    type="number"
                    className="h-12 rounded-lg border-[#D9D9D9]"
                    {...register("grantAmount", { required: "Grant amount is required" })}
                  />
                  {errors.grantAmount && <p className="text-sm text-red-500">{errors.grantAmount.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="nationality" className="block text-sm font-medium text-[#2D3021]">
                    Nationality
                  </label>
                  <Input
                    id="nationality"
                    className="h-12 rounded-lg border-[#D9D9D9]"
                    {...register("nationality", { required: "Nationality is required" })}
                  />
                  {errors.nationality && <p className="text-sm text-red-500">{errors.nationality.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="cgpa" className="block text-sm font-medium text-[#2D3021]">
                    CGPA
                  </label>
                  <Input
                    id="cgpa"
                    className="h-12 rounded-lg border-[#D9D9D9]"
                    {...register("cgpa", { required: "CGPA is required" })}
                  />
                  {errors.cgpa && <p className="text-sm text-red-500">{errors.cgpa.message}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-[#E5FF6D] hover:bg-[#d4ed5c] text-[#2D3021] rounded-lg transition-colors mt-8"
                >
                  Next
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

