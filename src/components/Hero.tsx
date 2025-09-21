import { Button } from "@/components/ui/button";
import teslaBg from "@/assets/tesla-hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Premium Navbar */}
      <nav className="relative z-20 w-full px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-foreground glow-text">
            ParkSmart
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground/90 hover:text-primary transition-colors duration-300 font-medium">
              Home
            </a>
            <a href="#" className="text-foreground/90 hover:text-primary transition-colors duration-300 font-medium">
              Features
            </a>
            <a href="#" className="text-foreground/90 hover:text-primary transition-colors duration-300 font-medium">
              Pricing
            </a>
            <a href="#" className="text-foreground/90 hover:text-primary transition-colors duration-300 font-medium">
              Contact
            </a>
            <Button variant="accent" size="sm" className="ml-4">
              Get App
            </Button>
          </div>
        </div>
      </nav>

      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${teslaBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background/80" />
      
      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="text-center max-w-6xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-black mb-6 animate-tesla-fade leading-tight" style={{ animationDelay: '0.2s', fontFamily: 'Inter, sans-serif' }}>
            <span className="block text-foreground">Smart Parking.</span>
            <span className="block text-primary glow-text">Simplified.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-tesla-fade font-medium" style={{ animationDelay: '0.4s' }}>
            Find, reserve, and pay for parking with ease.
          </p>
          
          <div className="animate-tesla-fade" style={{ animationDelay: '0.6s' }}>
            <Button 
              variant="hero" 
              size="xl" 
              className="px-16 py-8 text-xl font-bold"
              onClick={() => window.location.href = '/auth'}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full animate-glow-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-primary rounded-full animate-glow-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
};