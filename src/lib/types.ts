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
