'use client'

import axiosInstance from "@/lib/axiosInstance";
import { Plan, Subscribe, User } from "@/lib/model";
import { useEffect, useState } from "react";
import { API_URI } from "../../global";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef, GridValueGetter } from "@mui/x-data-grid";


  
const CustomerPage = () =>{
    const [customers, setCustomers] = useState<User[]>([]);
    const a = (params: GridValueGetter) => {
      console.log(params);
      return 'x';
    }
    const renderAvatar = (
        params: GridCellParams<{ picture: string; color: string }, any, any>,
      ) => {
        if (params.value == null) {
          return '';
        }
      
        return (
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Avatar
                    src={params.formattedValue}
                    sx={{
                    // backgroundColor: params.value.color,
                    width: '24px',
                    height: '24px',
                    fontSize: '0.85rem',
                    }}>
                </Avatar>
            </div>
        );
      }
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'userName',
          headerName: 'Name',
          width: 150,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
        },
        {
            field: 'picture',
            headerName: 'Avatar',
            width: 150,
            align:"center",
            renderCell: renderAvatar,
        },
        {
          field: 'subscribe',
          headerName: 'Plan Name',
          width: 150,
          valueGetter:(sub:  Subscribe) => {
            if (!sub.plan) {
              return "free";
            }
            return sub.plan.name;
          },
        },
        {
          field: 'subscribe2',
          headerName: 'Expire Date',
          flex:2,
          width:200,
          valueGetter:(value, row, column, apiRef) => {
            const u: User = row;
            const sub: Subscribe = u.subscribe;
            if (!sub.plan) {
              return "-";
            }
            return  new Date(sub.expireUnix*1000).toString();
          },
      },
    ];
    

    // const rows: User[] = [];
    useEffect(()=>{
        const getCustomers = async () => {
            try {
                const response = await axiosInstance.get(API_URI + "/customer")
                setCustomers(response.data);
                
            } catch (err) {
                console.error("Error fetching image:", err)
              }
        }
        getCustomers();
    },[])

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
         <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Customer Management
        </Typography>
        {/* <Grid container spacing={2} columns={12}>
            <Grid >
                <CustomizedDataGrid />
            </Grid>
        </Grid> */}
        <DataGrid
        rows={customers}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
      />
        </Container>
    )
}

export default CustomerPage;