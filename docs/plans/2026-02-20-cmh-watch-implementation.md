# CMH Watch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a public accountability website (CMH Watch) that tracks named individuals responsible for oversight of Cambridge Memorial Hospital, documents FOI requests and evidence, accepts community story submissions, and provides action templates.

**Architecture:** Next.js 15 App Router with static site generation. Content stored as JSON data files (person profiles, timeline entries, letter templates). Tailwind CSS for styling with a professional, investigative tone. Community submission form uses Next.js API route that sends email notifications. Each person in the accountability chain gets their own profile page with a communication tracker.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, next-mdx-remote (for rich content), Resend (email API for form submissions), Railway (deployment)

---

## Phase 1: Project Scaffolding

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`

**Step 1: Create Next.js project with TypeScript and Tailwind**

Run:
```bash
cd /Users/moe/Sites/hospital-fixer
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Accept defaults. This scaffolds the project in the current directory.

**Step 2: Verify it runs**

Run: `npm run dev`
Expected: Dev server starts at localhost:3000

**Step 3: Clean up default boilerplate**

Replace `src/app/page.tsx` with a minimal placeholder:
```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-center pt-20">CMH Watch</h1>
      <p className="text-center text-gray-600 mt-4">Coming soon</p>
    </main>
  );
}
```

Replace `src/app/layout.tsx` metadata:
```tsx
export const metadata: Metadata = {
  title: "CMH Watch - Holding Cambridge Memorial Hospital Accountable",
  description: "Tracking accountability at Cambridge Memorial Hospital. Documenting concerns about racism and mistreatment of minorities.",
};
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js project with TypeScript and Tailwind"
```

---

### Task 2: Set Up Project Directory Structure

**Files:**
- Create directories: `src/data/`, `src/components/`, `src/lib/`, `src/app/facts/`, `src/app/accountability/`, `src/app/community-voices/`, `src/app/take-action/`, `src/app/timeline/`

**Step 1: Create directory structure**

```bash
mkdir -p src/data src/components/layout src/components/ui src/lib
mkdir -p src/app/facts src/app/accountability src/app/accountability/[slug]
mkdir -p src/app/community-voices src/app/take-action src/app/timeline
```

**Step 2: Add placeholder pages for each route**

Create each `page.tsx` with a simple heading matching the section name:
- `src/app/facts/page.tsx` - "The Facts"
- `src/app/accountability/page.tsx` - "Who's Responsible"
- `src/app/community-voices/page.tsx` - "Community Voices"
- `src/app/take-action/page.tsx` - "Take Action"
- `src/app/timeline/page.tsx` - "Timeline"

Each placeholder:
```tsx
export default function PageName() {
  return (
    <main className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold">Section Name</h1>
      <p className="text-gray-600 mt-4">Content coming soon.</p>
    </main>
  );
}
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add directory structure and placeholder pages"
```

---

### Task 3: Create Site Layout and Navigation

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Step 1: Define color palette and typography in globals.css**

Professional, investigative tone. Dark navy primary, white backgrounds, red accents for urgency.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-navy: #1a2332;
  --color-navy-light: #2d3a4a;
  --color-red-accent: #c0392b;
  --color-gray-warm: #f8f7f5;
}
```

**Step 2: Build Header component**

Navigation with site name "CMH Watch" and links to all 5 sections. Mobile responsive with hamburger menu. Professional, no-nonsense styling.

```tsx
// src/components/layout/Header.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/facts", label: "The Facts" },
  { href: "/accountability", label: "Who's Responsible" },
  { href: "/community-voices", label: "Community Voices" },
  { href: "/take-action", label: "Take Action" },
  { href: "/timeline", label: "Timeline" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[var(--color-navy)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold tracking-tight">
            CMH Watch
          </Link>
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-gray-700">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-gray-300 hover:text-white py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
```

**Step 3: Build Footer component**

```tsx
// src/components/layout/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] text-gray-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm">
          <p className="font-medium text-white">CMH Watch</p>
          <p className="mt-2">
            Holding Cambridge Memorial Hospital accountable for the treatment of all patients.
          </p>
          <p className="mt-4 text-xs">
            The Facts section contains documented, verifiable information.
            Community Voices are personal accounts that have not been independently verified.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 4: Wire layout together in `src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CMH Watch - Holding Cambridge Memorial Hospital Accountable",
  description:
    "Tracking accountability at Cambridge Memorial Hospital. Documenting concerns about racism and mistreatment of minorities.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

**Step 5: Verify navigation works**

Run: `npm run dev`
Visit each route in browser. Verify header, footer, and navigation links all render.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add site layout with header navigation and footer"
```

---

## Phase 2: Data Layer

### Task 4: Create Person Profile Data

**Files:**
- Create: `src/data/people.ts`
- Create: `src/lib/types.ts`

**Step 1: Define TypeScript types**

```tsx
// src/lib/types.ts

export type PersonCategory =
  | "hospital-leadership"
  | "department-chief"
  | "board-member"
  | "government-official"
  | "regulatory-body";

export type CommunicationStatus = "not-contacted" | "contacted" | "responded" | "no-response";

export interface Communication {
  date: string; // ISO date
  method: "email" | "letter" | "phone" | "in-person" | "foi-request";
  recipientName: string;
  subject: string;
  content: string; // Full text of communication
  response?: {
    date: string;
    content: string;
  };
}

export interface Person {
  slug: string;
  name: string;
  title: string;
  organization: string;
  category: PersonCategory;
  responsibilities: string; // Why they are accountable
  contactInfo: {
    email?: string;
    phone?: string;
    address?: string;
  };
  communications: Communication[];
  publicStatements: {
    date: string;
    source: string;
    content: string;
    url?: string;
  }[];
}

export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
  personSlugs: string[]; // Links to people involved
  category: "foi-request" | "letter-sent" | "response-received" | "community-update" | "media" | "government";
}

export interface CommunityStory {
  id: string;
  story: string;
  incidentDateRange: string;
  department: string;
  attribution: string; // Full name, first name, or "Anonymous community member"
  publishedDate: string;
}
```

**Step 2: Create people data file with all researched individuals**

```tsx
// src/data/people.ts
import { Person } from "@/lib/types";

export const people: Person[] = [
  // Hospital Leadership
  {
    slug: "patrick-gaskin",
    name: "Patrick Gaskin",
    title: "President & CEO",
    organization: "Cambridge Memorial Hospital",
    category: "hospital-leadership",
    responsibilities: "Ultimate executive authority over hospital operations, policies, and patient care standards. Responsible for organizational culture and accountability.",
    contactInfo: {
      phone: "519-621-2333",
    },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "dr-winnie-lee",
    name: "Dr. Winnie Lee",
    title: "Chief of Staff",
    organization: "Cambridge Memorial Hospital",
    category: "hospital-leadership",
    responsibilities: "Oversees all medical staff. Responsible for clinical standards, physician conduct, and quality of medical care delivered to patients.",
    contactInfo: {
      phone: "519-621-2333",
    },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "stephanie-pearsall",
    name: "Stephanie Pearsall",
    title: "VP Clinical Programs & Chief Nursing Executive",
    organization: "Cambridge Memorial Hospital",
    category: "hospital-leadership",
    responsibilities: "Oversees nursing staff and clinical programs. Responsible for patient care delivery, nursing conduct, and clinical service quality.",
    contactInfo: {
      phone: "519-621-2333",
    },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "mari-iromoto",
    name: "Mari Iromoto",
    title: "VP People & Strategy",
    organization: "Cambridge Memorial Hospital",
    category: "hospital-leadership",
    responsibilities: "Oversees human resources, hiring, training, and organizational strategy. Responsible for staff conduct policies and equity/diversity initiatives.",
    contactInfo: {
      phone: "519-621-2333",
    },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "trevor-clark",
    name: "Trevor Clark",
    title: "VP Finance, Corporate Services & CFO",
    organization: "Cambridge Memorial Hospital",
    category: "hospital-leadership",
    responsibilities: "Oversees hospital finances and corporate services. Controls budget allocation including resources for patient relations and equity programs.",
    contactInfo: {
      phone: "519-621-2333",
    },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "lynn-woeller",
    name: "Lynn Woeller",
    title: "Board Chair",
    organization: "Cambridge Memorial Hospital",
    category: "hospital-leadership",
    responsibilities: "Chairs the CMH Board of Directors. Responsible for board governance, executive oversight, and ensuring the hospital serves its community equitably.",
    contactInfo: {
      phone: "519-621-2333",
    },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "diane-wilkinson",
    name: "Diane Wilkinson",
    title: "Board Vice Chair",
    organization: "Cambridge Memorial Hospital",
    category: "hospital-leadership",
    responsibilities: "Vice Chair of the CMH Board. Shares governance responsibility with the Chair for executive oversight and community accountability.",
    contactInfo: {
      phone: "519-621-2333",
    },
    communications: [],
    publicStatements: [],
  },
  // Department Chiefs
  {
    slug: "dr-m-runnalls",
    name: "Dr. M. Runnalls",
    title: "Chief, Emergency Medicine",
    organization: "Cambridge Memorial Hospital",
    category: "department-chief",
    responsibilities: "Leads the Emergency Department. Responsible for emergency care standards, ER physician conduct, and patient treatment in acute settings.",
    contactInfo: { phone: "519-621-2333" },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "dr-j-legassie",
    name: "Dr. J. Legassie",
    title: "Chief, Hospital Medicine",
    organization: "Cambridge Memorial Hospital",
    category: "department-chief",
    responsibilities: "Leads Hospital Medicine. Responsible for inpatient care standards and hospitalist physician conduct.",
    contactInfo: { phone: "519-621-2333" },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "dr-a-nguyen",
    name: "Dr. A. Nguyen",
    title: "Chief, Internal Medicine",
    organization: "Cambridge Memorial Hospital",
    category: "department-chief",
    responsibilities: "Leads Internal Medicine. Responsible for internal medicine care standards and specialist conduct.",
    contactInfo: { phone: "519-621-2333" },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "dr-a-sharma",
    name: "Dr. A. Sharma",
    title: "Chief, Mental Health",
    organization: "Cambridge Memorial Hospital",
    category: "department-chief",
    responsibilities: "Leads Mental Health services. Responsible for psychiatric care standards, patient dignity in mental health treatment.",
    contactInfo: { phone: "519-621-2333" },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "dr-l-green",
    name: "Dr. L. Green",
    title: "Chief, Surgery",
    organization: "Cambridge Memorial Hospital",
    category: "department-chief",
    responsibilities: "Leads Surgical services. Responsible for surgical care standards and surgeon conduct.",
    contactInfo: { phone: "519-621-2333" },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "dr-f-esan",
    name: "Dr. F. Esan",
    title: "Chief, Community & Family Medicine",
    organization: "Cambridge Memorial Hospital",
    category: "department-chief",
    responsibilities: "Leads Community & Family Medicine. Responsible for primary care standards within the hospital.",
    contactInfo: { phone: "519-621-2333" },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "dr-m-hindle",
    name: "Dr. M. Hindle",
    title: "Chief, Anesthesia",
    organization: "Cambridge Memorial Hospital",
    category: "department-chief",
    responsibilities: "Leads Anesthesia department. Responsible for anesthesia care standards and department conduct.",
    contactInfo: { phone: "519-621-2333" },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "dr-j-bourgeois",
    name: "Dr. J. Bourgeois",
    title: "Chief, Laboratory Medicine",
    organization: "Cambridge Memorial Hospital",
    category: "department-chief",
    responsibilities: "Leads Laboratory Medicine. Responsible for diagnostic testing standards.",
    contactInfo: { phone: "519-621-2333" },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "dr-a-mendlowitz",
    name: "Dr. A. Mendlowitz",
    title: "Chief, Obstetrics",
    organization: "Cambridge Memorial Hospital",
    category: "department-chief",
    responsibilities: "Leads Obstetrics. Responsible for maternal care standards and equitable treatment during childbirth.",
    contactInfo: { phone: "519-621-2333" },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "dr-m-rajguru",
    name: "Dr. M. Rajguru",
    title: "Chief, Pediatrics",
    organization: "Cambridge Memorial Hospital",
    category: "department-chief",
    responsibilities: "Leads Pediatrics. Responsible for child care standards and equitable treatment of children and families.",
    contactInfo: { phone: "519-621-2333" },
    communications: [],
    publicStatements: [],
  },
  // Government Officials
  {
    slug: "jan-liggett",
    name: "Jan Liggett",
    title: "Mayor of Cambridge",
    organization: "City of Cambridge",
    category: "government-official",
    responsibilities: "Mayor of the city where CMH operates. Has a platform to raise healthcare concerns at council, advocate for residents, and apply political pressure for accountability.",
    contactInfo: {
      email: "LiggettJ@cambridge.ca",
      phone: "519-623-1340",
      address: "City of Cambridge, 50 Dickson Street, Cambridge, ON N1R 5W8",
    },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "brian-riddell",
    name: "Brian Riddell",
    title: "MPP for Cambridge",
    organization: "Ontario Legislature (Progressive Conservative)",
    category: "government-official",
    responsibilities: "Provincial representative for Cambridge. Healthcare is a provincial responsibility. Has direct ability to raise issues with the Minister of Health and advocate for constituents.",
    contactInfo: {
      email: "brian.riddell@pc.ola.org",
      phone: "519-623-3232",
      address: "73 Water Street North, Unit 1, Cambridge, ON N1R 1S4",
    },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "connie-cody",
    name: "Connie Cody",
    title: "MP for Cambridge",
    organization: "House of Commons (Conservative)",
    category: "government-official",
    responsibilities: "Federal representative for Cambridge. While healthcare is provincial, the federal government sets national health standards through the Canada Health Act and provides transfer payments.",
    contactInfo: {
      phone: "519-624-7440",
      address: "73 Water Street North, Suite 305, Cambridge, ON N1R 7L6",
    },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "karen-redman",
    name: "Karen Redman",
    title: "Regional Chair",
    organization: "Region of Waterloo",
    category: "government-official",
    responsibilities: "Elected Chair of Waterloo Region. The region plays a role in public health and community services that intersect with hospital care.",
    contactInfo: {
      email: "kredman@regionofwaterloo.ca",
      phone: "519-575-4400",
      address: "150 Frederick Street, Kitchener, ON N2G 4J3",
    },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "doug-craig",
    name: "Doug Craig",
    title: "Regional Councillor for Cambridge",
    organization: "Region of Waterloo",
    category: "government-official",
    responsibilities: "Regional Councillor representing Cambridge on Waterloo Regional Council. Former Cambridge Mayor (2000-2018). Has institutional knowledge and regional influence.",
    contactInfo: {
      email: "dcraig@regionofwaterloo.ca",
      phone: "519-575-4400",
    },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "pam-wolf",
    name: "Pam Wolf",
    title: "Regional Councillor for Cambridge",
    organization: "Region of Waterloo",
    category: "government-official",
    responsibilities: "Regional Councillor representing Cambridge. 16 years on Cambridge City Council before regional council. Has long-standing community ties.",
    contactInfo: {
      email: "pwolf@regionofwaterloo.ca",
      phone: "519-575-4400",
    },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "sylvia-jones",
    name: "Sylvia Jones",
    title: "Ontario Minister of Health & Deputy Premier",
    organization: "Government of Ontario",
    category: "government-official",
    responsibilities: "Minister of Health for Ontario. Has ultimate provincial authority over healthcare policy, hospital oversight, and the agencies that regulate hospitals.",
    contactInfo: {
      email: "sylvia.jones@pc.ola.org",
      phone: "416-327-4300",
      address: "Ministry of Health, 777 Bay Street, Toronto, ON M7A 2J3",
    },
    communications: [],
    publicStatements: [],
  },
  // Regulatory Bodies
  {
    slug: "craig-thompson",
    name: "Craig Thompson",
    title: "Patient Ombudsman",
    organization: "Ontario Patient Ombudsman",
    category: "regulatory-body",
    responsibilities: "Independent officer who investigates patient complaints about public hospitals, long-term care homes, and home care. The body of last resort for unresolved complaints.",
    contactInfo: {
      phone: "1-888-321-0339",
      address: "393 University Avenue, Suite 2000, Toronto, ON M5G 1E6",
    },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "patricia-deguire",
    name: "Patricia DeGuire",
    title: "Chief Commissioner",
    organization: "Ontario Human Rights Commission",
    category: "regulatory-body",
    responsibilities: "Leads the OHRC, which addresses systemic discrimination including in healthcare. Can initiate inquiries and make policy recommendations on racism in public services.",
    contactInfo: {
      phone: "416-326-9511",
      address: "180 Dundas Street West, Suite 900, Toronto, ON M7A 2G5",
    },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "dr-nancy-whitmore",
    name: "Dr. Nancy Whitmore",
    title: "Registrar & CEO",
    organization: "College of Physicians and Surgeons of Ontario",
    category: "regulatory-body",
    responsibilities: "Heads the CPSO, which regulates all physicians in Ontario. Investigates complaints about physician conduct, including discriminatory treatment by doctors.",
    contactInfo: {
      phone: "416-967-2600",
      address: "80 College Street, Toronto, ON M5G 2E2",
    },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "silvie-crawford",
    name: "Silvie Crawford",
    title: "Executive Director & CEO",
    organization: "College of Nurses of Ontario",
    category: "regulatory-body",
    responsibilities: "Heads the CNO, which regulates all nurses in Ontario. Investigates complaints about nursing conduct, including discriminatory treatment by nursing staff.",
    contactInfo: {
      phone: "416-928-0900",
      address: "101 Davenport Road, Toronto, ON M5R 3P1",
    },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "matthew-anderson",
    name: "Matthew Anderson",
    title: "President & CEO",
    organization: "Ontario Health",
    category: "regulatory-body",
    responsibilities: "Leads Ontario Health, the provincial agency that oversees and funds all hospitals. Has authority over hospital performance standards and accountability frameworks.",
    contactInfo: {
      email: "info@ontariohealth.ca",
      phone: "1-877-280-8538",
      address: "525 University Avenue, Toronto, ON M5G 2L3",
    },
    communications: [],
    publicStatements: [],
  },
  {
    slug: "nicole-robinson",
    name: "Nicole Robinson",
    title: "Interim Chief Regional Officer, West Region",
    organization: "Ontario Health",
    category: "regulatory-body",
    responsibilities: "Oversees Ontario Health's West Region, which includes Cambridge/Waterloo. Direct regional oversight of hospital operations and performance.",
    contactInfo: {
      email: "info@ontariohealth.ca",
      phone: "1-877-280-8538",
    },
    communications: [],
    publicStatements: [],
  },
];
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add TypeScript types and person profile data for all officials"
```

---

### Task 5: Create Data Access Utilities

**Files:**
- Create: `src/lib/people.ts`
- Create: `src/lib/utils.ts`

**Step 1: Write the failing test**

Create `src/lib/__tests__/people.test.ts`:

```tsx
import { getPersonBySlug, getPeopleByCategory, getAllPeople } from "@/lib/people";

describe("people data access", () => {
  it("returns a person by slug", () => {
    const person = getPersonBySlug("patrick-gaskin");
    expect(person).toBeDefined();
    expect(person?.name).toBe("Patrick Gaskin");
  });

  it("returns undefined for unknown slug", () => {
    const person = getPersonBySlug("nobody");
    expect(person).toBeUndefined();
  });

  it("returns people filtered by category", () => {
    const chiefs = getPeopleByCategory("department-chief");
    expect(chiefs.length).toBeGreaterThan(0);
    chiefs.forEach((p) => expect(p.category).toBe("department-chief"));
  });

  it("returns all people", () => {
    const all = getAllPeople();
    expect(all.length).toBeGreaterThan(20);
  });
});
```

**Step 2: Install Jest and configure for Next.js**

```bash
npm install -D jest @jest/globals ts-jest @types/jest
```

Create `jest.config.ts`:
```ts
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
```

**Step 3: Run test to verify it fails**

Run: `npx jest src/lib/__tests__/people.test.ts`
Expected: FAIL - module not found

**Step 4: Write minimal implementation**

```tsx
// src/lib/people.ts
import { people } from "@/data/people";
import { Person, PersonCategory } from "@/lib/types";

export function getPersonBySlug(slug: string): Person | undefined {
  return people.find((p) => p.slug === slug);
}

export function getPeopleByCategory(category: PersonCategory): Person[] {
  return people.filter((p) => p.category === category);
}

export function getAllPeople(): Person[] {
  return people;
}
```

**Step 5: Write utility for days-since-contact calculation**

Create `src/lib/__tests__/utils.test.ts`:

```tsx
import { daysSinceLastContact, getContactStatus } from "@/lib/utils";
import { Person } from "@/lib/types";

describe("daysSinceLastContact", () => {
  it("returns null when no communications exist", () => {
    expect(daysSinceLastContact([])).toBeNull();
  });

  it("calculates days since most recent communication without response", () => {
    const comms = [
      {
        date: "2026-01-01",
        method: "email" as const,
        recipientName: "Test",
        subject: "Test",
        content: "Test",
      },
    ];
    const days = daysSinceLastContact(comms);
    expect(days).toBeGreaterThan(0);
  });

  it("returns null when most recent communication has a response", () => {
    const comms = [
      {
        date: "2026-01-01",
        method: "email" as const,
        recipientName: "Test",
        subject: "Test",
        content: "Test",
        response: { date: "2026-01-05", content: "Got it" },
      },
    ];
    expect(daysSinceLastContact(comms)).toBeNull();
  });
});

describe("getContactStatus", () => {
  it("returns not-contacted when no communications", () => {
    expect(getContactStatus([])).toBe("not-contacted");
  });

  it("returns responded when latest has response", () => {
    const comms = [
      {
        date: "2026-01-01",
        method: "email" as const,
        recipientName: "Test",
        subject: "Test",
        content: "Test",
        response: { date: "2026-01-05", content: "Got it" },
      },
    ];
    expect(getContactStatus(comms)).toBe("responded");
  });

  it("returns no-response when contacted but no response", () => {
    const comms = [
      {
        date: "2026-01-01",
        method: "email" as const,
        recipientName: "Test",
        subject: "Test",
        content: "Test",
      },
    ];
    expect(getContactStatus(comms)).toBe("no-response");
  });
});
```

**Step 6: Implement utils**

```tsx
// src/lib/utils.ts
import { Communication, CommunicationStatus } from "@/lib/types";

export function daysSinceLastContact(communications: Communication[]): number | null {
  if (communications.length === 0) return null;

  const sorted = [...communications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const latest = sorted[0];
  if (latest.response) return null;

  const now = new Date();
  const contactDate = new Date(latest.date);
  const diffMs = now.getTime() - contactDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function getContactStatus(communications: Communication[]): CommunicationStatus {
  if (communications.length === 0) return "not-contacted";

  const sorted = [...communications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return sorted[0].response ? "responded" : "no-response";
}
```

**Step 7: Run tests to verify they pass**

Run: `npx jest`
Expected: All tests PASS

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: add data access utilities with tests for people and contact tracking"
```

---

### Task 6: Create Timeline Data

**Files:**
- Create: `src/data/timeline.ts`

**Step 1: Create initial timeline data**

```tsx
// src/data/timeline.ts
import { TimelineEntry } from "@/lib/types";

export const timelineEntries: TimelineEntry[] = [
  {
    date: "2026-02-20",
    title: "CMH Watch Launched",
    description:
      "CMH Watch website goes live, documenting accountability chain at Cambridge Memorial Hospital and providing tools for community action.",
    personSlugs: [],
    category: "community-update",
  },
  // Additional entries will be added as actions are taken
];
```

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add timeline data structure with launch entry"
```

---

## Phase 3: Home Page

### Task 7: Build Home Page

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/ui/StatsBar.tsx`
- Create: `src/components/ui/LatestUpdate.tsx`

**Step 1: Build StatsBar component**

```tsx
// src/components/ui/StatsBar.tsx
import { getAllPeople } from "@/lib/people";
import { getContactStatus } from "@/lib/utils";

export function StatsBar() {
  const people = getAllPeople();
  const contacted = people.filter(
    (p) => getContactStatus(p.communications) !== "not-contacted"
  ).length;
  const responded = people.filter(
    (p) => getContactStatus(p.communications) === "responded"
  ).length;

  return (
    <div className="bg-[var(--color-navy)] text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{people.length}</div>
            <div className="text-sm text-gray-300 mt-1">Officials Tracked</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{contacted}</div>
            <div className="text-sm text-gray-300 mt-1">Officials Contacted</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{responded}</div>
            <div className="text-sm text-gray-300 mt-1">Responses Received</div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Build LatestUpdate component**

```tsx
// src/components/ui/LatestUpdate.tsx
import { timelineEntries } from "@/data/timeline";

export function LatestUpdate() {
  const latest = timelineEntries[timelineEntries.length - 1];
  if (!latest) return null;

  return (
    <div className="bg-[var(--color-gray-warm)] border-l-4 border-[var(--color-red-accent)] p-6">
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        Latest Update - {new Date(latest.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
      </div>
      <h3 className="text-lg font-semibold mt-1">{latest.title}</h3>
      <p className="text-gray-700 mt-2">{latest.description}</p>
    </div>
  );
}
```

**Step 3: Build Home page**

```tsx
// src/app/page.tsx
import Link from "next/link";
import { StatsBar } from "@/components/ui/StatsBar";
import { LatestUpdate } from "@/components/ui/LatestUpdate";

export default function Home() {
  return (
    <main className="flex-grow">
      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-navy)] leading-tight">
            Holding Cambridge Memorial Hospital Accountable
          </h1>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            CMH Watch documents concerns about racism and mistreatment of minorities
            at Cambridge Memorial Hospital. We track every official responsible for
            oversight, document every communication, and record every response — or
            silence. Accountability starts with transparency.
          </p>
        </div>
      </section>

      {/* Stats */}
      <StatsBar />

      {/* Latest Update */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LatestUpdate />
      </section>

      {/* Three CTAs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <Link
            href="/facts"
            className="block bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-[var(--color-navy)]">Read the Facts</h2>
            <p className="mt-3 text-gray-600">
              Documented evidence including FOI requests, official responses, and
              verifiable records.
            </p>
            <span className="inline-block mt-4 text-[var(--color-red-accent)] font-medium text-sm">
              View documented evidence →
            </span>
          </Link>

          <Link
            href="/community-voices"
            className="block bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-[var(--color-navy)]">Share Your Story</h2>
            <p className="mt-3 text-gray-600">
              Have you or someone you know experienced mistreatment at CMH?
              Your voice matters.
            </p>
            <span className="inline-block mt-4 text-[var(--color-red-accent)] font-medium text-sm">
              Submit your experience →
            </span>
          </Link>

          <Link
            href="/take-action"
            className="block bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-[var(--color-navy)]">Take Action</h2>
            <p className="mt-3 text-gray-600">
              Ready-made letter templates addressed to named officials.
              Make your voice heard.
            </p>
            <span className="inline-block mt-4 text-[var(--color-red-accent)] font-medium text-sm">
              Get started →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
```

**Step 4: Verify home page renders**

Run: `npm run dev`
Visit http://localhost:3000. Verify hero, stats bar, latest update, and three CTAs render.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: build home page with hero, stats bar, latest update, and CTAs"
```

---

## Phase 4: Who's Responsible (Accountability Map)

### Task 8: Build Accountability Map Overview Page

**Files:**
- Modify: `src/app/accountability/page.tsx`
- Create: `src/components/accountability/PersonCard.tsx`
- Create: `src/components/accountability/CategorySection.tsx`

**Step 1: Build PersonCard component**

```tsx
// src/components/accountability/PersonCard.tsx
import Link from "next/link";
import { Person } from "@/lib/types";
import { daysSinceLastContact, getContactStatus } from "@/lib/utils";

const statusColors: Record<string, string> = {
  "not-contacted": "bg-gray-200 text-gray-700",
  "contacted": "bg-yellow-100 text-yellow-800",
  "responded": "bg-green-100 text-green-800",
  "no-response": "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  "not-contacted": "Not Yet Contacted",
  "contacted": "Contacted",
  "responded": "Responded",
  "no-response": "No Response",
};

export function PersonCard({ person }: { person: Person }) {
  const status = getContactStatus(person.communications);
  const days = daysSinceLastContact(person.communications);

  return (
    <Link
      href={`/accountability/${person.slug}`}
      className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-[var(--color-navy)]">{person.name}</h3>
          <p className="text-sm text-gray-600 mt-0.5">{person.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">{person.organization}</p>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[status]}`}>
          {statusLabels[status]}
        </span>
      </div>
      {days !== null && (
        <p className="text-xs text-[var(--color-red-accent)] font-medium mt-3">
          {days} days without response
        </p>
      )}
    </Link>
  );
}
```

**Step 2: Build CategorySection component**

```tsx
// src/components/accountability/CategorySection.tsx
import { Person } from "@/lib/types";
import { PersonCard } from "./PersonCard";

const categoryLabels: Record<string, string> = {
  "hospital-leadership": "Hospital Leadership",
  "department-chief": "Department Chiefs",
  "board-member": "Board of Directors",
  "government-official": "Government Officials",
  "regulatory-body": "Regulatory & Oversight Bodies",
};

const categoryDescriptions: Record<string, string> = {
  "hospital-leadership":
    "The executives and board members who run Cambridge Memorial Hospital and set its policies.",
  "department-chief":
    "The physicians who lead each clinical department and are responsible for care standards in their area.",
  "government-official":
    "The elected officials responsible for healthcare oversight, funding, and representing Cambridge residents.",
  "regulatory-body":
    "The independent bodies that regulate healthcare professionals and investigate complaints in Ontario.",
};

export function CategorySection({
  category,
  people,
}: {
  category: string;
  people: Person[];
}) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-[var(--color-navy)]">
        {categoryLabels[category] || category}
      </h2>
      <p className="text-gray-600 mt-2 mb-6">
        {categoryDescriptions[category]}
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {people.map((person) => (
          <PersonCard key={person.slug} person={person} />
        ))}
      </div>
    </section>
  );
}
```

**Step 3: Build accountability overview page**

```tsx
// src/app/accountability/page.tsx
import { getAllPeople } from "@/lib/people";
import { CategorySection } from "@/components/accountability/CategorySection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Who's Responsible - CMH Watch",
  description:
    "Every official responsible for oversight of Cambridge Memorial Hospital, tracked by name.",
};

const categoryOrder = [
  "hospital-leadership",
  "department-chief",
  "government-official",
  "regulatory-body",
];

export default function AccountabilityPage() {
  const people = getAllPeople();

  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    people: people.filter((p) => p.category === cat),
  }));

  return (
    <main className="flex-grow">
      <section className="bg-[var(--color-gray-warm)] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[var(--color-navy)]">
            Who's Responsible
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Every person in the chain of accountability — from the hospital floor to
            Parliament Hill. Each profile tracks what they've been told, what they've
            done, and how long they've been silent.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {grouped.map(({ category, people }) => (
          <CategorySection key={category} category={category} people={people} />
        ))}
      </div>
    </main>
  );
}
```

**Step 4: Verify page renders**

Run: `npm run dev`
Visit http://localhost:3000/accountability. Verify all categories and person cards render.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: build accountability map overview with person cards and category sections"
```

---

### Task 9: Build Individual Person Profile Pages

**Files:**
- Create: `src/app/accountability/[slug]/page.tsx`
- Create: `src/components/accountability/CommunicationTimeline.tsx`

**Step 1: Build CommunicationTimeline component**

```tsx
// src/components/accountability/CommunicationTimeline.tsx
import { Communication } from "@/lib/types";

export function CommunicationTimeline({ communications }: { communications: Communication[] }) {
  if (communications.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-500">No communications recorded yet.</p>
        <p className="text-sm text-gray-400 mt-2">
          When this person is contacted, the full communication will be documented here.
        </p>
      </div>
    );
  }

  const sorted = [...communications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      {sorted.map((comm, index) => (
        <div key={index} className="border-l-4 border-[var(--color-navy)] pl-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <time>{new Date(comm.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}</time>
            <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium capitalize">
              {comm.method.replace("-", " ")}
            </span>
          </div>
          <h4 className="font-semibold mt-1">{comm.subject}</h4>
          <p className="text-gray-700 mt-2 whitespace-pre-wrap">{comm.content}</p>

          {comm.response ? (
            <div className="mt-4 bg-green-50 border border-green-200 rounded p-4">
              <div className="text-sm text-green-700 font-medium">
                Response received — {new Date(comm.response.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
              </div>
              <p className="text-gray-700 mt-2 whitespace-pre-wrap">{comm.response.content}</p>
            </div>
          ) : (
            <div className="mt-4 bg-red-50 border border-red-200 rounded p-3">
              <span className="text-sm text-red-700 font-medium">No response received</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

**Step 2: Build person profile page**

```tsx
// src/app/accountability/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getAllPeople, getPersonBySlug } from "@/lib/people";
import { daysSinceLastContact, getContactStatus } from "@/lib/utils";
import { CommunicationTimeline } from "@/components/accountability/CommunicationTimeline";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllPeople().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) return {};
  return {
    title: `${person.name} - CMH Watch`,
    description: `Accountability profile for ${person.name}, ${person.title} at ${person.organization}. Tracking communications and responses.`,
  };
}

export default async function PersonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) notFound();

  const status = getContactStatus(person.communications);
  const days = daysSinceLastContact(person.communications);

  return (
    <main className="flex-grow">
      <section className="bg-[var(--color-gray-warm)] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
            {person.organization}
          </p>
          <h1 className="text-4xl font-bold text-[var(--color-navy)] mt-2">
            {person.name}
          </h1>
          <p className="text-xl text-gray-600 mt-1">{person.title}</p>

          {days !== null && (
            <p className="text-[var(--color-red-accent)] font-bold text-lg mt-4">
              {days} days without response
            </p>
          )}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Why they're accountable */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--color-navy)]">
            Why They're Accountable
          </h2>
          <p className="mt-3 text-gray-700">{person.responsibilities}</p>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--color-navy)]">
            Contact Information
          </h2>
          <div className="mt-3 space-y-2 text-gray-700">
            {person.contactInfo.email && (
              <p>
                <span className="font-medium">Email:</span>{" "}
                {person.contactInfo.email}
              </p>
            )}
            {person.contactInfo.phone && (
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {person.contactInfo.phone}
              </p>
            )}
            {person.contactInfo.address && (
              <p>
                <span className="font-medium">Address:</span>{" "}
                {person.contactInfo.address}
              </p>
            )}
          </div>
        </section>

        {/* Communication Record */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--color-navy)]">
            Communication Record
          </h2>
          <p className="mt-2 text-gray-600 mb-6">
            Every communication sent to {person.name} and every response (or
            silence) is documented below.
          </p>
          <CommunicationTimeline communications={person.communications} />
        </section>

        {/* Public Statements */}
        {person.publicStatements.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-[var(--color-navy)]">
              Public Statements
            </h2>
            <div className="mt-4 space-y-4">
              {person.publicStatements.map((stmt, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded p-4">
                  <div className="text-sm text-gray-500">
                    {new Date(stmt.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })} — {stmt.source}
                  </div>
                  <p className="mt-2 text-gray-700">{stmt.content}</p>
                  {stmt.url && (
                    <a
                      href={stmt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--color-red-accent)] mt-2 inline-block"
                    >
                      View source →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
```

**Step 3: Verify profile pages render**

Run: `npm run dev`
Visit http://localhost:3000/accountability/patrick-gaskin. Verify profile renders with all sections.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: build individual person profile pages with communication timeline"
```

---

## Phase 5: The Facts

### Task 10: Build The Facts Page with FOI Section

**Files:**
- Modify: `src/app/facts/page.tsx`
- Create: `src/data/facts.ts`

**Step 1: Create facts data**

```tsx
// src/data/facts.ts
export interface FactEntry {
  id: string;
  title: string;
  date: string;
  category: "foi-request" | "foi-response" | "document" | "finding";
  status: "pending" | "in-progress" | "completed" | "denied" | "appealed";
  summary: string;
  content: string; // Full text
  recipientName?: string;
  recipientSlug?: string;
}

export const facts: FactEntry[] = [
  {
    id: "foi-001",
    title: "Freedom of Information Request: Discrimination Complaint Records",
    date: "2026-02-20",
    category: "foi-request",
    status: "pending",
    summary:
      "Formal FOI request filed under FIPPA for records of patient complaints related to racism, discrimination, or mistreatment of minorities at Cambridge Memorial Hospital.",
    recipientName: "Cambridge Memorial Hospital FOI Coordinator",
    content: `To: Freedom of Information Coordinator
Cambridge Memorial Hospital
700 Coronation Boulevard
Cambridge, Ontario N1R 3G2

CC: Patrick Gaskin, President & CEO

Dear FOI Coordinator,

Pursuant to the Freedom of Information and Protection of Privacy Act (FIPPA), R.S.O. 1990, c. F.31, I am requesting access to the following records held by Cambridge Memorial Hospital:

1. All records of patient complaints filed with the hospital's Patient Relations department or any other department that relate to allegations of racism, racial discrimination, or mistreatment of racial or ethnic minorities by hospital staff, for the period of January 1, 2020 to the present date.

2. All internal policies, procedures, and protocols currently in effect at the hospital for handling complaints related to racism, racial discrimination, or mistreatment of racial or ethnic minorities.

3. Statistical data or summaries regarding the outcomes of discrimination-related complaints (e.g., number upheld, dismissed, investigated, or referred) for the period of January 1, 2020 to the present date.

4. Records of any internal reviews, audits, assessments, or reports related to equity, diversity, inclusion, cultural competency, or anti-racism initiatives conducted at the hospital for the period of January 1, 2020 to the present date.

I understand that personal health information and personally identifying information may need to be redacted pursuant to PHIPA and FIPPA exemptions. I am requesting de-identified or aggregate data where individual records cannot be disclosed.

I request that fees be waived on the grounds that this request relates to a matter of public interest, specifically the equitable treatment of minority patients at a publicly funded hospital.

If any portion of this request is denied, I ask that you provide the specific statutory exemption relied upon for each denial, as required under FIPPA.

I look forward to your response within the 30-day period prescribed by the Act.

Sincerely,
[Name]
[Address]
[Email]
[Phone]`,
  },
];
```

**Step 2: Build The Facts page**

```tsx
// src/app/facts/page.tsx
import { facts } from "@/data/facts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Facts - CMH Watch",
  description:
    "Documented evidence: FOI requests, official responses, and verifiable records about Cambridge Memorial Hospital.",
};

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  denied: "bg-red-100 text-red-800",
  appealed: "bg-orange-100 text-orange-800",
};

export default function FactsPage() {
  return (
    <main className="flex-grow">
      <section className="bg-[var(--color-gray-warm)] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[var(--color-navy)]">The Facts</h1>
          <p className="mt-4 text-lg text-gray-700">
            Documented, verifiable evidence only. Every item on this page is backed
            by official records, FOI requests, or documented communications.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {facts.map((fact) => (
          <article
            key={fact.id}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <time className="text-sm text-gray-500">
                  {new Date(fact.date).toLocaleDateString("en-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="text-xl font-bold text-[var(--color-navy)] mt-1">
                  {fact.title}
                </h2>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${statusStyles[fact.status]}`}
              >
                {fact.status.replace("-", " ").toUpperCase()}
              </span>
            </div>
            <p className="text-gray-700 mt-3">{fact.summary}</p>
            {fact.recipientName && (
              <p className="text-sm text-gray-500 mt-2">
                Directed to:{" "}
                {fact.recipientSlug ? (
                  <Link
                    href={`/accountability/${fact.recipientSlug}`}
                    className="text-[var(--color-red-accent)] hover:underline"
                  >
                    {fact.recipientName}
                  </Link>
                ) : (
                  <span className="font-medium">{fact.recipientName}</span>
                )}
              </p>
            )}
            {/* Full text */}
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-[var(--color-red-accent)]">
                View full document
              </summary>
              <pre className="mt-4 bg-gray-50 border border-gray-200 rounded p-4 text-sm text-gray-700 whitespace-pre-wrap font-sans overflow-x-auto">
                {fact.content}
              </pre>
            </details>
          </article>
        ))}
      </div>
    </main>
  );
}
```

**Step 3: Verify page renders**

Run: `npm run dev`
Visit http://localhost:3000/facts. Verify FOI request displays with expandable full text.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: build The Facts page with FOI request documentation"
```

---

## Phase 6: Community Voices

### Task 11: Build Community Voices Submission Form

**Files:**
- Modify: `src/app/community-voices/page.tsx`
- Create: `src/components/community-voices/SubmissionForm.tsx`
- Create: `src/components/community-voices/StoryCard.tsx`
- Create: `src/data/stories.ts`
- Create: `src/app/api/submit-story/route.ts`

**Step 1: Create stories data file (initially empty, will be populated through submissions)**

```tsx
// src/data/stories.ts
import { CommunityStory } from "@/lib/types";

export const publishedStories: CommunityStory[] = [
  // Stories will be added here after moderation
];
```

**Step 2: Build the submission form (client component)**

```tsx
// src/components/community-voices/SubmissionForm.tsx
"use client";
import { useState } from "react";

export function SubmissionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/submit-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      alert("There was an error submitting your story. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <h3 className="text-xl font-bold text-green-800">Thank you</h3>
        <p className="mt-2 text-green-700">
          Your submission has been received. It will be reviewed before
          publishing. If you provided contact information, we may reach out for
          follow-up.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="story" className="block text-sm font-medium text-gray-700">
          Your experience *
        </label>
        <textarea
          id="story"
          name="story"
          required
          rows={8}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[var(--color-navy)] focus:ring-1 focus:ring-[var(--color-navy)]"
          placeholder="Describe what happened. Include as much detail as you're comfortable sharing."
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="incidentDate" className="block text-sm font-medium text-gray-700">
            Date(s) of incident
          </label>
          <input
            type="text"
            id="incidentDate"
            name="incidentDate"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[var(--color-navy)] focus:ring-1 focus:ring-[var(--color-navy)]"
            placeholder="e.g., March 2025, or Jan-Feb 2025"
          />
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            Department / area of hospital
          </label>
          <select
            id="department"
            name="department"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[var(--color-navy)] focus:ring-1 focus:ring-[var(--color-navy)]"
          >
            <option value="">Select if applicable</option>
            <option value="Emergency">Emergency Department</option>
            <option value="Internal Medicine">Internal Medicine</option>
            <option value="Surgery">Surgery</option>
            <option value="Mental Health">Mental Health</option>
            <option value="Obstetrics">Obstetrics</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Hospital Medicine">Hospital Medicine</option>
            <option value="Laboratory">Laboratory</option>
            <option value="Patient Relations">Patient Relations</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="staffInvolved" className="block text-sm font-medium text-gray-700">
          Names of staff involved (optional, held privately)
        </label>
        <input
          type="text"
          id="staffInvolved"
          name="staffInvolved"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[var(--color-navy)] focus:ring-1 focus:ring-[var(--color-navy)]"
          placeholder="These names will NOT be published without verification"
        />
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-gray-700">
          How would you like to be identified? *
        </legend>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input type="radio" name="identityPreference" value="named" required className="mr-2" />
            <span className="text-sm text-gray-700">Use my full name publicly</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="identityPreference" value="first-name" className="mr-2" />
            <span className="text-sm text-gray-700">Use my first name only</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="identityPreference" value="anonymous-identified" className="mr-2" />
            <span className="text-sm text-gray-700">
              Anonymous publicly, but I'll share my identity with CMH Watch for verification
            </span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="identityPreference" value="anonymous" className="mr-2" />
            <span className="text-sm text-gray-700">Fully anonymous</span>
          </label>
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Your name (optional)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[var(--color-navy)] focus:ring-1 focus:ring-[var(--color-navy)]"
          />
        </div>

        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
            Email or phone for follow-up (optional)
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-[var(--color-navy)] focus:ring-1 focus:ring-[var(--color-navy)]"
          />
        </div>
      </div>

      <div>
        <label className="flex items-start">
          <input type="checkbox" name="consent" required className="mr-2 mt-1" />
          <span className="text-sm text-gray-700">
            I understand my submission will be reviewed before publishing. I consent
            to my story being published on CMH Watch according to my identity
            preference selected above. I confirm this account is truthful to the best
            of my knowledge.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-[var(--color-navy)] text-white px-6 py-3 rounded-md font-medium hover:bg-[var(--color-navy-light)] transition-colors disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Your Story"}
      </button>
    </form>
  );
}
```

**Step 3: Build StoryCard component**

```tsx
// src/components/community-voices/StoryCard.tsx
import { CommunityStory } from "@/lib/types";

export function StoryCard({ story }: { story: CommunityStory }) {
  return (
    <article className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <time>{story.incidentDateRange}</time>
        {story.department && (
          <>
            <span>·</span>
            <span>{story.department}</span>
          </>
        )}
      </div>
      <p className="mt-3 text-gray-700 leading-relaxed">{story.story}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-500">— {story.attribution}</span>
        <time className="text-gray-400">
          Published{" "}
          {new Date(story.publishedDate).toLocaleDateString("en-CA", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>
    </article>
  );
}
```

**Step 4: Build API route for submissions**

For the initial version, the API route will write submissions to a JSON file on disk. When deployed to Railway with a volume, this persists. A more robust approach (database) can be added later.

```tsx
// src/app/api/submit-story/route.ts
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const SUBMISSIONS_FILE = path.join(process.cwd(), "submissions.json");

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Read existing submissions
    let submissions = [];
    try {
      const existing = await fs.readFile(SUBMISSIONS_FILE, "utf-8");
      submissions = JSON.parse(existing);
    } catch {
      // File doesn't exist yet
    }

    // Add new submission with timestamp
    submissions.push({
      ...data,
      submittedAt: new Date().toISOString(),
      id: crypto.randomUUID(),
      reviewed: false,
    });

    // Write back
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
```

**Step 5: Build Community Voices page**

```tsx
// src/app/community-voices/page.tsx
import { SubmissionForm } from "@/components/community-voices/SubmissionForm";
import { StoryCard } from "@/components/community-voices/StoryCard";
import { publishedStories } from "@/data/stories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Voices - CMH Watch",
  description:
    "Personal accounts from patients and families about their experiences at Cambridge Memorial Hospital.",
};

export default function CommunityVoicesPage() {
  return (
    <main className="flex-grow">
      <section className="bg-[var(--color-gray-warm)] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[var(--color-navy)]">
            Community Voices
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Personal accounts from patients and families. You choose how you're
            identified: full name, first name only, or anonymous.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> Community Voices are personal accounts.
            They have not been independently verified by CMH Watch. These stories
            are published to give voice to community members' experiences.
          </p>
        </div>

        {/* Published stories */}
        {publishedStories.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-6">
              Published Stories
            </h2>
            <div className="space-y-6">
              {publishedStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </section>
        )}

        {/* Submission form */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-2">
            Share Your Experience
          </h2>
          <p className="text-gray-600 mb-6">
            All submissions are reviewed before publishing. Names of staff you
            mention are held privately and not published without verification.
          </p>
          <SubmissionForm />
        </section>
      </div>
    </main>
  );
}
```

**Step 6: Verify form renders and submits**

Run: `npm run dev`
Visit http://localhost:3000/community-voices. Fill out form, submit, verify success message. Check that `submissions.json` is created in project root.

**Step 7: Add `submissions.json` to `.gitignore`**

Add to `.gitignore`:
```
submissions.json
```

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: build Community Voices page with submission form and story display"
```

---

## Phase 7: Take Action

### Task 12: Build Take Action Page with Letter Templates

**Files:**
- Modify: `src/app/take-action/page.tsx`
- Create: `src/data/templates.ts`
- Create: `src/components/take-action/LetterTemplate.tsx`

**Step 1: Create letter templates data**

```tsx
// src/data/templates.ts
export interface LetterTemplate {
  id: string;
  title: string;
  recipientName: string;
  recipientSlug: string;
  recipientTitle: string;
  recipientAddress: string;
  description: string;
  body: string; // Template text with [PLACEHOLDERS]
  ccList: string[];
}

export const letterTemplates: LetterTemplate[] = [
  {
    id: "foi-request",
    title: "FOI Request for Discrimination Complaint Records",
    recipientName: "FOI Coordinator, Cambridge Memorial Hospital",
    recipientSlug: "",
    recipientTitle: "Freedom of Information Coordinator",
    recipientAddress:
      "Cambridge Memorial Hospital\n700 Coronation Boulevard\nCambridge, Ontario N1R 3G2",
    description:
      "File your own Freedom of Information request under FIPPA for records of discrimination complaints at CMH.",
    body: `Dear FOI Coordinator,

Pursuant to the Freedom of Information and Protection of Privacy Act (FIPPA), R.S.O. 1990, c. F.31, I am requesting access to the following records held by Cambridge Memorial Hospital:

1. All records of patient complaints filed with the hospital related to allegations of racism, racial discrimination, or mistreatment of racial or ethnic minorities by hospital staff, for the period of January 1, 2020 to the present date.

2. All internal policies and procedures currently in effect for handling complaints related to racism or discrimination.

3. Statistical data regarding the outcomes of discrimination-related complaints for the period of January 1, 2020 to the present date.

4. Records of any internal reviews or audits related to equity, diversity, or anti-racism conducted at the hospital for the same period.

I request that personal health information be redacted as required by PHIPA, and that de-identified or aggregate data be provided where individual records cannot be disclosed.

I request that fees be waived on the grounds that this request relates to a matter of public interest.

Sincerely,
[YOUR NAME]
[YOUR ADDRESS]
[YOUR EMAIL]`,
    ccList: ["Patrick Gaskin, President & CEO, CMH", "CMH Watch (info@cmhwatch.ca)"],
  },
  {
    id: "patient-ombudsman",
    title: "Complaint to the Ontario Patient Ombudsman",
    recipientName: "Craig Thompson",
    recipientSlug: "craig-thompson",
    recipientTitle: "Patient Ombudsman",
    recipientAddress:
      "Ontario Patient Ombudsman\n393 University Avenue, Suite 2000\nToronto, ON M5G 1E6",
    description:
      "File a formal complaint with Ontario's independent Patient Ombudsman about your experience at CMH.",
    body: `Dear Mr. Thompson,

I am writing to file a formal complaint regarding my experience at Cambridge Memorial Hospital (CMH) in Cambridge, Ontario.

[DESCRIBE YOUR EXPERIENCE - include dates, department, what happened, names of staff involved if known]

I believe this treatment constitutes [racism/discrimination/mistreatment] and I am concerned that the hospital's internal complaint process has not adequately addressed these concerns.

[IF APPLICABLE: I previously filed a complaint with CMH's Patient Relations department on [DATE] and received [DESCRIBE RESPONSE OR LACK THEREOF]]

I am requesting that the Patient Ombudsman investigate this matter and ensure that CMH has adequate policies and practices in place to prevent discriminatory treatment of patients.

Sincerely,
[YOUR NAME]
[YOUR ADDRESS]
[YOUR EMAIL]
[YOUR PHONE]`,
    ccList: ["CMH Watch (info@cmhwatch.ca)"],
  },
  {
    id: "ohrc-complaint",
    title: "Complaint to the Ontario Human Rights Commission",
    recipientName: "Patricia DeGuire",
    recipientSlug: "patricia-deguire",
    recipientTitle: "Chief Commissioner, Ontario Human Rights Commission",
    recipientAddress:
      "Ontario Human Rights Commission\n180 Dundas Street West, Suite 900\nToronto, ON M7A 2G5",
    description:
      "File a human rights complaint about discriminatory treatment at CMH with the OHRC.",
    body: `Dear Chief Commissioner DeGuire,

I am writing to bring to the attention of the Ontario Human Rights Commission concerns about systemic racism and discriminatory treatment of patients at Cambridge Memorial Hospital in Cambridge, Ontario.

[DESCRIBE YOUR EXPERIENCE OR THE PATTERN YOU HAVE OBSERVED]

This treatment violates the Ontario Human Rights Code, which prohibits discrimination in services on the basis of race, colour, ethnic origin, and other protected grounds.

I am requesting that the Commission:
1. Investigate patterns of discriminatory treatment at Cambridge Memorial Hospital
2. Issue recommendations to the hospital to address systemic issues
3. Ensure that effective anti-racism policies and training are implemented

Sincerely,
[YOUR NAME]
[YOUR ADDRESS]
[YOUR EMAIL]`,
    ccList: ["CMH Watch (info@cmhwatch.ca)"],
  },
  {
    id: "mpp-letter",
    title: "Letter to MPP Brian Riddell",
    recipientName: "Brian Riddell",
    recipientSlug: "brian-riddell",
    recipientTitle: "MPP for Cambridge",
    recipientAddress:
      "73 Water Street North, Unit 1\nCambridge, ON N1R 1S4",
    description:
      "Write to your provincial representative about healthcare accountability in Cambridge.",
    body: `Dear MPP Riddell,

As your constituent in Cambridge, I am writing to bring to your attention serious concerns about the treatment of minority patients at Cambridge Memorial Hospital.

[DESCRIBE YOUR CONCERNS - personal experience, patterns you've observed, or reference CMH Watch findings]

Healthcare is a provincial responsibility, and as our representative in the Ontario Legislature, you have the ability to:
1. Raise these concerns with the Minister of Health, Sylvia Jones
2. Request that Ontario Health conduct a review of CMH's complaint handling processes
3. Advocate for stronger accountability measures at publicly funded hospitals

I am asking: what steps will you take to ensure that all patients at Cambridge Memorial Hospital are treated with dignity and without discrimination?

I look forward to your response.

Sincerely,
[YOUR NAME]
[YOUR ADDRESS]
[YOUR EMAIL]`,
    ccList: ["CMH Watch (info@cmhwatch.ca)"],
  },
  {
    id: "mp-letter",
    title: "Letter to MP Connie Cody",
    recipientName: "Connie Cody",
    recipientSlug: "connie-cody",
    recipientTitle: "MP for Cambridge",
    recipientAddress:
      "73 Water Street North, Suite 305\nCambridge, ON N1R 7L6",
    description:
      "Write to your federal representative about healthcare standards and the Canada Health Act.",
    body: `Dear MP Cody,

As your constituent, I am writing regarding serious concerns about discriminatory treatment of patients at Cambridge Memorial Hospital.

[DESCRIBE YOUR CONCERNS]

While healthcare is primarily a provincial responsibility, the federal government has a role through the Canada Health Act in ensuring that healthcare services across Canada meet national standards, including the principle of universality — that all Canadians receive equitable access to healthcare regardless of race or ethnicity.

I am requesting that you:
1. Raise awareness of these concerns at the federal level
2. Ensure that Canada Health Act principles are being upheld at CMH
3. Support any federal initiatives for anti-racism in healthcare

I look forward to your response.

Sincerely,
[YOUR NAME]
[YOUR ADDRESS]
[YOUR EMAIL]`,
    ccList: ["CMH Watch (info@cmhwatch.ca)"],
  },
  {
    id: "mayor-letter",
    title: "Letter to Mayor Jan Liggett",
    recipientName: "Jan Liggett",
    recipientSlug: "jan-liggett",
    recipientTitle: "Mayor of Cambridge",
    recipientAddress:
      "City of Cambridge\n50 Dickson Street\nCambridge, ON N1R 5W8",
    description:
      "Write to the Mayor of Cambridge to raise hospital accountability at council.",
    body: `Dear Mayor Liggett,

As a Cambridge resident, I am writing to express concern about the treatment of minority patients at Cambridge Memorial Hospital and to request that you use your platform as Mayor to advocate for accountability.

[DESCRIBE YOUR CONCERNS]

As Mayor, you have a unique platform to:
1. Raise these concerns publicly at Cambridge City Council
2. Request a delegation from CMH leadership to address council about their equity practices
3. Advocate for your constituents who have been mistreated

Cambridge is a diverse community and our hospital must reflect that in how it treats every patient.

I am asking: will you raise this issue at council and demand accountability from CMH leadership?

Sincerely,
[YOUR NAME]
[YOUR ADDRESS]`,
    ccList: ["CMH Watch (info@cmhwatch.ca)"],
  },
  {
    id: "regional-chair-letter",
    title: "Letter to Regional Chair Karen Redman",
    recipientName: "Karen Redman",
    recipientSlug: "karen-redman",
    recipientTitle: "Regional Chair, Region of Waterloo",
    recipientAddress:
      "150 Frederick Street\nKitchener, ON N2G 4J3",
    description:
      "Write to the Waterloo Region Chair about regional health oversight.",
    body: `Dear Chair Redman,

I am writing to raise concerns about the treatment of minority patients at Cambridge Memorial Hospital and to request that the Region of Waterloo take an active role in advocating for accountability.

[DESCRIBE YOUR CONCERNS]

The Region of Waterloo plays a role in public health and community services that intersect with hospital care. I am requesting that you:
1. Raise these concerns at Regional Council
2. Use the Region's public health mandate to advocate for equitable healthcare
3. Engage with Ontario Health on behalf of Waterloo Region residents

Sincerely,
[YOUR NAME]
[YOUR ADDRESS]`,
    ccList: ["CMH Watch (info@cmhwatch.ca)"],
  },
];
```

**Step 2: Build LetterTemplate component**

```tsx
// src/components/take-action/LetterTemplate.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { LetterTemplate as LetterTemplateType } from "@/data/templates";

export function LetterTemplate({ template }: { template: LetterTemplateType }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(template.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <article className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-bold text-[var(--color-navy)]">
        {template.title}
      </h3>
      <p className="text-gray-600 mt-2">{template.description}</p>

      <div className="mt-4 bg-gray-50 rounded p-4 text-sm space-y-1">
        <p>
          <span className="font-medium">To:</span>{" "}
          {template.recipientSlug ? (
            <Link
              href={`/accountability/${template.recipientSlug}`}
              className="text-[var(--color-red-accent)] hover:underline"
            >
              {template.recipientName}
            </Link>
          ) : (
            template.recipientName
          )}
          , {template.recipientTitle}
        </p>
        <p className="whitespace-pre-line text-gray-500">
          {template.recipientAddress}
        </p>
        {template.ccList.length > 0 && (
          <p className="mt-2">
            <span className="font-medium">CC:</span>{" "}
            {template.ccList.join(", ")}
          </p>
        )}
      </div>

      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-medium text-[var(--color-red-accent)]">
          View and copy letter template
        </summary>
        <div className="mt-4">
          <pre className="bg-gray-50 border border-gray-200 rounded p-4 text-sm text-gray-700 whitespace-pre-wrap font-sans">
            {template.body}
          </pre>
          <button
            onClick={handleCopy}
            className="mt-3 bg-[var(--color-navy)] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[var(--color-navy-light)] transition-colors"
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      </details>
    </article>
  );
}
```

**Step 3: Build Take Action page**

```tsx
// src/app/take-action/page.tsx
import { letterTemplates } from "@/data/templates";
import { LetterTemplate } from "@/components/take-action/LetterTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Take Action - CMH Watch",
  description:
    "Ready-made letter templates to contact officials about accountability at Cambridge Memorial Hospital.",
};

export default function TakeActionPage() {
  return (
    <main className="flex-grow">
      <section className="bg-[var(--color-gray-warm)] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[var(--color-navy)]">
            Take Action
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Ready-made letter templates addressed to specific named officials.
            Copy, personalize, and send. Every letter puts a named person on
            notice that the community is watching.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> CC <strong>info@cmhwatch.ca</strong> on any
            letter you send so we can track community engagement. When you
            receive a response (or don't), let us know — it becomes part of the
            public record.
          </p>
        </div>

        <div className="space-y-6">
          {letterTemplates.map((template) => (
            <LetterTemplate key={template.id} template={template} />
          ))}
        </div>
      </div>
    </main>
  );
}
```

**Step 4: Verify page renders**

Run: `npm run dev`
Visit http://localhost:3000/take-action. Verify all templates render and copy button works.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: build Take Action page with letter templates for all officials"
```

---

## Phase 8: Timeline

### Task 13: Build Timeline Page

**Files:**
- Modify: `src/app/timeline/page.tsx`

**Step 1: Build Timeline page**

```tsx
// src/app/timeline/page.tsx
import { timelineEntries } from "@/data/timeline";
import Link from "next/link";
import { getPersonBySlug } from "@/lib/people";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeline - CMH Watch",
  description:
    "Chronological record of all actions taken and responses received in the CMH accountability campaign.",
};

const categoryStyles: Record<string, string> = {
  "foi-request": "bg-blue-100 text-blue-800",
  "letter-sent": "bg-purple-100 text-purple-800",
  "response-received": "bg-green-100 text-green-800",
  "community-update": "bg-gray-100 text-gray-800",
  media: "bg-yellow-100 text-yellow-800",
  government: "bg-red-100 text-red-800",
};

export default function TimelinePage() {
  const sorted = [...timelineEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="flex-grow">
      <section className="bg-[var(--color-gray-warm)] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[var(--color-navy)]">Timeline</h1>
          <p className="mt-4 text-lg text-gray-700">
            Every action taken, every response received, every development —
            documented in chronological order.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {sorted.map((entry, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[var(--color-navy)] mt-1.5" />
                {index < sorted.length - 1 && (
                  <div className="w-0.5 bg-gray-200 flex-grow mt-1" />
                )}
              </div>
              <div className="pb-8">
                <div className="flex items-center gap-2 flex-wrap">
                  <time className="text-sm text-gray-500">
                    {new Date(entry.date).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      categoryStyles[entry.category] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {entry.category.replace(/-/g, " ")}
                  </span>
                </div>
                <h3 className="font-semibold text-[var(--color-navy)] mt-1">
                  {entry.title}
                </h3>
                <p className="text-gray-700 mt-1">{entry.description}</p>
                {entry.personSlugs.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {entry.personSlugs.map((slug) => {
                      const person = getPersonBySlug(slug);
                      return person ? (
                        <Link
                          key={slug}
                          href={`/accountability/${slug}`}
                          className="text-xs text-[var(--color-red-accent)] hover:underline"
                        >
                          {person.name}
                        </Link>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
```

**Step 2: Verify page renders**

Run: `npm run dev`
Visit http://localhost:3000/timeline. Verify timeline renders with launch entry.

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: build Timeline page with chronological event display"
```

---

## Phase 9: SEO & Build Verification

### Task 14: Add SEO Metadata and Verify Build

**Files:**
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`
- Create: `public/favicon.ico` (placeholder)

**Step 1: Add robots.txt**

```tsx
// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://cmhwatch.ca/sitemap.xml",
  };
}
```

**Step 2: Add sitemap**

```tsx
// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllPeople } from "@/lib/people";

export default function sitemap(): MetadataRoute.Sitemap {
  const people = getAllPeople();

  const personPages = people.map((p) => ({
    url: `https://cmhwatch.ca/accountability/${p.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: "https://cmhwatch.ca", lastModified: new Date() },
    { url: "https://cmhwatch.ca/facts", lastModified: new Date() },
    { url: "https://cmhwatch.ca/accountability", lastModified: new Date() },
    { url: "https://cmhwatch.ca/community-voices", lastModified: new Date() },
    { url: "https://cmhwatch.ca/take-action", lastModified: new Date() },
    { url: "https://cmhwatch.ca/timeline", lastModified: new Date() },
    ...personPages,
  ];
}
```

**Step 3: Run production build**

Run: `npm run build`
Expected: Build succeeds with no errors. All pages statically generated.

**Step 4: Run production server and verify**

Run: `npm run start`
Visit all pages and verify they render correctly.

**Step 5: Run all tests**

Run: `npx jest`
Expected: All tests pass.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add SEO sitemap, robots.txt, and verify production build"
```

---

## Phase 10: Deployment

### Task 15: Deploy to Railway

**Step 1: Create Railway project**

Use Railway MCP tools to create a new project called "cmh-watch".

**Step 2: Create service from the git repository**

Connect the repository to Railway and deploy.

**Step 3: Set up domain**

Create a Railway domain for initial access. Custom domain (cmhwatch.ca) can be configured after domain purchase.

**Step 4: Verify deployment**

Visit the Railway-provided URL and verify all pages render correctly.

**Step 5: Commit any deployment configuration**

```bash
git add -A
git commit -m "feat: add Railway deployment configuration"
```
