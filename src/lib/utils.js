import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function prettyDate(dateString, dateOnly = false, includeSeconds = false) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  if (dateOnly) {
    return `${year}-${month}-${day}`;
  }

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  let timeString = `${hours}:${minutes}`;

  if (includeSeconds) {
    const seconds = String(date.getSeconds()).padStart(2, '0');
    timeString += `:${seconds}`;
  }

  return `${year}-${month}-${day} ${timeString}`;
}

export function prettyKey(key) {
  return key.replace("_", " ").replace(/\w\S*/, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
};