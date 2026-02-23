-- ============================================
-- REFERTRM LEADS IMPORT - PART 1
-- Run this FIRST in Supabase SQL Editor
-- ============================================

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  role_category VARCHAR(100),
  experience VARCHAR(100),
  skills TEXT,
  status VARCHAR(50) DEFAULT 'active',
  priority VARCHAR(50),
  processed_date DATE,
  notes TEXT,
  source VARCHAR(100) DEFAULT 'cv_lead_tracker',
  created_at TIMESTAMP DEFAULT NOW()
);
