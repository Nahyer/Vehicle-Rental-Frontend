
const Overview = () => {    
      // Example summary data (replace with actual data fetching logic)
      const user = {
        username: 'JohnDoe',
        email: 'johndoe@example.com',
        membershipLevel: 'Gold',
        totalBookings: 25,
        upcomingBookings: 3,
        notifications: 2 // Replace with actual notification count or data
      };
    
      return (
        <div className="dashboard-overview">
          <h2>Welcome, {user.username}!</h2>
          <div className="summary">
            <div className="summary-item">
              <h3>Email:</h3>
              <p>{user.email}</p>
            </div>
            <div className="summary-item">
              <h3>Membership Level:</h3>
              <p>{user.membershipLevel}</p>
            </div>
            <div className="summary-item">
              <h3>Total Bookings:</h3>
              <p>{user.totalBookings}</p>
            </div>
            <div className="summary-item">
              <h3>Upcoming Bookings:</h3>
              <p>{user.upcomingBookings}</p>
            </div>
            <div className="summary-item">
              <h3>Notifications:</h3>
              <p>{user.notifications}</p>
            </div>
          </div>
          {/* Additional content or widgets can be added here */}
        </div>
      );
    }  

export default Overview