export interface PlaylistItem {
  id: string;
  name: string;
  uri: string;
  type: 'audio' | 'video';
  duration?: number;
  mimeType?: string;
  size?: number;
}

export interface VisualSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  opacity: number;
}

export interface EQSettings {
  bands: number[];
  presets: Record<string, number[]>;
}