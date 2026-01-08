import { z } from 'zod';
import { insertSpeakerSchema, speakers } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  speakers: {
    list: {
      method: 'GET' as const,
      path: '/api/speakers',
      responses: {
        200: z.array(z.custom<typeof speakers.$inferSelect>()),
      },
    },
    // Keep it simple for now, read-only for public
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type SpeakerResponse = z.infer<typeof api.speakers.list.responses[200]>;
