'use client'

import axiosInstance from "@/lib/axiosInstance";
import { User } from "@/lib/model";
import { useEffect, useState } from "react";
import { API_URI } from "../../global";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";

export function renderAvatar(
    params: GridCellParams<{ picture: string; color: string }, any, any>,
  ) {
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
  
const CustomerPage = () =>{
    const [customers, setCustomers] = useState<User[]>([]);
    
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
            width: 150,
        },
        {
            field: 'picture',
            headerName: 'Avatar',
            width: 150,
            align:"center",
            renderCell: renderAvatar,
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
            Details
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
        checkboxSelection
        disableRowSelectionOnClick
      />
        </Container>
    )
}

export default CustomerPage;