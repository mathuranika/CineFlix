"use client"
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-blue-900/30 bg-black/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-600 to-blue-800 text-white grid place-items-center font-bold text-lg">C</div>
          <span className="font-bold text-lg text-white">CineFlix</span>
        </Link>
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-md h-9 px-4 bg-blue-600 text-white hover:bg-blue-700 transition font-medium">Sign in</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: { avatarBox: 'h-9 w-9 rounded-full' }
              }}
              userProfileUrl="/user"
            />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}

