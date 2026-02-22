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
