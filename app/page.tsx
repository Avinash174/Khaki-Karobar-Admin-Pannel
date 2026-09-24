import { redirect } from 'next/navigation';

/**
 * Root page: redirect to /dashboard.
 * Unauthenticated users will be caught by the admin layout and sent to /login.
 */
export default function RootPage() {
  redirect('/dashboard');
}
