export interface PreferenceItem {
  id: string;
  category: string;
  title: string;
  description: string;
  details?: string;
  icon: 'code' | 'gamepad' | 'brain';
  color: string;
}