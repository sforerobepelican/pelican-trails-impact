CREATE TABLE public.contact_leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  whatsapp text,
  message text NOT NULL,
  language text NOT NULL DEFAULT 'es',
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON public.contact_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read leads"
  ON public.contact_leads
  FOR SELECT
  TO authenticated
  USING (true);