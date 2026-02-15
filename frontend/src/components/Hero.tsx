'use client';
/**
 * Hero component with full viewport height, gradient background,
 * fade-in animation, centered headline, and CTA buttons.
 */
import Link from 'next/link';
import { Button } from './ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 dark:from-blue-800 dark:via-indigo-900 dark:to-purple-900">
      {/* Animated subtle background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center bg-repeat [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="animate-fade-in-up">
          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-tight mb-8">
            Manage Your Tasks
            <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">With Ease</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl md:text-3xl text-blue-100/90 dark:text-indigo-100/90 mb-10 max-w-4xl mx-auto leading-relaxed font-light">
            A modern, multi-user todo application with secure authentication
            and persistent storage. Built for real productivity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
            <Link href="/signup">
              <Button
                variant="default"
                size="lg"
                className="min-w-[220px] bg-white text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 shadow-2xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg font-semibold px-10 py-7 rounded-xl"
              >
                Get Started Free
              </Button>
            </Link>
            <Link href="/signin">
              <Button
                variant="outline"
                size="lg"
                className="min-w-[220px] border-2 border-white/80 text-white hover:bg-white/10 hover:border-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold px-10 py-7 rounded-xl backdrop-blur-sm"
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Features - Glassmorphism style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-2xl">
              <div className="text-5xl mb-6">🔒</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Secure Authentication</h3>
              <p className="text-blue-100/80 dark:text-indigo-100/80 text-base leading-relaxed">
                JWT-based authentication keeps your data safe and completely private
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-2xl">
              <div className="text-5xl mb-6">☁️</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Cloud Storage</h3>
              <p className="text-blue-100/80 dark:text-indigo-100/80 text-base leading-relaxed">
                Your tasks stay synced and accessible from anywhere, anytime
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-2xl">
              <div className="text-5xl mb-6">📱</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Fully Responsive</h3>
              <p className="text-blue-100/80 dark:text-indigo-100/80 text-base leading-relaxed">
                Looks stunning on desktop, tablet, and every mobile device
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-8 h-8 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
