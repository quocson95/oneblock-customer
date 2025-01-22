"use client"

import { useEffect, useRef, useState } from "react"
import axios from "axios"
import Image from "next/image"
import { getCookie } from "@/utils/cookiesUtils"
import { AuthJWTLSKey } from "@/app/global"

export default function AuthorizedImage() {
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const loading = useRef(false);
  useEffect(() => {
    if (loading.current) {
        return;
    }
    loading.current = true;
    const fetchImage = async () => {
        try {
        const authToken = getCookie(AuthJWTLSKey);
        const response = await axios.get("https://api.oneblock.vn/be/dashboard/payment/payos", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          responseType: "arraybuffer",
        })

        const base64 = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ""))
        setImageUrl(`data:${response.headers["content-type"]};base64,${base64}`)
      } catch (err) {
        setError("Failed to load image")
        console.error("Error fetching image:", err)
      }
    }

    fetchImage()
  }, [])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return imageUrl ? (
    <div className="relative w-full h-full">
      <Image src={imageUrl || "/placeholder.svg"} alt="Payment QR Code" layout="fill" objectFit="contain" />
    </div>
  ) : null
}

