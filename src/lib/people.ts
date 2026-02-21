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
