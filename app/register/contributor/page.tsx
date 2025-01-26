"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

type FormData = {
  email: string
  organizationName: string
  phoneNumber: string
  website: string
  password: string
}

export default function ContributorRegistration() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    if (step === 1) {
      const isValid = await trigger("email")
      if (isValid) {
        setStep(2)
      }
    } else if (step === 2) {
      const isValid = await trigger(["organizationName", "phoneNumber", "website"])
      if (isValid) {
        setStep(3)
      }
    } else {
      // Store the data in localStorage
      localStorage.setItem(
        "contributorUser",
        JSON.stringify({
          email: data.email,
          password: data.password,
          organizationName: data.organizationName,
        }),
      )
      console.log("Form submitted:", data)
      toast({
        title: "Registration Successful",
        description: "Your account has been created. You can now log in.",
      })
      router.push("/login/contributor")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <Card className="w-full max-w-md border-0">
        <CardContent className="pt-6">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-semibold text-[#2D3021]">Create an account</h1>
            <p className="text-[#666666]">
              Already have an account?{" "}
              <Link href="/login/contributor" className="text-[#2D3021] underline underline-offset-4">
                Log in
              </Link>
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-8 h-8 rounded-full ${step === 1 ? "bg-[#2D3021] text-white" : "bg-[#D9D9D9] text-[#666666]"} flex items-center justify-center text-sm mb-2`}
              >
                1
              </div>
              <span className={`text-xs ${step === 1 ? "text-[#2D3021]" : "text-[#666666]"} max-w-[80px]`}>
                Enter your email adress
              </span>
            </div>
            <div className="flex-1 h-[1px] bg-[#D9D9D9] mx-2" />
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-8 h-8 rounded-full ${step === 2 ? "bg-[#2D3021] text-white" : "bg-[#D9D9D9] text-[#666666]"} flex items-center justify-center text-sm mb-2`}
              >
                2
              </div>
              <span className={`text-xs ${step === 2 ? "text-[#2D3021]" : "text-[#666666]"} max-w-[80px]`}>
                Provide your basic info
              </span>
            </div>
            <div className="flex-1 h-[1px] bg-[#D9D9D9] mx-2" />
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-8 h-8 rounded-full ${step === 3 ? "bg-[#2D3021] text-white" : "bg-[#D9D9D9] text-[#666666]"} flex items-center justify-center text-sm mb-2`}
              >
                3
              </div>
              <span className={`text-xs ${step === 3 ? "text-[#2D3021]" : "text-[#666666]"} max-w-[80px]`}>
                Create your password
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-[#2D3021]">
                  What&apos;s your email?
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="h-12 rounded-lg border-[#D9D9D9]"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email id is invalid !",
                    },
                  })}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="organizationName" className="text-sm font-medium text-[#2D3021]">
                    Organization Name
                  </label>
                  <Input
                    id="organizationName"
                    placeholder="Enter your organization's name"
                    className="h-12 rounded-lg border-[#D9D9D9]"
                    {...register("organizationName", { required: "Organization name is required" })}
                  />
                  {errors.organizationName && <p className="text-sm text-red-500">{errors.organizationName.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="text-sm font-medium text-[#2D3021]">
                    Phone Number
                  </label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="h-12 rounded-lg border-[#D9D9D9]"
                    {...register("phoneNumber", { required: "Phone number is required" })}
                  />
                  {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="website" className="text-sm font-medium text-[#2D3021]">
                    Website
                  </label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="Enter your organization's website"
                    className="h-12 rounded-lg border-[#D9D9D9]"
                    {...register("website", { required: "Website is required" })}
                  />
                  {errors.website && <p className="text-sm text-red-500">{errors.website.message}</p>}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-[#2D3021]">
                  Create Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className="h-12 rounded-lg border-[#D9D9D9]"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-[#D9D9D9] hover:bg-[#CCCCCC] text-[#2D3021] rounded-lg transition-colors"
            >
              {step === 3 ? "Create Account" : "Next"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#D9D9D9]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#666666]">OR</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="mt-6 w-full h-12 border-[#D9D9D9] text-[#2D3021] rounded-lg hover:bg-[#F5F5F5]"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign up with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

