import { useEffect, useRef, useState } from "react";

type StatItemProps = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

const StatItem = ({ value, label, prefix = "", suffix = "", duration = 2000 }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const countUp = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Use easeOutQuart for a nice deceleration effect
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(countUp);
      }
    };

    animationFrameId = requestAnimationFrame(countUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration, isVisible]);

  return (
    <div ref={counterRef} className="text-center">
      <div className="text-4xl md:text-5xl font-bold mb-3 text-gov-dark">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container-gov">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-4">
            የብልፅግና ፓርቲ <span className="text-gov-accent">በቁጥር</span>
          </h2>
          <p className="text-gray-600 text-lg">
            የኛ ቁርጠኝነት ለብልፅግና ዕድገት፣ ለዜጎች እኩልነት እና ለሁሉም ዜጎች ተሳትፎ በማህበረሰባችን ውስጥ ለውጥ እያመጣ ይገኛል
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-t-4 border-gov-gold">
            <StatItem value={29777} label="የአባላት ቁጥር" />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-t-4 border-gov-accent" style={{ animationDelay: "0.2s" }}>
            <StatItem value={807} label="የብልፅግና ቤተሰብ" />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-t-4 border-gov-medium" style={{ animationDelay: "0.4s" }}>
            <StatItem value={131} label="የብልፅግና ህብረት" />
          </div>
        </div>

        <div className="mt-20 bg-gov-dark rounded-xl p-8 md:p-10 shadow-lg animate-fade-in text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex items-center space-x-5">
              <div className="rounded-full bg-gov-gold/30 p-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gov-gold">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white text-xl">ዜጎች-ተኮር</h3>
                <p className="text-gray-300">የኢትዮጵያን ዜጎች በእያንዳንዱ ውሳኔ ውስጥ በቅድሚያ ማስቀመጥ</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-5">
              <div className="rounded-full bg-gov-accent/30 p-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gov-accent">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white text-xl">ብልፅግና ለሁሉም</h3>
                <p className="text-gray-300">በሁሉም ዘርፎች ሁሉም ዜጎች ተጠቃሚ መሆን</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-5">
              <div className="rounded-full bg-gov-medium/30 p-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gov-medium">
                  <path d="M12 2v4"></path>
                  <path d="M12 18v4"></path>
                  <path d="m4.93 4.93 2.83 2.83"></path>
                  <path d="m16.24 16.24 2.83 2.83"></path>
                  <path d="M2 12h4"></path>
                  <path d="M18 12h4"></path>
                  <path d="m4.93 19.07 2.83-2.83"></path>
                  <path d="m16.24 7.76 2.83-2.83"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white text-xl">ፍትሀዊ ምደባ</h3>
                <p className="text-gray-300">በሁሉም መዋቅሮች ዜጎች እኩል ተጠቃሚ ማድረግ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
