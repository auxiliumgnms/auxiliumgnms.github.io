import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="pt-32 px-6 md:px-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-12">About Us</h1>
          
          <div className="grid md:grid-cols-2 gap-16 mb-24">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">The Theme</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                "Compass Within" explores the internal mechanisms we use to navigate an increasingly complex world. 
                In an era defined by external validation and infinite information, how do we cultivate trust in our own judgment?
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                This year's speakers will dissect topics ranging from ethical AI and sustainable architecture to 
                psychological resilience and artistic expression—all through the lens of finding inner direction.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">The Team</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Organized entirely by students, this event represents months of dedication, curation, and design. 
                Our team is committed to creating a platform where innovative ideas can take root.
              </p>
            </div>
          </div>
          
          {/* Simple team grid placeholder */}
          <div className="mb-24">
            <h2 className="text-4xl font-display font-bold mb-12">Organizing Committee</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-square bg-white/5 rounded-lg border border-white/10" />
                  <div>
                    <div className="h-4 w-32 bg-white/10 rounded mb-2" />
                    <div className="h-3 w-20 bg-white/5 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
