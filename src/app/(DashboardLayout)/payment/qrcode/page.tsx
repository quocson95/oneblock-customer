"use client"

import { useState } from "react"
import { Container, Typography, Grid, Box, Button, useMediaQuery, type Theme } from "@mui/material"
import AuthorizedImage from "./AuthorizedImage"
import CountdownTimer from "./CountdownTimer"

export default function Home() {
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))

  const handleCountdownComplete = () => {
    console.log("Countdown complete!")
  }

  const handleConfirm = () => {
    console.log("Payment confirmed!")
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Payment Confirmation
      </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              paddingTop: "100%",
              position: "relative",
              maxWidth: isSmallScreen ? "300px" : "400px",
              maxHeight: isSmallScreen ? "300px" : "400px",
              margin: "0 auto",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <AuthorizedImage/>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              minHeight: isSmallScreen ? "200px" : "400px",
            }}
          >
            <CountdownTimer initialMinutes={15} onComplete={handleCountdownComplete} />
            <Button variant="contained" onClick={handleConfirm} sx={{ mt: 4 }}>
              I confirm payment
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

