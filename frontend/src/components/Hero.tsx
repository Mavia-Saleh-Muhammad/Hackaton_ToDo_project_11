'use client';
/**
 * Hero component with full viewport height, gradient background,
 * fade-in animation, centered headline, and CTA buttons.
 */
import Link from 'next/link';
import { Button } from './ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.635 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.334 0L10.2 6.485 11.616 7.9l7.9-7.9h-3.182zM22.627 0L32.8 10.172l-1.414 1.415L19.8 0h2.828zM37.373 0L27.2 10.172l1.414 1.415L40.2 0h-2.828zM25.98 0l-8.9 8.9 1.415 1.414 8.9-8.9L25.98 0zM34.02 0l8.9 8.9-1.415 1.414-8.9-8.9L34.02 0zM0 0h3.282L0 3.282V0zm0 4.9l4.9-4.9h2.828L0 8.728V4.9zm0 6.343l9.07-9.07 1.415 1.415L1.415 12.1H0v-.857zm0 4.242L14.142 0h2.828L0 16.97v-1.485zm0 4.243L20.485 0h2.828L0 23.313v-1.5zM0 60V36.627L36.627 0H40.2L0 40.2V60zm0-16.97L43.03 0h2.828L0 45.858v-2.83zM60 60H36.627L60 36.627V60zm0-16.97L43.03 60h-2.8L60 40.2v2.83zm0-6.343L33.657 60h-2.8L60 33.857v2.83zm0-4.242L27.2 60h-2.8L60 27.2v1.485zm0-4.243L20.485 60h-2.8L60 20.485v1.5zm0-9.9L14.142 60h-2.8L60 14.142v2.83zm0-6.343L7.373 60h-2.8L60 7.373V9.9zm0-6.343L0 60H0L60 0v3.282z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] animate-pulse"></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in">
            <span className="text-sm font-medium text-white/90">✨ Introducing TaskFlow 2.0</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up">
            <span className="inline-block bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Manage Your Tasks
            </span>
            <br />
            <span className="text-transparent bg-gradient-to-r from-indigo-300 via-white to-purple-300 bg-clip-text">
              With Ease
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '100ms' }}>
            A modern, multi-user todo application with secure authentication
            <span className="block mt-2 text-white/80">and persistent storage. Built for productivity.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link href="/signup" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-white text-indigo-700 hover:bg-indigo-50 hover:scale-105 transform transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:shadow-[0_0_60px_rgba(255,255,255,0.8)]"
              >
                Get Started Free
                <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>
            <Link href="/signin" className="w-full sm:w-auto">
              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 hover:border-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:scale-105 transform transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 animate-fade-in" style={{ animationDelay: '250ms' }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10K+</div>
              <div className="text-sm text-indigo-200 mt-1">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-sm text-indigo-200 mt-1">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-sm text-indigo-200 mt-1">Uptime</div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-white/20 hover:transform hover:-translate-y-2">
              <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">🔒</div>
              <h3 className="text-xl font-semibold text-white mb-3">Secure Authentication</h3>
              <p className="text-indigo-100/80 text-sm leading-relaxed">JWT-based authentication with encryption keeps your data safe and private</p>
              <div className="mt-4 h-1 w-12 bg-indigo-400/50 rounded-full group-hover:w-20 transition-all duration-300"></div>
            </div>
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-white/20 hover:transform hover:-translate-y-2">
              <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">☁️</div>
              <h3 className="text-xl font-semibold text-white mb-3">Cloud Storage</h3>
              <p className="text-indigo-100/80 text-sm leading-relaxed">Your tasks are stored securely in the cloud, accessible anywhere anytime</p>
              <div className="mt-4 h-1 w-12 bg-indigo-400/50 rounded-full group-hover:w-20 transition-all duration-300"></div>
            </div>
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-white/20 hover:transform hover:-translate-y-2">
              <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">📱</div>
              <h3 className="text-xl font-semibold text-white mb-3">Responsive Design</h3>
              <p className="text-indigo-100/80 text-sm leading-relaxed">Beautiful on desktop, tablet, and mobile devices with seamless experience</p>
              <div className="mt-4 h-1 w-12 bg-indigo-400/50 rounded-full group-hover:w-20 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group">
        <div className="w-10 h-16 rounded-full border-2 border-white/30 flex items-start justify-center p-2 group-hover:border-white/60 transition-colors">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-scroll group-hover:bg-white"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(15px); opacity: 0; }
        }
        .animate-scroll {
          animation: scroll 2s infinite;
        }
      `}</style>
    </section>
  );
}
