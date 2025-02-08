import { PrismaClient } from "@prisma/client"

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_SUPER_BASE_URL, import.meta.env.VITE_ANON_KEY);

const db = new PrismaClient()

export default {db, supabase}