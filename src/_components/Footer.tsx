const Footer = () => {
  return (
    <footer className="footer py-4 bg-gray-800 text-white text-center">
        <p>Copyright &copy; 2024 [Company Name]</p>
        <nav className="flex justify-center mt-4">
          <a href="about-us.html" className="text-gray-300 hover:text-white mr-4">About Us</a>
          <a href="faq.html" className="text-gray-300 hover:text-white mr-4">FAQ</a>
          <a href="contact.html" className="text-gray-300 hover:text-white mr-4">Contact Us</a>
          <a href="terms-and-conditions.html" className="text-gray-300 hover:text-white">Terms & Conditions</a>
        </nav>
      </footer>
  )
}

export default Footer
