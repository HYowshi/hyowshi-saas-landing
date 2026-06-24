import { Suspense, lazy, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

const HeroScene = lazy(() => import('./HeroScene'))

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    code: '01',
    title: 'Luxury Ring Product Site',
    type: 'Premium product storytelling',
    body: 'A cinematic product page direction for jewelry, watches, cosmetics, and high-margin physical products. Strong first screen, detail shots, trust blocks, specs, motion, and conversion CTA.',
    stack: ['React', 'Three.js', 'GSAP', 'Product UI'],
  },
  {
    code: '02',
    title: 'SaaS Launch Landing Page',
    type: 'Startup conversion system',
    body: 'A polished landing page pattern for founders: hero, product proof, feature narrative, pricing-ready blocks, FAQ, contact CTA, GitHub handoff, and deploy-ready build.',
    stack: ['React', 'TypeScript', 'Vite', 'SEO basics'],
  },
  {
    code: '03',
    title: 'Frontend Rescue Sprint',
    type: 'Bug fix, cleanup, polish',
    body: 'Focused repair for broken React pages, responsive bugs, build failures, weak UI spacing, unused assets, and codebase cleanup without breaking existing behavior.',
    stack: ['Debugging', 'Responsive CSS', 'Build checks', 'README'],
  },
]

const skills = [
  ['Frontend', 'React, TypeScript, JavaScript, HTML, CSS'],
  ['Motion', 'GSAP, ScrollTrigger, transitions, micro-interactions'],
  ['3D', 'Three.js, WebGL-ready hero scenes, interactive product moments'],
  ['Design', 'Poster-style layout, typography, spacing, responsive systems'],
  ['Delivery', 'GitHub repo, README, deployment notes, clean commits'],
  ['Quality', 'Build checks, linting, accessibility basics, performance basics'],
]

const timeline = [
  ['01', 'Read the brief', 'Goal, audience, deliverables, deadline, assets, and platform.'],
  ['02', 'Shape the concept', 'Layout direction, section order, motion rhythm, and conversion path.'],
  ['03', 'Build the product', 'React components, responsive UI, 3D/motion when useful, clean structure.'],
  ['04', 'Verify and ship', 'Build/lint checks, visual review, README, repo, demo link, handoff note.'],
]

function App() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      gsap.set('.motion-rise', { opacity: 0, y: 34 })
      gsap.set('.projectPoster', { opacity: 0, y: 48, rotateX: 4 })
      gsap.set('.skillRow', { opacity: 0, x: 32 })
      gsap.set('.timelineItem', { opacity: 0, y: 24 })

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .from('.brand', { opacity: 0, scale: 0.72, duration: 0.7 })
        .from('.navLinks a', { opacity: 0, y: -10, stagger: 0.05, duration: 0.5 }, '-=0.35')
        .to('.hero .motion-rise', { opacity: 1, y: 0, stagger: 0.1, duration: 0.85 }, '-=0.25')
        .from('.heroVisual', { opacity: 0, y: 30, scale: 0.94, duration: 1 }, '-=0.65')

      gsap.to('.heroVisual', {
        yPercent: 7,
        ease: 'none',
        scrollTrigger: {
          scrub: true,
          start: 'top top',
          end: 'bottom top',
          trigger: '.hero',
        },
      })

      gsap.utils.toArray<HTMLElement>('.motion-rise:not(.hero .motion-rise)').forEach((element) => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            start: 'top 82%',
            trigger: element,
          },
        })
      })

      gsap.to('.projectPoster', {
        opacity: 1,
        rotateX: 0,
        stagger: 0.16,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          start: 'top 72%',
          trigger: '.projectWall',
        },
      })

      gsap.to('.skillRow', {
        opacity: 1,
        x: 0,
        stagger: 0.07,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          start: 'top 74%',
          trigger: '.skillList',
        },
      })

      gsap.to('.timelineItem', {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          start: 'top 72%',
          trigger: '.timelineGrid',
        },
      })

      gsap.to('.marqueeTrack', {
        xPercent: -50,
        duration: 22,
        ease: 'none',
        repeat: -1,
      })
    }, root)

    return () => context.revert()
  }, [])

  return (
    <div ref={root}>
      <main>
        <nav className="nav" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Harashi Yowshi portfolio home">
            HY
          </a>
          <div className="navLinks">
            <a href="#projects">Work</a>
            <a href="#skills">Skills</a>
            <a href="#timeline">Timeline</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <section className="hero" id="top">
          <div className="heroCopy">
            <p className="eyebrow motion-rise">Frontend portfolio / React / Motion / WebGL</p>
            <h1 className="motion-rise">Digital products with campaign-level polish.</h1>
            <p className="lead motion-rise">
              I build React websites, premium landing pages, and frontend fixes that feel
              intentional: strong layout, motion direction, responsive craft, clean GitHub
              handoff, and deployable source code.
            </p>
            <div className="heroActions motion-rise">
              <a className="button primary" href="mailto:HarashiYowshi@gmail.com">
                Start a Project
              </a>
              <a className="button secondary" href="https://github.com/HYowshi">
                View GitHub
              </a>
            </div>
            <div className="heroStats motion-rise" aria-label="Portfolio strengths">
              <span>GSAP motion</span>
              <span>Three.js hero</span>
              <span>React delivery</span>
              <span>Responsive polish</span>
            </div>
          </div>

          <div className="heroVisual" aria-label="Animated 3D frontend showcase">
            <Suspense fallback={<div className="sceneFallback" aria-hidden="true" />}>
              <HeroScene />
            </Suspense>
            <div className="posterBadge badgeTop">
              <span>Motion</span>
              <strong>GSAP timeline</strong>
            </div>
            <div className="posterBadge badgeBottom">
              <span>Build</span>
              <strong>React + WebGL</strong>
            </div>
          </div>
        </section>

        <section className="marquee" aria-label="Capabilities">
          <div className="marqueeTrack">
            {Array.from({ length: 2 }).map((_, group) => (
              <div className="marqueeGroup" key={group}>
                <span>Luxury product sites</span>
                <span>Landing pages</span>
                <span>Frontend repair</span>
                <span>GSAP motion</span>
                <span>WebGL moments</span>
                <span>GitHub handoff</span>
              </div>
            ))}
          </div>
        </section>

        <section className="proofBand">
          <div className="proofItem motion-rise">
            <strong>01</strong>
            <span>Poster-inspired layout system</span>
          </div>
          <div className="proofItem motion-rise">
            <strong>02</strong>
            <span>Motion used to guide attention</span>
          </div>
          <div className="proofItem motion-rise">
            <strong>03</strong>
            <span>Production build and repo handoff</span>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="sectionHeader motion-rise">
            <p className="eyebrow">Selected directions</p>
            <h2>Not generic pages. Sellable web experiences.</h2>
            <p>
              The portfolio is positioned around the jobs worth applying for: premium
              product storytelling, conversion landing pages, and frontend rescue work.
            </p>
          </div>

          <div className="projectWall">
            {projects.map((project) => (
              <article className="projectPoster" key={project.title}>
                <div className="posterMeta">
                  <span>{project.code}</span>
                  <span>{project.type}</span>
                </div>
                <div className="posterVisual" aria-hidden="true">
                  <div className="posterOrb"></div>
                  <div className="posterFrame"></div>
                  <div className="posterLine"></div>
                </div>
                <div className="posterBody">
                  <h3>{project.title}</h3>
                  <p>{project.body}</p>
                  <div className="tagList">
                    {project.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section split" id="skills">
          <div className="sectionHeader motion-rise">
            <p className="eyebrow">Skill system</p>
            <h2>Design sense plus implementation discipline.</h2>
            <p>
              The goal is not just a beautiful first screen. The work must remain
              responsive, reviewable, deployable, and useful for the client after handoff.
            </p>
          </div>
          <div className="skillList">
            {skills.map(([name, detail]) => (
              <div className="skillRow" key={name}>
                <strong>{name}</strong>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="timeline" id="timeline">
          <div className="timelineHeader motion-rise">
            <p className="eyebrow">Delivery timeline</p>
            <h2>A clean path from brief to link.</h2>
          </div>
          <div className="timelineGrid">
            {timeline.map(([number, title, detail]) => (
              <article className="timelineItem" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="motion-rise">
            <p className="eyebrow">Available for fixed-scope frontend work</p>
            <h2>Send the brief. I will turn it into a polished web product.</h2>
            <p>
              Best fit: landing pages, premium product websites, portfolio websites,
              React UI fixes, responsive cleanup, and animated frontend builds.
            </p>
          </div>
          <div className="contactPanel motion-rise">
            <a href="mailto:HarashiYowshi@gmail.com">HarashiYowshi@gmail.com</a>
            <a href="https://github.com/HYowshi">github.com/HYowshi</a>
            <a href="https://hyowshi.github.io/hyowshi-saas-landing/">
              Live portfolio demo
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
