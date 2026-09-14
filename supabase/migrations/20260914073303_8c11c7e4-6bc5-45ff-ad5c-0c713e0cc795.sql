CREATE TABLE public.rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  guest_count integer NOT NULL DEFAULT 1,
  ceremonies_attending text[] NOT NULL DEFAULT '{}',
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.rsvps TO anon;
GRANT ALL ON public.rsvps TO service_role;

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an RSVP"
ON public.rsvps
FOR INSERT
TO anon
WITH CHECK (true);