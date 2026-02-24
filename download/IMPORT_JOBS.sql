-- ============================================
-- REFERTRM JOBS IMPORT - 26 URGENT POSITIONS
-- Run this in Supabase SQL Editor
-- Generated: 2026-02-22
-- ============================================

-- First, insert companies (if not exists)
INSERT INTO companies (id, name, industry, location) VALUES
('comp_rk_steel', 'RK Yangon Steel', 'Manufacturing', 'Thanlyin'),
('comp_universal', 'Universal Energy', 'Energy', 'Thingangyun'),
('comp_shwe_taung', 'Shwe Taung Htun', 'Media', 'Mingalar Taung Nyunt'),
('comp_sun_myat', 'Sun Myat Tun', 'Construction', 'Botahtaung'),
('comp_nielsen', 'NielsenIQ Myanmar', 'Market Research', 'Yangon'),
('comp_real_aid', 'Real Aid Microfinance', 'Finance', 'Ayeyarwady'),
('comp_unicharm', 'Unicharm Myanmar', 'Consumer Goods', 'Yankin'),
('comp_mit', 'Myanmar Information Technology', 'Technology', 'Insein'),
('comp_kbzlif', 'KBZ Life Insurance', 'Insurance', 'Bahan'),
('comp_salpyar', 'Salpyar', 'E-commerce', 'North Dagon'),
('comp_wow_sport', 'WOW Sport', 'Retail', 'Kamaryut'),
('comp_ami', 'AMI', 'Marketing', 'Kamaryut'),
('comp_tomo', 'TOMO', 'Technology', 'South Dagon'),
('comp_wave_plus', 'Wave Plus', 'Telecommunications', 'Mingalardon'),
('comp_yangoods', 'Yangoods', 'Retail', 'Pyin Oo Lwin'),
('comp_gk_intl', 'GK International Company', 'Trading', 'Kamaryut'),
('comp_delight', 'Delight Amatat', 'Interior Design', 'Thingangyun')
ON CONFLICT (id) DO NOTHING;

-- Insert Jobs (26 Urgent Positions)
INSERT INTO jobs (id, title, title_mm, company, company_id, location, salary, salary_min, salary_max, reward, skills, type, level, urgent, status, description, posted_at) VALUES
('job_001', 'Senior Supervisor', 'Senior Supervisor', 'RK Yangon Steel', 'comp_rk_steel', 'Thanlyin', '7.5 Lakhs to 10 Lakhs', 750000, 1000000, 200000, '["leadership", "team management", "communication", "problem solving"]', 'Full-time', 'Senior', true, 'active', 'Senior Supervisor position at RK Yangon Steel. Location: Thanlyin. Salary: 7.5 Lakhs to 10 Lakhs', NOW()),

('job_002', 'Warehouse Supervisor', 'Warehouse Supervisor', 'Universal Energy', 'comp_universal', 'Thingangyun', 'Nego', 0, 0, 50000, '["leadership", "team management", "communication", "problem solving"]', 'Full-time', 'Mid', true, 'active', 'Warehouse Supervisor position at Universal Energy. Location: Thingangyun. Salary: Negotiable', NOW()),

('job_003', 'Content & Script Writer', 'Content & Script Writer', 'Shwe Taung Htun', 'comp_shwe_taung', 'Mingalar Taung Nyunt', '4 Lakhs to 6 Lakhs', 400000, 600000, 75000, '["writing", "creative", "research", "social media"]', 'Full-time', 'Mid', true, 'active', 'Content & Script Writer position at Shwe Taung Htun. Location: Mingalar Taung Nyunt. Salary: 4 Lakhs to 6 Lakhs', NOW()),

('job_004', 'Site Engineer', 'Site Engineer', 'Sun Myat Tun', 'comp_sun_myat', 'Botahtaung', '7.5 Lakhs', 750000, 750000, 200000, '["technical", "problem solving", "project management", "autocad"]', 'Full-time', 'Mid', true, 'active', 'Site Engineer position at Sun Myat Tun. Location: Botahtaung. Salary: 7.5 Lakhs', NOW()),

('job_005', 'Data Collector', 'Data Collector', 'NielsenIQ Myanmar', 'comp_nielsen', 'Mdy, Sagaing, Meikhtila', '3.5 Lakhs', 350000, 350000, 50000, '["data collection", "excel", "attention to detail", "research"]', 'Full-time', 'Mid', true, 'active', 'Data Collector position at NielsenIQ Myanmar. Location: Mandalay, Sagaing, Meikhtila. Salary: 3.5 Lakhs', NOW()),

('job_006', 'Loan Officer', 'Loan Officer', 'Real Aid Microfinance', 'comp_real_aid', 'Ayeyarwady', '4 Lakhs to 5 Lakhs', 400000, 500000, 75000, '["finance", "customer service", "documentation", "analysis"]', 'Full-time', 'Entry', true, 'active', 'Loan Officer position at Real Aid Microfinance. Location: Ayeyarwady. Salary: 4 Lakhs to 5 Lakhs', NOW()),

('job_007', 'Cashier', 'Cashier', 'Real Aid Microfinance', 'comp_real_aid', 'Ayeyarwady', 'Above 3 Lakhs', 300000, 300000, 50000, '["cash handling", "customer service", "excel", "accuracy"]', 'Full-time', 'Mid', true, 'active', 'Cashier position at Real Aid Microfinance. Location: Ayeyarwady. Salary: Above 3 Lakhs', NOW()),

('job_008', 'Brand Executive', 'Brand Executive', 'Unicharm Myanmar', 'comp_unicharm', 'Yankin', '7 Lakhs to 9 Lakhs', 700000, 900000, 200000, '["marketing", "branding", "communication", "analysis"]', 'Full-time', 'Mid', true, 'active', 'Brand Executive position at Unicharm Myanmar. Location: Yankin. Salary: 7 Lakhs to 9 Lakhs', NOW()),

('job_009', 'Assistant Brand Manager', 'Assistant Brand Manager', 'Unicharm Myanmar', 'comp_unicharm', 'Yankin', '15 Lakhs to 17 Lakhs', 1500000, 1700000, 400000, '["marketing", "branding", "communication", "analysis"]', 'Full-time', 'Entry', true, 'active', 'Assistant Brand Manager position at Unicharm Myanmar. Location: Yankin. Salary: 15 Lakhs to 17 Lakhs', NOW()),

('job_010', 'Receptionist', 'Receptionist', 'Myanmar Information Technology', 'comp_mit', 'Insein', '3 Lakhs to 4 Lakhs', 300000, 400000, 50000, '["communication", "customer service", "excel", "phone etiquette"]', 'Full-time', 'Mid', true, 'active', 'Receptionist position at Myanmar Information Technology. Location: Insein. Salary: 3 Lakhs to 4 Lakhs', NOW()),

('job_011', 'Assistant Accountant', 'Assistant Accountant', 'KBZ Life Insurance', 'comp_kbzlif', 'Bahan', '4 Lakhs to 5 Lakhs', 400000, 500000, 200000, '["accounting", "excel", "quickbooks", "financial reporting"]', 'Full-time', 'Entry', true, 'active', 'Assistant Accountant position at KBZ Life Insurance. Location: Bahan. Salary: 4 Lakhs to 5 Lakhs', NOW()),

('job_012', 'Accountant', 'Accountant', 'Universal Energy', 'comp_universal', 'Thingangyun', '6 Lakhs to 7 Lakhs', 600000, 700000, 200000, '["accounting", "excel", "quickbooks", "financial reporting"]', 'Full-time', 'Mid', true, 'active', 'Accountant position at Universal Energy. Location: Thingangyun. Salary: 6 Lakhs to 7 Lakhs', NOW()),

('job_013', 'Online Sale', 'Online Sale', 'Salpyar', 'comp_salpyar', 'North Dagon', '2.4 Lakhs', 240000, 240000, 50000, '["sales", "negotiation", "communication", "customer relationship"]', 'Full-time', 'Mid', true, 'active', 'Online Sale position at Salpyar. Location: North Dagon. Salary: 2.4 Lakhs', NOW()),

('job_014', 'Graphic Designer', 'Graphic Designer', 'WOW Sport', 'comp_wow_sport', 'Kamaryut', 'Around 10 Lakhs', 1000000, 1000000, 300000, '["adobe photoshop", "illustrator", "creative", "design"]', 'Full-time', 'Mid', true, 'active', 'Graphic Designer position at WOW Sport. Location: Kamaryut. Salary: Around 10 Lakhs', NOW()),

('job_015', 'Senior Sales Executive', 'Senior Sales Executive', 'WOW Sport', 'comp_wow_sport', 'Kamaryut', '10 Lakhs', 1000000, 1000000, 300000, '["sales", "negotiation", "communication", "customer relationship"]', 'Full-time', 'Senior', true, 'active', 'Senior Sales Executive position at WOW Sport. Location: Kamaryut. Salary: 10 Lakhs', NOW()),

('job_016', 'Senior Agency Sales Representative', 'Senior Agency Sales Representative', 'AMI', 'comp_ami', 'Kamaryut', '5 Lakhs to 6.5 Lakhs', 500000, 650000, 75000, '["sales", "negotiation", "communication", "customer relationship"]', 'Full-time', 'Senior', true, 'active', 'Senior Agency Sales Representative position at AMI. Location: Kamaryut. Salary: 5 Lakhs to 6.5 Lakhs', NOW()),

('job_017', 'Admin Supervisor', 'Admin Supervisor', 'TOMO', 'comp_tomo', 'South Dagon', '5 Lakhs to 6 Lakhs', 500000, 600000, 75000, '["leadership", "team management", "communication", "problem solving"]', 'Full-time', 'Mid', true, 'active', 'Admin Supervisor position at TOMO. Location: South Dagon. Salary: 5 Lakhs to 6 Lakhs', NOW()),

('job_018', 'IT Supervisor', 'IT Supervisor', 'Wave Plus', 'comp_wave_plus', 'Mingalardon', '6 Lakhs', 600000, 600000, 75000, '["leadership", "team management", "communication", "problem solving"]', 'Full-time', 'Mid', true, 'active', 'IT Supervisor position at Wave Plus. Location: Mingalardon. Salary: 6 Lakhs', NOW()),

('job_019', 'Sales Staff', 'Sales Staff', 'Yangoods', 'comp_yangoods', 'Pyin Oo Lwin', '2.04 Lakhs', 204000, 204000, 50000, '["sales", "negotiation", "communication", "customer relationship"]', 'Full-time', 'Entry', true, 'active', 'Sales Staff position at Yangoods. Location: Pyin Oo Lwin. Salary: 2.04 Lakhs', NOW()),

('job_020', 'Senior Page Admin', 'Senior Page Admin', 'TOMO', 'comp_tomo', 'Tamwe', 'Nego', 0, 0, 50000, '["administration", "excel", "organization", "communication"]', 'Full-time', 'Senior', true, 'active', 'Senior Page Admin position at TOMO. Location: Tamwe. Salary: Negotiable', NOW()),

('job_021', 'Junior Page Admin', 'Junior Page Admin', 'TOMO', 'comp_tomo', 'Tamwe', '3 Lakhs to 3.5 Lakhs', 300000, 350000, 50000, '["administration", "excel", "organization", "communication"]', 'Full-time', 'Entry', true, 'active', 'Junior Page Admin position at TOMO. Location: Tamwe. Salary: 3 Lakhs to 3.5 Lakhs', NOW()),

('job_022', 'Junior Accountant', 'Junior Accountant', 'Unicharm Myanmar', 'comp_unicharm', 'Yankin', '3.5 Lakhs to 4 Lakhs', 350000, 400000, 200000, '["accounting", "excel", "quickbooks", "financial reporting"]', 'Full-time', 'Entry', true, 'active', 'Junior Accountant position at Unicharm Myanmar. Location: Yankin. Salary: 3.5 Lakhs to 4 Lakhs', NOW()),

('job_023', 'Accountant', 'Accountant', 'GK International Company', 'comp_gk_intl', 'Kamaryut', '6.5 Lakhs to 8 Lakhs', 650000, 800000, 200000, '["accounting", "excel", "quickbooks", "financial reporting"]', 'Full-time', 'Mid', true, 'active', 'Accountant position at GK International Company. Location: Kamaryut. Salary: 6.5 Lakhs to 8 Lakhs', NOW()),

('job_024', 'Assistant Project Coordinator', 'Assistant Project Coordinator', 'GK International Company', 'comp_gk_intl', 'Kamaryut', '3.5 Lakhs to 5 Lakhs', 350000, 500000, 75000, '["project management", "coordination", "communication", "planning"]', 'Full-time', 'Entry', true, 'active', 'Assistant Project Coordinator position at GK International Company. Location: Kamaryut. Salary: 3.5 Lakhs to 5 Lakhs', NOW()),

('job_025', 'Interior Designer', 'Interior Designer', 'Delight Amatat', 'comp_delight', 'Thingangyun', '10 Lakhs to 15 Lakhs', 1000000, 1500000, 300000, '["design", "autocad", "3d modeling", "creative"]', 'Full-time', 'Mid', true, 'active', 'Interior Designer position at Delight Amatat. Location: Thingangyun. Salary: 10 Lakhs to 15 Lakhs', NOW()),

('job_026', 'Quantity Surveyor', 'Quantity Surveyor', 'Delight Amatat', 'comp_delight', 'Thingangyun', '10 Lakhs to 15 Lakhs', 1000000, 1500000, 300000, '["quantity surveying", "cost estimation", "construction", "measurement"]', 'Full-time', 'Mid', true, 'active', 'Quantity Surveyor position at Delight Amatat. Location: Thingangyun. Salary: 10 Lakhs to 15 Lakhs', NOW())
ON CONFLICT (id) DO NOTHING;
