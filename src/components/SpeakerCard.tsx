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
      data-testid={`card-speaker-${speaker.id}`}
    >
      <div className="relative overflow-hidden rounded-xl aspect-[3/4] mb-4 bg-white/5 border border-white/10">
        {speaker.photoUrl ? (
          <img 
            src={speaker.photoUrl} 
            alt={speaker.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 text-white/40">
             <span className="font-display text-5xl font-bold">{speaker.name.charAt(0)}</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
        
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-2">
            {speaker.designation}
          </p>
          <h4 className="text-white text-sm font-medium leading-snug line-clamp-3">
            "{speaker.title}"
          </h4>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {speaker.name}
        </h3>
        <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
          {speaker.summary}
        </p>
      </div>
    </motion.div>
  );
}
