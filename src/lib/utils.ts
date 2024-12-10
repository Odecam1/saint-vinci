import { clsx, type ClassArray } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...input: ClassArray) => twMerge(clsx(input))
