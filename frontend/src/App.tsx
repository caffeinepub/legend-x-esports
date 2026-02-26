import PWAInstallBanner from "./components/PWAInstallBanner";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import AdminPanel from "./components/AdminPanel";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PWAInstallBanner />
      <Navbar />
      <LandingPage />
      <AdminPanel />
    </div>
  );
}

export default App;
