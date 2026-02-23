// Admin API: Import Leads to Database
// POST /api/admin/seed-leads
// Imports leads from CV Lead Tracker as both referrers AND candidates

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Sample leads data - In production, this would be read from file/database
// For full import, use the leads_for_supabase.json file
const sampleLeads = [
  { name: 'Zawng Hkawng', email: 'zawng4@gmail.com', phone: '09767610030', role_category: 'Management', skills: 'leadership, communication' },
  { name: 'H T U N', email: 'eizinmartun092@gmail.com', phone: '09798854087', role_category: 'Engineering', skills: 'python, mysql, sql, communication' },
  { name: 'Pan Ei Kyaw', email: 'paneikyaw058@gmail.com', phone: '09980195394', role_category: 'General/Other', skills: 'excel, powerpoint, communication' },
  { name: 'Shwe Yee Poe Han', email: 'shweyeepoehan.jitjit@gmail.com', phone: '09766472505', role_category: 'Management', skills: 'excel, communication, analytical, problem solving' },
  { name: 'Moe May Zin Oo', email: 'moemayzinoo@protonmail.com', phone: '09267547396', role_category: 'HR & Admin', skills: 'excel, communication' },
];

function generateReferralCode(): string {
  return 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function cleanPhone(phone: string | null): string | null {
  if (!phone) return null;
  const cleaned = phone.toString().replace(/[^\d]/g, '');
  if (cleaned.startsWith('95') && cleaned.length > 10) {
    return '0' + cleaned.substring(2);
  }
  return cleaned.length >= 9 ? cleaned : null;
}

export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Option to receive leads from request body
    let leadsToImport = sampleLeads;
    
    try {
      const body = await request.json();
      if (body.leads && Array.isArray(body.leads)) {
        leadsToImport = body.leads;
      }
    } catch {
      // Use sample leads if no body provided
    }

    const results = { inserted: 0, skipped: 0, errors: [] as string[] };

    for (const lead of leadsToImport) {
      try {
        const cleanPhoneNum = cleanPhone(lead.phone || null);
        
        // Check if user already exists by email or phone
        const { data: existingUsers } = await supabase
          .from('User')
          .select('id')
          .or(`email.eq.${lead.email},phone.eq.${cleanPhoneNum}`);
        
        if (existingUsers && existingUsers.length > 0) {
          results.skipped++;
          continue;
        }

        // Create user as both referrer AND candidate
        const userRecord = {
          email: lead.email || null,
          phone: cleanPhoneNum,
          name: lead.name,
          referral_code: generateReferralCode(),
          role_category: lead.role_category || null,
          skills: lead.skills ? lead.skills.split(',').map((s: string) => s.trim()) : null,
          // Referrer properties
          points: 50,
          total_points_earned: 50,
          streak: 1,
          max_streak: 1,
          total_referrals: 0,
          successful_referrals: 0,
          total_earned: 0,
          level: 'Amateur',
          // Candidate properties
          is_candidate: true,
          is_referrer: true,
          // Status
          status: 'imported',
          source: 'cv_lead_tracker',
          notified: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        const { error } = await supabase.from('User').insert(userRecord);
        
        if (error) {
          if (error.code === '23505') { // Duplicate key
            results.skipped++;
          } else {
            results.errors.push(`${lead.name}: ${error.message}`);
          }
        } else {
          results.inserted++;
        }
      } catch (err: any) {
        results.errors.push(`${lead.name}: ${err.message}`);
      }
    }

    // Get final count
    const { count } = await supabase.from('User').select('*', { count: 'exact', head: true });

    return NextResponse.json({
      success: true,
      message: `Imported ${results.inserted} leads, skipped ${results.skipped} duplicates`,
      totalUsersInDatabase: count,
      results,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'POST to this endpoint to import leads',
    sampleLeads: sampleLeads.length,
    instructions: {
      step1: 'Prepare leads data in JSON format',
      step2: 'POST to /api/admin/seed-leads with { leads: [...] }',
      step3: 'Each lead needs: name, email (optional), phone (optional), role_category, skills',
      note: 'Leads will be imported as BOTH referrers AND candidates',
    },
  });
}
