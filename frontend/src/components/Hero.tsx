'use client';

/**
 * Hero component with full viewport height, gradient background,
 * fade-in animation, centered headline, and CTA buttons.
 */
import Link from 'next/link';
import { Button } from './ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up">
            Manage Your Tasks
            <br />
            <span className="text-primary-200">With Ease</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
            A modern, multi-user todo application with secure authentication
            and persistent storage. Built for productivity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link href="/signup">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                Get Started Free
              </Button>
            </Link>

            <Link href="/signin">
              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white border-2 border-white hover:bg-white hover:text-primary-600 transition-all"
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-250">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure Authentication</h3>
              <p className="text-primary-100">JWT-based authentication keeps your data safe and private</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-250">
              <div className="text-4xl mb-4">☁️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Cloud Storage</h3>
              <p className="text-primary-100">Your tasks are stored securely in the cloud, accessible anywhere</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-250">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-white mb-2">Responsive Design</h3>
              <p className="text-primary-100">Beautiful on desktop, tablet, and mobile devices</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white opacity-50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
