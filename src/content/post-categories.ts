/**
 * Which WordPress blog categories belong on which service page.
 *
 * Blog posts were only reachable from the blog index, so anything past the
 * first page of 24 had almost nothing pointing at it and Google never picked
 * it up. Linking each service page to the posts in its own category gives
 * those posts a route in from the pages that carry the most weight.
 *
 * Keys are `vertical/slug`, as `serviceKey()` builds them. Values are
 * WordPress category names, exactly as the publisher writes them.
 */
export const postCategoriesFor: Record<string, string[]> = {
  "marketing/b2b-lead-generation": ["Lead Generation", "LinkedIn", "Real Estate"],
  "marketing/seo-aeo": ["SEO and AEO"],
  "marketing/crm-marketing-automation": ["Marketing Automation"],
  "marketing/performance-marketing": ["Performance Marketing"],
  "marketing/social-media-content": ["Social Media", "B2B Marketing"],
  "marketing/ecommerce-growth": ["Ecommerce"],
  "development/website-development": ["Website Development"],
  "development/custom-software-development": ["Custom Software"],
  "development/crm-erp-development": ["CRM and ERP"],
  "development/ai-automation": ["AI and Automation"],
  "development/api-integration": ["Integrations"],
  "development/ui-ux-design": ["UI and UX"],
  "development/mobile-app-development": ["Mobile Apps"],
  "development/ecommerce-development": ["Ecommerce"],
  "pr/public-relations": ["Public Relations"],
  "pr/digital-pr": ["Digital PR"],
  "pr/founder-thought-leadership": ["Thought Leadership"],
  "pr/awards-recognition": ["Awards and Recognition"],
};
