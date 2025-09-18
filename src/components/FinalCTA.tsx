import { Button } from "@/components/ui/button";

export const FinalCTA = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="animate-tesla-fade">
          <p className="text-primary/80 text-sm font-medium tracking-wide uppercase mb-4">
            FINAL CTA SECTION
          </p>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            Park Smarter.
            <br />
            <span className="text-primary">Drive Stress-Free.</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Join thousands of smart drivers who have revolutionized their parking experience. 
            The future of urban mobility starts here.
          </p>
          
          <div className="animate-tesla-fade" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" size="lg" className="px-16 py-8 text-xl font-bold">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
      
      {/* Massive background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-accent/10" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-gradient-to-r from-primary/20 via-transparent to-accent/20 rounded-full blur-3xl" />
      
      {/* Animated elements */}
      <div className="absolute top-1/4 left-1/6 w-3 h-3 bg-primary rounded-full animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/6 w-2 h-2 bg-accent rounded-full animate-glow-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-primary rounded-full animate-glow-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
};