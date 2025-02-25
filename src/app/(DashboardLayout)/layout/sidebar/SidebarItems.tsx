import React, { useEffect, useState } from "react";
import Menuitems, { Menu,MenuCustomerItems } from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { getUser } from "@/lib/user";
import { User } from "@/lib/model";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const [menu,setMenu] = useState<Menu[]>([]);
  useEffect(()=>{
    const checkUser = async () => {
      // const user = await getUser();
     
      getUser({ 
        onSuccess: (user: User) =>{
         if (user?.role == 1 || user?.role==2) {
        setMenu(Menuitems);
      } else {
        setMenu(MenuCustomerItems);
      }
      }, 
      onError: (err: any) =>{
        console.log(err)
        
      }
      })
    }
    checkUser()
  },[])
  return (
     <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {menu.map((item:  any) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
            );
          }
        })}
      </List>
    </Box>

  );
};
export default SidebarItems;
