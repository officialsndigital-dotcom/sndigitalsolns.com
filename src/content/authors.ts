// Relative, not "@/lib/site": the test runner loads this module directly and
// does not resolve the TypeScript path alias.
import { founder, site } from "../lib/site.ts";

/**
 * Who a blog post is by. Two bylines: the founder on the posts that are a
 * judgement call about how to run or buy something, and the company on the
 * posts that are practice rather than opinion.
 *
 * WordPress carries the choice in the `sn_author` post meta field, written by
 * the publishing script. Anything unrecognised, including a post published
 * before the field existed, falls back to the company.
 */
export type AuthorId = "sanjan" | "company";

export type Author = {
  name: string;
  role: string;
  bio: string;
  url: string;
  photo?: string;
  /** schema.org type: a named person is a Person, the company an Organization. */
  type: "Person" | "Organization";
};

export const authors: Record<AuthorId, Author> = {
  sanjan: {
    name: founder.name,
    role: founder.role,
    bio: founder.bio[0],
    url: `${site.url}/company/about/`,
    photo: founder.photo,
    type: "Person",
  },
  company: {
    name: site.shortName,
    role: "Software development, digital marketing and PR",
    bio: "The S N Digital Solns team builds software and websites, generates demand and runs PR for clients across the United States, Canada, Australia, the UAE, Saudi Arabia and India.",
    url: `${site.url}/company/about/`,
    photo: "/brand/sn-mark.png",
    type: "Organization",
  },
};

export const getAuthor = (id?: string): Author => authors[id === "sanjan" ? "sanjan" : "company"];
