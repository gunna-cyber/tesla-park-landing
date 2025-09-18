import phoneMockup from "@/assets/phone-mockup.jpg";

export const ProductShowcase = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-primary/80 text-sm font-medium tracking-wide uppercase mb-4">
            PRODUCT SHOWCASE
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Designed for <span className="text-primary">Excellence</span>
          </h2>
        </div>
        
        <div className="relative flex justify-center items-center">
          {/* Main Phone Mockup */}
          <div className="relative z-10 animate-float">
            <div className="relative">
              <img 
                src={phoneMockup} 
                alt="Smart Parking App Interface" 
                className="w-80 md:w-96 h-auto rounded-3xl shadow-tesla-hover"
              />
              
              {/* Glow effects around phone */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 rounded-3xl blur-2xl" />
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-3xl blur-3xl" />
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-card rounded-3xl" />
          
          {/* Floating UI elements */}
          <div className="absolute top-1/4 left-1/4 animate-tesla-fade" style={{ animationDelay: '1s' }}>
            <div className="bg-gradient-card border border-primary/20 rounded-xl p-4 shadow-glow-subtle">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-glow-pulse" />
                <span className="text-sm font-medium">Spot Reserved</span>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-1/4 right-1/4 animate-tesla-fade" style={{ animationDelay: '1.5s' }}>
            <div className="bg-gradient-card border border-accent/20 rounded-xl p-4 shadow-glow-subtle">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-accent rounded-full animate-glow-pulse" />
                <span className="text-sm font-medium">Payment Secure</span>
              </div>
            </div>
          </div>
          
          <div className="absolute top-1/2 right-1/6 animate-tesla-fade" style={{ animationDelay: '2s' }}>
            <div className="bg-gradient-card border border-primary/20 rounded-xl p-4 shadow-glow-subtle">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2.4km</div>
                <div className="text-xs text-muted-foreground">Distance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Large background glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-full blur-3xl" />
    </section>
  );
};