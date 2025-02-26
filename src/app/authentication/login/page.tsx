"use client";
import Link from "next/link";
import { Grid, Box, Card, Button, Stack, Typography } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";
import GoogleIcon from '@mui/icons-material/Google';
import { API_URI } from "@/app/global";
import { useEffect } from "react";
import { getUser } from "@/lib/user";
import { GotoHomePage } from "@/lib/goto";
import { useRouter } from "next/navigation";
import { User } from "@/lib/model";
const Login = () => {
  const router = useRouter();
  useEffect(()  => {
    // getUser().then( (user) => {
    //   console.log('detect user => redirect to dashboard',user);
    //   GotoHomePage(router);
    // }
    // )
    getUser({ 
      onSuccess: (user: User) =>{
      GotoHomePage(router);
    }, 
    onError: (err: any) =>{
      console.log(err)
    }
    })
  })
  const loginGoolgeSSOURI = () => {
   return API_URI + '/sso/google';
  };
  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <Stack>
                <Box>
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                      component={Link}                     
                      startIcon={<GoogleIcon />}
                      // onClick={loginGoolgeSSO}
                      href={loginGoolgeSSOURI()}
                    >
                      Đăng nhập với tài khoản Google
                    </Button>
                </Box>   
              </Stack>           
              {/* <AuthLogin
                subtext={
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    color="textSecondary"
                    mb={1}
                  >
                    Oneblock.vn
                  </Typography>
                }
                subtitle={
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    mt={3}
                  >
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="500"
                    >
                      New to Modernize?
                    </Typography>
                    <Typography
                      component={Link}
                      href="/authentication/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: "none",
                        color: "primary.main",
                      }}
                    >
                      Create an account
                    </Typography>
                  </Stack>
                }
              /> */}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default Login;
