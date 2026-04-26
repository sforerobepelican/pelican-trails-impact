ALTER TABLE public.contact_leads
  ADD CONSTRAINT contact_leads_name_len CHECK (char_length(name) BETWEEN 1 AND 120),
  ADD CONSTRAINT contact_leads_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT contact_leads_whatsapp_len CHECK (whatsapp IS NULL OR char_length(whatsapp) <= 40),
  ADD CONSTRAINT contact_leads_message_len CHECK (char_length(message) BETWEEN 1 AND 2000),
  ADD CONSTRAINT contact_leads_language_chk CHECK (language IN ('es','en'));