
import { useState } from "react";
import { ChevronRight, FileText, Building, Users, Briefcase, FileCheck, Map } from "lucide-react";
import { Button } from "@/components/ui/button";

// Since we're not installing framer-motion, we'll create a custom component
// that mimics the motion.div with CSS animations
const AnimatedCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <div
      className="animate-fade-in-up opacity-0"
      style={{ animationDelay: `${delay}s`, animationFillMode: "forwards" }}
    >
      {children}
    </div>
  );
};

const services = [
  {
    id: 1,
    title: "Business Registration",
    description: "Register your business, renew licenses, and access permits all in one place.",
    icon: <Briefcase className="h-8 w-8 text-gov-accent" />,
    bgColor: "bg-gradient-to-br from-white to-blue-50",
  },
  {
    id: 2,
    title: "ID & Documentation",
    description: "Apply for or renew identification cards and access vital documents.",
    icon: <FileText className="h-8 w-8 text-gov-accent" />,
    bgColor: "bg-gradient-to-br from-white to-emerald-50",
  },
  {
    id: 3,
    title: "Building Permits",
    description: "Submit applications for construction and renovation permits.",
    icon: <Building className="h-8 w-8 text-gov-accent" />,
    bgColor: "bg-gradient-to-br from-white to-amber-50",
  },
  {
    id: 4,
    title: "Community Programs",
    description: "Discover and register for community events, workshops, and initiatives.",
    icon: <Users className="h-8 w-8 text-gov-accent" />,
    bgColor: "bg-gradient-to-br from-white to-purple-50",
  },
  {
    id: 5,
    title: "Tax Services",
    description: "Pay property taxes, file returns, and access tax-related information.",
    icon: <FileCheck className="h-8 w-8 text-gov-accent" />,
    bgColor: "bg-gradient-to-br from-white to-red-50",
  },
  {
    id: 6,
    title: "Land Management",
    description: "Access land records, file for property transfers, and check zoning regulations.",
    icon: <Map className="h-8 w-8 text-gov-accent" />,
    bgColor: "bg-gradient-to-br from-white to-indigo-50",
  },
];

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="services" className="section bg-gray-50 py-20">
      <div className="container-gov">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gov-dark mb-4">
            Our <span className="text-gov-accent">Services</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Access a wide range of government services designed to make your life easier and
            your interactions with the administration more efficient.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimatedCard key={service.id} delay={0.1 * index}>
              <div
                className={`${service.bgColor} rounded-xl shadow-sm overflow-hidden card-hover shimmer ${
                  hoveredCard === service.id ? "shadow-lg -translate-y-1" : ""
                }`}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="p-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gov-dark mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Button variant="ghost" className="text-gov-accent hover:text-gov-accent/80 hover:bg-gov-accent/5 px-0 group">
                    Learn More
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button className="btn-primary px-8 py-6" size="lg">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
