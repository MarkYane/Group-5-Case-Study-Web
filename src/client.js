
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iqiyjqrfzfnngiotmqkd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxaXlqcXJmemZubmdpb3RtcWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwMzcyMjcsImV4cCI6MjAzMjYxMzIyN30.3cFuthDU2-xmzoRcc7oB0IHG2JJ1_1_zPOFBLQ863NI'
export const supabase = createClient(supabaseUrl, supabaseKey)