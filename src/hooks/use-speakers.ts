import { useQuery } from "@tanstack/react-query";
import { speakersData } from "../data/speakers";

export function useSpeakers() {
  return useQuery({
    queryKey: ["/api/speakers"],
    queryFn: async () => {
      return Promise.resolve(speakersData);
    },
  });
}
