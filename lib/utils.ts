import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getDomain = () => {
  console.log("getDomain:");
  console.log("process.env.NEXT_PUBLIC_VERCEL_ENV", process.env.NEXT_PUBLIC_VERCEL_ENV);
  console.log("process.env.VERCEL_ENV", process.env.VERCEL_ENV);
  console.log("process.env.NEXT_PUBLIC_VERCEL_URL", process.env.NEXT_PUBLIC_VERCEL_URL);
  console.log("process.env.VERCEL_URL", process.env.VERCEL_URL);

  console.log("______________________________");
  
  return process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';
}