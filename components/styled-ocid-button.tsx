"use client"

import { OCIDButton } from "@ocid/connect-js"
import { cn } from "@/lib/utils"

interface StyledOCIDButtonProps {
  variant?: "pill" | "rectangular"
  className?: string
}

export function StyledOCIDButton({ variant = "pill", className }: StyledOCIDButtonProps) {
  return (
    <OCIDButton
      className={cn(
        "flex items-center gap-2 bg-[#000000] text-[#ffffff] transition-colors hover:bg-[#000000]/90",
        variant === "pill" ? "rounded-full px-6 py-2" : "rounded-lg px-4 py-2",
        className,
      )}
    >
      {({ isConnected, isConnecting }) => (
        <>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#00edbe]"
          >
            <path
              d="M3 7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
            <path d="M16 15H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>{isConnected ? "Connected" : isConnecting ? "Connecting..." : "Connect OCID"}</span>
        </>
      )}
    </OCIDButton>
  )
}

