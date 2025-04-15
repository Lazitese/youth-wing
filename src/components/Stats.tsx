
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
      <div className="text-4xl md:text-5xl font-bold mb-2 text-gov-dark">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-gov">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-4">
            City <span className="text-gov-accent">Impact</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Our commitment to progress, transparency and service is making a real difference
            in our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-sm p-6 animate-fade-in-up card-hover">
            <StatItem value={250000} label="Citizens Served" suffix="+" />
          </div>

          <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-sm p-6 animate-fade-in-up card-hover" style={{ animationDelay: "0.2s" }}>
            <StatItem value={98} label="Satisfaction Rate" suffix="%" />
          </div>

          <div className="bg-gradient-to-br from-white to-green-50 rounded-lg shadow-sm p-6 animate-fade-in-up card-hover" style={{ animationDelay: "0.4s" }}>
            <StatItem value={12500} label="Businesses Registered" suffix="+" />
          </div>

          <div className="bg-gradient-to-br from-white to-amber-50 rounded-lg shadow-sm p-6 animate-fade-in-up card-hover" style={{ animationDelay: "0.6s" }}>
            <StatItem value={4} label="Average Service Time" suffix=" mins" />
          </div>
        </div>

        <div className="mt-16 bg-gov-dark/5 rounded-xl p-6 md:p-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-gov-gold/20 p-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gov-gold">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gov-dark">Community-Focused</h3>
                <p className="text-sm text-gray-600">Putting citizens first in every decision</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-gov-accent/20 p-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gov-accent">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gov-dark">Secure & Trustworthy</h3>
                <p className="text-sm text-gray-600">Protected data and transparent processes</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-gov-medium/20 p-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gov-medium">
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
                <h3 className="font-bold text-gov-dark">Always Accessible</h3>
                <p className="text-sm text-gray-600">Digital services available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
