import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="text-[96px] md:text-[140px] font-display leading-none">404</div>
        <p className="mt-6 text-lg text-foreground/60">这页不存在，或者已被移动。</p>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-pill px-6 text-sm font-semibold bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
          >
            返回首页
          </Link>
        </div>
      </div>
    </main>
  )
}
