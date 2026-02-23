import ZAI from 'z-ai-web-dev-sdk';

// Job titles with context for better translation
const jobTitlesWithContext = [
  { id: 'job_001', title: 'Senior Supervisor', context: 'Manufacturing/Steel industry - senior level supervisory role' },
  { id: 'job_002', title: 'Warehouse Supervisor', context: 'Managing warehouse operations, inventory, stock management' },
  { id: 'job_003', title: 'Content & Script Writer', context: 'Media company - writing content and scripts for videos/social media' },
  { id: 'job_004', title: 'Site Engineer', context: 'Construction - engineer who oversees construction work at the actual construction site, NOT port engineer' },
  { id: 'job_005', title: 'Data Collector', context: 'Market research - collecting survey data in the field' },
  { id: 'job_006', title: 'Loan Officer', context: 'Microfinance - handling loan applications and customer relations' },
  { id: 'job_007', title: 'Cashier', context: 'Financial services - person who handles cash transactions at counter' },
  { id: 'job_008', title: 'Brand Executive', context: 'Consumer goods - managing brand marketing activities' },
  { id: 'job_009', title: 'Assistant Brand Manager', context: 'Consumer goods - assisting brand management' },
  { id: 'job_010', title: 'Receptionist', context: 'Office front desk - greeting visitors, answering phones' },
  { id: 'job_011', title: 'Assistant Accountant', context: 'Insurance company - assisting with accounting tasks' },
  { id: 'job_012', title: 'Accountant', context: 'General accounting role' },
  { id: 'job_013', title: 'Online Sale', context: 'E-commerce - selling products through online platforms' },
  { id: 'job_014', title: 'Graphic Designer', context: 'Retail/Sports - designing marketing materials' },
  { id: 'job_015', title: 'Senior Sales Executive', context: 'Retail - senior level sales role' },
  { id: 'job_016', title: 'Senior Agency Sales Representative', context: 'Marketing/Advertising - selling advertising services to agencies' },
  { id: 'job_017', title: 'Admin Supervisor', context: 'General office administration supervision' },
  { id: 'job_018', title: 'IT Supervisor', context: 'Telecommunications - supervising IT operations' },
  { id: 'job_019', title: 'Sales Staff', context: 'Retail - entry level sales position' },
  { id: 'job_020', title: 'Senior Page Admin', context: 'Managing social media pages/Facebook pages - senior level' },
  { id: 'job_021', title: 'Junior Page Admin', context: 'Managing social media pages - junior level' },
  { id: 'job_022', title: 'Junior Accountant', context: 'Entry level accounting position' },
  { id: 'job_023', title: 'Accountant', context: 'Trading company - accounting role' },
  { id: 'job_024', title: 'Assistant Project Coordinator', context: 'Assisting with project coordination tasks' },
  { id: 'job_025', title: 'Interior Designer', context: 'Interior design company' },
  { id: 'job_026', title: 'Quantity Surveyor', context: 'Construction - professional who estimates and manages construction costs' }
];

async function translateJobTitles() {
  try {
    const zai = await ZAI.create();

    const prompt = `You are a native Myanmar (Burmese) speaker and expert translator specializing in professional job titles for Myanmar job market. You understand Myanmar business terminology used in Yangon job market.

Translate the following job titles from English to Burmese. Use EXACT terminology that Myanmar job seekers understand and use commonly in job portals like JobNet.com.mm, MyWorld.com.mm.

CRITICAL RULES:
1. Use the EXACT Myanmar terms used in Myanmar job market, NOT literal translations
2. For "Site Engineer" in construction context: Use "တာဝန်ခံအင်ဂျင်နီယာ" or "နယ်ပြေအင်ဂျင်နီယာ" (site/field engineer) - NOT "ဆိပ်ကမ်း" (port)
3. For "Warehouse Supervisor": Use "ဂိုထောင်ကြီးကြပ်ရေးမှူး" or "ကုန်စုထိန်းသိမ်းရေးအရာရှိ"
4. For "Cashier": Use "ငွေတိုက်စာရေး" or "ငွေချေရေးမှူး" - NOT "ငွေထုတ်သူ"
5. For "Receptionist": Use "ကြိုဆိုရေးမှူး" (standard Myanmar term)
6. For "Quantity Surveyor": Use "ပမာဏတိုင်းတာစစ်ဆေးသူ" or "ဆောက်လုပ်ရေးကုန်ကျစာရင်းမှူး"

Return ONLY a JSON array with format: [{"id": "job_XXX", "title": "English Title", "title_mm": "Burmese Translation"}]

Job titles with context:
${JSON.stringify(jobTitlesWithContext, null, 2)}

Return ONLY valid JSON array, no additional text.`;

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a native Myanmar (Burmese) professional translator born and raised in Myanmar. You have 15+ years experience translating job-related content for Myanmar companies. You know the exact Myanmar terminology used in Yangon job market.

Common Myanmar job title translations:
- Supervisor = ကြီးကြပ်မှူး / အရာရှိ
- Manager = မန်နေဂျာ / ခေါင်းဆောင်
- Executive = မန်နေဂျာ / အရာရှိ
- Engineer = အင်ဂျင်နီယာ
- Accountant = စာရင်းကိုင် / စာရင်းအင်းမှူး
- Receptionist = ကြိုဆိုရေးမှူး
- Cashier = ငွေတိုက်စာရေး
- Sales = ရောင်းဝယ်ရေး
- Admin = အုပ်ချုပ်ရေး
- Staff = ဝန်ထမ်း

Always return valid JSON only.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 2000
    });

    const response = completion.choices[0]?.message?.content;
    
    if (response) {
      // Extract JSON from response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const translations = JSON.parse(jsonMatch[0]);
        console.log('\n=== REFINED TRANSLATIONS ===\n');
        console.log(JSON.stringify(translations, null, 2));
        
        // Output as simple map for easy reference
        console.log('\n=== SQL UPDATE FORMAT ===\n');
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
