import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Daily Commuter",
    content: "Game-changing technology. I never worry about finding parking anymore.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Business Professional", 
    content: "The navigation feature saved me countless hours and stress.",
    rating: 5
  },
  {
    name: "Emma Williams",
    role: "Urban Driver",
    content: "Seamless payments and real-time updates make this app essential.",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-primary/80 text-sm font-medium tracking-wide uppercase mb-4">
            TESTIMONIALS
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Trusted by Thousands of <span className="text-primary">Drivers</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`group relative p-8 rounded-2xl bg-gradient-card border border-primary/20 hover:border-primary/40 transition-all duration-700 hover:scale-105 hover:shadow-glow-primary animate-tesla-fade`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Stars */}
                <div className="flex space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
    </section>
  );
};