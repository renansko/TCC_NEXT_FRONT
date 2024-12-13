"use client";

import { redirect } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn } = useAuth();
  
  if (isSignedIn) {
    redirect('/menu');
  } else {
    redirect('/sign-in');
  }
}
