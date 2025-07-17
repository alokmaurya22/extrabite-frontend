import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav2 from '../components/Header/Nav2';
import Footer from '../components/Footer/Footer';
import HeroSection from '../components/Section/HeroSection'
import HelpSection2 from '../components/Section/HelpSection2'

function Home2() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/signin'); // 🔐 Protect route
    }
  }, [navigate]);

  return (
    <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col">
      <Nav2 />
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-white text-2xl sm:text-3xl font-semibold mt-4">
          <br />Welcome to Extra Bite!
        </h1>
      </div>
      <HeroSection />
      <HelpSection2 />
      <Footer />
    </div>
  );
}

export default Home2;
