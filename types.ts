export interface PreferenceItem {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: 'code' | 'gamepad' | 'brain';
  color: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}