export const positions = [
  {
    slug: 'catcher',
    name: 'Catcher',
  },
  {
    slug: 'first_base',
    name: 'First Base',
  },
  {
    slug: 'second_base',
    name: 'Second Base',
  },
  {
    slug: 'shortstop',
    name: 'Shortstop',
  },
  {
    slug: 'third_base',
    name: 'Third Base',
  },
  {
    slug: 'outfield',
    name: 'Outfield',
  },
  {
    slug: 'pitcher',
    name: 'Pitcher',
  },
] as const;

export const hands = [
  {
    slug: 'l',
    name: 'L',
  },
  {
    slug: 'r',
    name: 'R',
  },
] as const;

export const years = [
  {
    slug: 'freshman',
    name: 'Freshman',
  },
  {
    slug: 'sophomore',
    name: 'Sophomore',
  },
  {
    slug: 'junior',
    name: 'Junior',
  },
  {
    slug: 'senior',
    name: 'Senior',
  },
  {
    slug: 'none',
    name: 'None',
  },
] as const;

export const pitchTypes = [
  'Four Seam Fastball',
  'Two Seam Fastball',
  'Curveball',
  'Changeup',
  'Slider',
] as const;

export const eventTypes = ['Game', 'Practice'] as const;
