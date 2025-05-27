-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  responsibilities TEXT,
  location TEXT,
  job_type TEXT NOT NULL CHECK (job_type IN ('full_time', 'part_time', 'contract', 'internship')),
  deadline DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add comment to the table
COMMENT ON TABLE jobs IS 'Table for storing job listings';

-- Add indexes for faster searching
CREATE INDEX IF NOT EXISTS jobs_job_type_idx ON jobs(job_type);
CREATE INDEX IF NOT EXISTS jobs_is_active_idx ON jobs(is_active);
CREATE INDEX IF NOT EXISTS jobs_deadline_idx ON jobs(deadline);
CREATE INDEX IF NOT EXISTS jobs_created_at_idx ON jobs(created_at);

-- Create job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  education TEXT NOT NULL,
  experience TEXT NOT NULL,
  resume_url TEXT NOT NULL,
  additional_docs TEXT[],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'rejected', 'accepted')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS job_applications_job_id_idx ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS job_applications_status_idx ON job_applications(status);
CREATE INDEX IF NOT EXISTS job_applications_created_at_idx ON job_applications(created_at);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Jobs policies
-- Allow anyone to read active jobs
CREATE POLICY "Allow public read access to active jobs" ON jobs
  FOR SELECT
  USING (is_active = true);

-- Allow admins to do anything with jobs
CREATE POLICY "Allow admins to manage jobs" ON jobs
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Job Applications policies
-- Applicants can view their own applications
CREATE POLICY "Allow users to create job applications" ON job_applications
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow users to view their own applications" ON job_applications
  FOR SELECT
  USING (email = auth.current_user()->>'email');

-- Only admins can view all applications and update them
CREATE POLICY "Allow admins to manage job applications" ON job_applications
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Only admins can delete applications
CREATE POLICY "Admins can delete applications" ON job_applications
  FOR DELETE
  USING (auth.uid() IN (SELECT id FROM profiles WHERE is_admin = TRUE));

-- Create storage bucket for job documents
INSERT INTO storage.buckets (id, name) 
VALUES ('job_documents', 'job_documents')
ON CONFLICT (id) DO NOTHING;

-- Set up storage bucket policies
CREATE POLICY "Public users can upload job documents" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'job_documents');

CREATE POLICY "Users can view their own job documents" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'job_documents' AND auth.uid()::text = owner);

CREATE POLICY "Admins can access all job documents" ON storage.objects
  FOR ALL
  USING (
    bucket_id = 'job_documents' AND 
    auth.uid() IN (SELECT id FROM profiles WHERE is_admin = TRUE)
  );

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to update the updated_at column
CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON job_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample jobs
INSERT INTO jobs (title, description, requirements, responsibilities, location, job_type, deadline)
VALUES
  (
    'የፕሮጀክት ማናጀር',
    'የፕሮጀክት እቅድ፣ ትግበራ እና ክትትል የሚያደርግ ሰው እንፈልጋለን።',
    'ቢያንስ የ3 አመት የስራ ልምድ፣ የፕሮጀክት አስተዳደር ሰርተፊኬት፣ የመሪነት ችሎታ',
    'የፕሮጀክት እቅድ ማዘጋጀት፣ የቡድን አባላትን መምራት፣ ሪፖርት ማዘጋጀት',
    'አዲስ አበባ',
    'full_time',
    NOW() + INTERVAL '30 days'
  ),
  (
    'የመረጃ ተንታኝ',
    'የመረጃ ትንተና እና ሪፖርት የሚያዘጋጅ ባለሙያ እንፈልጋለን።',
    'የስታትስቲክስ ወይም የመረጃ ሳይንስ ዲግሪ፣ የ Python እና R ፕሮግራሚንግ ችሎታ',
    'የመረጃ ትንተና፣ ሪፖርት ማዘጋጀት፣ የመረጃ ቋት ማዘጋጀት',
    'አዲስ አበባ',
    'contract',
    NOW() + INTERVAL '15 days'
  ),
  (
    'የህዝብ ግንኙነት ባለሙያ',
    'የህዝብ ግንኙነት እና ኮሚዩኒኬሽን ስራዎችን የሚያከናውን ባለሙያ እንፈልጋለን።',
    'የህዝብ ግንኙነት ዲግሪ፣ የ2 አመት የስራ ልምድ፣ የጽሁፍ እና የንግግር ችሎታ',
    'የህዝብ ግንኙነት ስራዎችን ማከናወን፣ ፕሬስ ሪሊዝ ማዘጋጀት፣ ሚዲያ ግንኙነቶችን ማጠናከር',
    'አዲስ አበባ',
    'full_time',
    NOW() + INTERVAL '20 days'
  ); 