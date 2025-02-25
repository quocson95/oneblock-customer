import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { IconUser } from "@tabler/icons-react";
import { User } from "../../../../lib/model";
import {  AuthJWTLSKey } from "@/app/global";
import { IconBrandPaypal } from "@tabler/icons-react";
import {  GotoLoginPage } from "@/lib/goto";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next/client";
import { getUser } from "@/lib/user";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [user, setUser] = useState<User>()
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const router = useRouter()
  useEffect(() => {
    // getUser().then( setUser).catch( (err)=>{
    //   console.log(err)
    //   setCookie(AuthJWTLSKey, "");
    //   GotoLoginPage(router);
    // });
    getUser({ 
      onSuccess: (user: User) =>{
      setUser(user);
    }, 
    onError: (err: any) =>{
      console.log(err)
      setCookie(AuthJWTLSKey, "");
      GotoLoginPage(router);
    }
    })
  }, [])

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={user?user.picture:'/images/profile/user-1.jpg'}
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        {/* <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>Upgrade</ListItemText>
        </MenuItem> */}
        {/* <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
        </MenuItem> */}
       
        {
          user?.subscribe?.plan ?
          (
            <Box>
          <MenuItem>
            <ListItemIcon>
              <IconBrandPaypal width={20} />
            </ListItemIcon>
            <ListItemText>{user?.subscribe?.plan.name}</ListItemText>
          </MenuItem>

          <MenuItem>     <ListItemText> Valid: {user.subscribe?.expireDate}</ListItemText></MenuItem>
          </Box>
          ):
          <Box mt={1} py={1} px={2}>
            <Button
            onClick={handleClose2}
              href="/payment/plan"
              variant="outlined"
              color="primary"
              component={Link}
              fullWidth
            >
              Upgrade
            </Button>
          </Box>
        }
      </Menu>
    </Box>
  );
};

export default Profile;
