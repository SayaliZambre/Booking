const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory booking storage (for simplicity)
let bookings = [];

// Endpoint to get all bookings
app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

// Endpoint to create a new booking
app.post("/api/bookings", (req, res) => {
  const { date, time, guests, name, contact } = req.body;

  // Validate input fields
  if (!date || !time || !guests || !name || !contact) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  // Prevent double booking for the same time slot
  const isSlotTaken = bookings.some(
    (booking) => booking.date === date && booking.time === time
  );
  if (isSlotTaken) {
    return res.status(400).json({ error: "This time slot is already booked!" });
  }

  // Create new booking
  const newBooking = { date, time, guests, name, contact };
  bookings.push(newBooking);

  res.status(201).json({ message: "Booking successful!", booking: newBooking });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
