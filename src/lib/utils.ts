import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// converts 900000 to ₹9L
export function formatFees(amount: number) {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`
  }
  return `₹${amount.toLocaleString("en-IN")}`
}

// converts 2100000 to ₹21 LPA
export function formatPackage(amount: number) {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Cr`
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} LPA`
  }
  return `₹${amount.toLocaleString()}`
}