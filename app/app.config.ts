export default defineAppConfig({
  ui: {
    toast: {
      slots: {
        root: 'relative group overflow-hidden bg-bg-raised shadow-2xl rounded-none border border-border p-4 flex gap-2.5 focus:outline-none',
        wrapper: 'w-0 flex-1 flex flex-col',
        title: 'text-sm font-bold font-display uppercase tracking-widest text-text-bright',
        description: 'mt-1 text-xs text-text-dim font-mono',
        icon: 'shrink-0 w-5 h-5 text-accent',
        close: 'p-0 text-text-dim hover:text-text-bright transition-colors',
      }
    }
  }
})
