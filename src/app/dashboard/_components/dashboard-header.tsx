"use client";
import Link from "next/link";
import { PlusCircle, LogOut, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
  user: any; // Replace with your user type
  onNewTask: () => void;
}

export function DashboardHeader({ user, onNewTask }: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-background border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-4 ml-6 ">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="font-bold text-xl">TaskMaster</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Button onClick={onNewTask} size="sm" className="gap-1 bg-[#0071E3] hover:bg-[#0062C3] text-white">
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">New Task</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <span className="sr-only">Toggle theme</span>
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                {user?.email ? (
                  <span className="hidden sm:inline">{user.email}</span>
                ) : (
                  <span className="hidden sm:inline">Account</span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}