# CMH Watch - Design Document

## Overview

CMH Watch is a public accountability website focused on Cambridge Memorial Hospital (CMH) in Cambridge, Ontario, Canada. The site documents concerns about racism and mistreatment of minorities, tracks communications with responsible individuals, and empowers the community to take action.

## Core Principles

- **Person-centric accountability**: Every communication is directed to and tracked against named individuals, not departments or organizations. No one hides behind generic inboxes.
- **Evidence-first**: Documented facts are separated from personal accounts. Every claim in "The Facts" is backed by verifiable evidence.
- **Professional and investigative tone**: No sensationalism. Formal language, neutral presentation, facts speak for themselves.
- **Empowerment**: The site makes it easy for community members to file their own requests, send their own letters, and share their own stories.

## Tech Stack

- **Framework**: Next.js (static site generation)
- **Hosting**: Railway (or Cloudflare Pages as fallback)
- **Content**: Markdown files for documented facts, timeline entries, and person profiles
- **Community submissions**: Form with email notification or database backend
- **Domain**: cmhwatch.ca or cmhwatch.org

## Site Structure

### 1. Home Page

- Headline: "Holding Cambridge Memorial Hospital Accountable"
- One paragraph mission statement
- Three calls to action: Read the Facts, Share Your Story, Take Action
- Latest update prominently displayed
- Stats bar: officials contacted, responses received, community stories shared

### 2. The Facts

Documented, verifiable evidence only. First content piece is the FOI request.

**FOI Request (First Publication):**

Filed under FIPPA (Freedom of Information and Protection of Privacy Act), targeting:
- Records of patient complaints related to racism, discrimination, or mistreatment of minorities (personal health info redacted)
- Internal policies and procedures for handling discrimination complaints
- Statistics on complaint outcomes (upheld, dismissed, investigated)
- Internal reviews or audits related to equity, diversity, or cultural competency

**Page displays:**
- Exact text of the FOI request
- Date filed, named recipient
- 30-day legally required response timeline
- Status tracker
- Response when received (or documentation of delays, refusals, fees)
- Appeal to Information and Privacy Commissioner if denied

**Pattern escalation:** When multiple independent Community Voices submissions describe the same pattern, that pattern is documented here as a finding (e.g., "X independent accounts describe similar treatment in the Emergency Department").

### 3. Who's Responsible - The Accountability Map

Interactive visual map showing the full chain of accountability. Person-centric, not organization-centric.

**Each person's profile page tracks:**
- Full name, title, photo (from public sources)
- Their specific responsibilities and why they're accountable
- Every communication sent TO them (date, method, exact content)
- Every response FROM them (or explicit "No response as of [date]")
- Days since last contact without response (running counter)
- Public statements they've made on the topic

#### Hospital Leadership (Inner Ring)

| Name | Title |
|------|-------|
| Patrick Gaskin | President & CEO |
| Dr. Winnie Lee | Chief of Staff |
| Stephanie Pearsall | VP Clinical Programs & Chief Nursing Executive |
| Mari Iromoto | VP People & Strategy |
| Trevor Clark | VP Finance, Corporate Services & CFO |
| Lynn Woeller | Board Chair |
| Diane Wilkinson | Board Vice Chair |
| Patient Relations Office | No named individual publicly available (519-621-2333 ext. 2360) |

#### Department Chiefs

| Name | Department |
|------|-----------|
| Dr. M. Runnalls | Emergency Medicine |
| Dr. J. Legassie | Hospital Medicine |
| Dr. A. Nguyen | Internal Medicine |
| Dr. A. Sharma | Mental Health |
| Dr. L. Green | Surgery |
| Dr. F. Esan | Community & Family Medicine |
| Dr. M. Hindle | Anesthesia |
| Dr. J. Bourgeois | Laboratory Medicine |
| Dr. A. Mendlowitz | Obstetrics |
| Dr. M. Rajguru | Pediatrics |

#### Board of Directors

Chair: Lynn Woeller, Vice Chair: Diane Wilkinson

Members: S. Alvarado, J. Tulsani, B. Conway, Dr. M. Shafir, T. Barker, J. Goyal, J. Herring, M. Lauzon, P. Brasil, M. Hempel, Dr. V. Miropolsky, Dr. M. McKinnon

Ex officio: Dr. W. Lee (Chief of Staff), S. Pearsall (VP Clinical), P. Gaskin (CEO)

#### Government Officials (Outer Ring)

| Name | Title |
|------|-------|
| Jan Liggett | Mayor of Cambridge |
| Brian Riddell | MPP for Cambridge (Progressive Conservative) |
| Connie Cody | MP for Cambridge (Conservative) |
| Karen Redman | Waterloo Region Chair |
| Doug Craig | Regional Councillor for Cambridge |
| Pam Wolf | Regional Councillor for Cambridge |
| Sylvia Jones | Ontario Minister of Health & Deputy Premier |

#### Regulatory Bodies (Connected Nodes)

| Name | Title / Organization |
|------|---------------------|
| Craig Thompson | Ontario Patient Ombudsman |
| Patricia DeGuire | Chief Commissioner, Ontario Human Rights Commission |
| Dr. Nancy Whitmore | Registrar & CEO, College of Physicians and Surgeons of Ontario |
| Silvie Crawford | CEO, College of Nurses of Ontario |
| Matthew Anderson | President & CEO, Ontario Health |
| Nicole Robinson | Interim Chief Regional Officer, Ontario Health West Region |

### 4. Community Voices

**Submission form collects:**
- Their story (free text)
- Date(s) of incident(s)
- Department/area of hospital involved
- Names of staff involved (optional, held privately, not published without verification)
- Identity preference: fully named, anonymous publicly but identified to submitter admin, or fully anonymous
- Contact method for follow-up (optional)
- Consent checkbox acknowledging the story may be published

**Published stories display:**
- The account, edited only for clarity (never substance)
- Date range of incident
- Department involved
- Attribution: full name, first name only, or "Anonymous community member"
- Disclaimer banner: "Community Voices are personal accounts. They have not been independently verified by CMH Watch."

**Moderation process:**
- Every submission reviewed before publishing
- Remove anything creating legal liability (unverified claims about named staff)
- Follow up privately with submitters who provide contact info
- Patterns across multiple submissions escalate to "The Facts" section

### 5. Take Action

Ready-made letter templates, each pre-addressed to specific named people:

- **FOI request template** - addressed to CMH FOI Coordinator, CC'd to Patrick Gaskin
- **Patient Ombudsman complaint** - addressed to Craig Thompson
- **OHRC complaint template** - addressed to Patricia DeGuire
- **Letter to MPP Brian Riddell** - asking about healthcare accountability in Cambridge
- **Letter to MP Connie Cody** - requesting federal attention
- **Letter to Mayor Jan Liggett** - requesting the issue be raised at council
- **Letter to Regional Chair Karen Redman** - regarding regional health oversight

**Each template includes:**
- Named recipient, mailing address, email, and phone
- Pre-written body text the sender can personalize
- Instructions to CC CMH Watch (to track engagement volume)
- Encouragement to report back what response they received

**Progress dashboard:**
- Letters sent to each person and response count
- Response rate per official
- Community-reported response data

### 6. Updates / Timeline

Chronological log of all actions taken, responses received, and developments. Every entry dated and attributed to specific people.

## Launch Sequence

1. **Day 1**: Site goes live with FOI request documented, accountability map populated, Take Action templates ready
2. **Day 1**: Formal notification letter sent to every named person on the accountability map informing them the site exists
3. **Week 1**: Open Community Voices submissions
4. **Ongoing**: Every response or non-response logged publicly. New filings, letters, and replies added to timeline.

## SEO Strategy

Target searches:
- "Cambridge Memorial Hospital complaints"
- "CMH racism"
- "Cambridge hospital accountability"
- Individual names + CMH or Cambridge Memorial (e.g., "Patrick Gaskin Cambridge Memorial")
- Government official names + healthcare (e.g., "Brian Riddell healthcare")

## Legal Safeguards

- "The Facts" contains only verifiable, documented information
- "Community Voices" carries a clear disclaimer that accounts are not independently verified
- Stories are moderated before publishing
- Unverified claims about named staff are not published
- Clear separation between documented facts and personal accounts

## Research Sources and Caveats

- CMH Patient Relations Director: no named individual publicly available
- Some board members identified only by initials in public minutes
- MP Connie Cody took office April 28, 2025 (Bryan May was MP before that)
- Ontario Health West Region lead (Nicole Robinson) is interim
- All government positions subject to elections and appointments; next Cambridge municipal election is October 2026
- All data sourced from official websites, public meeting minutes, and news reporting as of February 2026
