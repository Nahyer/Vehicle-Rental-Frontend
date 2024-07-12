const BookingCancelled = () => {
return (
    <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Your Vehicle Booking Has Been Cancelled</h1>
        <p className="mb-4">
            We’re sorry to see you go! Your vehicle rental booking has been successfully cancelled. If there’s anything we can do to assist you or if you have any questions, please let us know.
        </p>
        <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Need Help?</h2>
            <ul className="list-disc list-inside">
                <li>Support: Our customer support team is here to help. Contact us for any inquiries or concerns.</li>
                <li>Rebook: Changed your mind? You can easily rebook and secure your preferred vehicle and dates.</li>
                <li>Feedback: We value your feedback. Let us know how we can improve our services to better meet your needs.</li>
            </ul>
        </div>
        <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Explore More:</h2>
            <p>While you’re here, take a moment to explore other vehicles and services we offer. Your next journey could be just a click away.</p>
        </div>
        <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Stay Informed:</h2>
            <p>Sign up for our newsletter to receive updates on new vehicles, special offers, and travel tips.</p>
        </div>
        <div className="text-sm text-gray-500">
            <p>Thank you for considering us. We hope to serve you in the future and provide a seamless vehicle rental experience.</p>
        </div>
    </div>
);
}

export default BookingCancelled