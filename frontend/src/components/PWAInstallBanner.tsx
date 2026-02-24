import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already dismissed this session
    const dismissed = sessionStorage.getItem('pwa-banner-dismissed');
    if (dismissed) return;

    // Check if already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Also show banner on iOS Safari (which doesn't fire beforeinstallprompt)
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator as { standalone?: boolean }).standalone;
    if (isIOS && !isInStandaloneMode) {
      setIsVisible(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      setIsInstalling(true);
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setIsVisible(false);
          setIsInstalled(true);
        }
      } catch {
        // ignore
      } finally {
        setIsInstalling(false);
        setDeferredPrompt(null);
      }
    } else {
      // iOS or fallback: show instructions
      alert('اس ایپ کو install کرنے کے لیے:\n\niPhone/iPad: Share بٹن دبائیں → "Add to Home Screen" چنیں\n\nAndroid: Browser menu کھولیں → "Add to Home Screen" یا "Install App" چنیں');
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('pwa-banner-dismissed', 'true');
  };

  if (!isVisible || isInstalled) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] w-full"
      style={{
        background: 'linear-gradient(90deg, #0a0a0a 0%, #1a0505 40%, #1a0a00 60%, #0a0a0a 100%)',
        borderBottom: '2px solid #ef4444',
        boxShadow: '0 0 20px rgba(239,68,68,0.4), 0 4px 24px rgba(0,0,0,0.8)',
      }}
    >
      {/* Animated top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{
          background: 'linear-gradient(90deg, transparent, #ef4444, #f59e0b, #ef4444, transparent)',
          animation: 'shimmer 2s linear infinite',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Left: Icon + Text */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
              boxShadow: '0 0 12px rgba(239,68,68,0.6)',
            }}
          >
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p
              className="font-bold text-sm sm:text-base leading-tight"
              style={{ color: '#f59e0b', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}
            >
              📲 APP DOWNLOAD KAREIN — BILKUL FREE!
            </p>
            <p className="text-xs sm:text-sm leading-tight" style={{ color: '#d1d5db' }}>
              Legend X Esports app install karein aur website ke baghair seedha chalayein
            </p>
          </div>
        </div>

        {/* Right: Install Button + Dismiss */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleInstall}
            disabled={isInstalling}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 active:scale-95 disabled:opacity-70"
            style={{
              background: isInstalling
                ? 'linear-gradient(135deg, #7f1d1d, #78350f)'
                : 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: '#ffffff',
              boxShadow: isInstalling ? 'none' : '0 0 16px rgba(239,68,68,0.5)',
              fontFamily: 'Rajdhani, sans-serif',
              letterSpacing: '0.05em',
              border: '1px solid rgba(239,68,68,0.5)',
            }}
          >
            {isInstalling ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="hidden sm:inline">Installing...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download App</span>
              </>
            )}
          </button>

          <button
            onClick={handleDismiss}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-white/10 active:scale-95"
            style={{ color: '#9ca3af' }}
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}
