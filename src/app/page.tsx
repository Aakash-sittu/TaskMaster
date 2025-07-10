import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const TaskIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h6v18h-6" />
        <path d="M15 3a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2" />
        <path d="M3 3h6v10H3" />
        <path d="M3 17h6v4H3" />
    </svg>
)

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center">
          <TaskIcon className="h-6 w-6" />
          <span className="ml-2 font-semibold text-lg">Task Master</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            <ThemeToggle />
            <Button asChild variant="outline">
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/register">Register</Link>
            </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Organize Your Life, Effortlessly
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Task Master helps you focus on what's important. A simple, beautiful, and effective task manager designed with Apple's user interface principles.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                    <Link href="/register">
                        Get Started
                    </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Task Master. All rights reserved.</p>
      </footer>
    </div>
  );
}
