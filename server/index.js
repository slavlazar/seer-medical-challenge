const express = require('express')
const cors = require('cors')
const fs = require('fs')

const app = express()
app.use(cors()) // so that app can access
app.use(express.json());

let bookings = JSON.parse(fs.readFileSync('./server/bookings.json')).map(
  (bookingRecord) => ({
    time: Date.parse(bookingRecord.time),
    duration: bookingRecord.duration * 60 * 1000, // mins into ms
    userId: bookingRecord.user_id,
  }),
)

app.get('/bookings', (_, res) => {
  res.json(bookings)
});

app.post('/bookings', (req, res) => {
  bookings = [...bookings, ...req.body];

  res.sendStatus(200);
});

app.listen(3001)
