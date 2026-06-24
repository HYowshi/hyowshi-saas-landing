import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

const HeroScene = lazy(() => import('./HeroScene'))

gsap.registerPlugin(ScrollTrigger)

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

const routes = ['/luxury-rings', '/saas-command', '/bakery-atelier'] as const
type Route = (typeof routes)[number]

const work = [
  {
    href: '#/bakery-atelier',
    number: '01',
    title: 'Maison Miel',
    category: 'Patisserie commerce',
    image: 'showcase-assets/bakery-cake-cutout.png',
    summary: 'A bakery site with menu, pickup, local delivery, catering, workshop story, and a floating cake hero.',
  },
  {
    href: '#/luxury-rings',
    number: '02',
    title: 'AURELIA',
    category: 'Fine jewelry boutique',
    image: 'showcase-assets/luxury-ring.png',
    summary: 'A luxury ring experience with collection storytelling, boutique services, sizing, care, and private appointments.',
  },
  {
    href: '#/saas-command',
    number: '03',
    title: 'NOVA Command',
    category: 'AI SaaS launch',
    image: 'showcase-assets/saas-dashboard.png',
    summary: 'A product-led software page with dashboard proof, integration logic, outcomes, and demo conversion.',
  },
]

const capabilities = [
  ['Art direction', 'Mood, brand tone, section rhythm, reference translation, and visual hierarchy.'],
  ['Frontend build', 'React, TypeScript, Vite, responsive CSS, reusable sections, and source-code delivery.'],
  ['Motion system', 'GSAP entrance timelines, parallax moments, product hover states, and scroll reveals.'],
  ['Visual assets', 'Generated product imagery, transparent cutouts, image-led layouts, and WebGL hero staging.'],
  ['Commercial pages', 'Landing pages, ecommerce, menus, boutiques, dashboards, portfolio sites, and fixes.'],
]

const process = [
  ['Brief', 'Understand customer, offer, references, conversion goal, assets, budget, and deadline.'],
  ['Direction', 'Define brand mood, page structure, CTA path, content modules, and motion language.'],
  ['Build', 'Implement responsive React pages with polished UI, imagery, animation, and readable code.'],
  ['Verify', 'Run build, lint, desktop/mobile checks, live deploy, and final delivery notes.'],
]

function BrandNav({ tone = 'dark' }: { tone?: 'dark' | 'light' | 'ivory' }) {
  return (
    <nav className={`topNav ${tone}`} aria-label="Primary navigation">
      <a className="brandMark" href="#/" aria-label="Harashi Yowshi portfolio home">
        HY
      </a>
      <div className="navLinks">
        <a href="#/">Studio</a>
        <a href="#/bakery-atelier">Maison Miel</a>
        <a href="#/luxury-rings">AURELIA</a>
        <a href="#/saas-command">NOVA</a>
      </div>
    </nav>
  )
}

function PortfolioHome() {
  return (
    <main className="portfolioPage">
      <BrandNav />

      <section className="studioHero">
        <div className="heroLabel motion-rise">
          <span>Harashi Yowshi</span>
          <span>Frontend / Motion / Brand Sites</span>
        </div>
        <div className="studioHeadline">
          <h1 className="motion-rise">I build websites that feel like brands, not templates.</h1>
          <p className="motion-rise">
            Premium React frontend for founders and small businesses: strategy-led landing pages,
            product websites, ecommerce concepts, motion, 3D, imagery, deployment, and clean GitHub handoff.
          </p>
        </div>
        <div className="studioScene motion-rise" aria-label="Animated WebGL portfolio object">
          <Suspense fallback={<div className="sceneFallback" aria-hidden="true" />}>
            <HeroScene />
          </Suspense>
          <div className="sceneCaption">
            <span>Live build</span>
            <strong>React / GSAP / Three.js</strong>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="Services ticker">
        <span>Landing pages</span>
        <span>Brand systems</span>
        <span>Product storytelling</span>
        <span>Motion direction</span>
        <span>Responsive cleanup</span>
      </section>

      <section className="workIndex" id="work">
        <div className="sectionLead motion-rise">
          <p className="eyebrow">Selected work</p>
          <h2>Three separate product worlds, each designed for its own customer.</h2>
        </div>
        <div className="workRows">
          {work.map((item) => (
            <a className="workRow motion-rise" href={item.href} key={item.title}>
              <span>{item.number}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.category}</p>
              </div>
              <p>{item.summary}</p>
              <img src={asset(item.image)} alt="" />
            </a>
          ))}
        </div>
      </section>

      <section className="capabilitySection">
        <div className="sectionLead motion-rise">
          <p className="eyebrow">Capability stack</p>
          <h2>Design taste plus engineering discipline.</h2>
        </div>
        <div className="capabilityGrid">
          {capabilities.map(([title, detail]) => (
            <article className="capabilityCard motion-rise" key={title}>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="processSection">
        {process.map(([title, detail], index) => (
          <article className="processItem motion-rise" key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{detail}</p>
          </article>
        ))}
      </section>

      <section className="studioContact motion-rise">
        <p className="eyebrow">Available for fixed-scope web work</p>
        <h2>Send the brief. I will turn it into a live, reviewable product page.</h2>
        <div className="contactLinks">
          <a href="mailto:HarashiYowshi@gmail.com">HarashiYowshi@gmail.com</a>
          <a href="https://github.com/HYowshi">github.com/HYowshi</a>
        </div>
      </section>
    </main>
  )
}

function BakeryAtelier() {
  const menu = [
    ['Berry Cloud', 'Strawberry, vanilla sponge, mascarpone cream', 'Whole cake / 6 inch', '$48'],
    ['Cocoa Velvet', 'Dark chocolate ganache, roasted hazelnut, cocoa soil', 'Whole cake / 8 inch', '$54'],
    ['Citrus Garden', 'Lemon curd, pistachio crumb, cream petals', 'Tart / party size', '$46'],
  ]

  return (
    <main className="brandPage bakeryPage">
      <BrandNav tone="light" />

      <section className="bakeryHero">
        <div className="bakeryIntro motion-rise">
          <p className="kicker">Maison Miel Patisserie</p>
          <h1>Fresh cakes, viennoiserie, and workshop desserts made daily.</h1>
          <p>
            A complete bakery landing page inspired by premium pastry shops: strong brand hero,
            online boutique, hours, location, seasonal menu, local delivery, catering, workshop story,
            and newsletter capture.
          </p>
          <div className="heroActions">
            <a className="button berry" href="#bakery-menu">
              Order online
            </a>
            <a className="button cream" href="#bakery-visit">
              Visit the workshop
            </a>
          </div>
        </div>
        <div className="cakeStage motion-rise" aria-label="Floating 3D strawberry cake">
          <div className="cakePlate" />
          <img className="cakeCutout" src={asset('showcase-assets/bakery-cake-cutout.png')} alt="" />
          <span className="pastrySticker stickerOne">Baked today</span>
          <span className="pastrySticker stickerTwo">Local delivery</span>
        </div>
      </section>

      <section className="bakeryInfoBar" id="bakery-visit">
        {[
          ['Hours', 'Wed - Sun / 8:00 AM - 4:00 PM'],
          ['Location', 'Workshop counter / 21 Orchard Lane'],
          ['Order', 'Pickup, local delivery, and event catering'],
        ].map(([title, detail]) => (
          <article className="motion-rise" key={title}>
            <span>{title}</span>
            <strong>{detail}</strong>
          </article>
        ))}
      </section>

      <section className="bakeryFeature">
        <div className="featureImage tall motion-rise">
          <img src={asset('showcase-assets/bakery-cakes.png')} alt="" />
        </div>
        <div className="featureCopy motion-rise">
          <p className="kicker">The counter</p>
          <h2>Small-batch pastry, presented like a real shop front.</h2>
          <p>
            The page gives a customer immediate answers: what is available today, how to order,
            where to pick up, and how to book custom cakes or catering.
          </p>
          <a className="textLink" href="#bakery-menu">
            View seasonal menu
          </a>
        </div>
      </section>

      <section className="bakeryMenu" id="bakery-menu">
        <div className="sectionLead motion-rise">
          <p className="kicker">Online boutique</p>
          <h2>Seasonal favorites for pickup and local delivery.</h2>
        </div>
        <div className="menuGrid">
          {menu.map(([name, detail, size, price]) => (
            <article className="menuCard motion-rise" key={name}>
              <img src={asset(name === 'Berry Cloud' ? 'showcase-assets/bakery-cakes.png' : 'showcase-assets/bakery-detail.png')} alt="" />
              <div>
                <span>{price}</span>
                <h3>{name}</h3>
                <p>{detail}</p>
                <small>{size}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bakeryServices">
        {[
          ['Custom cakes', 'Choose size, sponge, filling, finish, message, and pickup window.'],
          ['Local delivery', 'Same-day city delivery window for selected cakes and pastry boxes.'],
          ['Catering', 'Dessert tables, mini pastries, corporate gifting, and event consultation.'],
          ['Newsletter', 'Weekly drops, seasonal boxes, and limited workshop releases.'],
        ].map(([title, detail]) => (
          <article className="motion-rise" key={title}>
            <h3>{title}</h3>
            <p>{detail}</p>
          </article>
        ))}
      </section>

      <section className="bakeryStory motion-rise">
        <img src={asset('showcase-assets/bakery-detail.png')} alt="" />
        <div>
          <p className="kicker">Workshop story</p>
          <h2>Designed to make people hungry, informed, and ready to order.</h2>
          <p>
            A bakery page needs warmth and utility at the same time: product photography, menu clarity,
            ordering paths, shop details, custom work, and a calm editorial story.
          </p>
          <a className="button berry" href="#/">
            Back to portfolio
          </a>
        </div>
      </section>
    </main>
  )
}

function LuxuryRings() {
  const collections = [
    ['Solenne', 'Oval solitaire, hand-finished gold, discreet pave shoulder.'],
    ['Vela', 'Architectural side stones with a brighter modern profile.'],
    ['Nocturne', 'Evening campaign ring with deep contrast and high-polish finish.'],
  ]

  return (
    <main className="brandPage luxuryPage">
      <BrandNav tone="ivory" />

      <section className="luxuryHero">
        <div className="luxuryCopy motion-rise">
          <p className="kicker">AURELIA Fine Jewelry</p>
          <h1>Private ring appointments for modern heirlooms.</h1>
          <p>
            A jewelry site designed with Cartier-level restraint and Oura-style product clarity:
            immediate brand impact, tactile product visuals, collections, services, sizing, care,
            and an appointment-led conversion path.
          </p>
          <div className="heroActions">
            <a className="button gold" href="#appointments">
              Book an appointment
            </a>
            <a className="button ghostGold" href="#collections">
              View collections
            </a>
          </div>
        </div>
        <div className="ringStage motion-rise">
          <div className="ringHalo" />
          <img src={asset('showcase-assets/luxury-ring.png')} alt="" />
          <span className="ringTag tagTop">18K gold</span>
          <span className="ringTag tagBottom">GIA stone selection</span>
        </div>
      </section>

      <section className="luxuryRibbon motion-rise">
        <span>Engagement</span>
        <span>Wedding bands</span>
        <span>Private boutique</span>
        <span>Lifetime care</span>
      </section>

      <section className="luxuryEditorial">
        <div className="editorialImage motion-rise">
          <img src={asset('showcase-assets/ring-detail.png')} alt="" />
        </div>
        <div className="editorialCopy motion-rise">
          <p className="kicker">Craft and confidence</p>
          <h2>Fine jewelry pages must reduce hesitation without becoming ordinary.</h2>
          <p>
            The design supports a high-value purchase through calm typography, macro detail,
            material proof, boutique language, and service modules that answer real buyer questions.
          </p>
        </div>
      </section>

      <section className="collectionBand" id="collections">
        {collections.map(([name, detail], index) => (
          <article className="collectionCard motion-rise" key={name}>
            <span>0{index + 1}</span>
            <h3>{name}</h3>
            <p>{detail}</p>
          </article>
        ))}
      </section>

      <section className="luxuryServices">
        {[
          ['Sizing salon', 'Book a guided fitting, compare band profiles, and receive final sizing notes.'],
          ['Stone selection', 'Review clarity, cut, color, carat, origin, and setting recommendations.'],
          ['Care plan', 'Cleaning, inspection, resizing consultation, and long-term maintenance.'],
          ['Gift concierge', 'Proposal timing, private pickup, packaging, and discreet communication.'],
        ].map(([title, detail]) => (
          <article className="motion-rise" key={title}>
            <h3>{title}</h3>
            <p>{detail}</p>
          </article>
        ))}
      </section>

      <section className="luxuryAppointment motion-rise" id="appointments">
        <p className="kicker">Boutique conversion</p>
        <h2>Luxury jewelry should lead to a private appointment, not a generic checkout.</h2>
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
          <h1>Operate your funnel, alerts, and team decisions from one command layer.</h1>
          <p>
            A product-led SaaS page that opens with interface proof, then explains outcomes,
            integrations, workflows, security, and the demo path without burying the product.
          </p>
          <div className="heroActions">
            <a className="button cyan" href="#nova-demo">
              Request demo
            </a>
            <a className="button ghostCyan" href="#nova-platform">
              View platform
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
          <div className="metricPill pillTwo">12 live automations</div>
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
            ['Signal', 'Unify metrics, alerts, and activity into one live operating surface.'],
            ['Automation', 'Turn repeated decisions into visible workflows that teams can trust.'],
            ['Context', 'Show what changed, why it matters, and who should act next.'],
            ['Security', 'Position the product for serious teams with governance and access logic.'],
          ].map(([title, detail]) => (
            <article className="platformCard motion-rise" key={title}>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="saasCta motion-rise" id="nova-demo">
        <div>
          <p className="kicker">Conversion-ready structure</p>
          <h2>Dashboard proof, outcome language, integrations, modules, and a direct demo CTA.</h2>
        </div>
        <a className="button cyan" href="#/">
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

      gsap.set('.motion-rise', { opacity: 0, y: 34 })
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.brandMark', { opacity: 0, scale: 0.86, duration: 0.5 })
        .from('.navLinks a', { opacity: 0, y: -8, stagger: 0.045, duration: 0.38 }, '-=0.2')
        .to('.studioHero .motion-rise, .bakeryHero .motion-rise, .luxuryHero .motion-rise, .saasHero .motion-rise', {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.82,
        })

      gsap.utils
        .toArray<HTMLElement>(
          '.motion-rise:not(.studioHero .motion-rise):not(.bakeryHero .motion-rise):not(.luxuryHero .motion-rise):not(.saasHero .motion-rise)',
        )
        .forEach((element) => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { start: 'top 84%', trigger: element },
          })
        })

      gsap.to('.studioScene, .ringStage, .dashboardShell, .cakeCutout', {
        yPercent: 4,
        ease: 'none',
        scrollTrigger: { scrub: true, start: 'top top', end: 'bottom top', trigger: 'main' },
      })
      gsap.to('.ringHalo', { rotate: 360, duration: 32, ease: 'none', repeat: -1 })
      gsap.to('.cakeCutout', { y: -14, rotate: 1.5, duration: 3.8, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    }, root)

    return () => context.revert()
  }, [route])

  return (
    <div ref={root}>
      {route === '/bakery-atelier' && <BakeryAtelier />}
      {route === '/luxury-rings' && <LuxuryRings />}
      {route === '/saas-command' && <SaasCommand />}
      {!routes.includes(route as Route) && <PortfolioHome />}
    </div>
  )
}

export default App
