-- Jobs Feature Migration Script

-- Create extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  responsibilities TEXT,
  location TEXT,
  job_type TEXT CHECK (job_type IN ('full_time', 'part_time', 'contract', 'internship')),
  deadline DATE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comment to the table
COMMENT ON TABLE jobs IS 'Table for storing job listings';

-- Add indexes for faster searching
CREATE INDEX IF NOT EXISTS idx_jobs_job_type ON jobs (job_type);
CREATE INDEX IF NOT EXISTS idx_jobs_is_active ON jobs (is_active);
CREATE INDEX IF NOT EXISTS idx_jobs_deadline ON jobs (deadline);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs (created_at);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to read active jobs
CREATE POLICY "Anyone can view active jobs" 
ON jobs FOR SELECT 
USING (is_active = TRUE);

-- Allow admins to do anything
CREATE POLICY "Admins can do anything with jobs" 
ON jobs FOR ALL 
USING (
  auth.uid() IN (
    SELECT user_id FROM admins
  )
);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update the updated_at column
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON jobs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO jobs (title, description, requirements, responsibilities, location, job_type, deadline, is_active)
VALUES
  (
    'የሚዲያ እና ኮሙኒኬሽን ስፔሻሊስት',
    'የወጣት ክንፍ የሚዲያ እና ኮሙኒኬሽን ዘርፍ ለሚዲያ እና ኮሙኒኬሽን ስራ የሚሆን ባለሙያ ይፈልጋል። ይህ ባለሙያ የሚዲያ ይዘቶችን በማዘጋጀት፣ ማህበራዊ ሚዲያዎችን በማስተዳደር እና የውስጥ እና የውጭ ኮሙኒኬሽንን በማስተባበር ላይ ያተኩራል።',
    'ከሚዲያ ወይም ኮሙኒኬሽን ዘርፍ የመጀመሪያ ዲግሪ
የሚዲያ ቅርጸት ማበጀት ችሎታ
የማህበራዊ ሚዲያ አስተዳደር ልምድ
ጥሩ የኢንተርኔት እና የቴክኖሎጂ ክህሎት
አማርኛን እና እንግሊዘኛን በደንብ መቻል',
    'የሚዲያ ይዘቶች ማዘጋጀት እና ማስተካከል
የማህበራዊ ሚዲያ ገጾችን ማስተዳደር
ለውጭ ሚዲያዎች የሚሰጡ መግለጫዎችን ማዘጋጀት
የወጣት ክንፍ ድረ-ገጽ ማዘመን
የዜናዎችን ክትትል እና ትንተና ማድረግ',
    'አዲስ አበባ',
    'full_time',
    '2023-12-31',
    TRUE
  ),
  (
    'የፕሮጀክት አስተባባሪ',
    'የወጣት ክንፍ የፕሮጀክት አስተባባሪ ለመቅጠር ይፈልጋል። ይህ አስተባባሪ የተለያዩ የወጣቶች ማብቃት ፕሮጀክቶችን በማቀድ፣ በማስተባበር እና በመተግበር ላይ ያተኩራል።',
    'ከቢዝነስ ወይም ማኔጅመንት ዘርፍ ዲግሪ
ቢያንስ 2 ዓመት የፕሮጀክት አስተዳደር ልምድ
ጥሩ የክትትል እና ግምገማ ችሎታ
ጥሩ የቡድን አመራር ችሎታ
ጥሩ የኮምፒውተር ችሎታ',
    'የፕሮጀክት ዕቅዶችን ማዘጋጀት
የፕሮጀክት ትግበራን መቆጣጠር
የፕሮጀክት ሪፖርቶችን ማዘጋጀት
ከባለድርሻ አካላት ጋር መተባበር
የፕሮጀክት ግምገማ ማድረግ',
    'አዲስ አበባ',
    'full_time',
    '2023-12-15',
    TRUE
  ),
  (
    'የአባላት ምዝገባ ክትትል ባለሙያ',
    'የወጣት ክንፍ የአባላት ምዝገባ እና ክትትል ባለሙያ ይፈልጋል። ይህ ባለሙያ የአባላት ምዝገባን በማስተባበር፣ መረጃዎችን በማደራጀት እና ሪፖርቶችን በማዘጋጀት ላይ ያተኩራል።',
    'ቢያንስ ዲፕሎማ ወይም ዲግሪ
ጥሩ የመረጃ አያያዝ ክህሎት
ጥሩ የኮምፒውተር ችሎታ (Excel, Word, Database)
ጥሩ የአገልግሎት አቅርቦት ችሎታ
ጥሩ የቡድን ስራ ችሎታ',
    'የአባላት መረጃ መመዝገብ እና ማደራጀት
የአባላት መረጃ ዳታቤዝ ማዘመን
የዕድሳት ክትትል ማድረግ
የአባልነት ካርድ ማዘጋጀት
የወርሃዊ እና ዓመታዊ ሪፖርቶችን ማዘጋጀት',
    'አዲስ አበባ',
    'part_time',
    '2023-11-30',
    TRUE
  );

-- End of migration script 