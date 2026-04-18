import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RsvpService } from './rsvp.service.js';
import { RsvpSchema } from '@repo/shared';

const mockPrisma = {
  rsvp: {
    create: vi.fn().mockResolvedValue({ id: 1, meetupId: 1, name: 'Arjun', email: 'a@b.com' }),
  },
};

describe('RsvpService', () => {
  let service: RsvpService;

  beforeEach(() => {
    service = new RsvpService(mockPrisma as any);
  });

  it('creates an RSVP for valid input', async () => {
    const dto = RsvpSchema.parse({ meetupId: 1, name: 'Arjun', email: 'a@b.com' });
    const result = await service.create(dto);
    expect(result.id).toBe(1);
  });

  it('throws on invalid email', () => {
    expect(() => RsvpSchema.parse({ meetupId: 1, name: 'Arjun', email: 'not-an-email' })).toThrow();
  });
});
