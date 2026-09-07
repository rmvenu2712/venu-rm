import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Bot, Code2, Database, Gauge, Server, ShieldCheck } from 'lucide-react';

const skills = [
  {
    title: 'Frontend development',
    description: 'Thoughtful interfaces built for real users. Responsive, accessible, and ready to scale.',
    technologies: ['React', 'Next.js', 'TypeScript'],
    icon: Code2,
  },
  {
    title: 'Backend architecture',
    description: 'Reliable services and well-structured APIs that keep the entire product working together.',
    technologies: ['PHP', 'Laravel', 'Node.js', 'REST APIs'],
    icon: Server,
  },
  {
    title: 'Database design',
    description: 'Clean data models, normalized schemas, and optimized queries for complex workflows.',
    technologies: ['MySQL', 'Data modeling', 'Query optimization'],
    icon: Database,
  },
  {
    title: 'Security & authentication',
    description: 'Secure sign-in flows and protected data across every layer of the application.',
    technologies: ['JWT', 'OAuth', 'Laravel Sanctum'],
    icon: ShieldCheck,
  },
  {
    title: 'Performance optimization',
    description: 'Faster experiences through lean code, efficient APIs, and search-friendly foundations.',
    technologies: ['Code splitting', 'API optimization', 'SEO'],
    icon: Gauge,
  },
  {
    title: 'AI & automation',
    description: 'Connected tools and intelligent workflows that turn repetitive tasks into automated processes.',
    technologies: ['MCP servers', 'Anthropic API', 'Claude Code'],
    icon: Bot,
  },
];

const Features = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="features" aria-labelledby="core-skills-title" className="relative scroll-mt-24 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center gap-4 sm:mb-14">
          <div className="pulse-chip shrink-0">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">04</span>
            <span>Expertise</span>
          </div>
          <motion.div
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.2, ease: 'easeInOut' }}
            className="flex-1 h-[2px] bg-gray-300 dark:bg-gray-600 origin-center"
          />
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20">
          <div>
            <div className="lg:sticky lg:top-28">
              <h2 id="core-skills-title" className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Core skills.<br />
                <span className="font-playfair font-normal italic text-pulse-600 dark:text-pulse-400">Real impact.</span>
              </h2>
              <p className="mt-6 max-w-sm text-base leading-7 text-muted-foreground">
                I connect the dots between design, engineering, and delivery to build complete web experiences.
              </p>

              <div className="relative mt-9 overflow-hidden rounded-2xl bg-[#171a20] p-6 text-white sm:p-8">
                <div aria-hidden="true" className="absolute -right-12 -top-12 h-44 w-44 rounded-full border border-white/10" />
                <div aria-hidden="true" className="absolute -right-6 -top-6 h-32 w-32 rounded-full border border-white/10" />
                <div className="relative">
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-orange-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                    Full-stack mindset
                  </span>
                  <p className="mt-7 max-w-[240px] font-display text-2xl leading-snug">Every layer matters.<br />So does every detail.</p>
                  <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-white/15 pt-5 text-xs text-gray-300">
                    <span>Interface</span><span aria-hidden="true" className="text-orange-400">/</span>
                    <span>Logic</span><span aria-hidden="true" className="text-orange-400">/</span><span>Data</span>
                  </div>
                </div>
              </div>

              <a href="#contact" className="mt-7 inline-flex min-h-11 items-center gap-3 rounded-sm text-sm font-medium underline decoration-pulse-500/50 underline-offset-8 transition-colors hover:text-pulse-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pulse-500 focus-visible:ring-offset-4 focus-visible:ring-offset-background dark:hover:text-pulse-400">
                Let’s build something together <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>

          <ol className="min-w-0 border-t border-border">
            {skills.map(({ title, description, technologies, icon: Icon }, index) => (
              <motion.li
                key={title}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35 }}
                className="group relative border-b border-border py-6 sm:py-7"
              >
                <div aria-hidden="true" className="pointer-events-none absolute -inset-x-3 inset-y-0 rounded-lg bg-pulse-500/0 transition-colors duration-300 group-hover:bg-pulse-500/5 motion-reduce:transition-none" />
                <div className="relative flex gap-3 sm:gap-5">
                  <span className="pt-2 font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
                      <Icon aria-hidden="true" strokeWidth={1.5} className="h-6 w-6 shrink-0 text-pulse-600 dark:text-pulse-400" />
                    </div>
                    <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">{description}</p>
                    <ul aria-label={`${title} technologies`} className="mt-4 flex flex-wrap gap-2">
                      {technologies.map((technology) => (
                        <li key={technology} className="rounded-md border border-border bg-muted/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground sm:text-xs">{technology}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Features;
