import { Facebook, Instagram } from "lucide-react";
import twitter from "../assets/images/twitter-x-seeklogo-3.svg"
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-6">
    <div className="container mx-auto text-center">
      <nav className="mb-4">
        <ul className="flex justify-center space-x-8">
         
          <Link to="/" className="hover:underline">HOME</Link>
          <Link to="/about" className="hover:underline">ABOUT US</Link>
          <Link to="/about" className="hover:underline">CONTACT</Link>
      
        </ul>
      </nav>
      <hr className="border-zinc-500 mb-4"/>
      <div className="flex flex-row justif justify-between">

      <div className="flex justify-center space-x-4 mb-4">
        <a href="#" >
        <img src={twitter} alt="twitter" style={{ width: '24px', height: '24px', color:"white" }} />
        </a>
        <a href="#">
        <Instagram />        </a>
        <a href="#" >
        <Facebook />
        </a>
      </div>
      <p className="text-sm">&copy; RentMyRide 2024, All Rights Reserved</p>
      </div>
    </div>
  </footer>
  );
}

export default Footer
