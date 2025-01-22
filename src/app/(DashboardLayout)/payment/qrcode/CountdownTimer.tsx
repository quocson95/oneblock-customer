"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  initialMinutes: number
  onComplete: () => void
}

export default function CountdownTimer({ initialMinutes, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60)

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onComplete])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="text-6xl font-bold tabular-nums">
      {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
    </div>
  )
}

