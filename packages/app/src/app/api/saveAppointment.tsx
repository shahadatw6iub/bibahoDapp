import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API saveAppointment called");
  if (req.method === "POST") {
    // Process the appointment data
    res.status(200).json({ message: "Appointment saved successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
