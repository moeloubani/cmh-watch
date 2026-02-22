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
