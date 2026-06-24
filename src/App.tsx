import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

const HeroScene = lazy(() => import('./HeroScene'))

gsap.registerPlugin(ScrollTrigger)

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

const routes = ['/luxury-rings', '/saas-command', '/bakery-atelier'] as const
type Route = (typeof routes)[number]

const projects = [
  {
    href: '#/luxury-rings',
    image: 'showcase-assets/luxury-ring.png',
    title: 'AURELIA',
    label: 'Luxury jewelry brand',
    body: 'An editorial commerce experience for a fine ring atelier: cinematic product focus, craft proof, private appointment flow.',
    stack: ['Luxury ecommerce', 'Campaign layout', 'Product storytelling'],
  },
  {
    href: '#/saas-command',
    image: 'showcase-assets/saas-dashboard.png',
    title: 'NOVA Command',
    label: 'AI SaaS launch',
    body: 'A product-led SaaS site with sharp dashboard proof, feature flows, integrations, and demo conversion.',
    stack: ['SaaS landing', 'Dashboard UI', 'Conversion sections'],
  },
  {
    href: '#/bakery-atelier',
    image: 'showcase-assets/bakery-cake-cutout.png',
    title: 'Maison Miel',
    label: 'Boutique patisserie',
    body: 'A bright bakery brand site with a floating 3D cake hero, seasonal catalogue, custom order path, and warm product visuals.',
    stack: ['Food commerce', '3D product hero', 'Order flow'],
  },
]

const skills = [
  ['Frontend', 'React, TypeScript, JavaScript, HTML, CSS'],
  ['Motion', 'GSAP timelines, ScrollTrigger reveals, parallax, hover systems'],
  ['3D / Visual', 'Three.js hero, product cutouts, generated assets, layered art direction'],
  ['Brand Layout', 'Distinct visual systems for luxury, SaaS, food, portfolio, and product pages'],
  ['Delivery', 'GitHub repo, README, live deploy, responsive checks, build verification'],
  ['Freelance Fit', 'Landing pages, ecommerce concepts, frontend fixes, client-ready demos'],
]

const process = [
  ['01', 'Brief', 'Audience, brand tone, product offer, assets, deliverables, and deadline.'],
  ['02', 'Direction', 'Visual language, layout references, motion rhythm, and conversion path.'],
  ['03', 'Build', 'React UI, responsive sections, imagery, animation, and clean source code.'],
  ['04', 'Verify', 'Desktop, mobile, overflow, build, live links, README, and handoff message.'],
]

function BrandNav({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <nav className={`topNav ${tone}`} aria-label="Primary navigation">
      <a className="brand" href="#/" aria-label="Harashi Yowshi portfolio home">
        HY
      </a>
      <div className="navLinks">
        <a href="#/">Portfolio</a>
        <a href="#/luxury-rings">AURELIA</a>
        <a href="#/saas-command">NOVA</a>
        <a href="#/bakery-atelier">Maison Miel</a>
      </div>
    </nav>
  )
}

function PortfolioHome() {
  return (
    <main className="portfolioPage">
      <BrandNav />

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow motion-rise">React frontend / GSAP / WebGL / client-ready delivery</p>
          <h1 className="motion-rise">Premium websites with real brand direction, not template noise.</h1>
          <p className="lead motion-rise">
            I build landing pages, product websites, and frontend fixes with clear hierarchy, responsive
            layout, strong imagery, motion direction, and clean GitHub handoff.
          </p>
          <div className="heroActions motion-rise">
            <a className="button primary" href="#projects">
              View brand demos
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
          <span>separate brand demos</span>
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
          <h2>Three demos built like client products.</h2>
          <p>
            Each page has its own brand voice, art direction, section rhythm, imagery, CTA path,
            and responsive behavior.
          </p>
        </div>

        <div className="projectGrid">
          {projects.map((project, index) => (
            <a className="projectCard motion-rise" href={project.href} key={project.title}>
              <div className="projectImage">
                <img src={asset(project.image)} alt="" />
              </div>
              <div className="projectContent">
                <div className="projectMeta">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{project.label}</span>
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
            The portfolio is positioned for real freelance work: product pages, landing pages,
            UI cleanup, animation, responsive layout, and source-code handoff.
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
          {process.map(([number, title, detail]) => (
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

function LuxuryRings() {
  return (
    <main className="brandPage luxuryPage">
      <BrandNav />

      <section className="luxuryHero">
        <div className="luxuryCopy motion-rise">
          <p className="kicker">AURELIA Fine Jewelry</p>
          <h1>Rings made for the moment everything becomes permanent.</h1>
          <p>
            A private atelier for engagement rings, sculpted gold, and diamond settings.
            The site frames the ring like a campaign object, then builds trust through craft,
            consultation, and aftercare.
          </p>
          <div className="heroActions">
            <a className="button gold" href="mailto:HarashiYowshi@gmail.com">
              Book a private viewing
            </a>
            <a className="button ghostGold" href="#aurelia-craft">
              Explore craft
            </a>
          </div>
        </div>
        <div className="ringStage motion-rise" aria-label="Aurelia ring product stage">
          <div className="ringHalo" />
          <img className="ringHeroImage" src={asset('showcase-assets/luxury-ring.png')} alt="" />
          <div className="ringSpec topSpec">
            <span>18K</span>
            <strong>hand-finished gold</strong>
          </div>
          <div className="ringSpec bottomSpec">
            <span>GIA</span>
            <strong>certified diamond</strong>
          </div>
        </div>
      </section>

      <section className="luxuryEditorial" id="aurelia-craft">
        <div className="editorialImage motion-rise">
          <img src={asset('showcase-assets/ring-detail.png')} alt="" />
        </div>
        <div className="editorialCopy motion-rise">
          <p className="kicker">Craft narrative</p>
          <h2>Every detail earns trust before the appointment.</h2>
          <p>
            Macro imagery, material notes, sizing guidance, warranty copy, and appointment
            prompts make the purchase feel guided instead of rushed.
          </p>
          <div className="luxuryFacts">
            <span>Diamond selection</span>
            <span>Made-to-order sizing</span>
            <span>Lifetime clean and care</span>
          </div>
        </div>
      </section>

      <section className="collectionBand">
        {['Solenne', 'Vela', 'Nocturne'].map((name, index) => (
          <article className="collectionCard motion-rise" key={name}>
            <span>0{index + 1}</span>
            <h3>{name}</h3>
            <p>
              {index === 0 && 'Oval solitaire setting with a thin gold band and quiet brilliance.'}
              {index === 1 && 'Architectural side stones for a stronger editorial silhouette.'}
              {index === 2 && 'Deep evening campaign styling for black-tie proposals.'}
            </p>
          </article>
        ))}
      </section>

      <section className="luxuryAppointment motion-rise">
        <p className="kicker">Client conversion path</p>
        <h2>Private appointment, not a generic checkout.</h2>
        <a className="button gold" href="#/">
          Back to portfolio
        </a>
      </section>
    </main>
  )
}

function SaasCommand() {
  return (
    <main className="brandPage saasPage">
      <BrandNav />

      <section className="saasHero">
        <div className="saasCopy motion-rise">
          <p className="kicker">NOVA Command OS</p>
          <h1>One command layer for teams that run on data, alerts, and automation.</h1>
          <p>
            A high-trust product launch page with dashboard proof first, then workflow clarity,
            integrations, metrics, and a strong demo path.
          </p>
          <div className="heroActions">
            <a className="button cyan" href="mailto:HarashiYowshi@gmail.com">
              Request product demo
            </a>
            <a className="button ghostCyan" href="#nova-platform">
              See platform
            </a>
          </div>
        </div>
        <div className="dashboardShell motion-rise">
          <div className="windowTop">
            <span />
            <span />
            <span />
          </div>
          <img src={asset('showcase-assets/saas-dashboard.png')} alt="" />
          <div className="metricPill pillOne">+42% pipeline clarity</div>
          <div className="metricPill pillTwo">12 automations live</div>
        </div>
      </section>

      <section className="saasLogos motion-rise" aria-label="Integration examples">
        {['Slack', 'Stripe', 'HubSpot', 'Linear', 'Notion', 'GitHub'].map((logo) => (
          <span key={logo}>{logo}</span>
        ))}
      </section>

      <section className="platformSection" id="nova-platform">
        <div className="platformVisual motion-rise">
          <img src={asset('showcase-assets/saas-device.png')} alt="" />
        </div>
        <div className="platformGrid">
          {[
            ['Signal', 'Unify metrics, alerts, and team activity into one command surface.'],
            ['Automation', 'Turn common operating tasks into visible, trackable workflows.'],
            ['Decision', 'Explain what changed, why it matters, and who should act next.'],
            ['Handoff', 'Clear technical delivery with reusable React sections and deploy notes.'],
          ].map(([title, detail]) => (
            <article className="platformCard motion-rise" key={title}>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="saasCta motion-rise">
        <div>
          <p className="kicker">Conversion-ready structure</p>
          <h2>Hero proof, feature clarity, integrations, metrics, and demo CTA.</h2>
        </div>
        <a className="button cyan" href="#/">
          Back to portfolio
        </a>
      </section>
    </main>
  )
}

function BakeryAtelier() {
  return (
    <main className="brandPage bakeryPage">
      <BrandNav tone="light" />

      <section className="bakeryHero">
        <div className="bakeryCopy motion-rise">
          <p className="kicker">Maison Miel Patisserie</p>
          <h1>Celebration cakes that look delicate, taste bright, and arrive beautifully.</h1>
          <p>
            A warm boutique bakery website with a floating 3D product hero, seasonal catalogue,
            custom-order guidance, and a soft brand system built for food photography.
          </p>
          <div className="heroActions">
            <a className="button berry" href="mailto:HarashiYowshi@gmail.com">
              Start a custom cake
            </a>
            <a className="button cream" href="#menu">
              View seasonal menu
            </a>
          </div>
        </div>
        <div className="cakeStage motion-rise" aria-label="Floating 3D strawberry cake">
          <div className="cakePlate" />
          <img className="cakeCutout" src={asset('showcase-assets/bakery-cake-cutout.png')} alt="" />
          <div className="flavorNote noteOne">fresh strawberry</div>
          <div className="flavorNote noteTwo">vanilla sponge</div>
          <div className="flavorNote noteThree">cloud cream</div>
        </div>
      </section>

      <section className="bakeryMenu" id="menu">
        <div className="menuIntro motion-rise">
          <p className="kicker">Seasonal counter</p>
          <h2>Made for birthdays, weddings, and small sweet rituals.</h2>
        </div>
        <div className="menuGrid">
          {[
            ['Berry Cloud', 'Strawberry, vanilla sponge, mascarpone cream', '$48'],
            ['Cocoa Velvet', 'Dark chocolate ganache, roasted hazelnut', '$54'],
            ['Citrus Garden', 'Lemon curd, pistachio crumb, cream petals', '$46'],
          ].map(([name, detail, price]) => (
            <article className="menuCard motion-rise" key={name}>
              <img src={asset(name === 'Berry Cloud' ? 'showcase-assets/bakery-cakes.png' : 'showcase-assets/bakery-detail.png')} alt="" />
              <div>
                <span>{price}</span>
                <h3>{name}</h3>
                <p>{detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bakeryOrder motion-rise">
        <div>
          <p className="kicker">Order flow</p>
          <h2>Pick a size, choose a flavor, describe the event, then confirm pickup or delivery.</h2>
        </div>
        <div className="orderSteps">
          {['Size', 'Flavor', 'Message', 'Delivery'].map((step, index) => (
            <span key={step}>
              {index + 1}. {step}
            </span>
          ))}
        </div>
      </section>

      <section className="bakeryFinal motion-rise">
        <p className="kicker">Brand site, not a generic demo</p>
        <h2>Soft palette, cutout product hero, food catalogue, and clear custom order CTA.</h2>
        <a className="button berry" href="#/">
          Back to portfolio
        </a>
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

      gsap.set('.motion-rise', { opacity: 0, y: 30 })
      gsap.set('.skillRow, .timelineItem, .collectionCard, .platformCard, .menuCard', {
        opacity: 0,
        y: 24,
      })

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.brand', { opacity: 0, scale: 0.86, duration: 0.5 })
        .from('.navLinks a', { opacity: 0, y: -8, stagger: 0.045, duration: 0.38 }, '-=0.2')
        .to('.hero .motion-rise, .luxuryHero .motion-rise, .saasHero .motion-rise, .bakeryHero .motion-rise', {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.82,
        })

      gsap.utils
        .toArray<HTMLElement>(
          '.motion-rise:not(.hero .motion-rise):not(.luxuryHero .motion-rise):not(.saasHero .motion-rise):not(.bakeryHero .motion-rise)',
        )
        .forEach((element) => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.72,
            ease: 'power3.out',
            scrollTrigger: { start: 'top 84%', trigger: element },
          })
        })

      gsap.to('.heroVisual, .ringStage, .dashboardShell, .cakeCutout', {
        yPercent: 4,
        ease: 'none',
        scrollTrigger: { scrub: true, start: 'top top', end: 'bottom top', trigger: 'main' },
      })

      gsap.to('.ringHalo', { rotate: 360, duration: 28, ease: 'none', repeat: -1 })
      gsap.to('.cakeCutout', { y: -14, rotate: 1.5, duration: 3.8, ease: 'sine.inOut', yoyo: true, repeat: -1 })

      gsap.to('.skillRow, .timelineItem, .collectionCard, .platformCard, .menuCard', {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.62,
        ease: 'power3.out',
        scrollTrigger: { start: 'top 78%', trigger: root.current },
      })
    }, root)

    return () => context.revert()
  }, [route])

  return (
    <div ref={root}>
      {route === '/luxury-rings' && <LuxuryRings />}
      {route === '/saas-command' && <SaasCommand />}
      {route === '/bakery-atelier' && <BakeryAtelier />}
      {!routes.includes(route as Route) && <PortfolioHome />}
    </div>
  )
}

export default App
