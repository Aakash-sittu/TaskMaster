"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-6 rounded-full flex items-center transition duration-300 focus:outline-none bg-gray-200 dark:bg-gray-700"
    >
      <div
        className={`w-4 h-4 rounded-full shadow-md transform transition duration-300 ${
          theme === 'dark' ? 'translate-x-6 bg-white' : 'translate-x-1 bg-gray-500'
        }`}
      ></div>
      <Sun className="absolute w-4 h-4 text-gray-700 ml-1 opacity-100 dark:opacity-0 transition-opacity duration-300" />
      <Moon className="absolute w-4 h-4 text-white ml-7 opacity-0 dark:opacity-100 transition-opacity duration-300" />
      <span className="sr-only">Toggle dark mode</span>
    </button>
  )
}
