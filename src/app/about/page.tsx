import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Image from 'next/image'

export default function About() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-40">
        <div className="container-custom">
          <ScrollReveal>
            <h1 className="text-hero mb-12">关于我</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
              <div className="space-y-8 text-xl text-foreground/70 leading-relaxed">
                <p>
                  我是一名专注于后端开发与智能化系统的全栈工程师。熟练使用 Go-Gin 与 FastAPI 构建高性能服务，擅长 Prisma ORM 与 Redis 实现高效数据管理，精通 WebSocket 与 TCP Socket 开发实时通信系统。
                </p>
                <p>
                  我的技术栈涵盖 Next.js API Routes、TypeScript、MySQL/PostgreSQL 数据库设计与优化，以及 Docker 容器化部署。在 AI 集成方面，我有丰富的 GPT-4/Claude 3 调用经验，擅长将 AI 能力融入实际业务场景。
                </p>
                <p>
                  我热衷于构建具有实际价值的系统：从 AI 驱动的塔罗牌应用，到实时数据传输的物联网平台，再到航空监控与预警系统。我相信技术的价值在于解决真实问题，提升用户体验与系统稳定性。
                </p>
                <p>
                  目前专注于嵌入式后端开发，使用 Python Socket 与 M1/GPIO 进行硬件通信与控制，同时探索智能化调度与资源管理优化。
                </p>
              </div>
              <div className="aspect-square rounded-apple bg-apple-gray dark:bg-zinc-800 overflow-hidden relative">
                <Image
                  src="https://ik.imagekit.io/edyuiaged/GitHub%20profile/%E5%B0%8F%E7%8C%AB%E7%8E%A9%E7%94%B5%E8%84%91%20%20%20%20%E5%8A%A8%E6%80%81%E5%9B%BE%20%E8%A1%A8%E6%83%85%E5%8C%85%20%E8%81%8A%E5%A4%A9%20%E6%90%9E%E7%AC%91%20QQ%20%E5%BE%AE%E4%BF%A1%20%E6%95%B4_%E7%88%B1%E7%BB%99%E7%BD%91_aigei_com.gif?updatedAt=1748599617701"
                  alt="小猫玩电脑动态头像"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <Footer />
    </main>
  )
}
