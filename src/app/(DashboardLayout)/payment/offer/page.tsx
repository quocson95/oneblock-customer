"use client"

import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
  styled,
} from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const StyledCard = styled(Card)(({ theme, selected }: { theme: any; selected?: boolean }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  ...(selected && {
    border: `2px solid ${theme.palette.primary.main}`,
  }),
}))

const plans = [
  { name: "Hobby", price: "12" },
  { name: "Freelancer", price: "24" },
  { name: "Startup", price: "32" },
  { name: "Enterprise", price: "48" },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly")

  const handleBillingChange = (event: React.MouseEvent<HTMLElement>, newBillingCycle: string) => {
    if (newBillingCycle !== null) {
      setBillingCycle(newBillingCycle)
    }
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
     

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={6} alignItems="center">
          {/* Header */}
          <Stack spacing={2} textAlign="center" maxWidth="md">
            <Typography variant="h1">Pricing Plans</Typography>
            <Typography variant="h6" color="text.secondary">
              Start building for free, then add a site plan to go live. Account plans unlock additional features.
            </Typography>
          </Stack>

          {/* Billing Toggle */}
          <ToggleButtonGroup
            value={billingCycle}
            exclusive
            onChange={handleBillingChange}
            aria-label="billing cycle"
            sx={{
              bgcolor: "background.paper",
              p: 0.5,
              borderRadius: 2,
            }}
          >
            <ToggleButton value="monthly" aria-label="monthly billing">
              Monthly billing
            </ToggleButton>
            <ToggleButton value="yearly" aria-label="yearly billing">
              Yearly billing
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Pricing Cards */}
          <Grid container spacing={4}>
            {plans.map((plan) => (
              <Grid item xs={12} sm={6} md={3} key={plan.name}>
                <StyledCard >
                  <CardContent sx={{ height: "100%" }}>
                    <Stack spacing={3}>
                      <Typography variant="h2">{plan.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        All the basics for starting a new business
                      </Typography>
                      <Typography variant="h2">
                        ${plan.price}
                        <Typography component="span" variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                          /tháng
                        </Typography>
                      </Typography>
                      <Button variant="contained" fullWidth>
                        Đăng kí
                      </Button>
                    </Stack>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>

          {/* Footer */}
          {/* <Stack spacing={3} alignItems="center">
            <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.1em" }}>
              Brought to you by
            </Typography>
            <Stack direction="row" spacing={6} alignItems="center">
              <Image src="/placeholder.svg" alt="Next.js" width={80} height={40} />
              <Image src="/placeholder.svg" alt="Vercel" width={80} height={40} />
              <Image src="/placeholder.svg" alt="Stripe" width={80} height={40} />
              <Image src="/placeholder.svg" alt="Supabase" width={80} height={40} />
            </Stack>
          </Stack> */}
        </Stack>
      </Container>
    </Box>
  )
}

