import { Car, CreditCard, MapPin, Smartphone } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Real-time Availability",
    description: "See available parking spots in real-time with live updates",
    color: "primary"
  },
  {
    icon: Smartphone,
    title: "One-tap Reservations",
    description: "Reserve your parking spot instantly with a single tap",
    color: "accent"
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Safe and secure digital payments with multiple options",
    color: "primary"
  },
  {
    icon: Car,
    title: "Smart Navigation",
    description: "Get turn-by-turn directions to your reserved parking spot",
    color: "accent"
  }
];

export const Features = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-primary/80 text-sm font-medium tracking-wide uppercase mb-4">
            KEY FEATURES
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            The Future of <span className="text-primary">Parking</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isAccent = feature.color === 'accent';
            
            return (
              <div
                key={feature.title}
                className={`group relative p-8 rounded-2xl bg-gradient-card border transition-all duration-700 hover:scale-105 animate-tesla-fade ${
                  isAccent 
                    ? 'border-accent/20 hover:border-accent/50 hover:shadow-glow-accent' 
                    : 'border-primary/20 hover:border-primary/50 hover:shadow-glow-primary'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-xl mb-6 ${
                    isAccent ? 'bg-accent/10' : 'bg-primary/10'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      isAccent ? 'text-accent' : 'text-primary'
                    }`} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
    </section>
  );
};