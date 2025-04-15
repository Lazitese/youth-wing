
import { Facebook, Twitter, Instagram, Youtube, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gov-dark text-white pt-16 pb-8">
      <div className="container-gov">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white text-gov-dark rounded-md flex items-center justify-center font-display font-bold text-xl">SC</div>
              <span className="font-display font-bold text-xl">
                SubCity <span className="text-gov-accent">GOV</span>
              </span>
            </div>
            <p className="text-white/70 text-sm">
              The official website of SubCity Government. Serving our citizens with pride and dedication.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-1/2 after:bg-gov-accent">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  News
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  Projects
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-1/2 after:bg-gov-accent">Government</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  City Council
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  Departments
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  Budget
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  Meetings
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  Elections
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                  <span className="text-gov-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  Jobs
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-1/2 after:bg-gov-accent">Newsletter</h3>
            <p className="text-white/70 text-sm mb-4">
              Subscribe to our newsletter to receive updates on news, events, and services.
            </p>
            <form className="flex mb-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/10 border border-white/20 text-white rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gov-accent w-full"
              />
              <Button className="rounded-r-lg rounded-l-none border border-gov-gold bg-gov-gold text-gov-dark hover:bg-gov-gold-light">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>
            <p className="text-white/50 text-xs">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our organization.
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 text-sm mb-4 md:mb-0">
            © {currentYear} SubCity Government. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
