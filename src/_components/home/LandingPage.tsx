import Footer from "../Footer";

function LandingPage() {
  return (
    <div className="landing-page">
      <HeroSection />
      <WhyChooseUs />
      <FeaturedVehicles />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}


export default LandingPage

function HeroSection() {
  return (
    <section className="hero bg-cover bg-center h-screen flex items-center justify-center text-white" style={{ backgroundImage: `url('/path-to-your-image.jpg')` }}>
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-4">Unleash Your Next Adventure - Rent the Perfect Ride Today!</h1>
      <p className="text-2xl mb-8">Escape the Ordinary - Explore with Ease: Your One-Stop Vehicle Rental Solution</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Your Dream Vehicle Now!</button>
    </div>
  </section>
  );
}

// const HeroSection = () => {
//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       <video
//         className="absolute top-0 left-0 w-full h-full object-cover"
//         src="/path/to/video.mp4"
//         autoPlay
//         loop
//         muted
//       ></video>
//       <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
//         <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
//           Rent Your Dream Adventure
//         </h1>
//         <p className="text-lg md:text-2xl text-white mb-6">
//           Explore the world, one road trip at a time.
//         </p>
//         <div className="w-full max-w-md">
//           <input
//             type="text"
//             placeholder="Location"
//             className="w-full p-3 mb-4 text-black rounded-lg"
//           />
//           <input
//             type="text"
//             placeholder="Vehicle Type"
//             className="w-full p-3 mb-4 text-black rounded-lg"
//           />
//           <input
//             type="text"
//             placeholder="Rental Dates"
//             className="w-full p-3 mb-4 text-black rounded-lg"
//           />
//           <button className="w-full p-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300">
//             Find Your Perfect Ride Now!
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


function WhyChooseUs() {
  const benefits = [
    { icon: "fas fa-car", text: "Widest Selection: Rent anything from sleek sedans to powerful SUVs to adventurous motorcycles - all in one place!" },
    { icon: "fas fa-dollar-sign", text: "Competitive Rates: Transparent pricing, no hidden fees - enjoy the journey without breaking the bank!" },
    { icon: "fas fa-calendar-check", text: "Effortless Booking: Seamless online booking process - get on the road in minutes, not hours!" },
    { icon: "fas fa-map-marker-alt", text: "Convenient Locations: Pick up and drop off your vehicle at various convenient locations across the city (or state)." },
    { icon: "fas fa-headset", text: "24/7 Support: We've got your back - get assistance anytime, anywhere with our dedicated customer support team." },
  ];

  return (
    <>
    
    <section className="why-choose-us py-12 bg-gray-100 text-center">
    <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
    <div className="flex justify-around">
      <div className="max-w-xs">
        <img src="/path-to-icon1.png" alt="Widest Selection" className="mb-4 mx-auto" />
        <h3 className="text-xl font-semibold mb-2">Widest Selection</h3>
        <p>Rent anything from sleek sedans to powerful SUVs to adventurous motorcycles - all in one place!</p>
      </div>
      <div className="max-w-xs">
        <img src="/path-to-icon2.png" alt="Competitive Rates" className="mb-4 mx-auto" />
        <h3 className="text-xl font-semibold mb-2">Competitive Rates</h3>
        <p>Transparent pricing, no hidden fees - enjoy the journey without breaking the bank!</p>
      </div>
      <div className="max-w-xs">
        <img src="/path-to-icon3.png" alt="Effortless Booking" className="mb-4 mx-auto" />
        <h3 className="text-xl font-semibold mb-2">Effortless Booking</h3>
        <p>Seamless online booking process - get on the road in minutes, not hours!</p>
      </div>
      <div className="max-w-xs">
        <img src="/path-to-icon4.png" alt="Convenient Locations" className="mb-4 mx-auto" />
        <h3 className="text-xl font-semibold mb-2">Convenient Locations</h3>
        <p>Pick up and drop off your vehicle at various convenient locations across the city (or state).</p>
      </div>
      <div className="max-w-xs">
        <img src="/path-to-icon5.png" alt="24/7 Support" className="mb-4 mx-auto" />
        <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
        <p>We've got your back - get assistance anytime, anywhere with our dedicated customer support team.</p>
      </div>
    </div>
  </section>
    </>

  );
}


function FeaturedVehicles() {
  const vehicles = [
    { image: "path/to/car1.jpg", model: "2024 Toyota Camry", capacity: 5, fuel: "30 MPG" },
    { image: "path/to/car2.jpg", model: "2023 Ford F-150", capacity: 5, fuel: "20 MPG" },
    { image: "path/to/car3.jpg", model: "2022 Harley-Davidson Street Glide", capacity: 2, fuel: "40 MPG" },
  ];

  return (
    <section className="featured-vehicles py-12 text-center">
    <h2 className="text-3xl font-bold mb-8">Featured Vehicles</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Example vehicle item */}
      <div className="relative group">
        <img src="/path-to-vehicle1.jpg" alt="Vehicle 1" className="w-full h-auto rounded-lg shadow-lg" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <div>
            <h3 className="text-xl font-semibold">Model: XYZ</h3>
            <p>Year: 2023</p>
            <p>Seating Capacity: 5</p>
            <p>Fuel Efficiency: 25 MPG</p>
          </div>
        </div>
      </div>
      {/* Repeat for other vehicles */}
    </div>
  </section>

  );
}


function CallToAction() {
  return (
    <section className="cta py-12 bg-gray-800 text-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center">
       
        <h2 className="text-3xl font-bold mb-8">Ready to Hit the Road?</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Book Your Dream Vehicle Now!</button>
        <div className="social-media mt-4">
          <a href="https://facebook.com" className="text-blue-700 mx-2"><i className="fab fa-facebook-f"></i></a>
          <a href="https://twitter.com" className="text-blue-500 mx-2"><i className="fab fa-twitter"></i></a>
          <a href="https://instagram.com" className="text-pink-500 mx-2"><i className="fab fa-instagram"></i></a>
        </div>
  
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      image: "path/to/profile1.jpg",
      name: "John Doe",
      quote: "Renting a car from [Company Name] was a breeze! The selection of vehicles was fantastic, and the booking process was incredibly easy. I will definitely be using them again for my next trip.",
    },
    {
      image: "path/to/profile2.jpg",
      name: "Jane Smith",
      quote: "The customer service at [Company Name] is top-notch. They were very helpful in answering all my questions and ensuring I had a smooth rental experience. Highly recommend!",
    },
  ];

  return (
    <>
    <section className="testimonials py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="testimonial rounded-md shadow-md p-4 flex flex-col items-center">
              <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
              <p className="text-gray-700 text-center">{testimonial.quote}</p>
              <p className="text-gray-500 text-center font-bold">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="testimonials py-12 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
        <div className="flex justify-around">
          <div className="max-w-xs">
            <img src="/path-to-profile1.jpg" alt="Customer 1" className="mb-4 rounded-full w-24 h-24 mx-auto" />
            <p>"Great service! The booking process was so easy, and the car was in excellent condition."</p>
            <h4 className="mt-2 font-semibold">- John Doe</h4>
          </div>
          {/* Repeat for other testimonials */}
        </div>
      </section>
    </>
  );
}

