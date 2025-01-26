"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface WalletConnectionProps {
  onConnect: (address: string) => void
}

export function WalletConnection({ onConnect }: WalletConnectionProps) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            setWalletAddress(accounts[0])
            onConnect(accounts[0])
          }
        } catch (err) {
          console.error("Failed to check existing connection:", err)
          setError("Failed to check wallet connection")
        }
      }
    }

    checkConnection()
  }, [onConnect])

  const connectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        setIsConnecting(true)
        setError(null)
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          onConnect(accounts[0])
        } else {
          throw new Error("No accounts found")
        }
      } catch (err) {
        console.error("Failed to connect wallet:", err)
        setError("Failed to connect wallet. Please try again.")
      } finally {
        setIsConnecting(false)
      }
    } else {
      setError("MetaMask is not installed. Please install MetaMask to use this feature.")
    }
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
    setError(null)
  }

  return (
    <div className="flex flex-col items-end">
      {walletAddress ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
          <Button variant="outline" size="sm" onClick={disconnectWallet}>
            Disconnect
          </Button>
        </div>
      ) : (
        <Button
          onClick={connectWallet}
          disabled={isConnecting}
          className="bg-black text-white hover:bg-black/90 rounded-full px-6"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}

