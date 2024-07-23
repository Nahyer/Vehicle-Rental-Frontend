import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CheckIcon, MailOpenIcon, MapPinIcon, PhoneIcon } from "lucide-react"

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[url('/hero-image.jpg')] bg-cover bg-center">
      <div className="container px-4 md:px-6 flex flex-col items-center justify-center text-center text-primary-foreground">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
          Experience the Thrill of Luxury
        </h1>
        <p className="max-w-[700px] text-xl md:text-2xl mt-4">
          Discover the ultimate in automotive indulgence with our premium vehicle rental service.
        </p>
      </div>
    </section>
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter">Our Mission</h2>
            <p className="mt-4 text-muted-foreground">
              At Luxury Rentals, our mission is to provide our customers with an unparalleled driving experience. We
              believe that the thrill of the open road should be accessible to everyone, and we strive to make that
              dream a reality.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tighter">Our Values</h2>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-primary" />
                Exceptional Customer Service
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-primary" />
                Commitment to Quality
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-primary" />
                Passion for the Automotive Industry
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter">Our History</h2>
            <p className="mt-4 text-muted-foreground">
              Luxury Rentals was founded in 2010 with the goal of providing a premium rental experience for those
              seeking the thrill of driving the world's most exclusive vehicles. Over the years, we have grown to
              become one of the leading providers of luxury car rentals, with a fleet of the latest and greatest
              models from the top automotive brands.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tighter">Meet the Team</h2>
            <div className="mt-4 grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center">
                <Avatar className="w-20 h-20 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h3 className="mt-2 text-lg font-semibold">John Doe</h3>
                <p className="text-muted-foreground">CEO</p>
              </div>
              <div className="flex flex-col items-center">
                <Avatar className="w-20 h-20 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <h3 className="mt-2 text-lg font-semibold">Jane Smith</h3>
                <p className="text-muted-foreground">COO</p>
              </div>
              <div className="flex flex-col items-center">
                <Avatar className="w-20 h-20 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <h3 className="mt-2 text-lg font-semibold">Michael Johnson</h3>
                <p className="text-muted-foreground">CTO</p>
              </div>
              <div className="flex flex-col items-center">
                <Avatar className="w-20 h-20 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>ED</AvatarFallback>
                </Avatar>
                <h3 className="mt-2 text-lg font-semibold">Emily Davis</h3>
                <p className="text-muted-foreground">Marketing Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter">Our Fleet</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <img
                  src="/placeholder.svg"
                  width="300"
                  height="200"
                  alt="Lamborghini Aventador"
                  className="rounded-lg"
                />
                <h3 className="mt-2 text-lg font-semibold">Lamborghini Aventador</h3>
                <p className="text-muted-foreground">Top Speed: 217 mph</p>
              </div>
              <div className="flex flex-col items-center">
                <img src="/placeholder.svg" width="300" height="200" alt="Ferrari 488 GTB" className="rounded-lg" />
                <h3 className="mt-2 text-lg font-semibold">Ferrari 488 GTB</h3>
                <p className="text-muted-foreground">Top Speed: 205 mph</p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/placeholder.svg"
                  width="300"
                  height="200"
                  alt="Porsche 911 Turbo S"
                  className="rounded-lg"
                />
                <h3 className="mt-2 text-lg font-semibold">Porsche 911 Turbo S</h3>
                <p className="text-muted-foreground">Top Speed: 205 mph</p>
              </div>
              <div className="flex flex-col items-center">
                <img src="/placeholder.svg" width="300" height="200" alt="McLaren 720S" className="rounded-lg" />
                <h3 className="mt-2 text-lg font-semibold">McLaren 720S</h3>
                <p className="text-muted-foreground">Top Speed: 212 mph</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tighter">The Rental Process</h2>
            <ol className="mt-4 space-y-4 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckIcon className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">Browse Our Fleet</h3>
                  <p>Explore our selection of the latest and greatest luxury vehicles.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">Reserve Your Ride</h3>
                  <p>Secure your rental with a few simple clicks or a quick phone call.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">Pick Up and Enjoy</h3>
                  <p>Collect your vehicle and embark on an unforgettable driving experience.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter">Pricing</h2>
            <p className="mt-4 text-muted-foreground">
              Our rental rates are designed to provide exceptional value and flexibility. Whether you're looking for a
              weekend getaway or a longer-term rental, we have options to suit your needs.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-background p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Daily Rental</h3>
                <p className="text-4xl font-bold">$499</p>
                <p className="text-muted-foreground">per day</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Weekly Rental</h3>
                <p className="text-4xl font-bold">$2,999</p>
                <p className="text-muted-foreground">per week</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tighter">What Our Customers Say</h2>
            <div className="mt-4 space-y-4">
              <div className="bg-background p-4 rounded-lg shadow">
                <div className="flex items-center gap-2">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">John Doe</h3>
                    <p className="text-muted-foreground">Los Angeles, CA</p>
                  </div>
                </div>
                <p className="mt-4">
                  "Renting from Luxury Rentals was an absolute dream. The car was in pristine condition and the
                  customer service was top-notch. I can't wait to book my next rental!"
                </p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow">
                <div className="flex items-center gap-2">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">Jane Smith</h3>
                    <p className="text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
                <p className="mt-4">
                  "I've rented from Luxury Rentals multiple times and they never disappoint. The cars are always in
                  pristine condition and the team is incredibly helpful and responsive."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter">Get in Touch</h2>
            <form className="mt-4 grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea id="message" rows={5} placeholder="How can we help you?" />
              </div>
              <Button type="submit" className="justify-self-start">
                Submit
              </Button>
            </form>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tighter">Contact Info</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-6 h-6" />
                <a href="#">(123) 456-7890</a>
              </div>
              <div className="flex items-center gap-2">
                <MailOpenIcon className="w-6 h-6" />
                <a href="#">info@luxuryrentals.com</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-6 h-6" />
                <p>123 Main St, Anytown USA</p>
              </div>
            </div>
            <div className="mt-8">
              <div className="rounded-lg" />
            </div>
            
          </div>
        </div>
      </div>
    </section>
  </div>
  )
}

export default AboutUs




// export default function Component() {
//   return (
//     <div className="flex flex-col min-h-[100dvh]">
//       <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[url('/hero-image.jpg')] bg-cover bg-center">
//         <div className="container px-4 md:px-6 flex flex-col items-center justify-center text-center text-primary-foreground">
//           <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
//             Experience the Thrill of Luxury
//           </h1>
//           <p className="max-w-[700px] text-xl md:text-2xl mt-4">
//             Discover the ultimate in automotive indulgence with our premium vehicle rental service.
//           </p>
//         </div>
//       </section>
//       <section className="w-full py-12 md:py-24 lg:py-32">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
//             <div>
//               <h2 className="text-3xl font-bold tracking-tighter">Our Mission</h2>
//               <p className="mt-4 text-muted-foreground">
//                 At Luxury Rentals, our mission is to provide our customers with an unparalleled driving experience. We
//                 believe that the thrill of the open road should be accessible to everyone, and we strive to make that
//                 dream a reality.
//               </p>
//             </div>
//             <div>
//               <h2 className="text-3xl font-bold tracking-tighter">Our Values</h2>
//               <ul className="mt-4 space-y-2 text-muted-foreground">
//                 <li className="flex items-center gap-2">
//                   <CheckIcon className="w-5 h-5 text-primary" />
//                   Exceptional Customer Service
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckIcon className="w-5 h-5 text-primary" />
//                   Commitment to Quality
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckIcon className="w-5 h-5 text-primary" />
//                   Passion for the Automotive Industry
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
//             <div>
//               <h2 className="text-3xl font-bold tracking-tighter">Our History</h2>
//               <p className="mt-4 text-muted-foreground">
//                 Luxury Rentals was founded in 2010 with the goal of providing a premium rental experience for those
//                 seeking the thrill of driving the world's most exclusive vehicles. Over the years, we have grown to
//                 become one of the leading providers of luxury car rentals, with a fleet of the latest and greatest
//                 models from the top automotive brands.
//               </p>
//             </div>
//             <div>
//               <h2 className="text-3xl font-bold tracking-tighter">Meet the Team</h2>
//               <div className="mt-4 grid grid-cols-2 gap-6">
//                 <div className="flex flex-col items-center">
//                   <Avatar className="w-20 h-20 border">
//                     <AvatarImage src="/placeholder-user.jpg" />
//                     <AvatarFallback>JD</AvatarFallback>
//                   </Avatar>
//                   <h3 className="mt-2 text-lg font-semibold">John Doe</h3>
//                   <p className="text-muted-foreground">CEO</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <Avatar className="w-20 h-20 border">
//                     <AvatarImage src="/placeholder-user.jpg" />
//                     <AvatarFallback>JS</AvatarFallback>
//                   </Avatar>
//                   <h3 className="mt-2 text-lg font-semibold">Jane Smith</h3>
//                   <p className="text-muted-foreground">COO</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <Avatar className="w-20 h-20 border">
//                     <AvatarImage src="/placeholder-user.jpg" />
//                     <AvatarFallback>MJ</AvatarFallback>
//                   </Avatar>
//                   <h3 className="mt-2 text-lg font-semibold">Michael Johnson</h3>
//                   <p className="text-muted-foreground">CTO</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <Avatar className="w-20 h-20 border">
//                     <AvatarImage src="/placeholder-user.jpg" />
//                     <AvatarFallback>ED</AvatarFallback>
//                   </Avatar>
//                   <h3 className="mt-2 text-lg font-semibold">Emily Davis</h3>
//                   <p className="text-muted-foreground">Marketing Director</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="w-full py-12 md:py-24 lg:py-32">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
//             <div>
//               <h2 className="text-3xl font-bold tracking-tighter">Our Fleet</h2>
//               <div className="mt-4 grid grid-cols-2 gap-4">
//                 <div className="flex flex-col items-center">
//                   <img
//                     src="/placeholder.svg"
//                     width="300"
//                     height="200"
//                     alt="Lamborghini Aventador"
//                     className="rounded-lg"
//                   />
//                   <h3 className="mt-2 text-lg font-semibold">Lamborghini Aventador</h3>
//                   <p className="text-muted-foreground">Top Speed: 217 mph</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <img src="/placeholder.svg" width="300" height="200" alt="Ferrari 488 GTB" className="rounded-lg" />
//                   <h3 className="mt-2 text-lg font-semibold">Ferrari 488 GTB</h3>
//                   <p className="text-muted-foreground">Top Speed: 205 mph</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <img
//                     src="/placeholder.svg"
//                     width="300"
//                     height="200"
//                     alt="Porsche 911 Turbo S"
//                     className="rounded-lg"
//                   />
//                   <h3 className="mt-2 text-lg font-semibold">Porsche 911 Turbo S</h3>
//                   <p className="text-muted-foreground">Top Speed: 205 mph</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <img src="/placeholder.svg" width="300" height="200" alt="McLaren 720S" className="rounded-lg" />
//                   <h3 className="mt-2 text-lg font-semibold">McLaren 720S</h3>
//                   <p className="text-muted-foreground">Top Speed: 212 mph</p>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <h2 className="text-3xl font-bold tracking-tighter">The Rental Process</h2>
//               <ol className="mt-4 space-y-4 text-muted-foreground">
//                 <li className="flex items-start gap-2">
//                   <CheckIcon className="w-5 h-5 text-primary" />
//                   <div>
//                     <h3 className="text-lg font-semibold">Browse Our Fleet</h3>
//                     <p>Explore our selection of the latest and greatest luxury vehicles.</p>
//                   </div>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <CheckIcon className="w-5 h-5 text-primary" />
//                   <div>
//                     <h3 className="text-lg font-semibold">Reserve Your Ride</h3>
//                     <p>Secure your rental with a few simple clicks or a quick phone call.</p>
//                   </div>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <CheckIcon className="w-5 h-5 text-primary" />
//                   <div>
//                     <h3 className="text-lg font-semibold">Pick Up and Enjoy</h3>
//                     <p>Collect your vehicle and embark on an unforgettable driving experience.</p>
//                   </div>
//                 </li>
//               </ol>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
//             <div>
//               <h2 className="text-3xl font-bold tracking-tighter">Pricing</h2>
//               <p className="mt-4 text-muted-foreground">
//                 Our rental rates are designed to provide exceptional value and flexibility. Whether you're looking for a
//                 weekend getaway or a longer-term rental, we have options to suit your needs.
//               </p>
//               <div className="mt-6 grid grid-cols-2 gap-4">
//                 <div className="bg-background p-4 rounded-lg shadow">
//                   <h3 className="text-lg font-semibold">Daily Rental</h3>
//                   <p className="text-4xl font-bold">$499</p>
//                   <p className="text-muted-foreground">per day</p>
//                 </div>
//                 <div className="bg-background p-4 rounded-lg shadow">
//                   <h3 className="text-lg font-semibold">Weekly Rental</h3>
//                   <p className="text-4xl font-bold">$2,999</p>
//                   <p className="text-muted-foreground">per week</p>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <h2 className="text-3xl font-bold tracking-tighter">What Our Customers Say</h2>
//               <div className="mt-4 space-y-4">
//                 <div className="bg-background p-4 rounded-lg shadow">
//                   <div className="flex items-center gap-2">
//                     <Avatar className="w-10 h-10 border">
//                       <AvatarImage src="/placeholder-user.jpg" />
//                       <AvatarFallback>JD</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <h3 className="text-lg font-semibold">John Doe</h3>
//                       <p className="text-muted-foreground">Los Angeles, CA</p>
//                     </div>
//                   </div>
//                   <p className="mt-4">
//                     "Renting from Luxury Rentals was an absolute dream. The car was in pristine condition and the
//                     customer service was top-notch. I can't wait to book my next rental!"
//                   </p>
//                 </div>
//                 <div className="bg-background p-4 rounded-lg shadow">
//                   <div className="flex items-center gap-2">
//                     <Avatar className="w-10 h-10 border">
//                       <AvatarImage src="/placeholder-user.jpg" />
//                       <AvatarFallback>JS</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <h3 className="text-lg font-semibold">Jane Smith</h3>
//                       <p className="text-muted-foreground">San Francisco, CA</p>
//                     </div>
//                   </div>
//                   <p className="mt-4">
//                     "I've rented from Luxury Rentals multiple times and they never disappoint. The cars are always in
//                     pristine condition and the team is incredibly helpful and responsive."
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="w-full py-12 md:py-24 lg:py-32">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
//             <div>
//               <h2 className="text-3xl font-bold tracking-tighter">Get in Touch</h2>
//               <form className="mt-4 grid gap-4">
//                 <div className="grid gap-2">
//                   <label htmlFor="name" className="text-sm font-medium">
//                     Name
//                   </label>
//                   <Input id="name" placeholder="John Doe" />
//                 </div>
//                 <div className="grid gap-2">
//                   <label htmlFor="email" className="text-sm font-medium">
//                     Email
//                   </label>
//                   <Input id="email" type="email" placeholder="john@example.com" />
//                 </div>
//                 <div className="grid gap-2">
//                   <label htmlFor="message" className="text-sm font-medium">
//                     Message
//                   </label>
//                   <Textarea id="message" rows={5} placeholder="How can we help you?" />
//                 </div>
//                 <Button type="submit" className="justify-self-start">
//                   Submit
//                 </Button>
//               </form>
//             </div>
//             <div>
//               <h2 className="text-3xl font-bold tracking-tighter">Contact Info</h2>
//               <div className="mt-4 space-y-4 text-muted-foreground">
//                 <div className="flex items-center gap-2">
//                   <PhoneIcon className="w-6 h-6" />
//                   <a href="#">(123) 456-7890</a>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <MailOpenIcon className="w-6 h-6" />
//                   <a href="#">info@luxuryrentals.com</a>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <MapPinIcon className="w-6 h-6" />
//                   <p>123 Main St, Anytown USA</p>
//                 </div>
//               </div>
//               <div className="mt-8">
//                 <div className="rounded-lg" />
//               </div>
//               <div className="mt-4 flex gap-4">
//                 <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
//                   <TwitterIcon className />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }
