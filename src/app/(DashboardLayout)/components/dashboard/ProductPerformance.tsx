'use client'

import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button,
    Modal
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
import CopyTradeOrderPopup, { CopyTradeData } from './CopyTradeOrderPopup';
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { API_URI } from '@/app/global';
import { parseISO, format } from 'date-fns';
import { getUser } from '@/lib/user';
import { User } from '@/lib/model';


const products = [
    {
        id: "1",
        name: "Sunil Joshi",
        post: "Web Designer",
        pname: "Elite Admin",
        priority: "Low",
        pbg: "primary.main",
        budget: "3.9",
    },
    {
        id: "2",
        name: "Andrew McDownland",
        post: "Project Manager",
        pname: "Real Homes WP Theme",
        priority: "Medium",
        pbg: "secondary.main",
        budget: "24.5",
    },
    {
        id: "3",
        name: "Christopher Jamil",
        post: "Project Manager",
        pname: "MedicalPro WP Theme",
        priority: "High",
        pbg: "error.main",
        budget: "12.8",
    },
    {
        id: "4",
        name: "Nirav Joshi",
        post: "Frontend Engineer",
        pname: "Hosting Press HTML",
        priority: "Critical",
        pbg: "success.main",
        budget: "2.4",
    },
];


const ProductPerformance = () => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<CopyTradeData>({dateCloseUnix:0,id:0,leverage:0,long:0,margin:0,pnl:0,statusOrder:0,updatedAt:"0", roi:0});
    const [count, setCount] =  useState<number>(0);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const [showDialogTrade, setShowDialogTrade] = useState<boolean>(false);

    const handleClose = (value: CopyTradeData) => {
    setOpen(false);
    // setSelectedValue(value);
    console.log(value)
    };
    const handleSubmit = async (value: CopyTradeData) => {
    setOpen(false);
    // setSelectedValue(value);
    // console.log(value)
        await axiosInstance.post(API_URI + "/customer/copy-trade", value);
        setCount(count+1);
    };

    const [copyTradeOrders, setCopyTradeOrders] = useState<CopyTradeData[]>([])
    useEffect(()=>{
        const loadCopyTradeOrders = async () => {
            const response = await axiosInstance.get(API_URI + "/customer/copy-trade");
            if  (response.status == 200) {
                setCopyTradeOrders(response.data);
            }
        }
        const checkUser = async () =>{
            getUser({ 
                onSuccess: (user: User) =>{
                if (user?.role == 1 || user?.role==2) {
                    setShowDialogTrade(true);
                } 
              }, 
              onError: (err: any) =>{
                console.log(err)
              }
              })
            
        }
        loadCopyTradeOrders();
        checkUser();
    },[count])
    return (

        <DashboardCard title="Trade Orders">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                {showDialogTrade && 
                    <Button variant="outlined" onClick={handleClickOpen}>
                            Add Order
                    </Button>
                }
                <CopyTradeOrderPopup
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                onSubmit={handleSubmit}
                />
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Date
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Margin
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                Leverage
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    PNL
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    ROI
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Type
                                </Typography>
                            </TableCell>
                           
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {copyTradeOrders.map((copyTrade: CopyTradeData) => (
                            <TableRow key={copyTrade.id} >
                                <TableCell >
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {copyTrade.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                { format(new Date(copyTrade.dateCloseUnix*1000).toString(), 'yyyy/MM/dd hh:mm:ss')}
                                            </Typography>
                                            
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                ${copyTrade.margin}
                                            </Typography>
                                </TableCell>
                                <TableCell  align="center">
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        x{copyTrade.leverage}
                                    </Typography>
                                </TableCell>
                                <TableCell  align="center" >
                                    <Typography  style={copyTrade.pnl>0?{color:'green'}:{color:'red'}} variant="subtitle2" fontWeight={400}>
                                        {copyTrade.pnl}
                                    </Typography>
                                </TableCell >
                                <TableCell  align="center" style={copyTrade.roi>0?{color:'green'}:{color:'red'}}>
                                    <Typography variant="subtitle2" fontWeight={400}>
                                        {copyTrade.roi}%
                                    </Typography>
                                </TableCell >
                                <TableCell align="center">
                                    <Typography variant="h6">
                                    <span style={copyTrade.long?{color:'green'}:{color:'red'}}>
                                        {copyTrade.long?"LONG":"SHORT"}
                                    </span>
                                    </Typography>
                                </TableCell>
                                
                            </TableRow>
                        ))}
                        
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default ProductPerformance;
