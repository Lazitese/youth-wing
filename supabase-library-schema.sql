-- Create library_documents table
CREATE TABLE IF NOT EXISTS public.library_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS (Row Level Security) policies
ALTER TABLE public.library_documents ENABLE ROW LEVEL SECURITY;

-- Allow any authenticated user to read library documents
CREATE POLICY "Anyone can read library documents" 
ON public.library_documents FOR SELECT 
TO authenticated, anon
USING (true);

-- Only allow admins to insert, update, or delete library documents
CREATE POLICY "Only admins can insert library documents" 
ON public.library_documents FOR INSERT 
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.admins
        WHERE admins.email = auth.jwt()->>'email'
    )
);

CREATE POLICY "Only admins can update library documents" 
ON public.library_documents FOR UPDATE 
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.admins
        WHERE admins.email = auth.jwt()->>'email'
    )
);

CREATE POLICY "Only admins can delete library documents" 
ON public.library_documents FOR DELETE 
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.admins
        WHERE admins.email = auth.jwt()->>'email'
    )
);

-- Create storage bucket for library files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('library', 'library', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
CREATE POLICY "Anyone can read library files"
ON storage.objects FOR SELECT
TO authenticated, anon
USING (bucket_id = 'library');

CREATE POLICY "Only admins can upload files to library"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'library' AND 
    EXISTS (
        SELECT 1 FROM public.admins
        WHERE admins.email = auth.jwt()->>'email'
    )
);

CREATE POLICY "Only admins can update library files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id = 'library' AND 
    EXISTS (
        SELECT 1 FROM public.admins
        WHERE admins.email = auth.jwt()->>'email'
    )
);

CREATE POLICY "Only admins can delete library files"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'library' AND 
    EXISTS (
        SELECT 1 FROM public.admins
        WHERE admins.email = auth.jwt()->>'email'
    )
);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_library_documents_category ON public.library_documents (category);
CREATE INDEX IF NOT EXISTS idx_library_documents_created_at ON public.library_documents (created_at DESC); 