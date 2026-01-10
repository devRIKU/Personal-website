import React, { useEffect, useRef, useState } from 'react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-[90vh] flex items-center justify-center px-4 py-12 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-neo-yellow border-4 border-black rounded-full mix-blend-multiply opacity-50 animate-bounce delay-75"></div>
      <div className="absolute bottom-40 right-10 w-24 h-24 bg-neo-pink border-4 border-black rotate-12 -z-10"></div>
      
      <div className={`max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        
        {/* Text Content */}
        <div className={`order-2 md:order-1 space-y-8 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}>
          <div className="relative inline-block">
             <h1 className="font-editorial text-6xl md:text-8xl font-black leading-none tracking-tighter z-10 relative">
              Hi!, I'm Sanniva.
             </h1>
             <div className={`absolute -bottom-2 left-0 w-full h-4 bg-neo-green -z-0 skew-x-12 transition-all duration-1000 delay-500 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>
          </div>

          <div className={`bg-white border-4 border-black p-6 shadow-neo transform rotate-1 hover:rotate-0 transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="font-ui font-bold text-xl mb-4 border-b-2 border-black pb-2">
              Introduction_v1.0
            </h2>
            <p className="font-grotesk text-lg md:text-xl leading-relaxed mb-4">
              Hey there! I’m a <span className="font-bold bg-neo-yellow px-1">7th grader</span> at Techno India Group Public School who’s way too into coding and all things techy. I’m not gonna lie—I don’t feel like a genius, but somehow I manage to pull off good grades (magic, maybe?).
            </p>
            <p className="font-grotesk text-lg md:text-xl leading-relaxed">
              Most people say I’m funny—some even laugh at my jokes on purpose 😏. When I’m not figuring out how stuff works or breaking it, you’ll find me doing something random but probably cool.
            </p>
          </div>

          <div className={`flex gap-4 transition-all duration-500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
             <button className="font-ui font-bold text-lg px-8 py-3 bg-black text-white border-4 border-black hover:bg-white hover:text-black shadow-neo active:shadow-none active:translate-x-[5px] active:translate-y-[5px] transition-all">
                VIEW WORK
             </button>
             <button className="font-ui font-bold text-lg px-8 py-3 bg-neo-blue text-black border-4 border-black hover:bg-neo-pink shadow-neo active:shadow-none active:translate-x-[5px] active:translate-y-[5px] transition-all">
                CONTACT
             </button>
          </div>
        </div>

        {/* Image / 3D Cutout */}
        <div className={`order-1 md:order-2 flex justify-center relative transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-95 rotate-3'}`}>
          <div className="relative w-72 h-80 md:w-96 md:h-[500px] group">
            {/* Background solid shape */}
            <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 md:translate-x-8 md:translate-y-8 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            
            {/* Frame */}
            <div className="absolute inset-0 border-4 border-black bg-neo-yellow"></div>
            
            {/* Image Placeholder */}
            <div className="absolute inset-4 border-2 border-black bg-white overflow-hidden">
                <img 
                  src="https://picsum.photos/400/500?grayscale" 
                  alt="Sanniva Placeholder" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-105"
                />
            </div>
            
            {/* Floating Badge */}
             <div className="absolute -bottom-6 -left-6 bg-neo-pink border-4 border-black px-4 py-2 font-ui font-bold text-white shadow-neo rotate-[-10deg] animate-pulse">
                FUTURE DEV
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;