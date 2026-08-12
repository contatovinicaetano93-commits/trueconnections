"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Briefcase,
  Calendar,
  Coffee,
  Gift,
  Heart,
  MapPin,
  MessageCircle,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { qgs, site } from "@/lib/content";

const LOGO =
  "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/68c907e90_IMG_1114.jpeg";

const menuItems: {
  label: string;
  desc: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
}[] = [
  {
    label: "Quem Somos",
    desc: "Nossa essência e legado",
    href: "/quem-somos",
    icon: BookOpen,
  },
  {
    label: "Associados",
    desc: "Área premium do clube",
    href: "/seja-associado",
    icon: Users,
  },
  {
    label: "Encontros",
    desc: "Na Mesa & Estudo Bíblico",
    href: "/encontros",
    icon: Gift,
  },
  {
    label: "Próximos Eventos",
    desc: "Agenda e ingressos",
    href: "/eventos",
    icon: Calendar,
  },
  {
    label: "Impacto Social",
    desc: "Instituto Seja o Milagre",
    href: "/impacto",
    icon: Heart,
  },
  {
    label: "True Action",
    desc: "Rede curada de profissionais",
    href: "/true-action",
    icon: Briefcase,
  },
  {
    label: "Loja",
    desc: "Produtos exclusivos da comunidade",
    href: "/loja",
    icon: ShoppingBag,
  },
  {
    label: "Fale Conosco",
    desc: "Tire dúvidas no WhatsApp",
    href: site.whatsapp,
    icon: MessageCircle,
    external: true,
  },
];

const cardClass = `group flex h-full min-h-[105px] flex-col items-center justify-center rounded-2xl
  bg-white/[0.12] p-5 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]
  ring-1 ring-black/[0.04] backdrop-blur-[2px] transition-all duration-500
  hover:shadow-[0_2px_6px_rgba(0,0,0,0.05),0_8px_20px_rgba(0,0,0,0.03)] hover:ring-[hsl(40_40%_52%)]/20
  md:p-6`;

export function HomeClone() {
  return (
    <div className="flex min-h-screen flex-col bg-[hsl(38_28%_90%)] text-[hsl(24_12%_12%)]">
      <div className="flex w-full flex-1 flex-col items-center px-6 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-10 flex flex-col items-center rounded-2xl bg-[hsl(38_28%_90%)] px-6 py-4"
        >
          <Image
            src={LOGO}
            alt="True Connection"
            width={340}
            height={180}
            priority
            className="w-[240px] object-contain md:w-[340px]"
            style={{
              mixBlendMode: "multiply",
              maskImage:
                "radial-gradient(ellipse 80% 75% at 50% 50%, black 35%, transparent 85%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 75% at 50% 50%, black 35%, transparent 85%)",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12 max-w-xs text-center md:max-w-sm"
        >
          <h1 className="mb-4 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-[hsl(24_12%_12%)] md:text-5xl">
            Bem-vindo ao seu refúgio.
          </h1>
          <p className="mx-auto max-w-md font-[family-name:var(--font-body)] text-sm leading-relaxed text-[hsl(24_12%_12%)]/55 md:text-base">
            Aqui conectamos pessoas que não se amoldam aos padrões deste mundo,
            dispostas a se transformar e servir. Porque onde todos servem, não
            falta para ninguém. Onde houver dois ou mais, lá Ele está.
          </p>
          <div className="mx-auto mt-6 h-px w-12 bg-[hsl(40_40%_52%)]/40" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="w-full max-w-3xl"
        >
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">
            {menuItems.map((item, i) => {
              const Icon = item.icon;
              const inner = (
                <>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(24_12%_12%)]/[0.03] transition-all duration-500 group-hover:bg-[hsl(40_40%_52%)]/[0.12] md:h-11 md:w-11">
                    <Icon
                      className="h-[18px] w-[18px] text-[hsl(24_12%_12%)]/45 transition-colors duration-500 group-hover:text-[hsl(24_12%_12%)]/70"
                      strokeWidth={1.4}
                    />
                  </div>
                  <p className="font-[family-name:var(--font-body)] text-[11px] font-medium tracking-wide text-[hsl(24_12%_12%)]/75 transition-colors duration-500 group-hover:text-[hsl(24_12%_12%)] md:text-[13px]">
                    {item.label}
                  </p>
                  <p className="mt-0.5 hidden font-[family-name:var(--font-body)] text-[9px] leading-tight text-[hsl(24_12%_12%)]/45 sm:block md:text-[10px]">
                    {item.desc}
                  </p>
                </>
              );

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.06 }}
                >
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cardClass}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link href={item.href} className={cardClass}>
                      {inner}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10 w-full max-w-xl"
        >
          <div className="mb-3 flex items-center gap-2 px-1">
            <MapPin className="h-4 w-4 text-[hsl(40_40%_52%)]" strokeWidth={1.5} />
            <p className="font-[family-name:var(--font-body)] text-[11px] uppercase tracking-widest text-[hsl(24_12%_12%)]/50">
              Nossos QGs
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {qgs.items.map((item, i) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.08, duration: 0.4 }}
                className="overflow-hidden rounded-2xl border border-black/10 bg-white/40 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] ring-1 ring-black/[0.04] transition-all duration-500 hover:ring-[hsl(40_40%_52%)]/20"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EDE8E0]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 280px"
                  />
                </div>
                <div className="p-3">
                  <h3 className="mb-1 font-[family-name:var(--font-display)] text-xs font-medium text-[hsl(24_12%_12%)]">
                    {item.name}
                  </h3>
                  <p className="mb-2 flex items-center gap-1 font-[family-name:var(--font-body)] text-[10px] text-[hsl(24_12%_12%)]/50">
                    <MapPin className="h-2.5 w-2.5 flex-shrink-0" strokeWidth={1.5} />
                    {item.address}
                  </p>
                  <div className="flex items-center gap-1.5 rounded-lg bg-[hsl(40_40%_52%)]/[0.06] px-2 py-1.5">
                    <Coffee
                      className="h-3 w-3 flex-shrink-0 text-[hsl(40_40%_52%)]"
                      strokeWidth={1.5}
                    />
                    <p className="font-[family-name:var(--font-body)] text-[9px] leading-tight text-[hsl(40_40%_52%)]/80">
                      {item.note}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="pb-12 pt-4 text-center"
      >
        <p className="font-[family-name:var(--font-display)] text-sm italic tracking-widest text-[hsl(24_12%_12%)]/20">
          Mais do que uma plataforma. Um movimento.
        </p>
      </motion.footer>
    </div>
  );
}
