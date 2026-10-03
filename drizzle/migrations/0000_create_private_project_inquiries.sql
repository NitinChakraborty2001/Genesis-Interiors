CREATE TABLE public.project_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  project_type text NOT NULL,
  project_name text,
  message text NOT NULL
);
GRANT INSERT ON public.project_inquiries TO anon;
GRANT ALL ON public.project_inquiries TO service_role;
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors may submit project inquiries" ON public.project_inquiries FOR INSERT TO anon WITH CHECK (
  char_length(name) BETWEEN 2 AND 120 AND
  char_length(email) BETWEEN 5 AND 254 AND
  char_length(message) BETWEEN 20 AND 4000 AND
  project_type IN ('Yacht new build', 'Yacht refit', 'Residence', 'Furniture', 'Other')
);