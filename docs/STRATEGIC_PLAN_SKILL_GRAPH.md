# ReferTRM Strategic Plan: Skill Graph & Career Verticals

**Document Date:** February 2026
**Status:** Strategic Planning - NOT YET IMPLEMENTED
**Priority:** Future Enhancement (After Core Platform Validation)

---

## Executive Summary

This document captures the analysis and strategic planning for implementing a Skill Graph system on ReferTRM. The skill graph concept transforms static content (courses, jobs, skills) into an interconnected network where AI agents can traverse nodes to compose personalized learning and career paths.

**Key Decision:** Start with **SALES** as the first career vertical, NOT IT/Software.

---

## Part 1: Skill Graph Concept Overview

### What Is a Skill Graph?

```
┌─────────────────────────────────────────────────────────────────┐
│                     SKILL GRAPH CONCEPT                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Node = Atomic Unit (skill, course, milestone, wellness item)  │
│   Edge = Relationship (prerequisite, unlocks, relates-to)       │
│   AI Agent = Traverses graph to compose personalized paths      │
│                                                                  │
│   Example:                                                       │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐                 │
│   │ Python   │───▶│ Data     │───▶│ Data     │                 │
│   │ Basics   │    │ Structures│   │ Analyst  │                 │
│   └──────────┘    └──────────┘    │ Job      │                 │
│         │                          └──────────┘                 │
│         │        ┌──────────┐            ▲                      │
│         └───────▶│ Stress   │────────────┘                      │
│                  │ Mgmt     │ (wellness helps get job)          │
│                  └──────────┘                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Origin: "arscontexta" System
- Skills stored as modular files/nodes
- AI agents navigate and compose nodes
- Complex tasks broken into atomic skills
- Graph learns and evolves based on usage

---

## Part 2: Myanmar Market Analysis

### Job Market by Volume (Estimated 2024-2026)

| Volume | Industries |
|--------|------------|
| VERY HIGH | Sales, Marketing, Customer Service, Admin/Office, Retail |
| HIGH | Accounting, Hospitality, Logistics, Banking Entry-Level |
| MEDIUM | Manufacturing, Healthcare Support |
| LOW | IT/Software, Engineering, Research, Specialized Tech, Legal |

### Key Insight for Referral Platform
**High volume + High turnover + Clear skills = BEST TARGET**

---

## Part 3: Career Vertical Ranking

### Ranking Criteria

| Factor | Weight | Why It Matters |
|--------|--------|----------------|
| Job Volume | 25% | More openings = more referral opportunities |
| Skill Clarity | 20% | Clear skills = better matching |
| Employer Budget | 20% | Will they pay referral fees? |
| Candidate Pool | 15% | Large pool = more referrers |
| Career Progression | 10% | Roadmap value for users |
| Training Need | 10% | Academy relevance |

### Final Ranking

| Rank | Vertical | Score | Reason |
|------|----------|-------|--------|
| #1 | **Sales Executive** | 88/100 | Highest volume, measurable skills, willing payers |
| #2 | Customer Service | 82/100 | High volume, lower referral fees |
| #3 | Marketing | 78/100 | Good but harder to quantify skills |
| #4 | Accounting | 75/100 | Requires certification, smaller pool |
| #5 | Administrative | 72/100 | Low fees, limited career path |
| NOT RECOMMENDED | IT/Software | N/A | Small market, high competition, low volume in Myanmar |

---

## Part 4: Why Sales First

### Job Market Reality

```
ESTIMATED SALES OPENINGS PER MONTH IN MYANMAR:
─────────────────────────────────────────────
Yangon:        500-800 sales positions
Mandalay:      200-400 sales positions
Other Cities:  300-500 sales positions
─────────────────────────────────────────────
TOTAL:         1,000-1,700+ monthly openings
```

### Companies Hiring Sales in Myanmar

- FMCG: Coca-Cola Pinya, Unilever, Nestlé
- Telco: MPT, Telenor, Ooredoo (indirect)
- Banking: KBZ, CB Bank, AYA Bank
- Insurance: IAG, AXA, KBZ Life
- Real Estate: Multiple developers
- Retail: City Mart, Orange, Super One
- B2B: Manufacturing, Trading, Services

### Average Referral Rewards

| Role | Reward Range (MMK) |
|------|-------------------|
| Entry Sales | 50,000 - 150,000 |
| Experienced Sales | 150,000 - 300,000 |
| Sales Manager | 300,000 - 500,000 |

### Clear, Measurable Skills

Sales skills are quantifiable:
- Number of calls made
- Conversion rates
- Revenue generated
- Customer retention

This makes skill matching accurate and trustworthy.

### Career Progression

```
SALARY (MMK)      ROLE                    TIME TO REACH
────────────────────────────────────────────────────────
1,500,000+       Sales Director         8-15 years
800,000-1,500,000  Sales Manager       4-8 years
400,000-800,000   Senior Sales Exec    2-4 years
250,000-400,000   Sales Executive      1-2 years
150,000-250,000   Jr Sales / Trainee   START
```

---

## Part 5: Sales Skill Graph MVP

### Skill Clusters

#### LEVEL 1: FOUNDATION (Entry-Level)
- Product Knowledge
- Customer Service Basics
- Basic Communication
- Phone Sales
- Door-to-Door Techniques
- Retail Selling

#### LEVEL 2: INTERMEDIATE
- Negotiation Skills
- Objection Handling
- Closing Techniques
- B2B Sales Basics
- CRM Usage (Salesforce)
- Pipeline Management

#### LEVEL 3: ADVANCED
- Account Management
- Strategic Selling
- Team Leadership

#### WELLNESS INTEGRATION
- Rejection Resilience
- Sales Stress Management
- Time Management
- Communication Confidence

### Job Roles Mapped to Skills

| Role | Required Skills | Salary Range |
|------|----------------|--------------|
| Junior Sales | Product Knowledge, Communication, Customer Service | 150K-250K MMK |
| Sales Executive | Prospecting, Presentation, Objection Handling, Closing | 250K-400K MMK |
| Senior Sales | All above + CRM, Phone Sales, Wellness skills | 400K-800K MMK |

---

## Part 6: Implementation Phases

### Phase 1: "Paper Prototype" (0 cost, 1-2 weeks)
- Map skills on paper/Google Sheets
- Define relationships manually
- Create 1 career vertical (Sales)
- Test concept with 5-10 users

### Phase 2: "JSON Static Graph" (0 cost, 2-3 weeks)
- Convert to JSON structure
- Implement basic pathfinding in browser (graphlib)
- Simple visualization
- Test with 50 users

### Phase 3: "Free Tier Pilot" (0-25/month, 1 month)
- Neo4j AuraDB Free (200k nodes)
- Groq free tier (14,400 req/day)
- Vercel + Supabase (existing)
- Test with 500 users

### Phase 4: "Validated Growth" (25-65/month, after revenue)
- Only after proving value
- Neo4j Pro when hitting limits
- Additional AI capacity
- Scale with paying customers

---

## Part 7: Cost Reality Check

### Free Tier Limits (Realistic 2026 Numbers)

| Service | Free Tier | Limits |
|---------|-----------|--------|
| Neo4j AuraDB | Free | 200k nodes, 400k relationships, auto-pause after 3 days |
| Groq | Free | 14,400 req/day, 70K tokens/min (varies by model) |
| Mistral | Free | Limited - better as paid backup |
| Vercel | Free | 100GB bandwidth, serverless functions |
| Supabase | Free | 500MB database, 2GB bandwidth |

### Cost Projection

| Phase | Monthly Cost | Users Supported | When to Move Up |
|-------|--------------|-----------------|-----------------|
| Phase 1 | $0 | 10 (test) | Concept validated |
| Phase 2 | $0 | 50-100 | JSON becomes unwieldy |
| Phase 3 | $0-25 | 500-1,000 | Hit Neo4j/Groq limits |
| Phase 4 | $65-100 | 5,000-10,000 | Revenue justifies |

---

## Part 8: Myanmar Market Considerations

### Opportunities

| Factor | Opportunity |
|--------|-------------|
| Mobile-first users (95%+) | Graph visualization mobile-optimized |
| Career-focused culture | Clear roadmaps = high value |
| Skills gap | Skill graphs address directly |
| Scam concerns | Transparent AI matching builds trust |
| Low English proficiency | Bilingual nodes (Myanmar + English) |

### Challenges

| Factor | Challenge | Solution |
|--------|-----------|----------|
| Tech literacy | Complex graphs may confuse | Simple UI, progressive disclosure |
| Slow internet | Heavy graph loading | Client-side caching, offline mode |
| Cost sensitivity | Users won't pay for complex | Core free, premium for advanced |
| Local job market | Limited roles in some fields | Start with high-demand verticals |

---

## Part 9: Key Decisions

### Decision 1: Career Vertical
**CHOSEN: Sales Executive / Sales Representative**

Reasons:
- Highest job volume in Myanmar
- Clear, measurable skills
- Employers willing to pay referral fees
- Large candidate pool
- Clear career progression
- Skills are teachable

### Decision 2: Implementation Timing
**CHOSEN: Defer full implementation until core platform validated**

Start with:
1. Sales skill tags on jobs
2. Basic academy content (5 modules)
3. Static career path display
4. Manual skill matching

Then add:
5. JSON-based skill graph
6. Prerequisite logic
7. Progress tracking
8. Basic visualization

Finally:
9. AI-powered recommendations
10. Full graph visualization
11. Wellness integration
12. Automated job matching

### Decision 3: Budget Approach
**CHOSEN: Zero-cost MVP, scale with revenue**

- Phase 1-2: $0 (JSON + browser-based)
- Phase 3: $0-25 (free tiers only)
- Phase 4: $65-100 (only after revenue)

---

## Part 10: Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Over-engineering early | Wasted time, money | Start with JSON, validate before Neo4j |
| Complex UI confuses users | Low adoption | Simple interface, progressive disclosure |
| Content creation burden | Slow launch | AI-assisted content, start small |
| Myanmar language barriers | Poor UX | Bilingual content, local team review |
| Free tier limits hit unexpectedly | Service disruption | Monitor usage, have paid backup ready |

---

## Part 11: Success Metrics

### Phase 1 Validation
- [ ] 10 users complete concept test
- [ ] 70%+ find roadmap concept valuable
- [ ] Clear feedback on what to improve

### Phase 2 Validation
- [ ] 50 users with skill profiles
- [ ] 30%+ complete at least 1 module
- [ ] Average 3+ skills recorded per user

### Phase 3 Validation
- [ ] 500 users with skill profiles
- [ ] 20%+ job match rate improvement
- [ ] First referral fee from skill-matched candidate

### Phase 4 Validation
- [ ] Revenue covers infrastructure costs
- [ ] 5,000+ users with skill profiles
- [ ] Employers specifically request skill-matched candidates

---

## Document History

| Date | Author | Changes |
|------|--------|---------|
| Feb 2026 | Strategic Planning | Initial analysis and planning document |

---

## Next Review Date

**Review after:** Core platform reaches 100 active users or first 10 paid referrals

---

*This document represents strategic planning for future implementation. Do not implement until core platform is validated and generating revenue.*
