import type { SpeakerResponse } from "@shared/routes";
import { motion } from "framer-motion";

interface SpeakerCardProps {
  speaker: SpeakerResponse[0];
  index: number;
}

export function SpeakerCard({ speaker, index }: SpeakerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-xl aspect-[3/4] mb-4 bg-white/5 border border-white/10">
        {speaker.photoUrl ? (
          <img 
            src={speaker.photoUrl} 
            alt={speaker.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/5 text-white/20">
             <span className="font-display text-4xl">{speaker.name.charAt(0)}</span>
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Hover info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-xs uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity delay-75 mb-2">
            Read Bio
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-primary transition-colors">
          {speaker.name}
        </h3>
        <p className="text-sm text-white/60 font-medium tracking-wide uppercase">
          {speaker.topic}
        </p>
      </div>
    </motion.div>
  );
}
