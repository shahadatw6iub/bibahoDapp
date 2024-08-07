"use client";
import React, { useState, useEffect } from "react";
import { AuroraBackground } from "./ui/aurora-background";
import Loader from "../components/Loader";
// Define the structure of an appointment
interface Appointment {
  id: number;
  nid: string;
  name: string;
  mobile: string;
  date: string;
  country: string;
  city: string;
  office: string;
}

const useFetchAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getAppointment");
        if (!response.ok) throw new Error("Failed to fetch appointments.");
        const data: Appointment[] = await response.json();
        setAppointments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { appointments, loading, error };
};

const AppointmentsPage: React.FC = () => {
  const { appointments, loading, error } = useFetchAppointments();

  if (loading)
    return (
      <main>
        <AuroraBackground>
          <div className="relative z-15 text-lg lg:text-4xl md:text-2xl sm:text-lg bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans font-bold mt-6">
            Appointments List
          </div>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Here are your current appointments
          </p>
          <div className="flex items-center justify-center w-full h-full">
            <div>
              <Loader logoSrc="/images/Nuptial-Link.svg" />
            </div>
          </div>
        </AuroraBackground>
      </main>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="relative flex flex-col w-full h-full items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-white transition-bg">
      <div className="relative z-15 text-lg lg:text-4xl md:text-2xl sm:text-lg bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans font-bold mt-6">
        Appointments List
      </div>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Here are your current appointments
      </p>
      <div className="max-w-4xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black mt-10 mb-10 overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-black border border-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">NID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Mobile</th>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Country</th>
              <th className="px-4 py-2 border-b">City</th>
              <th className="px-4 py-2 border-b">Office</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="bg-gray-100 dark:bg-black">
                <td className="border px-4 py-2">{appointment.nid}</td>
                <td className="border px-4 py-2">{appointment.name}</td>
                <td className="border px-4 py-2">{appointment.mobile}</td>
                <td className="border px-4 py-2">{appointment.date}</td>
                <td className="border px-4 py-2">{appointment.country}</td>
                <td className="border px-4 py-2">{appointment.city}</td>
                <td className="border px-4 py-2">{appointment.office}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AppointmentsPage;
