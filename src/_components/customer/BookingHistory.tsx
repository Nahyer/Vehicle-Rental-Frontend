
const BookingHistory = () => {
     // Sample booking history data
     const bookingHistory = [
        { id: 1, vehicle: 'Car', date: '2022-01-01' },
        { id: 2, vehicle: 'Motorcycle', date: '2022-02-01' },
        { id: 3, vehicle: 'Truck', date: '2022-03-01' },
    ];
  return (
    <div>
        
        
                <div>
                    <h2>Booking History</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Vehicle</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingHistory.map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>{booking.vehicle}</td>
                                    <td>{booking.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
    </div>
        );
    };


export default BookingHistory