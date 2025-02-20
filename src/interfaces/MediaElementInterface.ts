export interface MediaElement {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}
