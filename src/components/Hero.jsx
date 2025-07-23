export default function Hero() {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container-max text-center">
        <div className="animate-fade-in">
          {/* Profile Image */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
              YN
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Hi, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
              Your Name
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A passionate{' '}
            <span className="text-primary-600 font-semibold">Full Stack Developer</span>
            {' '}creating beautiful and functional web experiences
          </p>

          {/* Description */}
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            I specialize in modern web technologies and love turning ideas into reality through clean, efficient code and thoughtful design.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('#projects')}
              className="btn-primary px-8 py-3 text-lg"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-secondary px-8 py-3 text-lg"
            >
              Get In Touch
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce-slow">
            <button
              onClick={() => scrollToSection('#about')}
              className="text-gray-400 hover:text-primary-600 transition-colors"
            >
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}