"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

type FormData = {
  maxRepayment: string
  interestRate: string
  moratoriumPeriod: string
}

export default function ScholarshipRepayment() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data)
    // Retrieve existing scholarships or initialize an empty array
    const existingScholarships = JSON.parse(localStorage.getItem("allScholarships") || "[]")

    // Get the contributor's information
    const contributorUser = JSON.parse(localStorage.getItem("contributorUser") || "{}")

    // Add the new scholarship
    const newScholarship = {
      id: Date.now().toString(), // This is where the large number comes from
      organizationName: contributorUser.organizationName || "Unknown Organization",
      website: contributorUser.website || "N/A",
      eligibility: JSON.parse(localStorage.getItem("scholarshipEligibility") || "{}"),
      repayment: data,
    }

    console.log("New scholarship created:", newScholarship)

    existingScholarships.push(newScholarship)

    // Save updated scholarships back to localStorage
    localStorage.setItem("allScholarships", JSON.stringify(existingScholarships))

    toast({
      title: "Scholarship Created",
      description: "Your scholarship has been successfully created.",
    })
    router.push("/dashboard")
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
                <div className="w-8 h-8 rounded-full bg-[#D9D9D9] text-[#666666] flex items-center justify-center text-sm mb-2">
                  1
                </div>
                <span className="text-sm text-[#666666]">Eligibility</span>
              </div>
              <div className="flex-1 h-[1px] bg-[#D9D9D9] mx-4" />
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-[#2D3021] text-white flex items-center justify-center text-sm mb-2">
                  2
                </div>
                <span className="text-sm text-[#2D3021]">Repayment</span>
              </div>
            </div>

            {/* Repayment Section */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-[#2D3021] mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-[#2D3021] text-white flex items-center justify-center text-sm mr-3">
                    2
                  </span>
                  Repayment
                </h2>
                <p className="text-[#666666] mb-6">
                  The repayment section is where the contributor state how the student must pay back the the grants, the
                  max time period, moratorium period, interest rate are given here. Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut.
                </p>
                <p className="text-sm text-[#666666] mb-8">*All fields required unless noted.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="maxRepayment" className="block text-sm font-medium text-[#2D3021]">
                    Max repayment time (starts after the moratorium period)
                  </label>
                  <Input
                    id="maxRepayment"
                    type="number"
                    className="h-12 rounded-lg border-[#D9D9D9]"
                    {...register("maxRepayment", { required: "Max repayment time is required" })}
                  />
                  {errors.maxRepayment && <p className="text-sm text-red-500">{errors.maxRepayment.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="interestRate" className="block text-sm font-medium text-[#2D3021]">
                    Interest Rate
                  </label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    className="h-12 rounded-lg border-[#D9D9D9]"
                    {...register("interestRate", { required: "Interest rate is required" })}
                  />
                  {errors.interestRate && <p className="text-sm text-red-500">{errors.interestRate.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="moratoriumPeriod" className="block text-sm font-medium text-[#2D3021]">
                    Moratorium Period
                  </label>
                  <Input
                    id="moratoriumPeriod"
                    type="number"
                    className="h-12 rounded-lg border-[#D9D9D9]"
                    {...register("moratoriumPeriod", { required: "Moratorium period is required" })}
                  />
                  {errors.moratoriumPeriod && <p className="text-sm text-red-500">{errors.moratoriumPeriod.message}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-black text-white hover:bg-black/90 rounded-lg transition-colors mt-8"
                >
                  Create Scholarship
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

