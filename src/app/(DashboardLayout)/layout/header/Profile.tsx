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

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import { User } from "../../utilities/model";
import axiosInstance from "@/lib/axiosInstance";
import { API_URI } from "@/app/global";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [user, setUser] = useState<User>({picture: '/images/profile/user-1.jpg',email:'', userName:''})
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosInstance.get(API_URI + "/user", {
          responseType: "json",
        })
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching image:", err)
      }
    }
    getUser();
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
          src={user?.picture}
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
      </Menu>
    </Box>
  );
};

export default Profile;
