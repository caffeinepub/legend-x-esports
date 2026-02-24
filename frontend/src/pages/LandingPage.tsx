import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import RosterSection from '../components/RosterSection';
import NewsSection from '../components/NewsSection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-esports-dark">
      <HeroSection />
      <AboutSection />
      <RosterSection />
      <NewsSection />
      <Footer />
    </main>
  );
}
