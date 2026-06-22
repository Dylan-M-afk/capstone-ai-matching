import { createClient } from '@/utils/supabase/server'

export async function POST(req) {
  const supabase = await createClient()

  const { userId, status } = await req.json()

  const { data, error } = await supabase
    .from('companies')
    .update({ status })
    .eq('id', userId)
    .select()

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  return Response.json({ data })
}