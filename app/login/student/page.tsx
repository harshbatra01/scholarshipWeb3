import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function LoginChoice() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(62.35%_62.35%_at_51.75%_47.39%,#F3FFB3_0%,#FFFFFF_100%)]">
      <Card className="w-full max-w-md border-0 shadow-xl overflow-hidden bg-white">
        <CardContent className="p-12">
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-5xl font-semibold tracking-tight text-[#2D3021]">Are you a new user?</h1>
            <p className="text-[#373131] text-xl leading-relaxed">Fill up a quick form and register as a student</p>
          </div>

          <div className="space-y-6">
            <Link href="/student/register" className="block">
              <Button
                className="w-full h-16 bg-[#D9D9D9] hover:bg-[#CCCCCC] text-[#2D3021] text-xl font-medium rounded-xl transition-colors"
                variant="secondary"
              >
                Register
              </Button>
            </Link>

            <Link href="/student/signin" className="block">
              <Button
                className="w-full h-16 bg-[#E2EC9B] hover:bg-[#d4dd8f] text-[#2D3021] text-xl font-medium rounded-xl transition-colors"
                variant="secondary"
              >
                Sign in
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

