import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import ScrollProgress from "@/components/ScrollProgress";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <ScrollProgress />
      <main className="min-h-screen flex items-center justify-center bg-[#FFF7F0] text-[#111827] dark:bg-[#020617] dark:text-white transition-colors duration-500">
        {/* animated gradient blob background */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div
            className="absolute -left-1/4 top-0 h-[55vh] w-[120vw] bg-[radial-gradient(circle_at_top,_#ffb347_0,_#ff7a18_35%,_#ff5500_60%,_transparent_70%)] dark:bg-[radial-gradient(circle_at_top,_#7c2d12_0,_#ea580c_35%,_#f97316_60%,_transparent_70%)] opacity-80 blur-3xl animate-[pulse_7s_ease-in-out_infinite]"
          />
        </div>

        <section className="relative z-10 px-4 sm:px-6 lg:px-8 w-full">
          <div className="mx-auto max-w-xl rounded-3xl bg-white/70 dark:bg-slate-950/60 backdrop-blur-xl border border-orange-100/60 dark:border-orange-500/20 shadow-[0_40px_120px_rgba(0,0,0,0.15)] dark:shadow-[0_40px_120px_rgba(0,0,0,0.8)] px-6 py-10 sm:px-10 sm:py-12 flex flex-col items-center text-center transform animate-[fadeInUp_0.7s_ease-out]">
            {/* pill */}
            <p className="inline-flex items-center gap-2 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200/80 dark:border-orange-500/40 px-4 py-1 text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-orange-500 dark:text-orange-300">
              <span className="h-2 w-2 rounded-full bg-orange-400 animate-ping" />
              404 · Page not found
            </p>

            {/* heading */}
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Lost in the gradient.
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md">
              The page
              <span className="mx-1 font-mono text-xs sm:text-sm text-orange-600 dark:text-orange-300 break-all">
                {location.pathname}
              </span>
              does not exist. Maybe it was never deployed.
            </p>

            {/* floating 404 badge */}
            <div className="mt-8 mb-4 relative">
              <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-3xl bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300 dark:from-orange-600 dark:via-orange-500 dark:to-amber-400 text-white flex items-center justify-center text-3xl sm:text-4xl font-black shadow-lg shadow-orange-500/40 animate-[float_4s_ease-in-out_infinite]">
                404
              </div>
            </div>

            {/* buttons */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
              <Link
                to="/"
                className="group relative inline-flex items-center justify-center w-full sm:w-auto rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-sm sm:text-base font-medium text-white px-6 py-2.5 shadow-md shadow-orange-500/40 hover:shadow-xl hover:shadow-orange-500/50 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="pr-2">Back to Home</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                to="/projects"
                className="inline-flex items-center justify-center w-full sm:w-auto rounded-full border border-slate-200 dark:border-slate-600 bg-white/70 dark:bg-slate-900/70 px-6 py-2.5 text-sm sm:text-base font-medium text-slate-800 dark:text-slate-100 hover:border-orange-400 hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-300"
              >
                View my work
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default NotFound;
