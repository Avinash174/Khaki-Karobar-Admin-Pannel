import Link from 'next/link';
import { ArrowLeft, Home, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-600/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center mb-6 shadow-inner">
        <FileQuestion className="w-8 h-8" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200/80 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-semibold mb-3">
        <span>404 • Screen Not Found</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white max-w-md">
        The requested screen does not exist
      </h1>

      <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 max-w-md leading-relaxed">
        The route you are trying to access might have been moved or is under active development. Please return to the Khaki Karobar console.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        <Link
          href="/admin/dashboard"
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
