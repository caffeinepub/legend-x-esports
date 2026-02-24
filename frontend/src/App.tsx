import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <div className="min-h-screen bg-esports-dark text-foreground">
      <Navbar />
      <LandingPage />
    </div>
  );
}
