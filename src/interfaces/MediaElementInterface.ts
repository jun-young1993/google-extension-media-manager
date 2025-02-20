export interface MediaElement {
  name: string;
  type: 'image' | 'video';
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}
