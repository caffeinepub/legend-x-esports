import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import PWAInstallBanner from './components/PWAInstallBanner';

export default function App() {
  return (
    <div className="min-h-screen bg-esports-dark text-foreground">
      <PWAInstallBanner />
      <Navbar />
      <LandingPage />
    </div>
  );
}
