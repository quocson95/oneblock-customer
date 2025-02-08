"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  remainCoutdown(): number
  onComplete: () => void
}

export type {CountdownTimerProps};

export default function CountdownTimer({ remainCoutdown,  onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(-1)

  useEffect(() => {
    if (timeLeft!= -1 && timeLeft <= 0) {
      onComplete()
      return
    }

    const timer = setInterval(() => {
      let remain = remainCoutdown();
      if (remain == timeLeft) {
        remain--;
      }
      setTimeLeft(remain);
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onComplete])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <>
    {timeLeft>0?
    <div className="text-6xl font-bold tabular-nums">
      <b><span>Remaining payment time:</span> {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</b>
    </div>:<div></div>}
    </>
  )
}

