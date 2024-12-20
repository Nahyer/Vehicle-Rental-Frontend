import { useGetVehiclesQuery } from "@/features/vehicles/vehicleApi";
import {  ArrowRight, CalendarDays, CarFront, DollarSign, Headset } from "lucide-react";
import { Link } from "react-router-dom";


function LandingPage() {
  return (
    <div className="landing-page bg-white">
      <HeroSection />
      <WhyChoseUs />
      <FeaturedVehicles />
      <Testimonials />
      <CallToAction />
      
    </div>
  );
}


export default LandingPage

function HeroSection() {
  return (
<div className="relative h-screen overflow-hidden">
  <video autoPlay muted loop playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none">
    <source src="https://res.cloudinary.com/dejyhjbwg/video/upload/v1721673741/videos/yhbo692cebz2l65ep0l6.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div className="absolute inset-0 bg-black opacity-50"></div>
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
    <h1 className="text-4xl md:text-8xl font-bold mb-4">
      <span className="text-white">RENT</span> <span className="text-blue-800">YOUR RIDE</span> <span className="text-white">WITH EASE</span>
    </h1>
    <p className="text-lg md:text-3xl mb-8">Find the perfect four-wheeler or two-wheeler for your needs. Quick, easy, and reliable.</p>
    <div className="flex space-x-4 text-2xl">
      {/* <button className="bg-primary  text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/80">Browse Vehicles</button> */}
      <Link to={'/vehicles'} className="bg-primary  text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/80">Browse Vehicles</Link>
      <Link to={'/about'}className="text-white py-2 px-4 rounded-lg border border-white hover:bg-white hover:text-black">
      Learn More</Link>
     
    </div>
  </div>
</div>
  );
}

function WhyChoseUs() {
  return (
    <div className="bg-blue-900 text-white p-8">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 ">
      <div className="grid">
        <h2 className="text-5xl font-bold mb-4">Why Choose RentMyRide?</h2>
        <p className="text-2xl mb-6">Discover The Benefits Of Renting With Us. Enjoy Competitive Rates, A Wide Selection Of Vehicles, And 24/7 Support.</p>
        <div>
          <Link to='/about'  className="bg-white text-blue-900 font-semibold py-2 px-4 rounded-lg flex items-center w-fit ">
                   <p>Learn More<ArrowRight  className="mb-2 " /></p> 
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-800 p-4 rounded-lg">
        <CarFront  className="mb-2" size={32}/>          <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
          <p>Choose From A Variety Of Four-Wheelers And Two-Wheelers To Fit Your Needs.</p>
        </div>
        <div className="bg-blue-800 p-4 rounded-lg">
        <DollarSign  className="mb-2" size={32}/>
                  <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
          <p>Enjoy Affordable Prices Without Compromising On Quality.</p>
        </div>
        <div className="bg-blue-800 p-4 rounded-lg">
        <Headset className="mb-2" size={32} />
                  <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
          <p>Our Customer Support Is Available Around The Clock To Assist You.</p>
        </div>
        <div className="bg-blue-800 p-4 rounded-lg">
        <CalendarDays className="mb-2" size={32}/>
                  <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
          <p>Choose From A Variety Of Four-Wheelers And Two-Wheelers To Fit Your Needs.</p>
        </div>
      </div>
    </div>
  </div>
  )
}

function FeaturedVehicles() {
  const {
		data: dBvehicles,
		isLoading,
	
	} = useGetVehiclesQuery();



  return (
    <section className="featured-vehicles py-12 text-center">
    <h2 className="text-5xl font-bold mb-8">Featured Vehicles</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 " >
      {isLoading && <p>Loading...</p>}
    {dBvehicles?.slice(0, 3).map((vehicle, index) => (
  <div key={index} className="relative group">
    <img src={vehicle.vehicleSpecs.image_url} alt={`Vehicle ${index + 1}`} className="w-full h-auto rounded-lg shadow-lg" />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="text-white text font-bold text-4xl">
        <h3>Model: {vehicle.vehicleSpecs.model}</h3>
        <p>Capacity: {vehicle.vehicleSpecs.seating_capacity}</p>
        <p>Fuel: {vehicle.vehicleSpecs.fuel_type}</p>
      </div>
    </div>
  </div>
))}
    </div>
  </section>

  );
}


function CallToAction() {
  return (
    <section className="cta py-12 bg-gray-800 text-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center gap-8">
       
        <h2 className="text-3xl font-bold mb-8">Ready to Hit the Road?</h2>
        <Link to={'/vehicles'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Book Your Dream Vehicle Now!</Link>
  
      </div>
       
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      image: "https://placehold.co/400?text=JD",
      name: "John Doe",
      quote: "Renting a car from RentMyRide was a breeze! The selection of vehicles was fantastic, and the booking process was incredibly easy. I will definitely be using them again for my next trip.",
    },
    {
      image: "https://placehold.co/400?text=JS",
      name: "Jane Smith",
      quote: "The customer service at  RentMyRide is top-notch. They were very helpful in answering all my questions and ensuring I had a smooth rental experience. Highly recommend!",
    },
  ];

  return (

    <section className="testimonials py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="testimonial rounded-md shadow-md p-4 flex flex-col items-center">
              <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
              <p className="text-gray-700 text-center text-2xl">"{testimonial.quote}"</p>
              <p className="text-gray-500 text-center font-bold">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
   

  );
}

