import { Experience3D } from "@/components/Experience3D";
import { Navigation } from "@/components/Navigation";
import { useSpeakers } from "@/hooks/use-speakers";
import { SpeakerCard } from "@/components/SpeakerCard";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

export default function Home() {
  const { data: speakers } = useSpeakers();

  const sortedSpeakers = speakers?.sort((a, b) => a.displayOrder - b.displayOrder) || [];

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Experience3D />
      <Navigation />

      <main className="relative z-10">
        
        {/* SECTION 1: HERO */}
        <section id="hero" className="h-screen flex flex-col justify-center items-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-primary font-medium tracking-[0.2em] text-sm md:text-base uppercase mb-4">
              Ideas Worth Spreading
            </p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight mb-6 mix-blend-difference">
              The Compass<br/><span className="italic font-serif font-light text-white/80">Within</span>
            </h1>
            <p className="text-white/60 max-w-md mx-auto text-lg md:text-xl font-light">
              TEDxNMS · 5 February 2026
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-widest text-white/30">Scroll to Explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </section>

        {/* SECTION 2: THEME */}
        <section id="theme" className="min-h-[75vh] flex items-center justify-start px-6 md:px-24 max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              Navigating New <span className="text-primary">Frontiers</span>.
            </h2>
            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed text-balance">
              We are constantly bombarded with noise—opinions, algorithms, expectations. 
              But true north isn't out there. It's in here.
            </p>
          </div>
        </section>

        {/* SECTION 3: MEANING */}
        <section className="min-h-[75vh] flex items-center justify-end px-6 md:px-24 max-w-7xl mx-auto text-right">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              Direction isn't found.<br/>It's <span className="italic text-white/80">formed</span>.
            </h2>
            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed">
              Join us for an exploration of inner guidance systems, 
              personal agency, and the courage to chart your own course.
            </p>
          </div>
        </section>

        {/* SECTION 4: SPEAKERS GRID */}
        <section id="speakers" className="min-h-screen py-24 px-6 md:px-24 max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">The Speakers</h2>
            <div className="h-1 w-24 bg-primary rounded-full" />
          </div>
          
          {sortedSpeakers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {sortedSpeakers.map((speaker, idx) => (
                <SpeakerCard key={speaker.id} speaker={speaker} index={idx} />
              ))}
            </div>
          ) : (
            <div className="text-white/40 italic">Loading speakers...</div>
          )}
        </section>

        {/* SECTION 5: DETAILS */}
        <section id="details" className="min-h-[60vh] flex flex-col justify-center items-center px-6 text-center">
          <div className="glass-card p-12 rounded-3xl max-w-3xl w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
              <div>
                <div className="flex items-center gap-3 mb-2 text-primary">
                  <Calendar className="w-6 h-6" />
                  <span className="uppercase tracking-widest font-bold text-sm">Date</span>
                </div>
                <h3 className="text-3xl font-display font-bold mb-2">5 February 2026</h3>
                <p className="text-white/60">12:00 PM - 2:30 PM</p>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-2 text-primary">
                  <MapPin className="w-6 h-6" />
                  <span className="uppercase tracking-widest font-bold text-sm">Location</span>
                </div>
                <h3 className="text-3xl font-display font-bold mb-2">Zayed Hall</h3>
                <p className="text-white/60">Gems New Millennium Al Khail, 1st Floor</p>
              </div>
            </div>
            
            <hr className="border-white/10 my-10" />
            
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto text-center font-light">
              A fully student-led event bringing together thinkers, creators, and innovators 
              to share ideas that spark conversation and drive change.
            </p>
          </div>
        </section>

        {/* SECTION 6: ABOUT / WHAT IS TEDX */}
        <section id="about" className="min-h-[60vh] py-24 px-6 md:px-24 max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">What is TEDx?</h2>
            <div className="h-1 w-24 bg-primary rounded-full" />
          </div>
          
          <div className="space-y-6 text-white/70 text-lg leading-relaxed">
            <p>
              In the spirit of discovering and spreading ideas, TED has created a program called TEDx. 
              TEDx is a program of local, self-organized events that bring people together to share a TED-like experience.
            </p>
            <p>
              Our event is called TEDxGNMS Youth, where x = independently organized TED event. 
              At our TEDxGNMS Youth event, TED Talks video and live speakers will combine to spark deep discussion and connection in a small group.
            </p>
            <p>
              The TED Conference provides general guidance for the TEDx program, but individual TEDx events, including ours, are self-organized.
            </p>
          </div>
        </section>

        {/* SECTION 7: CTA */}
        <section className="h-[60vh] flex flex-col justify-center items-center px-6 relative">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-12 text-center">
            Find Your <br/><span className="text-primary">True North</span>
          </h2>
          
          <a 
            href="https://www.gemsnewmillenniumschool-alkhail.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-10 py-5 bg-transparent border border-white/20 text-white rounded-full font-bold text-lg tracking-wide hover:bg-white/5 transition-colors"
            data-testid="link-school-website"
          >
            Visit School Website
          </a>
        </section>

        {/* FOOTER */}
        <footer className="py-12 px-6 border-t border-white/5 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <img 
                src="/images/tedx-logo.jpeg" 
                alt="TEDx GEMS New Millennium School Youth" 
                className="h-16 md:h-20 object-contain mb-2"
              />
              <p className="text-xs text-white/40 max-w-xs">
                This independent TEDx event is operated under license from TED.
              </p>
            </div>
            
            <div className="flex gap-8 text-sm text-white/60 font-medium">
              <a 
                href="https://www.instagram.com/tedxgnmsyouth" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors"
                data-testid="link-instagram-tedx"
              >
                @tedxgnmsyouth
              </a>
              <a 
                href="https://www.instagram.com/gemsnms_alkhail" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors"
                data-testid="link-instagram-school"
              >
                @gemsnms_alkhail
              </a>
              <a 
                href="https://www.gemsnewmillenniumschool-alkhail.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors"
                data-testid="link-school-footer"
              >
                School Website
              </a>
            </div>
            
            <p className="text-xs text-white/30">
              © 2026 TEDxGNMS Youth. All rights reserved.
            </p>
          </div>
        </footer>

      </main>
    </div>
  );
}
