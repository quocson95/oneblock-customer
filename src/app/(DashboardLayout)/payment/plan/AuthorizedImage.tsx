"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { getCookie } from "@/utils/cookiesUtils"
import { API_URI, AuthJWTLSKey } from "@/app/global"
import axiosInstance from "@/lib/axiosInstance"

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
        const response = await axiosInstance.get(API_URI + "/payment/payos", {
          // headers: {
          //   Authorization: `Bearer ${authToken}`,
          // },
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

  return (
    <div className="relative w-full h-full">
      <Image src={imageUrl || "/images/products/empty-shopping-bag.gif"} alt="Payment QR Code" width={400} height={400} style={{objectFit:"cover"}} unoptimized/>
    </div>
  )
}

