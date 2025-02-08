"use client"

import { useEffect, useRef, useState } from "react"
import {QRCodeSVG} from "qrcode.react"
import { Backdrop, Box, Button, Card, CardContent, Container, Grid, Stack, Typography, useTheme } from "@mui/material"
import Image from "next/image"
import CountdownTimer, { CountdownTimerProps } from "./CountdownTimer"
import axiosInstance from "@/lib/axiosInstance"
import { API_URI } from "@/app/global"
import { bool } from "sharp"

export interface PaymentInfo {
  qrCode: string
  amount: string
  accountNumber: string
  accountName: string
  orderCode: number
  currency: string
  description: string
  checkoutUrl: string
  status: number
  cdCheckoutBySec: number;
}


export interface CheckoutProps {
  onComplete:  () => void,
  onExire:() => void,
}

const getPaymentInfo = async (setPaymentInfo: any) => {
  try {
    const response = await axiosInstance.get(API_URI + "/payment/payos?id=1", {
      responseType: "json",
    })
    setPaymentInfo(response.data);
  // setOpenBackDrop(false);
  } catch (err) {
    console.error("Error fetching image:", err)
    // setOpenBackDrop(false);
  }
}

export default function Checkout({ onExire: onCheckoutExpire , onComplete: onCheckoutComplete }: CheckoutProps) {
  const loading = useRef(false);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>();
  const [count, setCount] = useState(0);
  const cd = useRef(60*20);
  
  useEffect(() => {
    if (loading.current) {
        return;
    }
    loading.current = true;
    getPaymentInfo(setPaymentInfo)
  }, [])

  useEffect(()=>{
    const interval = setInterval(() => {
      checkStatusCheckout(paymentInfo?.orderCode || 0).then( (res) => {
        if (res) {
          clearInterval(interval);
          return;
        }
        setCount(count+1);
      })
   }, 1000);
 
   return () => clearInterval(interval);
  },[count])

  const checkoutCountdown = ():number =>  {
    return cd.current;
  }

  const checkStatusCheckout = async (orderCode: number) =>  {
    if (orderCode === 0) {
      return false;
    }
    const response = await axiosInstance.get(API_URI + "/payment/payos/" + orderCode, {
      responseType: "json",
    })
    const pi: PaymentInfo = response.data;
    setPaymentInfo(pi);
    if (pi.status == 3) {
      onCheckoutComplete()
      return true;
    }
    cd.current = pi.cdCheckoutBySec;
  }


  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Stack spacing={3} alignItems="center">
            {/* Header */}
           
            <Box sx={{ width: "150px", mb: 2 }}>
              <Image
                src="/images/logos/vietqr.png?height=50&width=150"
                alt="VietQR Pro"
                width={150}
                height={50}
                // style={{ width: "100%", height: "auto" }}
                className="w-full h-auto"
              />
            </Box>
            
            {/* QR Code */}
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                width: "fit-content",
              }}
            >
              
              <QRCodeSVG              
                value={paymentInfo?.qrCode||''}
                size={256}
                level="H"
                imageSettings={{
                  src: "/images/logos/oneblock-cover.png?height=48&width=48",
                  height: 48,
                  width: 48,
                  excavate: true,
                }}
              />
              <CountdownTimer remainCoutdown={()=>{
                return  checkoutCountdown();
              }} onComplete={onCheckoutExpire} ></CountdownTimer>
            </Box>

            {/* Bank Info */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    component="img"
                    src="/images/logos/mbbank_circle.png?height=32&width=32"
                    alt="Bank Logo"
                    sx={{ width: 32, height: 32 }}
                  />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Bank Name
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {/* {paymentInfo?.accountName} */}
                      Ngân hàng TMCP Quân đội
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              {/* Account Details */}
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Account Name:
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {paymentInfo?.accountName}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                Account No:
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {paymentInfo?.accountNumber}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Amount:
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {paymentInfo?.amount} {paymentInfo?.currency}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Desp:
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {paymentInfo?.description}
                </Typography>
              </Grid>
            </Grid>

            {/* Footer */}
            <Box sx={{ width: "100%", mt: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box sx={{ width: 100 }}>
                  <Image
                    src="/images/logos/napas247.png?height=30&width=100"
                    alt="Napas 247"
                    width={100}
                    height={44}
                    // style={{ width: "100%", height: "auto" }}
                    className="w-full h-auto"
                  />
                </Box>
                <Box sx={{ width: 60 }}>
                  <Image
                    src="/images/logos/mbbank.png?height=30&width=60"
                    alt="MB Bank"
                    width={60}
                    height={30}
                    // style={{ width: "100%", height: "auto" }}
                    className="w-full h-auto"
                  />
                </Box>
              </Stack>
              <Button fullWidth variant="outlined" color="primary" sx={{ mt: 2 }}>
                Huỷ
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}

