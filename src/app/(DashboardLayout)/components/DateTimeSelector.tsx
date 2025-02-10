'use client'

import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { TextField, Box, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'


type DateTimeSelector = {
    onDateTimeChanged(date: Date): void;
}
export default function DateTimeSelector({onDateTimeChanged}: DateTimeSelector) {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null)

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date)
    if (!date) {
      return;
    }
    if (selectedTime) {
      date = date.hour(selectedTime.hour())
      date = date.minute(selectedTime.minute())
      date = date.second(selectedTime.second())
    }
    onDateTimeChanged(date.toDate())
    
  }

  const handleTimeChange = (time: Dayjs | null) => {
    setSelectedTime(time)
    if (!selectedDate || !time) {
      return;
    }
    if (selectedTime) {
      let date = selectedDate;
      date = date.hour(time.hour())
      date = date.minute(time.minute())
      date = date.second(time.second())
      onDateTimeChanged(date.toDate())
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 300, margin: 'auto' }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Select Date and Time
        </Typography>
        <DatePicker
          label="Date"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <TimePicker
          label="Time"
          value={selectedTime}
          onChange={handleTimeChange}
        />
        <Typography variant="body1">
          Selected: {selectedDate?.format('MMMM D, YYYY')} {selectedTime?.format('HH:mm')}
        </Typography>
      </Box>
    </LocalizationProvider>
  )
}
