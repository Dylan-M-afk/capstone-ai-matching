'use client'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function SignOutButton() {
    const router = useRouter()

    async function handleSignOut() {
        const supabase = createClient()

        // Sign out via browser client
        const { error } = await supabase.auth.signOut()

        if (error) {
            console.error('Sign-out error:', error)
        }

        // Hard navigation garuntees clean redirect
        window.location.href = '/login'
    }

    return (
        <span className="nav-item">
            <button  type="button" onClick={handleSignOut}>
                Log Out
            </button>
        </span>

    )
}