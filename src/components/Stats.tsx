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
            የብልፅግና ፓርቲ የሴቶች ክንፍ <span className="text-gov-accent">በቁጥር</span>
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
      </div>
    </section>
  );
};

export default Stats;
