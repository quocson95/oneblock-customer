import React, { useEffect, useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { API_URI } from '@/app/global';
import axiosInstance from '@/lib/axiosInstance';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type ColData= {
    name: string
    data: string[]
}

type PerfTradeData = {
    xaxis: string[]
    yaxis: ColData[]
}

const SalesOverview = () => {
   
    const [optionscolumnchart, setOptionscolumnchart] = useState();
    const [seriescolumnchart, setSeriescolumnchart] = useState();
    useEffect(()=>{
      const getPerfTrade = async () => {
          const response = await axiosInstance.get(API_URI + "/customer/copy-trade/perf-data-chart");
          if (response.status != 200) {
              return;
          }
        const perfTradeData: PerfTradeData = response.data;
        const optCol: any = {
        chart: {
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
            
        },
        
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },

        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
          },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: true,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: perfTradeData.xaxis,
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
        },
    };
    setOptionscolumnchart(optCol);
    const seriesCol: any = perfTradeData.yaxis;
    setSeriescolumnchart(seriesCol);

    var options: any = {
        chart: {
          height: 350,
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#FF1654", "#247BA0"],
        series: perfTradeData.yaxis,
        
        stroke: {
          width: [4, 4]
        },
        plotOptions: {
          bar: {
            columnWidth: "20%"
          }
        },
        xaxis: {
          categories: perfTradeData.xaxis,
            // categories:[2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#FF1654"
            },
            labels: {
              style: {
                colors: "#FF1654"
              }
            },
            title: {
              text: "PNL ($)",
              style: {
                color: "#FF1654"
              }
            }
          },
          {
            opposite: true,
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#247BA0"
            },
            labels: {
              style: {
                colors: "#247BA0"
              }
            },
            title: {
              text: "ROI (%)",
              style: {
                color: "#247BA0"
              }
            }
          }
        ],
        tooltip: {
          shared: true,
          intersect: false,
          x: {
            show: true
          }
        },
        legend: {
          horizontalAlign: "left",
          offsetX: 40
        }
      };
      setOptionscolumnchart(options);
    } 
    getPerfTrade();
    },[])
    // select
    const [month, setMonth] = React.useState('1');

    const handleChange = (event: any) => {
        setMonth(event.target.value);
    };

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // chart
    
    

    return (

        <DashboardCard title="Trades Overview" action={
            <Select
                labelId="month-dd"
                id="month-dd"
                value={month}
                size="small"
                onChange={handleChange}
            >
                <MenuItem value={1}>Weekly 2025</MenuItem>
                {/* <MenuItem value={2}>April 2023</MenuItem>
                <MenuItem value={3}>May 2023</MenuItem> */}
            </Select>
        }>
            {optionscolumnchart && seriescolumnchart && <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="area"
                height={370} width={"100%"}
            />}
        </DashboardCard>
    );
};

export default SalesOverview;
