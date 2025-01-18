import User from "../models/user.js";
import Reservation from "../models/reservation.js";

// create reservation
export const createReservation = async (req, res) => {
  const { date, time } = req.body;
  try {
    const newReservation = new Reservation({
      userId: req.user.id,
      date,
      time,
    });
    await newReservation.save();
    return res.status(201).json(newReservation);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

// get individual user's reservations
export const getReservation = async (req, res) => {
    try{
    const userId = req.user.id;
    const reservation = await Reservation.find({ userId });
    return res.status(200).json(reservation);
    } catch(error){
        return res.status(500).json({ message: "failed to fetch reservation", error: error.message });
    }
}