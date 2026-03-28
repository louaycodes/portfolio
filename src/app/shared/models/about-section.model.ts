export interface AboutSection {
  id?: number;
  name: string;
  category: 'TECHNICAL' | 'PERSONAL';
  content: string;
  displayOrder: number;
}
