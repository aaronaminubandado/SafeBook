'use client'

import { useEffect, useState } from 'react'
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
import { db } from '@/config/firebaseConfiguration'
import { collection, getDocs, getDoc, query, where, Timestamp, doc, DocumentReference } from 'firebase/firestore'

type AppointmentData = {
  id: string
  customer: DocumentReference
  service: string
  date: Timestamp
  business: any // Reference to the business document
  businessName?: string
  customerName?: string
}

interface UserData {
  name: string
  role: string
}

export function AppointmentList() {
  const [appointments, setAppointments] = useState<AppointmentData[]>([])
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState<Date>()

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true)
      try {
        const appointmentsRef = collection(db, 'Appointments')
        const q = query(appointmentsRef)
        const querySnapshot = await getDocs(q)

        // Fetch all appointments
        const appointmentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as AppointmentData[]

        // Fetch customer details for each appointment
        const appointmentsWithCustomers = await Promise.all(
          appointmentsData.map(async (appointment) => {
            try {
              const userDoc = await getDoc(appointment.customer)
              if (userDoc.exists()) {
                const userData = userDoc.data() as UserData
                if (userData.role === 'customer') {
                  return {
                    ...appointment,
                    customerName: userData.name,
                  }
                }
              }
              return {
                ...appointment,
                customerName: 'Unknown Customer',
              }
            } catch (error) {
              console.error('Error fetching customer details:', error)
              return {
                ...appointment,
                customerName: 'Unknown Customer',
              }
            }
          })
        )

        setAppointments(appointmentsWithCustomers)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  const filteredAppointments = date
    ? appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.date.toDate())
        return (
          appointmentDate.getDate() === date.getDate() &&
          appointmentDate.getMonth() === date.getMonth() &&
          appointmentDate.getFullYear() === date.getFullYear()
        )
      })
    : appointments

  if (loading) {
    return <p>Loading appointments...</p>
  }

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
              <TableCell>
                {format(appointment.date.toDate(), 'PPP p')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
