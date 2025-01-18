import mongoose, { Schema, model } from "mongoose";

const reservationSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Accpeted", "Declined"],
    default: "Pending",
  },
  notes: String,
});

reservationSchema.pre('save', function (next) {
    // Ensure the date is in YYYY-MM-DD format by truncating the time part
    this.date = new Date(this.date.toISOString().split('T')[0]); 
    next();
  });

const Reservation = model('Reservation', reservationSchema);
export default Reservation;