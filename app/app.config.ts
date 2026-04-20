export default defineAppConfig({
  ui: {
    colors: {
      primary: 'accent',
      neutral: 'zinc'
    },
    button: {
      slots: {
        base: 'rounded-sm font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
      },
      variants: {
        color: {
          primary: 'bg-accent text-main hover:shadow-[0_0_20px_var(--accent-glow)]',
          neutral: 'bg-raised text-text-bright border border-border hover:border-text-dim'
        },
        variant: {
          solid: '',
          outline: 'bg-transparent border-2 border-current hover:bg-current hover:text-main',
          ghost: 'bg-transparent border border-border text-text-dim hover:border-accent hover:text-accent hover:shadow-[0_0_15px_var(--accent-glow)]',
          link: 'bg-transparent text-accent hover:underline underline-offset-4 p-0'
        },
        size: {
          md: 'px-6 py-2.5 text-xs'
        }
      },
      defaultVariants: {
        color: 'primary',
        variant: 'solid',
        size: 'md'
      }
    },
    card: {
      slots: {
        root: 'bg-card border border-border rounded-none shadow-none overflow-hidden relative',
        header: 'p-4 border-b border-border bg-raised/50',
        body: 'p-6',
        footer: 'p-4 border-t border-border bg-raised/50'
      }
    },
    input: {
      slots: {
        root: 'relative flex items-center',
        base: 'bg-raised/50 border border-border rounded-sm px-3 py-2 text-sm font-mono text-text-bright placeholder:text-text-dim/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all'
      }
    },
    container: {
      base: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
    },
    toast: {
      slots: {
        root: 'relative group overflow-hidden bg-raised shadow-2xl rounded-none border border-border p-4 flex gap-2.5 focus:outline-none',
        wrapper: 'w-0 flex-1 flex flex-col',
        title: 'text-sm font-bold font-display uppercase tracking-widest text-text-bright',
        description: 'mt-1 text-xs text-text-dim font-mono',
        icon: 'shrink-0 w-5 h-5 text-accent',
        close: 'p-0 text-text-dim hover:text-text-bright transition-colors',
        progress: 'absolute inset-x-0 bottom-0 h-1',
      }
    },
    progress: {
      slots: {
        indicator: '!bg-accent',
        base: '!bg-transparent'
      }
    }

  }
})
