// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iwscnuhiwhsoorcwbgwz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3c2NudWhpd2hzb29yY3diZ3d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4OTk4MzcsImV4cCI6MjA1MDQ3NTgzN30.gM1XKGkgWS65GnL9T8mg2_yarvgqqLpQucbYbfAk1GI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);