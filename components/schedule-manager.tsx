'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export function ScheduleManager() {
  const [schedule, setSchedule] = useState(
    daysOfWeek.map(day => ({ day, startTime: '09:00', endTime: '17:00', isOpen: true }))
  )

  const handleTimeChange = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const newSchedule = [...schedule]
    newSchedule[index][field] = value
    setSchedule(newSchedule)
  }

  const handleToggleDay = (index: number) => {
    const newSchedule = [...schedule]
    newSchedule[index].isOpen = !newSchedule[index].isOpen
    setSchedule(newSchedule)
  }

  return (
    <div className="space-y-4">
      {schedule.map((day, index) => (
        <div key={day.day} className="flex items-center space-x-4">
          <div className="w-24">
            <Label>{day.day}</Label>
          </div>
          <Select
            value={day.isOpen ? 'open' : 'closed'}
            onValueChange={(value) => handleToggleDay(index)}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          {day.isOpen && (
            <>
              <Input
                type="time"
                value={day.startTime}
                onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
                className="w-32"
              />
              <span>to</span>
              <Input
                type="time"
                value={day.endTime}
                onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
                className="w-32"
              />
            </>
          )}
        </div>
      ))}
      <Button className="mt-4">Save Schedule</Button>
    </div>
  )
}

