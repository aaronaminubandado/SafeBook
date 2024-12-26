"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebaseConfiguration";
import { onAuthStateChanged } from "firebase/auth";
import {toast} from "react-hot-toast";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type Break = {
  startTime: string;
  endTime: string;
};

type DaySchedule = {
  day: string;
  startTime: string;
  endTime: string;
  isOpen: boolean;
  breaks: Break[];
};

export function ScheduleManager() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(
    daysOfWeek.map((day) => ({
      day,
      startTime: "09:00",
      endTime: "17:00",
      isOpen: true,
      breaks: [],
    }))
  );
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Listen for authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch schedule from Firestore
  useEffect(() => {
    const fetchSchedule = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const scheduleDocRef = doc(db, "Schedules", userId);
        const scheduleDoc = await getDoc(scheduleDocRef);

        if (scheduleDoc.exists()) {
          setSchedule(scheduleDoc.data().schedule || []);
        }
      } catch (error) {
        console.error("Error fetching schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [userId]);

  // Save schedule to Firestore with reference to the user's document
  const saveSchedule = async () => {
    if (!userId) {
      console.error("No user is signed in.");
      return;
    }

    try {
      // Reference to the current user's document in the 'users' collection
      const userDocRef = doc(db, "users", userId);

      // Schedule document in the 'Schedules' collection
      const scheduleDocRef = doc(db, "Schedules", userId);

      await setDoc(scheduleDocRef, {
        schedule,
        reference: userDocRef.path, // Reference to the user's document
        lastUpdated: new Date().toISOString(),
      });

       console.log("Schedule saved successfully with user reference");
      toast.success("Schedule saved successfully!");
      
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  };

  const handleTimeChange = (
    index: number,
    field: "startTime" | "endTime",
    value: string
  ) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    setSchedule(newSchedule);
  };

  const handleToggleDay = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].isOpen = !newSchedule[index].isOpen;
    setSchedule(newSchedule);
  };

  const handleAddBreak = (dayIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].breaks.push({ startTime: "12:00", endTime: "13:00" });
    setSchedule(newSchedule);
  };

  const handleRemoveBreak = (dayIndex: number, breakIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].breaks.splice(breakIndex, 1);
    setSchedule(newSchedule);
  };

  const handleBreakTimeChange = (
    dayIndex: number,
    breakIndex: number,
    field: "startTime" | "endTime",
    value: string
  ) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].breaks[breakIndex][field] = value;
    setSchedule(newSchedule);
  };

  if (loading) {
    return <p>Loading schedule...</p>;
  }

  return (
    <div className="space-y-6">
      {schedule.map((day, dayIndex) => (
        <div key={day.day} className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-24">
              <Label>{day.day}</Label>
            </div>
            <Select
              value={day.isOpen ? "open" : "closed"}
              onValueChange={() => handleToggleDay(dayIndex)}
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
                  onChange={(e) =>
                    handleTimeChange(dayIndex, "startTime", e.target.value)
                  }
                  className="w-32"
                />
                <span>to</span>
                <Input
                  type="time"
                  value={day.endTime}
                  onChange={(e) =>
                    handleTimeChange(dayIndex, "endTime", e.target.value)
                  }
                  className="w-32"
                />
              </>
            )}
          </div>
          {day.isOpen && (
            <div className="ml-28 space-y-2">
              <Label>Breaks</Label>
              {day.breaks.map((breakItem, breakIndex) => (
                <div key={breakIndex} className="flex items-center space-x-2">
                  <Input
                    type="time"
                    value={breakItem.startTime}
                    onChange={(e) =>
                      handleBreakTimeChange(
                        dayIndex,
                        breakIndex,
                        "startTime",
                        e.target.value
                      )
                    }
                    className="w-32"
                  />
                  <span>to</span>
                  <Input
                    type="time"
                    value={breakItem.endTime}
                    onChange={(e) =>
                      handleBreakTimeChange(
                        dayIndex,
                        breakIndex,
                        "endTime",
                        e.target.value
                      )
                    }
                    className="w-32"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveBreak(dayIndex, breakIndex)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddBreak(dayIndex)}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Break
              </Button>
            </div>
          )}
        </div>
      ))}
      <Button onClick={saveSchedule} className="mt-4">
        Save Schedule
      </Button>
    </div>
  );
}
