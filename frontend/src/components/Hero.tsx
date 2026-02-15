'use client';
/**
 * Hero component with full viewport height, gradient background,
 * fade-in animation, centered headline, and CTA buttons.
 */
import Link from 'next/link';
import { Button } from './ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900">
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]"></div>
      </div>

      {/* Optional subtle radial glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="space-y-8 md:space-y-12">
          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-none animate-fade-in-down">
            Manage Your Tasks
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
              With Ease
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl md:text-3xl text-blue-100/90 max-w-4xl mx-auto font-light animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            Modern multi-user todo app with secure auth, real-time sync and clean interface.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in-up" 
            style={{ animationDelay: '300ms' }}
          >
            <Link href="/signup">
              <Button
                variant="default"
                size="xl"
                className="min-w-[220px] bg-white text-indigo-900 hover:bg-gray-100 hover:text-indigo-950 font-semibold text-lg shadow-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Get Started Free
              </Button>
            </Link>
            <Link href="/signin">
              <Button
                variant="outline"
                size="xl"
                className="min-w-[220px] border-2 border-white/70 text-white hover:bg-white/10 hover:border-white font-semibold text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Features - Glassmorphism style */}
          <div 
            className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 animate-fade-in-up" 
            style={{ animationDelay: '450ms' }}
          >
            <div className="group bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-8 hover:bg-white/15 hover:border-white/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="text-5xl mb-5">🔒</div>
              <h3 className="text-2xl font-bold text-white mb-3">Secure Authentication</h3>
              <p className="text-blue-100/80 text-lg leading-relaxed">
                JWT-powered auth keeps your data private and protected.
              </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-8 hover:bg-white/15 hover:border-white/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="text-5xl mb-5">☁️</div>
              <h3 className="text-2xl font-bold text-white mb-3">Cloud Sync</h3>
              <p className="text-blue-100/80 text-lg leading-relaxed">
                Access your tasks from anywhere — always in sync.
              </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-8 hover:bg-white/15 hover:border-white/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="text-5xl mb-5">📱</div>
              <h3 className="text-2xl font-bold text-white mb-3">Fully Responsive</h3>
              <p className="text-blue-100/80 text-lg leading-relaxed">
                Looks stunning on mobile, tablet, and desktop.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - more subtle */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow opacity-70">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
