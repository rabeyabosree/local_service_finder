import React from 'react'
import Navbar from './../../components/comon/Navbar';
import Hero from './../../components/home/Hero';
import PopulerCetagory from './../populerService/PopulerCetagory';
import Services from './../services/Services';
import FaqPage from './../faq/FaqPage';
import Testimonials from './../testimonals/Testimonals';
import ContactPage from './../contact/ContactPage';
import Footer from './../../components/comon/Footer';
import PopulerServics from './../populerService/PopulerServics';

function Home() {
  return (
    <div>
        <Navbar />
        <Hero />
        <PopulerCetagory />
        <PopulerServics />
        {/* <Services /> */}
        <FaqPage />
        <Testimonials />
        <ContactPage />
        <Footer />

    </div>
  )
}

export default Home