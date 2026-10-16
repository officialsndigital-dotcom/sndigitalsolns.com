import { test } from "node:test";
import assert from "node:assert/strict";
import { getAuthor } from "../src/content/authors.ts";

test("resolves the founder byline", () => {
  const a = getAuthor("sanjan");
  assert.equal(a.name, "Sanjan Sharma");
  assert.equal(a.type, "Person");
  assert.ok(a.role.length > 0, "a byline needs a role to be an expertise signal");
  assert.ok(a.bio.length > 40, "a byline needs a bio to be an expertise signal");
});

test("anything else is the company, including posts published before the field existed", () => {
  for (const id of ["company", "", "nonsense", undefined]) {
    const a = getAuthor(id);
    assert.equal(a.type, "Organization");
    assert.equal(a.name, "S N Digital Solns");
  }
});
