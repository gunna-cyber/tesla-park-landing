import { Button } from "@/components/ui/button";
import heroCity from "@/assets/hero-city.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroCity})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background/90" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <p className="text-primary/80 text-sm font-medium tracking-wide uppercase mb-4 animate-tesla-fade">
          HERO SECTION
        </p>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-tesla-fade" style={{ animationDelay: '0.2s' }}>
          <span className="block">Smart Parking.</span>
          <span className="block text-primary glow-text">Simplified.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-tesla-fade" style={{ animationDelay: '0.4s' }}>
          Find, reserve, and pay for parking with ease.
        </p>
        
        <div className="animate-tesla-fade" style={{ animationDelay: '0.6s' }}>
          <Button variant="hero" size="lg" className="px-12 py-6 text-lg font-semibold">
            Get Started
          </Button>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full animate-glow-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-primary rounded-full animate-glow-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
};