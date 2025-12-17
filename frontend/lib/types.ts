// TypeScript types for the application

export interface BusinessEntity {
  entity_number: string;
  entity_name: string;
  entity_type: string | null;
  status: string | null;
  jurisdiction: string | null;
  formation_date: string | null;
  last_update: string | null;
  agent_name: string | null;
  agent_address_street: string | null;
  agent_address_city: string | null;
  agent_address_state: string | null;
  agent_address_zip: string | null;
  business_address_street: string | null;
  business_address_city: string | null;
  business_address_state: string | null;
  business_address_zip: string | null;
  business_county: string | null;
  mailing_address_street: string | null;
  mailing_address_city: string | null;
  mailing_address_state: string | null;
  mailing_address_zip: string | null;
  contact_email: string | null;
  email_source: string | null;
  email_status: string | null;
  monitor_enabled: boolean | null;
  previous_status: string | null;
  status_change_date: string | null;
  last_alert_sent_date: string | null;
  last_checked: string | null;
  run_id: string | null;
  next_due_date: string | null;
  days_until_due: number | null;
  renewal_window_flag: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Order {
  id: string;
  entity_number: string;
  customer_email: string;
  customer_name: string | null;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  stripe_payment_intent_id: string | null;
  stripe_checkout_session_id: string | null;
  created_at: string;
  updated_at: string;
  processed_at: string | null;
  notes: string | null;
}

export interface SearchResult {
  entity_number: string;
  entity_name: string;
  status: string | null;
  formation_date: string | null;
  entity_type: string | null;
}

