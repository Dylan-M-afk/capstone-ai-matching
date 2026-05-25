import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { createClient } from '@/utils/supabase/server'
import Header from '../components/header'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Capstone Matching",
  description: "Application for matching students with jobs using AI",
};

export default async function RootLayout({ children }) {
  // Get user data
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let role = null
  if (user) {
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()
    role = profile?.role
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header role={role}></Header>
        {children}
      </body>
    </html>
  );
}
