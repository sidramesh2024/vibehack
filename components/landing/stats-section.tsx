
"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"

interface StatProps {
  end: number
  suffix?: string
  duration?: number
}

function AnimatedNumber({ end, suffix = "", duration = 2000 }: StatProps) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true })

  useEffect(() => {
    if (inView) {
      let startTime: number
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [inView, end, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const stats = [
  {
    value: 500,
    suffix: "+",
    label: "Active Artists",
    description: "Verified creative professionals"
  },
  {
    value: 1200,
    suffix: "+",
    label: "Projects Completed",
    description: "Successful collaborations"
  },
  {
    value: 25,
    suffix: "+",
    label: "Brooklyn Neighborhoods",
    description: "Community coverage"
  },
  {
    value: 4.8,
    suffix: "/5",
    label: "Average Rating",
    description: "Client satisfaction"
  }
]

export function StatsSection() {
  return (
    <section className="py-24 bg-red-500">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Building Brooklyn's Creative <span className="text-red-100">Economy</span>
          </h2>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Real numbers from our growing community of artists and clients
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center space-y-2"
            >
              <div className="text-4xl md:text-5xl font-bold text-white">
                <AnimatedNumber end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-lg font-semibold text-red-100">
                {stat.label}
              </div>
              <div className="text-sm text-red-200">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
