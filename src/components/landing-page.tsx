'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, ChevronDown, Facebook, Twitter, Instagram, Linkedin, Menu, X } from 'lucide-react';
import { motion, useAnimation, useInView as useFramerInView, useScroll, useTransform } from 'framer-motion';
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import GallerySection from "@/components/sections/GallerySection";
import BookAppointmentSection from "@/components/sections/BookAppointmentSection";
import { Bebas_Neue, Merriweather_Sans  } from 'next/font/google';

const bebasNeue = Bebas_Neue({
  weight: "400", // Specify the weight if necessary
  subsets: ["latin"],
});

const merriweatherSans = Merriweather_Sans({
  weight: "400", // You can specify other weights if needed
  subsets: ["latin"],
});

export function LandingPageComponent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const headerTextOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const headerTextY = useTransform(scrollY, [0, 100], ['50%', '0%']);
  const headerTextX = useTransform(scrollY, [0, 100], ['50%', '0%']);
  const headerTextScale = useTransform(scrollY, [0, 100], [0.8, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const heroChildVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const AnimatedSection = ({ children, className, ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => {
    const controls = useAnimation();
    const ref = useRef(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const inView = useFramerInView(ref, { threshold: 0.1 });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    return (
        <motion.section
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={sectionVariants}
            className={className}
            {...props}
        >
          {children}
        </motion.section>
    );
  };


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
                  className= {`${bebasNeue.className} text-2xl font-bold text-[#c95658]`}
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
                className="z-0 opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 relative z-20">
            <motion.div
                variants={heroVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto text-center"
            >
              <motion.h1 variants={heroChildVariants} className={`${bebasNeue.className} text-6xl md:text-[150px] font-[700px] mb-6 leading-tight`}>
                <span className="text-[#c95658]">COLLOSUS</span> <br />
                <span className="text-[#c95658]">AUTO COLLISION</span>
              </motion.h1>
              <motion.p variants={heroChildVariants} className={`${merriweatherSans.className} text-xl mb-8 text-white`}>
                Elevating automotive excellence through meticulous craftsmanship and cutting-edge technology.
              </motion.p>
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
          <AboutSection />
        </AnimatedSection>

        {/* Services Section */}
        <AnimatedSection id="services" className="py-20 bg-[#343438]">
          <ServicesSection />
        </AnimatedSection>

        {/* Gallery Section */}
        <AnimatedSection id="gallery" className="py-20 bg-[#000000]">
          <GallerySection />
        </AnimatedSection>

        {/* Book Appointment Section */}
        <AnimatedSection id="book" className="py-20 bg-[#4d4d4f]">
          <BookAppointmentSection />
        </AnimatedSection>

        {/* Working Hours Section */}
        <AnimatedSection id="working-hours" className="py-20 bg-[#343438]">
          <div className="container mx-auto px-4">
            <h2 className={`${bebasNeue.className} text-3xl font-bold mb-4`}>Working Hours</h2>
            <ul className={`${merriweatherSans.className} text-lg`}>
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 10:00 AM - 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
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
