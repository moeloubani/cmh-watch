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
