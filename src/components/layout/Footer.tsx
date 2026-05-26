import React from 'react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <Link href="/" className="text-xl font-display font-bold">
            Portfolio
          </Link>
          <p className="text-sm text-foreground/60 max-w-xs text-center md:text-left">
            专注于创造高品质、简洁且富有情感的数字产品体验。
          </p>
        </div>

        <div className="flex items-center space-x-12">
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground/40">
              链接
            </h4>
            <Link href="/about" className="text-sm hover:text-apple-blue transition-colors">
              关于
            </Link>
            <Link href="/work" className="text-sm hover:text-apple-blue transition-colors">
              作品
            </Link>
            <Link href="/blog" className="text-sm hover:text-apple-blue transition-colors">
              博客
            </Link>
          </div>

          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground/40">
              社交
            </h4>
            <a href="https://github.com" target="_blank" className="text-sm hover:text-apple-blue transition-colors">
              GitHub
            </a>
            <a href="https://twitter.com" target="_blank" className="text-sm hover:text-apple-blue transition-colors">
              Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" className="text-sm hover:text-apple-blue transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 flex flex-col md:flex-row items-center justify-between text-xs text-foreground/40">
        <p>© {currentYear} Portfolio. All rights reserved.</p>
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            隐私政策
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            服务条款
          </Link>
        </div>
      </div>
    </footer>
  )
}
