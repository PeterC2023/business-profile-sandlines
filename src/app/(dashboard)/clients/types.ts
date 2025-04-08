// Client-related types for TypeScript

export type ClientType = 'individual' | 'company' | 'lead';
export type ClientStatus = 'active' | 'inactive' | 'lead' | 'new';

export interface ClientItem {
  name: string;
  company?: string;
  email: string;
  phone: string;
  location?: string;
  type: ClientType;
  status: ClientStatus;
  activity?: string;
  value: number;
  image?: string;
}

export interface ClientCategorySectionProps {
  title: string;
  count: number;
  children: React.ReactNode;
}
