import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error && error.message !== 'Auth session missing!') {
    return Response.json({ connected: false, error: error.message }, { status: 500 })
  }

  return Response.json({ connected: true, user: data.user })
}
