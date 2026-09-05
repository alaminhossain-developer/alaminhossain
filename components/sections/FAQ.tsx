'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const faqData = [
  {
    question: 'Who is Md. Al Amin Hossain?',
    answer: 'Md. Al Amin Hossain is a professional WordPress and Shopify developer from Bangladesh, specializing in high-performance web development, custom theme development, and web optimization. With extensive experience building e-commerce stores, business websites, and web applications, he helps brands create fast, scalable, and visually compelling digital experiences.',
  },
  {
    question: 'What kind of developer is Md. Al Amin Hossain?',
    answer: 'Md. Al Amin Hossain (also spelled AlAmin Hossain, Al Amin Hossen, or Alamin Developer) is a Bangladeshi full stack web developer specializing in WordPress, Shopify, and web performance optimization. He has delivered 100+ projects including custom WordPress themes, Shopify stores with Liquid templating, Shopify custom apps like AI Store Doctor, WooCommerce stores, and SEO-optimized business websites. He also builds modern web applications using React, Next.js, and Node.js.',
  },
  {
    question: 'What technologies does Md. Al Amin Hossain use?',
    answer: 'Md. Al Amin Hossain works with a modern tech stack including WordPress, Shopify (Liquid), React, Next.js, TypeScript, Tailwind CSS, Node.js, GSAP animations, and various performance optimization tools. He also uses Shopify Polaris for app development and has experience with Shopify REST and GraphQL APIs.',
  },
  {
    question: 'Is Md. Al Amin Hossain available for freelance or remote work?',
    answer: 'Yes, Md. Al Amin Hossain is available for freelance projects, remote work, and consulting engagements. He specializes in WordPress development, Shopify store customization, web performance optimization, and custom web application development. You can reach out through the contact form or email at contact@alaminhossain.me.',
  },
  {
    question: 'What is Md. Al Amin Hossain\'s approach to web performance?',
    answer: 'Md. Al Amin Hossain takes a performance-first approach to web development. He focuses on Core Web Vitals optimization, image optimization, code splitting, lazy loading, and server-side rendering to ensure websites load fast and score well on Google Lighthouse. His goal is to achieve 90+ Lighthouse scores across all metrics.',
  },
  {
    question: 'Does Md. Al Amin Hossain build Shopify apps?',
    answer: 'Yes, Md. Al Amin Hossain develops custom Shopify apps using React, Node.js, and Shopify Polaris. He has built apps like AI Store Doctor, which uses AI to audit and optimize Shopify stores. His app development covers the full stack from backend API to frontend admin dashboard.',
  },
]

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div className="border-b border-cyan-500/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3.5 text-left group"
        aria-expanded={isOpen}
      >
        <span className={`text-base font-medium transition-colors ${isOpen ? 'text-cyan-400' : 'text-white/80 group-hover:text-white'}`}>
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`}
        />
      </button>
      <div
        ref={contentRef}
        style={{ height: `${height}px`, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <p className="pb-4 text-sm text-white/50 leading-relaxed pr-8">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current.querySelectorAll('[data-faq-item]'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <section ref={containerRef} className="relative py-10 lg:py-14 px-6" id="faq">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div data-faq-item className="mb-6">
            <span className="text-xs font-bold text-cyan-400/80 uppercase tracking-[0.2em] block mb-2">
              FAQ
            </span>
            <h2 className="text-xl lg:text-2xl font-bold tracking-[-0.02em] text-white">
              Frequently Asked Questions
            </h2>
          </div>

          {/* FAQ Items */}
          <div>
            {faqData.map((faq, index) => (
              <div data-faq-item key={index}>
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
