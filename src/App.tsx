import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

const HeroScene = lazy(() => import('./HeroScene'))

gsap.registerPlugin(ScrollTrigger)

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

const showcasePages = {
  '/luxury-rings': {
    accent: '#dff7ff',
    nav: 'Luxury',
    eyebrow: 'Luxury ecommerce concept',
    title: 'AURELIA Ring Atelier',
    subtitle:
      'A premium jewelry storefront built around product desire, macro detail, trust, and a calm purchase path.',
    heroImage: 'showcase-assets/luxury-ring.png',
    detailImage: 'showcase-assets/ring-detail.png',
    tags: ['Luxury ecommerce', 'Product storytelling', 'Macro detail', 'GSAP motion'],
    stats: [
      ['01', 'Cinematic product hero'],
      ['04', 'Conversion sections'],
      ['2', 'Editorial image treatments'],
    ],
    modules: [
      ['Collection Entry', 'Hero, campaign copy, visual hierarchy, and primary consultation CTA.'],
      ['Craft Detail', 'Macro material storytelling for diamond, setting, clarity, and finish.'],
      ['Purchase Confidence', 'Guarantee, sizing, consultation, delivery, and aftercare sections.'],
      ['Mobile Luxury', 'Tight spacing, large product imagery, and touch-friendly product CTAs.'],
    ],
  },
  '/saas-command': {
    accent: '#67e8f9',
    nav: 'SaaS',
    eyebrow: 'AI SaaS launch concept',
    title: 'NOVA Command OS',
    subtitle:
      'A high-trust SaaS landing page for analytics and automation products with clear product proof and demo conversion.',
    heroImage: 'showcase-assets/saas-dashboard.png',
    detailImage: 'showcase-assets/saas-device.png',
    tags: ['SaaS landing', 'Dashboard UI', 'Motion system', 'Startup launch'],
    stats: [
      ['24h', 'Strong launch impression'],
      ['6+', 'Reusable sections'],
      ['100%', 'Responsive structure'],
    ],
    modules: [
      ['Dashboard Proof', 'Hero product visual, metrics strip, and outcome-led interface explanation.'],
      ['Feature Flow', 'Automation cards, use cases, integration strip, and concise value blocks.'],
      ['Conversion Path', 'Demo CTA, pricing-ready area, FAQ, and social proof placement.'],
      ['Technical Handoff', 'React components, Vite build, README, and deployment notes.'],
    ],
  },
  '/bakery-atelier': {
    accent: '#ffe5ad',
    nav: 'Bakery',
    eyebrow: 'Boutique bakery commerce concept',
    title: 'Maison Cake Atelier',
    subtitle:
      'A warm premium bakery storefront with product catalogue, cake detail storytelling, enquiry flow, and editorial food imagery.',
    heroImage: 'showcase-assets/bakery-cakes.png',
    detailImage: 'showcase-assets/bakery-detail.png',
    tags: ['Food ecommerce', 'Catalogue UI', 'Product detail', 'Mobile browsing'],
    stats: [
      ['03', 'Core categories'],
      ['02', 'Order paths'],
      ['01', 'Elegant visual system'],
    ],
    modules: [
      ['Catalogue Browse', 'Birthday, wedding, and chocolate cake category cards with filter-ready layout.'],
      ['Cake Detail', 'Large food imagery, ingredients, size, event fit, and enquiry CTA.'],
      ['Brand Warmth', 'Soft color, generous whitespace, editorial product rhythm, and premium tone.'],
      ['Order Flow', 'Custom order prompt, contact form placement, and mobile-first conversion.'],
    ],
  },
} as const

type ShowcaseKey = keyof typeof showcasePages
type ShowcasePageData = (typeof showcasePages)[ShowcaseKey]

const projects = (Object.keys(showcasePages) as ShowcaseKey[]).map((href, index) => {
  const page = showcasePages[href]
  return {
    code: String(index + 1).padStart(2, '0'),
    href: `#${href}`,
    image: page.heroImage,
    title: page.title,
    type: page.eyebrow,
    body: page.subtitle,
    stack: page.tags.slice(0, 3),
  }
})

const skills = [
  ['Frontend', 'React, TypeScript, JavaScript, HTML, CSS'],
  ['Motion', 'GSAP timelines, ScrollTrigger reveals, parallax, marquees'],
  ['3D / Visual', 'Three.js hero scene, generated product imagery, image-led layouts'],
  ['Layout', 'Clear hierarchy, section systems, responsive grids, campaign-style art direction'],
  ['Delivery', 'GitHub repo, README, live demo, build checks, deployment notes'],
  ['Freelance Fit', 'Landing pages, ecommerce concepts, SaaS pages, frontend fixes'],
]

const timeline = [
  ['01', 'Brief', 'Clarify goal, audience, assets, deliverables, deadline, and platform.'],
  ['02', 'Direction', 'Choose visual style, page sections, motion rhythm, and conversion path.'],
  ['03', 'Build', 'Implement React UI, responsive layout, imagery, GSAP, and technical handoff.'],
  ['04', 'Verify', 'Check desktop/mobile, build output, links, README, and final delivery message.'],
]

function ShowcasePage({ page }: { page: ShowcasePageData }) {
  return (
    <main className="showcasePage" style={{ '--accent': page.accent } as CSSProperties}>
      <nav className="topNav" aria-label="Showcase navigation">
        <a href="#/" className="brand">
          HY
        </a>
        <div className="navLinks">
          <a href="#/">Portfolio</a>
          <a href="#/luxury-rings">Luxury</a>
          <a href="#/saas-command">SaaS</a>
          <a href="#/bakery-atelier">Bakery</a>
        </div>
      </nav>

      <section className="showcaseHero">
        <div className="showcaseCopy">
          <p className="eyebrow motion-rise">{page.eyebrow}</p>
          <h1 className="motion-rise">{page.title}</h1>
          <p className="lead motion-rise">{page.subtitle}</p>
          <div className="heroActions motion-rise">
            <a className="button primary" href="mailto:HarashiYowshi@gmail.com">
              Build this style
            </a>
            <a className="button secondary" href="#/">
              Back to portfolio
            </a>
          </div>
        </div>

        <div className="showcaseVisualGrid motion-rise">
          <div className="showcaseImageWrap heroImage">
            <img src={asset(page.heroImage)} alt="" />
          </div>
          <div className="showcaseImageWrap detailImage">
            <img src={asset(page.detailImage)} alt="" />
          </div>
          <div className="visualLabel">
            <span>Visual system</span>
            <strong>Hero + detail imagery</strong>
          </div>
        </div>
      </section>

      <section className="showcaseTags motion-rise" aria-label="Project tags">
        {page.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </section>

      <section className="showcaseStats">
        {page.stats.map(([value, label]) => (
          <div className="statCard motion-rise" key={value}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="showcaseFeature">
        <div className="featureText motion-rise">
          <p className="eyebrow">Mini-site structure</p>
          <h2>Built like a real client page, not a single mockup.</h2>
          <p>
            Each concept includes a clear hero, supporting imagery, product proof, feature
            modules, trust-oriented content, motion hooks, and a CTA path.
          </p>
        </div>
        <div className="featureGallery motion-rise">
          <img src={asset(page.heroImage)} alt="" />
          <img src={asset(page.detailImage)} alt="" />
        </div>
      </section>

      <section className="moduleGrid">
        {page.modules.map(([title, detail], index) => (
          <article className="moduleCard motion-rise" key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{detail}</p>
          </article>
        ))}
      </section>

      <section className="interactionStrip motion-rise">
        <div>
          <p className="eyebrow">Interaction proof</p>
          <h2>Motion supports clarity: reveal, focus, hierarchy, and action.</h2>
        </div>
        <div className="motionBars" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>

      <section className="showcaseFinal motion-rise">
        <p className="eyebrow">Proposal-ready example</p>
        <h2>This page exists to prove layout, imagery, product thinking, and frontend polish.</h2>
        <div className="heroActions">
          <a className="button primary" href="mailto:HarashiYowshi@gmail.com">
            Contact Harashi
          </a>
          <a className="button secondary" href="https://github.com/HYowshi">
            GitHub profile
          </a>
        </div>
      </section>
    </main>
  )
}

function PortfolioHome() {
  return (
    <main>
      <nav className="topNav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Harashi Yowshi portfolio home">
          HY
        </a>
        <div className="navLinks">
          <a href="#projects">Work</a>
          <a href="#skills">Skills</a>
          <a href="#timeline">Process</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow motion-rise">React frontend / GSAP / WebGL / delivery</p>
          <h1 className="motion-rise">Premium frontend websites with clear structure and strong visuals.</h1>
          <p className="lead motion-rise">
            I build landing pages, product websites, and frontend fixes with visible
            layout discipline: readable hierarchy, responsive grids, real imagery,
            motion direction, and clean GitHub handoff.
          </p>
          <div className="heroActions motion-rise">
            <a className="button primary" href="#projects">
              View proof
            </a>
            <a className="button secondary" href="mailto:HarashiYowshi@gmail.com">
              Contact Harashi
            </a>
          </div>
        </div>

        <div className="heroVisual motion-rise" aria-label="Animated 3D frontend showcase">
          <Suspense fallback={<div className="sceneFallback" aria-hidden="true" />}>
            <HeroScene />
          </Suspense>
          <div className="posterBadge badgeTop">
            <span>Motion</span>
            <strong>GSAP + ScrollTrigger</strong>
          </div>
          <div className="posterBadge badgeBottom">
            <span>Build</span>
            <strong>React + WebGL</strong>
          </div>
        </div>
      </section>

      <section className="proofBand">
        <div className="statCard motion-rise">
          <strong>3</strong>
          <span>linked demo websites</span>
        </div>
        <div className="statCard motion-rise">
          <strong>6</strong>
          <span>frontend skill areas</span>
        </div>
        <div className="statCard motion-rise">
          <strong>Live</strong>
          <span>GitHub Pages deployment</span>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="sectionHeader motion-rise">
          <p className="eyebrow">Portfolio proof</p>
          <h2>Three mini-sites, each with a clear product purpose.</h2>
          <p>
            These are not placeholders. Each concept has real imagery, a dedicated page,
            section structure, tags, modules, and a conversion path.
          </p>
        </div>

        <div className="projectGrid">
          {projects.map((project) => (
            <a className="projectCard motion-rise" href={project.href} key={project.title}>
              <img src={asset(project.image)} alt="" />
              <div className="projectContent">
                <div className="projectMeta">
                  <span>{project.code}</span>
                  <span>{project.type}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.body}</p>
                <div className="tagList">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="section split" id="skills">
        <div className="sectionHeader motion-rise">
          <p className="eyebrow">Capabilities</p>
          <h2>Design clarity plus implementation discipline.</h2>
          <p>
            The portfolio is intentionally positioned for freelance jobs: landing pages,
            product pages, UI fixes, motion, responsive layout, and GitHub delivery.
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
          <p className="eyebrow">Process</p>
          <h2>A predictable path from brief to polished link.</h2>
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
          <h2>Send the brief. I will turn it into a clean, reviewable web product.</h2>
          <p>
            Best fit: landing pages, product websites, portfolio websites, React UI fixes,
            responsive cleanup, and animated frontend builds.
          </p>
        </div>
        <div className="contactPanel motion-rise">
          <a href="mailto:HarashiYowshi@gmail.com">HarashiYowshi@gmail.com</a>
          <a href="https://github.com/HYowshi">github.com/HYowshi</a>
          <a href="https://hyowshi.github.io/hyowshi-saas-landing/">Live portfolio demo</a>
        </div>
      </section>
    </main>
  )
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const [route, setRoute] = useState(window.location.hash.replace('#', '') || '/')

  useEffect(() => {
    const syncRoute = () => setRoute(window.location.hash.replace('#', '') || '/')
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      gsap.set('.motion-rise', { opacity: 0, y: 28 })
      gsap.set('.skillRow', { opacity: 0, x: 24 })
      gsap.set('.timelineItem', { opacity: 0, y: 24 })

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.brand', { opacity: 0, scale: 0.82, duration: 0.55 })
        .from('.navLinks a', { opacity: 0, y: -8, stagger: 0.05, duration: 0.42 }, '-=0.25')
        .to('.hero .motion-rise, .showcaseHero .motion-rise', {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
        })

      gsap.utils.toArray<HTMLElement>('.motion-rise:not(.hero .motion-rise):not(.showcaseHero .motion-rise)').forEach((element) => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: { start: 'top 84%', trigger: element },
        })
      })

      gsap.to('.heroVisual', {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: { scrub: true, start: 'top top', end: 'bottom top', trigger: '.hero' },
      })

      gsap.to('.skillRow', {
        opacity: 1,
        x: 0,
        stagger: 0.06,
        duration: 0.62,
        ease: 'power3.out',
        scrollTrigger: { start: 'top 76%', trigger: '.skillList' },
      })

      gsap.to('.timelineItem', {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.62,
        ease: 'power3.out',
        scrollTrigger: { start: 'top 76%', trigger: '.timelineGrid' },
      })
    }, root)

    return () => context.revert()
  }, [route])

  return (
    <div ref={root}>
      {route in showcasePages ? (
        <ShowcasePage page={showcasePages[route as ShowcaseKey]} />
      ) : (
        <PortfolioHome />
      )}
    </div>
  )
}

export default App
