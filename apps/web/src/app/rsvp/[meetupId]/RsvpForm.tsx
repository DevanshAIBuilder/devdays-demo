'use client';

import { useActionState } from 'react';
import { submitRsvp } from './actions';

interface RsvpFormProps {
  eventId: number;
}

type State = { success?: boolean; error?: string } | null;

export default function RsvpForm({ eventId }: RsvpFormProps) {
  const [state, formAction, pending] = useActionState(
    async (_prev: State, formData: FormData): Promise<State> => {
      try {
        await submitRsvp(eventId, formData);
        return { success: true };
      } catch (err) {
        return { error: err instanceof Error ? err.message : 'Something went wrong.' };
      }
    },
    null,
  );

  if (state?.success) {
    return (
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 font-medium">
        ✅ You&apos;re registered! See you there.
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-5 max-w-md">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Your name"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="you@example.com"
        />
      </div>

      {state?.error && (
        <p className="text-red-600 text-sm" role="alert">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-indigo-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
      >
        {pending ? 'Submitting…' : 'RSVP'}
      </button>
    </form>
  );
}
