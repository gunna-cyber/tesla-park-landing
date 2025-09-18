import { Smartphone, Monitor } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          {/* Links */}
          <div className="flex space-x-8 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>
          
          {/* App Store Links */}
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="group flex items-center space-x-3 bg-gradient-card border border-primary/20 hover:border-primary/40 rounded-xl px-6 py-3 transition-all duration-300 hover:shadow-glow-subtle"
            >
              <Smartphone className="w-6 h-6 text-primary group-hover:animate-glow-pulse" />
              <span className="text-sm font-medium">App Store</span>
            </a>
            
            <a 
              href="#" 
              className="group flex items-center space-x-3 bg-gradient-card border border-accent/20 hover:border-accent/40 rounded-xl px-6 py-3 transition-all duration-300 hover:shadow-glow-subtle"
            >
              <Monitor className="w-6 h-6 text-accent group-hover:animate-glow-pulse" />
              <span className="text-sm font-medium">Google Play</span>
            </a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border/30 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Smart Parking. The future of urban mobility.
          </p>
        </div>
      </div>
    </footer>
  );
};