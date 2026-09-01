import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Parallax animation with different depth levels
export const createParallax = (
  element: HTMLElement,
  depth: 0.1 | 0.25 | 0.4 | 0.6 | 0.8 = 0.4
) => {
  gsap.to(element, {
    y: () => window.innerHeight * (1 - depth),
    scrollTrigger: {
      trigger: element,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      markers: false,
    },
  })
}

// Text reveal animation - line by line
export const createTextReveal = (
  elements: HTMLElement[],
  options?: { stagger?: number; duration?: number }
) => {
  const defaults = { stagger: 0.2, duration: 1 }
  const config = { ...defaults, ...options }

  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: config.duration,
      stagger: config.stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: elements[0],
        start: 'top 80%',
        end: 'top 20%',
        scrub: false,
        markers: false,
      },
    }
  )
}

// Scroll-triggered counter animation
export const createCounter = (
  element: HTMLElement,
  target: number,
  options?: { duration?: number; suffix?: string; prefix?: string }
) => {
  const defaults = { duration: 2, suffix: '', prefix: '' }
  const config = { ...defaults, ...options }

  const counter = { value: 0 }

  gsap.to(counter, {
    value: target,
    duration: config.duration,
    ease: 'power1.out',
    onUpdate: () => {
      element.textContent = `${config.prefix}${Math.floor(counter.value)}${config.suffix}`
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      once: true,
      markers: false,
    },
  })
}

// Staggered entrance animation
export const createStaggeredEntrance = (
  elements: HTMLElement[],
  options?: { stagger?: number; duration?: number; delay?: number }
) => {
  const defaults = { stagger: 0.1, duration: 0.6, delay: 0 }
  const config = { ...defaults, ...options }

  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      duration: config.duration,
      stagger: config.stagger,
      delay: config.delay,
      ease: 'power2.out',
    }
  )
}

// Scroll progress bar
export const createScrollProgress = (progressBar: HTMLElement) => {
  gsap.to(progressBar, {
    width: '100%',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      markers: false,
    },
  })
}

// Mouse parallax for hero
export const createMouseParallax = (
  container: HTMLElement,
  elements: HTMLElement[]
) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    elements.forEach((el, index) => {
      const depth = (index + 1) * 10
      gsap.to(el, {
        x: x * depth,
        y: y * depth,
        duration: 0.5,
        ease: 'power2.out',
      })
    })
  }

  container.addEventListener('mousemove', handleMouseMove)

  return () => {
    container.removeEventListener('mousemove', handleMouseMove)
  }
}

// Magnetic button effect
export const createMagneticButton = (button: HTMLElement) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  button.addEventListener('mousemove', handleMouseMove)
  button.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    button.removeEventListener('mousemove', handleMouseMove)
    button.removeEventListener('mouseleave', handleMouseLeave)
  }
}

// Horizontal scroll snapping section
export const createHorizontalScroll = (
  container: HTMLElement,
  items: HTMLElement[]
) => {
  const totalWidth = items.reduce((acc, item) => acc + item.offsetWidth, 0)

  gsap.to(container, {
    x: -totalWidth + window.innerWidth,
    scrollTrigger: {
      trigger: container.parentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      markers: false,
      onUpdate: (self) => {
        // Sync vertical scroll to horizontal scroll
      },
    },
  })
}

// Clip path mask reveal
export const createClipPathReveal = (
  element: HTMLElement,
  options?: { duration?: number; ease?: string }
) => {
  const defaults = { duration: 1, ease: 'power2.inOut' }
  const config = { ...defaults, ...options }

  return gsap.fromTo(
    element,
    {
      clipPath: 'inset(0 100% 0 0)',
    },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: config.duration,
      ease: config.ease,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        markers: false,
      },
    }
  )
}

// Timeline animation for experience
export const createTimelineAnimation = (timeline: HTMLElement) => {
  const line = timeline.querySelector('[data-timeline-line]') as HTMLElement
  
  if (!line) return

  gsap.fromTo(
    line,
    { height: '0%' },
    {
      height: '100%',
      scrollTrigger: {
        trigger: timeline,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
    }
  )
}

// Keyboard-safe smooth scroll
export const smoothScroll = (target: string, offset = 100) => {
  const element = document.querySelector(target)
  if (!element) return

  const targetPosition = (element as HTMLElement).offsetTop - offset
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  const duration = 1000
  let start: number | null = null

  const animation = (currentTime: number) => {
    if (start === null) start = currentTime
    const elapsed = currentTime - start
    const progress = Math.min(elapsed / duration, 1)

    // Ease out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3)

    window.scrollTo(0, startPosition + distance * easeProgress)

    if (progress < 1) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}

// Intersection Observer for lazy animations
export const observeElement = (
  element: HTMLElement,
  callback: (isVisible: boolean) => void,
  options?: IntersectionObserverInit
) => {
  const defaults: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px',
  }
  const config = { ...defaults, ...options }

  const observer = new IntersectionObserver(([entry]) => {
    callback(entry.isIntersecting)
  }, config)

  observer.observe(element)

  return () => observer.unobserve(element)
}
