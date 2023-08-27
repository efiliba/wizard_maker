import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getDomain = () => process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}.vercel.app`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`
      : 'http://localhost:3000';
