"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface ArbitrumWalletButtonProps {
  onConnect?: (address: string) => void
}

declare global {
  interface Window {
    ethereum?: any
  }
}

export function ArbitrumWalletButton({ onConnect }: ArbitrumWalletButtonProps) {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.listAccounts()
        if (accounts.length > 0) {
          setAddress(accounts[0].address)
          if (onConnect) {
            onConnect(accounts[0].address)
          }
        }
      } catch (error) {
        console.error("Error checking existing connection:", error)
        toast({
          title: "Connection Check Failed",
          description: "Failed to check existing wallet connection. Please try connecting manually.",
          variant: "destructive",
        })
      }
    }
  }

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      setIsConnecting(true)
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        setAddress(address)
        if (onConnect) {
          onConnect(address)
        }
        toast({
          title: "Wallet Connected",
          description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
        })
      } catch (error) {
        console.error("Failed to connect wallet:", error)
        let errorMessage = "An unknown error occurred"
        if (error instanceof Error) {
          errorMessage = error.message
        }
        toast({
          title: "Wallet Connection Failed",
          description: errorMessage,
          variant: "destructive",
        })
      } finally {
        setIsConnecting(false)
      }
    } else {
      console.error("Ethereum object not found, do you have MetaMask installed?")
      toast({
        title: "Wallet Connection Failed",
        description: "MetaMask not detected. Please install MetaMask and try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Button
      onClick={connectWallet}
      disabled={isConnecting}
      className="bg-[#000000] text-[#ffffff] hover:bg-[#000000]/90 rounded-full px-6"
    >
      {isConnecting
        ? "Connecting..."
        : address
          ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`
          : "Connect Wallet"}
    </Button>
  )
}

