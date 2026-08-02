/** Centralised cache key constants — prevents typo bugs across the codebase */
export const CACHE_KEYS = {
  FEATURED_PROJECTS: 'projects:featured',
  ALL_PROJECTS: (category = 'all', status = 'all') =>
    `projects:all:${category}:${status}`,
  PROJECT_SLUG: (slug: string) => `projects:slug:${slug}`,
  RELATED_PROJECTS: (category: string, excludeId: string) =>
    `projects:related:${category}:${excludeId}`,

  FEATURED_PROPERTIES: 'properties:featured',
  ALL_PROPERTIES: (type = 'all', status = 'all') =>
    `properties:all:${type}:${status}`,
  PROPERTY_SLUG: (slug: string) => `properties:slug:${slug}`,
  RELATED_PROPERTIES: (type: string, excludeId: string) =>
    `properties:related:${type}:${excludeId}`,

  FEATURED_TESTIMONIALS: 'testimonials:featured',
  ALL_TESTIMONIALS: 'testimonials:all',

  ALL_SUPPLIERS: 'suppliers:all',

  ALL_UPDATES: 'updates:all',
  RECENT_UPDATES: (take: number) => `updates:recent:${take}`,
  UPDATE_SLUG: (slug: string) => `updates:slug:${slug}`,
} as const;

/** TTL values in seconds */
export const CACHE_TTL = {
  FEATURED_PROJECTS: 300,      //  5 minutes
  ALL_PROJECTS: 300,           //  5 minutes
  PROJECT_SLUG: 600,           // 10 minutes
  RELATED_PROJECTS: 600,       // 10 minutes

  FEATURED_PROPERTIES: 300,    // 5 minutes
  ALL_PROPERTIES: 300,         // 5 minutes
  PROPERTY_SLUG: 600,          // 10 minutes
  RELATED_PROPERTIES: 600,     // 10 minutes

  TESTIMONIALS: 3600,          //  1 hour
  SUPPLIERS: 3600,             //  1 hour

  UPDATES: 600,                // 10 minutes
} as const;
