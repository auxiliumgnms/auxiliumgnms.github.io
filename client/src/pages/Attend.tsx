import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Attend() {
  const tiers = [
    {
      name: "Student",
      price: "$15",
      features: ["Full Event Access", "Lunch Included", "Digital Goodie Bag", "Networking Session"],
      highlight: false
    },
    {
      name: "General",
      price: "$35",
      features: ["Full Event Access", "Lunch Included", "Physical Goodie Bag", "Networking Session", "After-party Access"],
      highlight: true
    },
    {
      name: "Supporter",
      price: "$75",
      features: ["Full Event Access", "VIP Lunch", "Premium Goodie Bag", "Exclusive Speaker Q&A", "Reserved Seating"],
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="pt-32 px-6 md:px-24 max-w-7xl mx-auto pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">Get Tickets</h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Join us on February 5, 2025 for a day of inspiration and connection.
            Limited seats available.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.5, duration: 0.6 }}
              className={`
                relative rounded-2xl p-8 border flex flex-col
                ${tier.highlight 
                  ? "bg-white/10 border-primary/50 shadow-2xl shadow-primary/10 scale-105 z-10" 
                  : "bg-white/5 border-white/10 hover:border-white/20 transition-colors"
                }
              `}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-display font-bold mb-2">{tier.name}</h3>
              <div className="text-4xl font-bold mb-8">{tier.price}</div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-white/80">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`
                  w-full py-4 rounded-xl font-bold transition-all duration-300
                  ${tier.highlight
                    ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25"
                    : "bg-white/10 text-white hover:bg-white/20"
                  }
                `}
              >
                Select {tier.name}
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <p className="text-white/40 text-sm">
            Questions about ticketing? Contact us at tickets@tedxcampus.edu
          </p>
        </div>
      </main>
    </div>
  );
}
