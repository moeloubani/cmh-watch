import { daysSinceLastContact, getContactStatus } from "@/lib/utils";

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
