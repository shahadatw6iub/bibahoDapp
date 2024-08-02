const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// POST endpoint to save appointment data
app.post("/saveAppointment", (req, res) => {
  const appointmentData = req.body;
  const filePath = path.join(__dirname, "appointments.json");

  fs.readFile(filePath, (err, data) => {
    let jsonData = [];
    if (!err) {
      jsonData = JSON.parse(data);
    }

    jsonData.push(appointmentData);

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        res.status(500).json({ error: "Failed to save data" });
      } else {
        res.status(200).json({ message: "Data saved successfully" });
      }
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
