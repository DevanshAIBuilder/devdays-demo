'use server';

import { RsvpSchema } from '@repo/shared';

export async function submitRsvp(eventId: number, formData: FormData) {
  const raw = {
    eventId,
    name: formData.get('name'),
    email: formData.get('email'),
  };

  const dto = RsvpSchema.parse(raw);

  const res = await fetch('http://localhost:3001/rsvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }

  return { success: true };
}
