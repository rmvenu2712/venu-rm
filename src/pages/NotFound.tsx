import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Compass, Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const NotFound = () => {
  const { pathname } = useLocation();
  const { theme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";
  const focusStyle = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pulse-500 focus-visible:ring-offset-4 focus-visible:ring-offset-background";

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Page not found | Venu RM";
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div className="flex min-h-[100svh] flex-col bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <Link to="/" aria-label="Venu RM home" className={`inline-flex min-h-11 items-center rounded-sm ${focusStyle}`}>
          <img src="/venu-logo.png" alt="VENU logo" className="h-10 w-auto" />
        </Link>
        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className={`flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted ${focusStyle}`}
        >
          {isDark ? <Sun aria-hidden="true" className="h-4 w-4" /> : <Moon aria-hidden="true" className="h-4 w-4" />}
        </button>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-6 py-12 sm:px-10 sm:py-16">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 flex items-center gap-4">
              <span className="pulse-chip shrink-0">
                <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-pulse-500 text-white"><Compass aria-hidden="true" className="h-3 w-3" /></span>
                Page not found
              </span>
              <div aria-hidden="true" className="h-px flex-1 bg-border" />
            </div>
            <h1 className="font-display text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl xl:text-7xl">
              A little<br />off <span className="font-playfair font-normal italic text-pulse-600 dark:text-pulse-400">course.</span>
            </h1>
            <p className="mt-6 max-w-sm text-base leading-7 text-muted-foreground">
              Looks like this page has moved or doesn’t exist. Let’s get you back to something good.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/" className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-pulse-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-pulse-700 ${focusStyle}`}>
                <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to home
              </Link>
              <Link to="/projects" className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-pulse-500 hover:text-pulse-600 dark:hover:text-pulse-400 ${focusStyle}`}>
                Explore projects <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <div className="relative isolate overflow-hidden rounded-[2rem] border border-border bg-muted/30 px-5 py-10 sm:px-8 sm:py-14">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full border border-pulse-500/20" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 -z-10 h-52 w-52 rounded-full border border-pulse-500/20" />
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <span>Wrong turn, right place</span>
              <Compass aria-hidden="true" strokeWidth={1.5} className="h-5 w-5 text-pulse-500" />
            </div>
            <p aria-label="Error 404" className="my-8 text-center font-display text-[clamp(6rem,20vw,12rem)] font-bold leading-none tracking-tighter">
              4<span className="font-playfair font-normal italic text-pulse-600 dark:text-pulse-400">0</span>4
            </p>
            <div className="border-t border-border pt-5">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Requested page</p>
              <p className="break-all font-mono text-xs leading-5 text-muted-foreground">{pathname}</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-6 text-xs text-muted-foreground sm:px-10">
        <span>Venu RM / Full-stack developer</span>
        <Link to="/" className={`inline-flex min-h-11 items-center gap-2 rounded-sm hover:text-foreground ${focusStyle}`}>
          Back to home <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      </footer>
    </div>
  );
};

export default NotFound;
