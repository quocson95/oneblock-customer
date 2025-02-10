import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Controller, useForm } from 'react-hook-form';
import { Box, Container, TextField } from '@mui/material';
import DateTimeSelector from '../DateTimeSelector';
import { useState } from 'react';


export interface SimpleDialogProps {
  open: boolean;
  selectedValue: CopyTradeData;
  onClose: (value: CopyTradeData) => void;
  onSubmit: (value: CopyTradeData) => void;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
 export  type CopyTradeData = {
    id: number;
    statusOrder: number;
    pnl: number;
    leverage: number;
    margin: number;
    long: number;
    updatedAt: string;
    dateCloseUnix: number,
    roi: number,
  };
  
export default function CopyTradeOrderPopup(props: SimpleDialogProps) {
      const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CopyTradeData>();
  const { onClose, onSubmit, selectedValue, open } = props;
  const [dateUnix, setDateUnix]= useState<number>(new Date().getTime());
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handlerSubmit = handleSubmit((data) => {
    selectedValue.leverage = +data.leverage;
    selectedValue.long = +data.long;
    selectedValue.margin = +data.margin;
    selectedValue.pnl = +data.pnl;
    selectedValue.statusOrder = 2;
    onSubmit(selectedValue);
  })
// const onSubmit = handleSubmit((data) => console.log(data))
  return (
    <Dialog onClose={handleClose} open={open}>
      {/* <DialogTitle sx={style}>Set backup account</DialogTitle> */}
        <Typography variant="h4" component="h1" gutterBottom>
          CopyTrade Order
        </Typography>
        <DateTimeSelector onDateTimeChanged={(date) => {
            selectedValue.dateCloseUnix = date.getTime()/1000;
        }} />
        <form onSubmit={handlerSubmit} >
          <Controller
            name="id"
            control={control}
            defaultValue={0}
            disabled
            rules={{ required: "Id is required", min: 1, }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                label="Id"
                error={!!errors.id}
                helperText={errors.id?.message}
              />
            )}
          />
          <Controller
            name="statusOrder"
            control={control}
            defaultValue={0}
            rules={{
              required: "StatusOrder is required",
              min: {
                value: 0,
                message: "StatusOrder must be larger than zero",
              },
            } }
            render={({ field }) => (
              <TextField
                {...field}
                type='number'
                margin="normal"
                fullWidth
                label="Status Order"
                error={!!errors.statusOrder}
                helperText={errors.statusOrder?.message}
              />
            )}
          />
          <Controller
            name="pnl"
            control={control}
            defaultValue={0}
            rules={{
              required: "PNL is required",
              min: {
                value: 0,
                message: "PNL must be larger than zero",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                label="PNL"
                error={!!errors.pnl}
                helperText={errors.pnl?.message}
              />
            )}
          />
          <Controller
            name="leverage"
            control={control}
            defaultValue={0}
            rules={{
              required: "Leverage is required",
              min: {
                value: 0,
                message: "Leverage must be larger than zero",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                label="Leverage"
                error={!!errors.leverage}
                helperText={errors.leverage?.message}
              />
            )}
          />
          <Controller
            name="margin"
            control={control}
            defaultValue={1}
            rules={{
              required: "Margin is required",
              min: {
                value: 1,
                message: "Margin must be larger than one",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                label="Margin"
                error={!!errors.margin}
                helperText={errors.margin?.message}
              />
            )}
          />
          <Controller
            name="long"
            control={control}
            defaultValue={1}
            rules={{
              required: "Long is required",
              min: {
                value: 0,
                message: "Long must be larger than one",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                label="Long"
                error={!!errors.long}
                helperText={errors.long?.message}
              />
            )}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
        </form>
    </Dialog>
  );
}
