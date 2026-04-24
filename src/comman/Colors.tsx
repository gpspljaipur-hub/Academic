const Colors = {
  transparent: 'transparent',
  black: '#000000',

  white: '#FFFFFF',
  white18: 'rgba(255, 255, 255, 0.18)',
  white85: 'rgba(255, 255, 255, 0.85)',
  white10: 'rgba(255, 255, 255, 0.1)',

  splashBlue: '#0057B8',
  progressTrackBlue: 'rgba(0, 30, 84, 0.45)',
  periwinkle: '#A8CAFF',
  iceBlue: '#D9E9FF',
  versionMutedBlue: 'rgba(209, 227, 255, 0.7)',

  screenGray: '#F2F3F7',
  brandBlue: '#0D4FA3',
  textCharcoal: '#2E313A',
  heroNavy: '#041C2F',
  mutedSlate: '#4A5365',
  inkDark: '#1B1F2A',
  badgeBlueTint: '#DDE6FB',
  phaseBlue: '#254C89',
  titleInk: '#111722',
  primaryBlue: '#0B56B0',
  bodyGray: '#3E4554',
  cardGray: '#EFF1F5',
  cardTitle: '#232832',
  dotInactive: '#D6D9DF',
  ctaBlue: '#0A56B2',
  UnselectedTabIcon:'#93a1bb',
  selectedTabIconGray:'#0A56B2',
  aliceBlue: '#F0F5FF',
  softBlue: '#E1E9F8',
  offWhite: '#FAFAFA',
  lightGray: '#F0F0F0',
  borderGray: '#EEEEEE',
  errorRed: '#E53935',
  lightRed: '#FFF1F1',
} as const;

export type AppColor = (typeof Colors)[keyof typeof Colors];

export default Colors;
