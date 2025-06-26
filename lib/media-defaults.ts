import { VisualSettings } from './types';

export const initialVisualSettings: VisualSettings = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  blur: 0,
  opacity: 1,
};

export const eqBandsDefinition = [
  { name: '60Hz', frequency: 60 },
  { name: '170Hz', frequency: 170 },
  { name: '310Hz', frequency: 310 },
  { name: '600Hz', frequency: 600 },
  { name: '1kHz', frequency: 1000 },
  { name: '3kHz', frequency: 3000 },
  { name: '6kHz', frequency: 6000 },
  { name: '12kHz', frequency: 12000 },
  { name: '14kHz', frequency: 14000 },
  { name: '16kHz', frequency: 16000 },
];

export const eqPresets = {
  flat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  rock: [3, 2, -1, -2, 1, 2, 3, 3, 3, 3],
  pop: [-1, 2, 3, 3, 1, -1, -1, -1, -1, -1],
  jazz: [2, 1, 1, 2, -1, -1, 0, 1, 2, 3],
  classical: [3, 2, -1, -2, -1, 1, 2, 3, 3, 4],
  bass: [6, 4, 2, 1, -1, -2, -2, -1, 1, 2],
  treble: [-6, -4, -2, 1, 2, 3, 4, 5, 6, 6],
};