const { createClient }  = require('@supabase/supabase-js');

// Create a single supabase client for interacting with your database
const supabase = createClient('https://otdlzkcromebdhrpagoz.supabase.co', process.env.SUPABASE_ANON_KEY);

module.exports =  supabase