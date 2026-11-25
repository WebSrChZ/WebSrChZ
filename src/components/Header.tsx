import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PROFILE } from '../data/profileData';

interface HeaderProps {
  onOpenInquiry: () => void;
}

const NAV_ITEMS = [
  { label: 'Identity', href: '#identity' },
  { label: 'Practices', href: '#practices' },
  { label: 'Works', href: '#works' },
  { label: 'Trajectory', href: '#trajectory' },
];

export function Header({ onOpenInquiry }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#080B12]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-serif text-xl font-semibold tracking-tight text-[#F1F4F9] hover:text-[#C9A24B] transition-colors whitespace-nowrap shrink-0"
        >
          {PROFILE.brand}
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#A1ACBF]"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-1 hover:text-[#F1F4F9] transition-colors border-b border-transparent hover:border-[#C9A24B]/70 whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenInquiry}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-[#080B12] bg-[#C9A24B] hover:bg-[#D8B562] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Start Inquiry
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/[0.1] text-[#ECEFF4] hover:border-[#C9A24B]/60 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#0B0F19] px-6 py-5 space-y-4">
          <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-base font-medium text-[#CBD4E3] hover:text-[#C9A24B] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenInquiry();
            }}
            className="w-full py-3 px-4 text-sm font-semibold text-[#080B12] bg-[#C9A24B] hover:bg-[#D8B562] rounded-lg transition-colors cursor-pointer"
          >
            Start Inquiry
          </button>
        </div>
      )}
    </header>
  );
}
