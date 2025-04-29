// Aside.tsx
'use client'
import React from 'react'
import { usePathname } from 'next/navigation' // Si usas Next.js
import Link from 'next/link'
import clsx from 'clsx'

type AsideItem = {
  id: string
  href: string
  title: string
}

type AsideProps = {
  items: AsideItem[]
  selectedId?: string // Alternativa si no usas usePathname
  children: React.ReactNode
}

export const Aside = ({ items, selectedId, children }: AsideProps) => {
  const pathname = usePathname() // Si usas Next.js App Router
  const activeId =
    selectedId || items.find((item) => item.href === pathname)?.id || '' // Alternativa si no usas usePathname

  return (
    <div className="flex gap-4 w-full">
      <aside className="w-64 border-r">
        <nav className="flex flex-col gap-2">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={clsx(
                'px-4 py-2 rounded-lg transition-colors hover:bg-primary/10',
                item.id === activeId && 'bg-primary text-white'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="w-3/4">{children}</div>
    </div>
  )
}
