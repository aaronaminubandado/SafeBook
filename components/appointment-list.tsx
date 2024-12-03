'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Mock data for appointments
const mockAppointments = [
  { id: 1, customerName: 'John Doe', service: 'Haircut', date: new Date(2023, 5, 15, 10, 0) },
  { id: 2, customerName: 'Jane Smith', service: 'Manicure', date: new Date(2023, 5, 15, 11, 30) },
  { id: 3, customerName: 'Bob Johnson', service: 'Massage', date: new Date(2023, 5, 16, 14, 0) },
]

export function AppointmentList() {
  const [date, setDate] = useState<Date>()

  const filteredAppointments = date
    ? mockAppointments.filter(
        (appointment) =>
          appointment.date.getDate() === date.getDate() &&
          appointment.date.getMonth() === date.getMonth() &&
          appointment.date.getFullYear() === date.getFullYear()
      )
    : mockAppointments

  return (
    <div className="space-y-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Date & Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAppointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.customerName}</TableCell>
              <TableCell>{appointment.service}</TableCell>
              <TableCell>{format(appointment.date, 'PPP p')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

