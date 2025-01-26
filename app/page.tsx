import { User, Rocket, Search, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ScholarshipLanding() {
  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(62.35%_62.35%_at_51.75%_47.39%,#F3FFB3_0%,#FFFFFF_100%)] font-sans">
      {/* Navigation */}
      <nav className="flex justify-between items-center py-4 px-8">
        <div className="text-2xl font-bold">AcadGrant</div>
        <div className="flex gap-6 items-center">
          <Link href="#" className="text-gray-700 hover:text-black">
            Dashboard
          </Link>
          <Link href="#" className="text-gray-700 hover:text-black">
            Status
          </Link>
          <Button variant="default" size="sm" className="bg-black text-white hover:bg-black/90">
            Profile
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center pb-24">
        {/* Badge */}
        <div className="bg-[#F0FFD1] px-4 py-2 rounded-[10px] mb-16">
          <p className="text-sm text-[#2d3021]">No hidden fees, transparent txns</p>
        </div>

        <h1 className="text-[64px] font-semibold mb-8 leading-[75px] tracking-[-0.04em] max-w-3xl">
          Redefining Scholarships
          <br />
          with Web3
        </h1>

        <div className="space-y-1 mb-16 max-w-2xl">
          <p className="text-base leading-[19px] tracking-[-0.04em] text-[#373131]">
            A dApp that connects scholarship providers with deserving students.
          </p>
          <p className="text-base leading-[19px] tracking-[-0.04em] text-[#373131]">
            Smart contracts can handle applications, eligibility checks,
          </p>
          <p className="text-base leading-[19px] tracking-[-0.04em] text-[#373131]">
            and transparent fund disbursement.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center mb-16">
          <Link href="/student/login">
            <Button
              variant="secondary"
              size="lg"
              className="h-12 px-6 text-xl bg-[#D9D9D9] hover:bg-[#D9D9D9]/90 rounded-[7px] font-medium"
            >
              <User className="mr-2 h-5 w-5" />
              Student
            </Button>
          </Link>
          <Link href="/login/contributor">
            <Button
              variant="default"
              size="lg"
              className="h-12 px-6 text-xl bg-black hover:bg-black/90 rounded-[7px] font-medium"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Contributor
            </Button>
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <Search className="w-12 h-12 mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Easy Discovery</h3>
            <p className="text-gray-600 text-center">Find scholarships that match your profile and interests.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <Shield className="w-12 h-12 mb-4 text-green-500" />
            <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
            <p className="text-gray-600 text-center">Blockchain-powered security for all financial transactions.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <Zap className="w-12 h-12 mb-4 text-yellow-500" />
            <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
            <p className="text-gray-600 text-center">Quick application reviews and fund disbursements.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

