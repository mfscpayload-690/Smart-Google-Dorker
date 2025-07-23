export default function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get to know more about who I am, what I do, and my journey in development
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image/Visual */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center">
                <div className="text-6xl text-primary-600">👨‍💻</div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary-500 rounded-full opacity-30"></div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Hello! I'm a passionate developer
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  I'm a dedicated full-stack developer with a passion for creating 
                  innovative web solutions. With expertise in modern technologies and 
                  a keen eye for design, I strive to build applications that are not 
                  only functional but also provide exceptional user experiences.
                </p>
              </div>

              <div>
                <p className="text-gray-600 leading-relaxed">
                  My journey in development started with curiosity and has evolved 
                  into a career where I continuously learn and adapt to new technologies. 
                  I believe in writing clean, maintainable code and following best 
                  practices to deliver high-quality solutions.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">50+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">3+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>

              {/* Download Resume Button */}
              <div className="pt-4">
                <button className="btn-primary">
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}