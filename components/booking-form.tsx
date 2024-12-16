"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

// Mock data for available services
const services = [
  { id: 1, name: "Haircut", duration: 30 },
  { id: 2, name: "Hair Coloring", duration: 90 },
  { id: 3, name: "Manicure", duration: 45 },
  { id: 4, name: "Pedicure", duration: 60 },
];

// Mock function to get available timeslots
const getAvailableTimeslots = (date: Date, serviceId: number) => {
  // In a real application, this would make an API call to get the actual available timeslots
  const timeslots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
  ];
  return timeslots;
};

export function BookingForm({ businessId }: { businessId: number }) {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimeslots, setAvailableTimeslots] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (selectedDate && selectedService) {
      const timeslots = getAvailableTimeslots(
        selectedDate,
        parseInt(selectedService)
      );
      setAvailableTimeslots(timeslots);
    }
  }, [selectedDate, selectedService]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!selectedService) {
      newErrors.service = "Please select a service";
    }
    if (!selectedDate) {
      newErrors.date = "Please select a date";
    }
    if (!selectedTime) {
      newErrors.time = "Please select a time";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Here you would typically send the booking data to your backend
      console.log("Booking submitted:", {
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
      });
      // You could also show a success message or redirect the user
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="service"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Service
        </label>
        <select
          id="service"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id.toString()}>
              {service.name} ({service.duration} min)
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.service}
          </p>
        )}
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Choose the service you'd like to book
        </p>
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
          onChange={(e) =>
            setSelectedDate(e.target.value ? new Date(e.target.value) : null)
          }
          min={format(new Date(), "yyyy-MM-dd")}
          max={format(
            new Date(new Date().setMonth(new Date().getMonth() + 2)),
            "yyyy-MM-dd"
          )}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.date && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.date}
          </p>
        )}
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Select your preferred appointment date
        </p>
      </div>

      <div>
        <label
          htmlFor="time"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Time
        </label>
        <select
          id="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          disabled={availableTimeslots.length === 0}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">Select a time</option>
          {availableTimeslots.map((timeslot) => (
            <option key={timeslot} value={timeslot}>
              {timeslot}
            </option>
          ))}
        </select>
        {errors.time && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.time}
          </p>
        )}
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Choose an available timeslot
        </p>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Book Appointment
      </button>
    </form>
  );
}
