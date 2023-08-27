import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getDomain = () => {
  console.log("getDomain:");
  console.log("process.env.NEXT_PUBLIC_VERCEL_ENV", process.env.NEXT_PUBLIC_VERCEL_ENV);
  console.log("process.env.NEXT_PUBLIC_VERCEL_URL", process.env.NEXT_PUBLIC_VERCEL_URL);
  console.log("process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL", process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL);
  console.log("process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG", process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG);
  console.log("______________________________");

  // switch ()

  return process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`
      : 'http://localhost:3000';
}
