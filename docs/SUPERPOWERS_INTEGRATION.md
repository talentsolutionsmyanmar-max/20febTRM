# Superpowers Framework Integration for ReferTRM

> **Version:** 1.0
> **Created:** February 22, 2026
> **Status:** PLANNING - Not Yet Implemented
> **Source:** Based on analysis of github.com/obra/superpowers by Jesse Vincent (58K+ stars)

---

## Executive Summary

**Superpowers** is an agentic skills framework that transforms AI from reactive code generators into systematic, methodical workers. This document outlines how ReferTRM will adapt this framework for career development and referral hiring in Myanmar.

### Core Concept Translation

| Superpowers (Code) | ReferTRM Adaptation (Careers) |
|--------------------|-------------------------------|
| **Skill** | Markdown instruction for coding task |
| **Trigger** | File type, code context |
| **Workflow** | TDD cycle, code review |
| **Validation** | Tests pass, lint clean |
| **Subagent** | Parallel coding tasks |

---

## Our Unique Addition: REFERRER Skills

**This is our MOAT.** Unlike generic career platforms, ReferTRM's 80% referrer reward model is unique. We train REFERRERS, not just candidates.

### Referrer Skills (Priority 1)

```
┌─────────────────────────────────────────────────────────────────────┐
│  FORGOTTEN USER SEGMENT: REFERRERS                                  │
│  ─────────────────────────────────────────                          │
│                                                                     │
│  Our model: 80% to referrer. This is UNIQUE.                        │
│  Superpowers should train REFERRERS too:                            │
│                                                                     │
│  SKILL: "spotting-talent.md"                                        │
│  ┌─────────────────────────────────────────────────────┐           │
│  │ Trigger: User views job listing                     │           │
│  │ Content: How to identify if friend is good match    │           │
│  │ Action: Suggest candidates from their network       │           │
│  │ Validation: Referral submitted → Interview → Hire   │           │
│  └─────────────────────────────────────────────────────┘           │
│                                                                     │
│  SKILL: "referral-outreach.md"                                      │
│  ┌─────────────────────────────────────────────────────┐           │
│  │ Trigger: Job match found for referrer's network     │           │
│  │ Content: Template messages (Telegram/WhatsApp)      │           │
│  │ Action: Send personalized referral link             │           │
│  │ Validation: Click rate → Response rate → Apply rate │           │
│  └─────────────────────────────────────────────────────┘           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Proposed Skill Directory Structure

```
/skills/
├── triggers/
│   ├── onboarding-trigger.md      # Fires when new user signs up
│   ├── profile-incomplete.md      # Fires when profile < 50%
│   ├── job-match-found.md         # Fires when algorithm finds match
│   ├── streak-broken.md           # Fires when daily login missed
│   └── referral-submitted.md      # Fires when referral made
│
├── pathways/
│   ├── candidate/
│   │   ├── sdr-foundation.md      # Sales Development Rep track
│   │   ├── interview-prep.md      # Interview preparation
│   │   └── resume-builder.md      # Resume creation
│   │
│   └── referrer/
│       ├── spot-talent.md         # How to identify good candidates
│       ├── outreach-templates.md  # Message templates
│       └── track-referral.md      # Follow-up guidance
│
├── wellness/
│   ├── financial-literacy.md      # Budgeting, KPay usage
│   ├── rejection-resilience.md    # Handling job rejection
│   └── burnout-prevention.md      # Work-life balance
│
└── validation/
    ├── employer-feedback.md       # Post-interview validation
    ├── placement-success.md       # Hire confirmation
    └── wellness-check.md          # Monthly check-in
```

---

## Technical Implementation (Phase 1 - JSON Only)

### Simplified Skill Loader (Unlike Superpowers' Complex Graph)

```typescript
// src/lib/skill-loader.ts

interface Skill {
  id: string;
  trigger: TriggerCondition;
  content: string; // Markdown content
  actions: Action[];
  validation: ValidationCriteria;
}

interface TriggerCondition {
  type: 'user_action' | 'time_based' | 'context_match';
  conditions: Record<string, any>;
}

// Example: Profile incomplete trigger
const profileIncompleteTrigger: TriggerCondition = {
  type: 'user_action',
  conditions: {
    event: 'profile_view',
    profileCompletion: { $lt: 50 }
  }
};

// Skill loads ONLY when triggered (token efficiency from Superpowers)
async function loadSkillOnTrigger(userId: string, event: string): Promise<Skill[]> {
  const user = await getUser(userId);
  const matchingSkills = skills.filter(skill => 
    evaluateTrigger(skill.trigger, user, event)
  );
  
  // Return only triggered skills (not all skills) - KEY SUPERPOWERS CONCEPT
  return matchingSkills;
}
```

---

## Trust Architecture (Myanmar-Specific)

Superpowers assumes users TRUST the system. In Myanmar, we need additional layers:

### 1. Human Gates (Not Optional)

```
┌─────────────────────────────────────────────────────────────────────┐
│  TRUST ARCHITECTURE                                                 │
│  ───────────────────                                                │
│                                                                     │
│  1. HUMAN GATES (Not Optional)                                      │
│     • Every AI recommendation → Human staff approval                │
│     • Show: "Reviewed by Mg Mg, ReferTRM Staff" on matches          │
│                                                                     │
│  2. TRANSPARENT AI                                                  │
│     • Show WHY match was made (not black box)                       │
│     • "This job matches because: 3 skills + location + salary"      │
│                                                                     │
│  3. COMMUNITY VALIDATION                                            │
│     • Show reviews from other users                                 │
│     • "5 people you know referred candidates here"                  │
│                                                                     │
│  4. GOVERNMENT BACKING                                              │
│     • Ministry of Labor license visible on every page               │
│     • Display: "Licensed Employment Agency #XXXX"                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Infrastructure Resilience (Myanmar-Specific)

Superpowers assumes reliable infrastructure. Myanmar requires:

### 1. Offline-First

- PWA with service worker (ALREADY IMPLEMENTED ✓)
- Download skills as markdown (small files)
- Sync when connection returns

### 2. Telegram-Native Delivery

- Telegram is reliable in Myanmar
- Send skills as Telegram messages (not app-based)
- Bot API for interactive workflows

### 3. Edge Caching

- Cloudflare Workers for static content
- Cache skills locally in Myanmar region
- Reduce latency from 500ms to 50ms

---

## Revenue Model Enhancement (Referral-Centric)

### Kimi's Analysis vs. Our Reality

**Kimi's Model:** Placement fees only ($300-500 per placement)

**Our Enhanced Model:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  REVENUE STREAMS (Diversified)                                      │
│  ─────────────────────────────                                      │
│                                                                     │
│  1. PLACEMENT FEES (Primary) - As per COFOUNDER_PRIORITY_ROADMAP    │
│     • Candidate placement: 15-20% of first year salary              │
│     • Average: $300-500 per hire                                    │
│                                                                     │
│  2. REFERRER REWARDS FEES (Our Moat)                                │
│     • We take 20% of referral reward                                │
│     • Example: $100 reward → $80 to referrer, $20 to us             │
│     • Volume play: 100 referrals/month = $2,000                     │
│                                                                     │
│  3. ACADEMY SUBSCRIPTION (Recurring)                                │
│     • Free: Basic courses                                           │
│     • Premium: $5/month for advanced pathways                       │
│     • Corporate: $50/month/company for unlimited employee access    │
│                                                                     │
│  4. CLIENT SUBSCRIPTION (SaaS)                                      │
│     • Job postings: $50/month for 5 active jobs                     │
│     • Talent pool access: $100/month                                │
│     • Premium matching: $200/month (AI-powered)                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1-2) - $0 Cost

**Focus: Referrers First (Our Unique Advantage)**

- [ ] Create `/skills/triggers/` directory structure
- [ ] Create `/skills/pathways/referrer/` with 3 skills
- [ ] Build basic skill loader (JSON-based, no Neo4j)
- [ ] Implement `spotting-talent.md` trigger on job view
- [ ] Test with 10 beta referrers

**Success Criteria:**
- 10 referrers complete "spotting talent" skill
- 5 referrals submitted from trained referrers

### Phase 2: Candidate Pathway (Week 3-4) - $0 Cost

**Focus: SDR Training (Sales Development Rep)**

- [ ] Create `/skills/pathways/candidate/sdr-foundation.md`
- [ ] Implement `profile-incomplete.md` trigger
- [ ] Add wellness skill: `rejection-resilience.md`
- [ ] Link to existing Academy courses
- [ ] Test with 20 candidates

**Success Criteria:**
- 20 candidates complete SDR foundation
- 3 candidates get interviews

### Phase 3: Human-in-the-Loop MVP (Week 5-6) - $0 Cost

**Focus: Trust Architecture**

- [ ] Build staff approval dashboard
- [ ] Add "Reviewed by [Staff Name]" badges
- [ ] Implement transparent AI explanations
- [ ] Connect to Ministry of Labor license display
- [ ] Test end-to-end flow

**Success Criteria:**
- All AI recommendations have human approval
- 3 placements completed with trust architecture

### Phase 4: Scale (Month 3+) - $0-65/month

**Only after revenue validation**

- [ ] Evaluate Neo4j AuraDB Free (200k nodes)
- [ ] Add Groq free tier (14,400 req/day) for AI
- [ ] Implement advanced skill graph traversal
- [ ] Add subagent parallelism for multi-coach system

---

## Skill File Examples

### Example 1: spotting-talent.md (Referrer Skill)

```markdown
# Skill: Spotting Talent

## Trigger
- User views job listing
- User has < 3 referrals submitted

## Content

### How to Identify if Your Friend is a Good Match

1. **Check the Basics**
   - Does their experience match the job level?
   - Is their location compatible?
   - Are they actually looking for work?

2. **Look for Hidden Signals**
   - They complain about current job
   - They ask about your work
   - They shared job posts recently

3. **The REFER Test**
   - **R**elevant skills?
   - **E**xperience matches?
   - **F**lexible on salary?
   - **E**nthusiastic about change?
   - **R**eady to interview?

## Actions
- [ ] Open your phone contacts
- [ ] Think of 3 friends who might fit
- [ ] Check if they're on Telegram/WhatsApp
- [ ] Click "Submit Referral" below

## Validation
- Referral submitted with correct candidate info
- Candidate responds to outreach
- Candidate attends interview
- SUCCESS: Candidate hired
```

### Example 2: sdr-foundation.md (Candidate Skill)

```markdown
# Skill: SDR Foundation

## Trigger
- User selects "Sales" interest during onboarding
- User profile < 50% complete

## Content

### Sales Development Representative - 30 Day Path

#### Week 1: Foundation
- Day 1-2: What is an SDR?
- Day 3-4: Product Knowledge Basics
- Day 5-7: Communication Fundamentals

#### Week 2: Prospecting
- Day 8-10: Finding Leads
- Day 11-12: Research Techniques
- Day 13-14: First 50 Calls Practice

#### Week 3: Qualification
- Day 15-17: BANT Framework (adapted for Myanmar)
- Day 18-20: CHAMP Framework
- Day 21: Qualification Roleplay

#### Week 4: Objection Handling
- Day 22-24: Price Objections
- Day 25-27: Timing Objections
- Day 28-30: Authority Objections

## Actions
- [ ] Complete each day's module
- [ ] Practice scripts with AI coach
- [ ] Record 3 mock calls
- [ ] Get feedback and iterate

## Validation
- 50+ practice calls completed
- 5+ mock meetings booked
- Mock pitch score > 80%
- Wellness check: Burnout risk < 6/10
```

---

## What We Keep vs. Modify vs. Abandon from Superpowers

### ✅ KEEP

- Markdown-based pathway definitions
- Auto-triggering logic (context-aware skill invocation)
- Two-phase validation (learn then validate)
- Cost-optimized AI usage (load only triggered skills)
- Git-versioned curriculum

### 🔧 MODIFY

- Simplify graph: Start with JSON files, upgrade to Neo4j only when >500 users
- Add human gates: AI recommends, staff approves final placements
- Mandatory wellness: Financial literacy triggers automatically, not optional
- Mobile-first: All visualizations work on 5-inch screens, 3G networks
- Burmese language: All content dual-language (English for tech, Burmese for concepts)

### ❌ ABANDON

- Git worktrees (irrelevant for our use case)
- Full subagent parallelism (too complex, simulate with queues)
- Code-specific tooling (TDD metaphors don't apply)

---

## Alignment with Existing Documents

### COFOUNDER_PRIORITY_ROADMAP.md

**Superpowers supports Priority 1 (Get First Placement):**
- Triggers automate candidate/referrer engagement
- Validation ensures quality referrals
- Human gates maintain trust

### STRATEGIC_PLAN_SKILL_GRAPH.md

**Superpowers enhances the Skill Graph plan:**
- Skills become the "nodes" in our graph
- Triggers become the "edges" connecting skills to users
- Phase 1-4 approach aligns with cost-conscious strategy

### GLM5_SKILLS.md

**Superpowers extends GLM5 skills:**
- Adds "Skill Trigger System" module
- Enhances existing Academy skill
- Provides systematic methodology

---

## Success Metrics

### Week 2 Validation
- [ ] 10 referrers complete "spotting talent" skill
- [ ] 5 referrals submitted from trained referrers
- [ ] 70%+ find the skill useful

### Week 4 Validation
- [ ] 20 candidates with skill profiles
- [ ] 30%+ complete at least 1 module
- [ ] 3 candidates get interviews

### Week 6 Validation
- [ ] All AI recommendations have human approval
- [ ] 3 placements completed
- [ ] Clear feedback for iteration

---

## Document History

| Date | Author | Changes |
|------|--------|---------|
| Feb 22, 2026 | GLM 5 Co-founder | Initial planning document based on Superpowers analysis |

---

*This document represents strategic planning for Superpowers integration. Implementation will proceed in phases aligned with COFOUNDER_PRIORITY_ROADMAP.md priorities.*
