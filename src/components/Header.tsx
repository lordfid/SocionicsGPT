import { Compass } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: 'test' | 'atlas' | 'consult') => void;
  currentView: string;
}

export default function Header({ onNavigate, currentView }: HeaderProps) {
  return (
    <header className="border-b border-[rgba(191,152,114,0.2)] bg-neutral-50/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Editorial Brand Name */}
        <div className="flex items-center gap-3">
          <Compass className="w-6 h-6 text-brand-accent animate-pulse" />
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-neutral-900 flex items-center gap-2">
              SOCIONICS <span className="font-sans font-light text-brand-accent text-lg">ATLAS</span>
            </h1>
            <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Model A Psychometric Diagnostic Engine v3.0.0</p>
          </div>
        </div>

        {/* High-end minimalist navigation */}
        <nav className="flex items-center gap-1 bg-neutral-100 p-1 rounded-full border border-neutral-200">
          <button
            onClick={() => onNavigate('test')}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
              currentView === 'test'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/50'
            }`}
          >
            Diagnostics
          </button>
          <button
            onClick={() => onNavigate('atlas')}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
              currentView === 'atlas'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/50'
            }`}
          >
            Intertype Atlas
          </button>
          <button
            onClick={() => onNavigate('consult')}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
              currentView === 'consult'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/50'
            }`}
          >
            ENTJ Consultant
          </button>
        </nav>
      </div>
    </header>
  );
}
