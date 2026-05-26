export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="h-10 w-10 rounded-full border-2 border-foreground/20 border-t-[var(--accent)] animate-spin" />
    </div>
  )
}
