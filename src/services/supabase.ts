import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mkftvsyroiptzdkweopa.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rZnR2c3lyb2lwdHpka3dlb3BhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1MjcyNTgsImV4cCI6MjA1ODEwMzI1OH0.ZFIfrgnKfKVdv9YEMobIZMgRRdb-NOlxohfYXjq5Ego';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
