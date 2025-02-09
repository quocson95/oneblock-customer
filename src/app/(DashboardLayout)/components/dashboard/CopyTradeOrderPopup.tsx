"use client"
import { TextField, Button, Container, Typography, Box } from "@mui/material"
import { useForm, Controller } from "react-hook-form"

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

type FormData = {
  id: number
  statusOrder: number
  pnl: number
  leverage: number
  margin: number
  long: number
  updatedAt: string
}

export default function CopyTradeOrderDialog() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    
  }

  return (
    <Container maxWidth="sm">
      <Box sx={style}>
        <Typography variant="h4" component="h1" gutterBottom>
          CopyTrade Order
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
            name="id"
            control={control}
            defaultValue={0}
            rules={{ required: "Id is required" ,min:1}}
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
            rules={{ required: "StatusOrder is required",
              min: {
                value: 0,
                message: "StatusOrder must larger than zero",
              },
             }}
            render={({ field }) => (
              <TextField
                {...field}
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
              required: "pnl is required",
              min: {
                value: 0,
                message: "pnl must larger than zero",
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
              required: "leverage is required",
              min: {
                value: 0,
                message: "leverage must larger than zero",
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
            rules={{ required: "margin is required",
              min: {
                value: 1,
                message: "margin must larger than one",
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
            rules={{ required: "long is required",
              min: {
                value: 0,
                message: "long must larger than one",
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
      </Box>
    </Container>
  )
}

