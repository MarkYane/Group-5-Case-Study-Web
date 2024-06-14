
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lozekgdnmgsdzwzmyxpx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvemVrZ2RubWdzZHp3em15eHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgzNDIxOTQsImV4cCI6MjAzMzkxODE5NH0.Axzi2HJEpFvgOxIOYfL17VPQTfwESXKKXDFt3NbmhYk'
export const supabase = createClient(supabaseUrl, supabaseKey)