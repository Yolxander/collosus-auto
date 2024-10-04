'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, ChevronDown, Facebook, Twitter, Instagram, Linkedin, Wrench, PaintBucket, Gauge, Menu, X } from 'lucide-react';
import { motion, useAnimation, useInView as useFramerInView, useScroll, useTransform } from 'framer-motion';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function LandingPageComponent() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const headerTextOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const headerTextY = useTransform(scrollY, [0, 100], ['50%', '0%'])
  const headerTextX = useTransform(scrollY, [0, 100], ['50%', '0%'])
  const headerTextScale = useTransform(scrollY, [0, 100], [0.8, 1])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const heroVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }

  const heroChildVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const AnimatedSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const controls = useAnimation()
    const ref = useRef(null)
    const inView = useFramerInView(ref, {
      // triggerOnce: true,
      // threshold: 0.1,
    })

    useEffect(() => {
      if (inView) {
        controls.start("visible")
      }
    }, [controls, inView])

    return (
        <motion.section
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={sectionVariants}
            className={className}
        >
          {children}
        </motion.section>
    )
  }

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ]

  return (
      <div className="min-h-screen bg-[#343438] text-white">
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#000000]/80 backdrop-blur-md' : 'bg-transparent'}`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <motion.div
                  ref={headerRef}
                  style={{
                    opacity: headerTextOpacity,
                    y: headerTextY,
                    x: headerTextX,
                    scale: headerTextScale,
                  }}
                  className="text-2xl font-bold text-[#c95658]"
              >
                COLLOSUS AUTO COLLISION
              </motion.div>
              <div className="hidden md:flex space-x-8 ml-auto">
                {['HOME', 'ABOUT', 'SERVICES', 'GALLERY', 'BOOK'].map((item) => (
                    <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm hover:text-[#c95658] transition-colors">
                      {item}
                    </Link>
                ))}
              </div>
              <button className="md:hidden ml-auto" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="fixed inset-0 bg-[#000000]/95 z-40 md:hidden">
              <div className="flex flex-col items-center justify-center h-full">
                {['HOME', 'ABOUT', 'SERVICES', 'GALLERY', 'BOOK'].map((item) => (
                    <Link
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-2xl py-4 hover:text-[#c95658] transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                ))}
              </div>
            </div>
        )}

        {/* Hero Section */}
        <section id="home" className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-[#000000]/50 to-[#000000] z-10">
            <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2017-08-31-077TbxBzgnqscQBgs6fxrFzcSyF19k.webp"
                alt="Collosus Auto Collision Shop"
                layout="fill"
                objectFit="cover"
                className="z-0 opacity-40"
            />
          </div>
          <div className="container mx-auto px-4 relative z-20">
            <motion.div
                variants={heroVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto text-center"
            >
              <motion.h1 variants={heroChildVariants} className="text-6xl md:text-8xl font-bold mb-4 leading-tight">
                <span className="text-[#c95658]">COLLOSUS</span> <br />
                <span className="text-white">AUTO COLLISION</span>
              </motion.h1>
              <motion.p variants={heroChildVariants} className="text-xl mb-8 text-white">Elevating automotive excellence through meticulous craftsmanship and cutting-edge technology.</motion.p>
            </motion.div>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
            <ChevronDown className="w-10 h-10 animate-bounce text-[#c95658]" />
          </div>
          <div className="absolute bottom-8 right-8 bg-[#c95658] rounded-full p-4 z-20 hover:bg-[#4d4d4f] transition-colors group">
            <Phone className="text-white" size={24} />
          </div>
        </section>

        {/* About Section */}
        <AnimatedSection id="about" className="py-20 bg-[#4d4d4f]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center text-[#c95658]">About Us</h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2017-08-31%20(4)-V8YsfnDZcpCHJGIOeN2iX2bEeDIWNI.webp"
                    alt="Collosus Auto Collision Shop Interior"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-xl"
                />
              </div>
              <div className="md:w-1/2 md:pl-12">
                <p className="text-lg mb-6">
                  At Collosus Auto Collision, we have been restoring vehicles to their former glory for over two decades. Our team of skilled technicians combines traditional craftsmanship with cutting-edge technology to deliver unparalleled results.
                </p>
                <p className="text-lg">
                  From minor dings to major repairs, we treat every vehicle as if it is our own. Trust us to bring your car back to its pristine condition, ensuring both aesthetic and structural integrity.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Services Section */}
        <AnimatedSection id="services" className="py-20 bg-[#343438]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center text-[#c95658]">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[{ title: 'Collision Repair', icon: <Wrench className="w-8 h-8 text-[#c95658]" /> },
                { title: 'Painting', icon: <PaintBucket className="w-8 h-8 text-[#c95658]" /> },
                { title: 'Detailing', icon: <Gauge className="w-8 h-8 text-[#c95658]" /> }].map((service, index) => (
                  <div key={index} className="p-6 bg-[#4d4d4f] rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-4">
                      {service.icon}
                      <h3 className="text-xl font-bold ml-4">{service.title}</h3>
                    </div>
                    <p>
                      Our dedicated team provides expert services to restore your vehicle is appearance and safety.
                    </p>
                  </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

      {/* Gallery Section */}
      <AnimatedSection id="gallery" className="py-20 bg-[#000000]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#c95658]">Our Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2022-03-18-TWnipBrRwCIfDLSWTcv8ebywJFdJFw.webp",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2017-08-31%20(2)-UlGpTFOzZS5NP5z6MPRuJW7wZxMFju.webp",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2017-08-31%20(1)-csnrcD5UpWlnbkRyx7dbVkANrRyIwM.webp",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-10-03%20at%2012.03.16%E2%80%AFPM-bywbOtGWiLWMAEPRgNPQYfj7AyOTed.png",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2017-08-31%20(3)-r8fY5JvJ3iroIoGadlOZdR8g6ASS6u.webp",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2017-10-18-KQ6z7xZ5CcDRDEBp39XHMTBvvrNIaZ.webp"
            ].map((src, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg">
                <Image
                  src={src}
                  alt={`Gallery Image ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-auto transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button className="bg-[#c95658] text-white hover:bg-[#4d4d4f]">
              View Full Gallery
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Book Appointment Section */}
      <AnimatedSection id="book" className="py-20 bg-[#4d4d4f]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#c95658]">Book an Appointment</h2>
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h3 className="text-2xl font-semibold mb-4 text-[#c95658]">Select A Date and Time</h3>
              <div className="bg-[#343438] p-4 rounded-lg">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedDate(date)
                      // Prevent page reload and jumping
                      window.history.pushState(null, '', `#book?date=${date.toISOString().split('T')[0]}`)
                    }
                  }}
                  className="text-white"
                  classNames={{
                    months: "flex flex-wrap justify-center",
                    month: "m-2",
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "text-sm font-medium",
                    nav: "space-x-1 flex items-center",
                    nav_button: cn(
                      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                      "text-white hover:bg-[#c95658] hover:text-white rounded-full transition-colors"
                    ),
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell:
                      "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: cn(
                      "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                      "hover:bg-[#c95658] hover:text-white rounded-full transition-colors"
                    ),
                    day_selected:
                      "bg-[#c95658] text-white hover:bg-[#c95658] hover:text-white focus:bg-[#c95658] focus:text-white",
                    day_today: "bg-[#4d4d4f] text-white",
                    day_outside: "text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_range_middle:
                      "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                    ...{
                      caption: "text-[#c95658] font-bold",
                      head_cell: "text-[#c95658]",
                    },
                  }}
                />
              </div>
              <div className="mt-4 bg-[#343438] p-4 rounded-lg">
                <h4 className="text-xl font-semibold mb-2 text-[#c95658]">Select A Time</h4>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={cn(
                        "text-white border-[#c95658]",
                        selectedTime === time ? 'bg-[#c95658]' : 'bg-[#4d4d4f] hover:bg-[#c95658] hover:text-white'
                      )}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
              {selectedDate && selectedTime && (
                <div className="mt-4 p-4 bg-[#c95658] text-white rounded-lg">
                  <p className="font-semibold">Selected Appointment:</p>
                  <p>{format(selectedDate, 'PPP')} at {selectedTime}</p>
                </div>
              )}
            </div>
            <div className="md:w-1/2 md:pl-8">
              <form className="space-y-4 bg-[#343438] p-6 rounded-lg">
                <input type="text" placeholder="Name *" className="w-full p-2 rounded-md bg-[#4d4d4f] text-white" required />
                <input type="text" placeholder="Vehicle *" className="w-full p-2 rounded-md bg-[#4d4d4f] text-white" required />
                <input type="email" placeholder="Email" className="w-full p-2 rounded-md bg-[#4d4d4f] text-white" />
                <input type="tel" placeholder="Phone *" className="w-full p-2 rounded-md bg-[#4d4d4f] text-white" required />
                <div className="flex items-center">
                  <input type="checkbox" id="allowText" className="mr-2" />
                  <label htmlFor="allowText" className="text-white">Allow text messages (cell phone)</label>
                </div>
                <input type="text" placeholder="Insurance Co." className="w-full p-2 rounded-md bg-[#4d4d4f] text-white" />
                <input type="text" placeholder="Policy #" className="w-full p-2 rounded-md bg-[#4d4d4f] text-white" />
                <input type="text" placeholder="Claim #" className="w-full p-2 rounded-md bg-[#4d4d4f] text-white" />
                <textarea placeholder="Comment" rows={4} className="w-full p-2 rounded-md bg-[#4d4d4f] text-white"></textarea>
                <Button type="submit" className="w-full bg-[#c95658] text-white hover:bg-[#343438]">
                  Book Appointment
                </Button>
              </form>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Working Hours Section */}
      <AnimatedSection id="working-hours" className="py-20 bg-[#343438]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#c95658]">Working Hours</h2>
          <div className="max-w-md mx-auto bg-[#4d4d4f] p-6 rounded-lg shadow-lg">
            <ul className="space-y-2">
              <li className="flex justify-between"><span>Monday - Friday:</span><span>8:00 AM - 6:00 PM</span></li>
              <li className="flex justify-between"><span>Saturday:</span><span>9:00 AM - 4:00 PM</span></li>
              <li className="flex justify-between"><span>Sunday:</span><span>Closed</span></li>
            </ul>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-[#000000] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[#c95658]">Collosus Auto Collision</h3>
              <p>Elevating automotive excellence through meticulous craftsmanship and cutting-edge technology.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#c95658]">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'About', 'Services', 'Gallery', 'Book'].map((item) => (
                  <li key={item}>
                    <Link href={`#${item.toLowerCase()}`} className="hover:text-[#c95658] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#c95658]">Contact Info</h4>
              <address className="not-italic">
                <p>123 Auto Repair Lane</p>
                <p>Carville, ST 12345</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@collosusautocollision.com</p>
              </address>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#c95658]">Follow Us</h4>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a key={index} href="#" className="hover:text-[#c95658] transition-colors">
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-[#4d4d4f] mt-8 pt-8 text-center">
            <p>© 2024 Collosus Auto Collision. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}