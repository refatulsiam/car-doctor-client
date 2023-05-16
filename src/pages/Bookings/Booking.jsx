import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingRow from "./BookingRow";

const Booking = () => {
  const { user } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user?.email) {
      const url = `https://car-doctor-server-bay-seven.vercel.app/checkout?email=${user?.email}`;
      fetch(url, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('car-access-token')}`
        }
      })
        .then((res) => res.json())
        .then((data) => setBookings(data));
    }
  }, [user?.email]);

  const handleDelete = id =>{
    const proceed = confirm('Are you sure you want to delete?')
    if(proceed){
        fetch(`https://car-doctor-server-bay-seven.vercel.app/checkout/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.deletedCount >0){
                alert('deleted Successful')
                const remaining = bookings.filter(booking => booking._id !== id);
                setBookings(remaining)
            }
        })
    }
  }

  const handleBookingConfirm = id =>{
    fetch(`https://car-doctor-server-bay-seven.vercel.app/checkout/${id}`, {
        method: "PATCH",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({status: 'confirm'})
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.modifiedCount > 0){
            // update state
            const remaining = bookings.filter(booking => booking._id !== id);
            const updated = bookings.find(booking => booking._id === id);
            updated.status = 'confirm'
            const newBooking = [updated, ...remaining];
            setBookings(newBooking);
        }
    })
  }

  return (
    <div>
      <h2 className="text-5xl">Your booking: {bookings.length}</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Image</th>
              <th>Service</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
                bookings.map(booking => <BookingRow
                key={booking._id}
                booking={booking}
                handleDelete={handleDelete}
                handleBookingConfirm={handleBookingConfirm}
                ></BookingRow>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;
