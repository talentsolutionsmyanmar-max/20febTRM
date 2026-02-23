import ZAI from 'z-ai-web-dev-sdk';

// Job titles to translate
const jobTitles = [
  { id: 'job_001', title: 'Senior Supervisor' },
  { id: 'job_002', title: 'Warehouse Supervisor' },
  { id: 'job_003', title: 'Content & Script Writer' },
  { id: 'job_004', title: 'Site Engineer' },
  { id: 'job_005', title: 'Data Collector' },
  { id: 'job_006', title: 'Loan Officer' },
  { id: 'job_007', title: 'Cashier' },
  { id: 'job_008', title: 'Brand Executive' },
  { id: 'job_009', title: 'Assistant Brand Manager' },
  { id: 'job_010', title: 'Receptionist' },
  { id: 'job_011', title: 'Assistant Accountant' },
  { id: 'job_012', title: 'Accountant' },
  { id: 'job_013', title: 'Online Sale' },
  { id: 'job_014', title: 'Graphic Designer' },
  { id: 'job_015', title: 'Senior Sales Executive' },
  { id: 'job_016', title: 'Senior Agency Sales Representative' },
  { id: 'job_017', title: 'Admin Supervisor' },
  { id: 'job_018', title: 'IT Supervisor' },
  { id: 'job_019', title: 'Sales Staff' },
  { id: 'job_020', title: 'Senior Page Admin' },
  { id: 'job_021', title: 'Junior Page Admin' },
  { id: 'job_022', title: 'Junior Accountant' },
  { id: 'job_023', title: 'Accountant' },
  { id: 'job_024', title: 'Assistant Project Coordinator' },
  { id: 'job_025', title: 'Interior Designer' },
  { id: 'job_026', title: 'Quantity Surveyor' }
];

async function translateJobTitles() {
  try {
    const zai = await ZAI.create();

    const prompt = `You are an expert Burmese translator specializing in professional job titles for Myanmar job market.

Translate the following job titles from English to Burmese. These are professional job titles used in Myanmar's job market.

IMPORTANT GUIDELINES:
1. Use standard Myanmar professional terminology
2. Use words that are commonly understood by Myanmar job seekers
3. Avoid literal translations that don't make sense in Myanmar context
4. For technical positions, use appropriate Myanmar technical terms
5. Return ONLY a JSON array with format: [{"id": "job_XXX", "title": "English Title", "title_mm": "Burmese Translation"}]

Job titles to translate:
${JSON.stringify(jobTitles, null, 2)}

Return ONLY valid JSON array, no additional text.`;

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a professional Burmese translator specializing in HR and job market terminology. You understand Myanmar business context and use appropriate formal language for job titles. Always return valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });

    const response = completion.choices[0]?.message?.content;
    
    if (response) {
      // Extract JSON from response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const translations = JSON.parse(jsonMatch[0]);
        console.log('\n=== TRANSLATIONS ===\n');
        console.log(JSON.stringify(translations, null, 2));
        
        // Output as simple map for easy reference
        console.log('\n=== SIMPLE MAP ===\n');
        translations.forEach((t: any) => {
          console.log(`'${t.id}': '${t.title_mm}',  // ${t.title}`);
        });
      }
    }

  } catch (error) {
    console.error('Translation error:', error);
  }
}

translateJobTitles();
