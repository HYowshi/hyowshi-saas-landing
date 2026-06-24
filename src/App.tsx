import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

const HeroScene = lazy(() => import('./HeroScene'))

gsap.registerPlugin(ScrollTrigger)

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
const routes = ['/luxury-rings', '/saas-command', '/bakery-atelier'] as const
type Route = (typeof routes)[number]

function BrandNav({ tone = 'dark' }: { tone?: 'dark' | 'light' | 'ivory' }) {
  return (
    <nav className={`topNav ${tone}`} aria-label="Main navigation">
      <a className="brandMark" href="#/">
        HY
      </a>
      <div className="navLinks">
        <a href="#/">Work</a>
        <a href="#/bakery-atelier">Bakery</a>
        <a href="#/luxury-rings">Rings</a>
        <a href="#/saas-command">SaaS</a>
      </div>
    </nav>
  )
}

function PortfolioHome() {
  const work = [
    ['Maison Miel', 'Bakery website', '#/bakery-atelier', 'showcase-assets/bakery-cake-cutout.png'],
    ['AURELIA', 'Ring boutique', '#/luxury-rings', 'showcase-assets/luxury-ring.png'],
    ['NOVA', 'SaaS product', '#/saas-command', 'showcase-assets/saas-dashboard.png'],
  ]
  const timeline = [
    ['01', 'Brief', 'Audience, offer, references'],
    ['02', 'Visual', 'Layout, imagery, motion mood'],
    ['03', 'Build', 'React, CSS, GSAP, 3D'],
    ['04', 'Ship', 'Build, test, GitHub deploy'],
  ]
  const tickerItems = ['React', 'GSAP', 'Three.js', 'Responsive UI', 'GitHub Pages', 'Visual Systems']
  const skills = [
    ['Frontend', 'React / TypeScript / Vite'],
    ['Motion', 'GSAP / ScrollTrigger / hover states'],
    ['3D', 'Three.js canvas / product staging'],
    ['Layout', 'Responsive grids / campaign sections'],
    ['Delivery', 'GitHub repo / live deploy / handoff'],
    ['Commerce', 'Menus / catalogues / product CTAs'],
  ]

  return (
    <main className="portfolioPage">
      <BrandNav />

      <section className="studioHero">
        <div className="studioHeadline">
          <p className="eyebrow motion-rise">Harashi Yowshi / Frontend portfolio</p>
          <h1 className="motion-rise">Visual websites for products, shops, and brands.</h1>
          <div className="heroActions motion-rise">
            <a className="button primary" href="#work">
              View work
            </a>
            <a className="button secondary" href="mailto:HarashiYowshi@gmail.com">
              Contact
            </a>
          </div>
        </div>
        <div className="studioScene motion-rise">
          <Suspense fallback={<div className="sceneFallback" />}>
            <HeroScene />
          </Suspense>
        </div>
      </section>

      <section className="ticker">
        <div className="tickerTrack">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      <section className="aboutStudio motion-rise">
        <div>
          <p className="eyebrow">About</p>
          <h2>Frontend developer focused on premium visual websites.</h2>
        </div>
        <p>
          I build polished React websites for product launches, small shops, portfolios, and sales pages.
          The work combines layout, imagery, motion, responsive behavior, and clean source-code handoff.
        </p>
      </section>

      <section className="skillMatrix">
        {skills.map(([title, detail]) => (
          <article className="skillCard motion-rise" key={title}>
            <h3>{title}</h3>
            <p>{detail}</p>
          </article>
        ))}
      </section>

      <section className="workWall" id="work">
        {work.map(([title, label, href, image], index) => (
          <a className="workTile motion-rise" href={href} key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <img src={asset(image)} alt="" />
            <div>
              <p>{label}</p>
              <h2>{title}</h2>
            </div>
          </a>
        ))}
      </section>

      <section className="skillStrip motion-rise">
        {['Landing pages', 'Ecommerce', 'Product UI', 'Animation', '3D hero', 'Deployment'].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section className="motionLab">
        <div className="motionPanel motion-rise">
          <p className="eyebrow">Motion system</p>
          <h2>GSAP reveals, scroll movement, hover depth, and a real Three.js hero.</h2>
        </div>
        <div className="motionCards">
          {['ScrollTrigger', 'Parallax', 'Timeline', '3D canvas'].map((item) => (
            <article className="motionCard motion-rise" key={item}>
              <span />
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="buildTimeline">
        {timeline.map(([number, title, detail]) => (
          <article className="timelineStep motion-rise" key={title}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{detail}</p>
          </article>
        ))}
      </section>

      <section className="studioContact motion-rise">
        <h2>Need a polished frontend demo?</h2>
        <div className="contactLinks">
          <a href="mailto:HarashiYowshi@gmail.com">HarashiYowshi@gmail.com</a>
          <a href="https://github.com/HYowshi">GitHub</a>
        </div>
      </section>
    </main>
  )
}

function BakeryAtelier() {
  const products = [
    ['Berry Cloud', '$48', 'showcase-assets/bakery-cakes.png'],
    ['Cocoa Velvet', '$54', 'showcase-assets/bakery-detail.png'],
    ['Citrus Garden', '$46', 'showcase-assets/bakery-detail.png'],
  ]

  return (
    <main className="brandPage bakeryPage">
      <BrandNav tone="light" />

      <section className="bakeryHero">
        <div className="bakeryIntro motion-rise">
          <p className="kicker">Maison Miel</p>
          <h1>Fresh cakes from a small pastry workshop.</h1>
          <div className="heroActions">
            <a className="button berry" href="#menu">
              Order online
            </a>
            <a className="button cream" href="#visit">
              Visit
            </a>
          </div>
        </div>
        <div className="cakeStage motion-rise">
          <div className="cakePlate" />
          <img className="cakeCutout" src={asset('showcase-assets/bakery-cake-cutout.png')} alt="" />
          <span className="pastrySticker stickerOne">Today</span>
          <span className="pastrySticker stickerTwo">Pickup + delivery</span>
        </div>
      </section>

      <section className="bakeryInfoBar" id="visit">
        <article className="motion-rise">
          <span>Hours</span>
          <strong>Wed - Sun / 8 AM - 4 PM</strong>
        </article>
        <article className="motion-rise">
          <span>Location</span>
          <strong>21 Orchard Lane</strong>
        </article>
        <article className="motion-rise">
          <span>Orders</span>
          <strong>Pickup, delivery, events</strong>
        </article>
      </section>

      <section className="bakeryFeature">
        <img className="featureImage motion-rise" src={asset('showcase-assets/bakery-cakes.png')} alt="" />
        <div className="featureCopy motion-rise">
          <p className="kicker">Counter</p>
          <h2>Pastries, cakes, and weekend boxes.</h2>
          <a className="textLink" href="#menu">
            See menu
          </a>
        </div>
      </section>

      <section className="productGallery bakeryGallery">
        <img className="motion-rise" src={asset('showcase-assets/bakery-cakes.png')} alt="" />
        <img className="motion-rise" src={asset('showcase-assets/bakery-detail.png')} alt="" />
        <div className="galleryCopy motion-rise">
          <p className="kicker">Daily drop</p>
          <h2>Hero cake, counter photography, product cards, and order path.</h2>
        </div>
      </section>

      <section className="menuGrid" id="menu">
        {products.map(([name, price, image]) => (
          <article className="menuCard motion-rise" key={name}>
            <img src={asset(image)} alt="" />
            <div>
              <span>{price}</span>
              <h3>{name}</h3>
            </div>
          </article>
        ))}
      </section>

      <section className="bakeryServices">
        {['Custom cakes', 'Local delivery', 'Dessert catering', 'Weekend boxes'].map((item) => (
          <article className="motion-rise" key={item}>
            <h3>{item}</h3>
            <p>
              {item === 'Custom cakes' && 'Sizes, flavors, message, finish, and pickup window.'}
              {item === 'Local delivery' && 'Same-day city route for cakes and pastry boxes.'}
              {item === 'Dessert catering' && 'Mini desserts, gift boxes, and event tables.'}
              {item === 'Weekend boxes' && 'Limited drops with seasonal fruit and cream.'}
            </p>
          </article>
        ))}
      </section>

      <section className="orderFlow motion-rise">
        {['Choose cake', 'Pick date', 'Add message', 'Pickup or delivery'].map((item, index) => (
          <span key={item}>
            {index + 1}. {item}
          </span>
        ))}
      </section>

      <section className="bakeryStory motion-rise">
        <img src={asset('showcase-assets/bakery-detail.png')} alt="" />
        <div>
          <p className="kicker">Maison Miel</p>
          <h2>Order beautiful desserts without guessing.</h2>
          <a className="button berry" href="#/">
            Portfolio
          </a>
        </div>
      </section>
    </main>
  )
}

function LuxuryRings() {
  return (
    <main className="brandPage luxuryPage">
      <BrandNav tone="ivory" />

      <section className="luxuryHero">
        <div className="luxuryCopy motion-rise">
          <p className="kicker">AURELIA</p>
          <h1>Fine rings for private appointments.</h1>
          <div className="heroActions">
            <a className="button gold" href="#collections">
              Collections
            </a>
            <a className="button ghostGold" href="#service">
              Services
            </a>
          </div>
        </div>
        <div className="ringStage motion-rise">
          <div className="ringHalo" />
          <img src={asset('showcase-assets/luxury-ring.png')} alt="" />
          <span className="ringTag tagTop">18K gold</span>
          <span className="ringTag tagBottom">Diamond setting</span>
        </div>
      </section>

      <section className="luxuryRibbon motion-rise">
        <span>Engagement</span>
        <span>Wedding</span>
        <span>Gifts</span>
        <span>Care</span>
      </section>

      <section className="luxuryEditorial">
        <img className="editorialImage motion-rise" src={asset('showcase-assets/ring-detail.png')} alt="" />
        <div className="editorialCopy motion-rise">
          <p className="kicker">Craft</p>
          <h2>Gold, diamond, setting, finish.</h2>
        </div>
      </section>

      <section className="productGallery ringGallery">
        <div className="galleryCopy motion-rise">
          <p className="kicker">Campaign</p>
          <h2>Large product focus, macro material detail, boutique service.</h2>
        </div>
        <img className="motion-rise" src={asset('showcase-assets/luxury-ring.png')} alt="" />
        <img className="motion-rise" src={asset('showcase-assets/ring-detail.png')} alt="" />
      </section>

      <section className="collectionBand" id="collections">
        {['Solenne', 'Vela', 'Nocturne'].map((name, index) => (
          <article className="collectionCard motion-rise" key={name}>
            <span>0{index + 1}</span>
            <h3>{name}</h3>
          </article>
        ))}
      </section>

      <section className="luxuryServices" id="service">
        {['Sizing salon', 'Stone selection', 'Lifetime care', 'Gift concierge'].map((item) => (
          <article className="motion-rise" key={item}>
            <h3>{item}</h3>
            <p>
              {item === 'Sizing salon' && 'Compare ring profiles and confirm the right fit.'}
              {item === 'Stone selection' && 'Review cut, clarity, carat, and setting options.'}
              {item === 'Lifetime care' && 'Cleaning, inspection, resizing, and repair guidance.'}
              {item === 'Gift concierge' && 'Private pickup, packaging, and proposal timing.'}
            </p>
          </article>
        ))}
      </section>

      <section className="luxuryShowcase motion-rise">
        <div>
          <p className="kicker">Boutique story</p>
          <h2>From discovery to appointment.</h2>
        </div>
        <div className="showcaseLines">
          <span>Collection</span>
          <span>Craft detail</span>
          <span>Private service</span>
          <span>Aftercare</span>
        </div>
      </section>

      <section className="luxuryAppointment motion-rise">
        <h2>Book a private viewing.</h2>
        <a className="button gold" href="#/">
          Portfolio
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
          <p className="kicker">NOVA</p>
          <h1>Command center for sales and ops teams.</h1>
          <div className="heroActions">
            <a className="button cyan" href="#platform">
              View product
            </a>
            <a className="button ghostCyan" href="#demo">
              Demo
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
          <div className="metricPill pillOne">+42% clarity</div>
          <div className="metricPill pillTwo">12 automations</div>
        </div>
      </section>

      <section className="saasLogos motion-rise">
        {['Slack', 'Stripe', 'HubSpot', 'Linear', 'Notion', 'GitHub'].map((logo) => (
          <span key={logo}>{logo}</span>
        ))}
      </section>

      <section className="platformSection" id="platform">
        <img className="platformVisual motion-rise" src={asset('showcase-assets/saas-device.png')} alt="" />
        <div className="platformGrid">
          {['Signals', 'Automations', 'Reports', 'Permissions'].map((item) => (
            <article className="platformCard motion-rise" key={item}>
              <h3>{item}</h3>
              <p>
                {item === 'Signals' && 'Live alerts, revenue movement, and team activity.'}
                {item === 'Automations' && 'Repeatable actions for sales and ops workflows.'}
                {item === 'Reports' && 'Clear snapshots for leadership and weekly review.'}
                {item === 'Permissions' && 'Roles, access, and safer team handoff.'}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="productGallery saasGallery">
        <img className="motion-rise" src={asset('showcase-assets/saas-dashboard.png')} alt="" />
        <div className="galleryCopy motion-rise">
          <p className="kicker">Product story</p>
          <h2>Dashboard, integrations, workflow cards, and demo conversion.</h2>
        </div>
        <img className="motion-rise" src={asset('showcase-assets/saas-device.png')} alt="" />
      </section>

      <section className="saasFlow motion-rise">
        {['Connect tools', 'Read signals', 'Trigger actions', 'Review outcomes'].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section className="saasCta motion-rise" id="demo">
        <h2>Dashboard-first SaaS landing page.</h2>
        <a className="button cyan" href="#/">
          Portfolio
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
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.set('.motion-rise', { opacity: 0, y: 38 })
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.brandMark', { opacity: 0, scale: 0.82, duration: 0.45 })
        .from('.navLinks a', { opacity: 0, y: -10, stagger: 0.05, duration: 0.35 }, '-=0.15')
        .to('.studioHero .motion-rise, .bakeryHero .motion-rise, .luxuryHero .motion-rise, .saasHero .motion-rise', {
          opacity: 1,
          y: 0,
          stagger: 0.09,
          duration: 0.85,
        })

      gsap.utils
        .toArray<HTMLElement>(
          '.motion-rise:not(.studioHero .motion-rise):not(.bakeryHero .motion-rise):not(.luxuryHero .motion-rise):not(.saasHero .motion-rise)',
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

      gsap.to('.motionCard span', {
        scaleX: 1,
        transformOrigin: 'left',
        stagger: 0.08,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { start: 'top 78%', trigger: '.motionCards' },
      })
      gsap.to('.timelineStep', {
        borderColor: 'rgba(124, 242, 255, 0.42)',
        stagger: 0.08,
        scrollTrigger: { scrub: true, start: 'top 82%', end: 'bottom 38%', trigger: '.buildTimeline' },
      })
      gsap.to('.cakeCutout, .ringStage, .dashboardShell, .studioScene', {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: { scrub: true, start: 'top top', end: 'bottom top', trigger: 'main' },
      })
      gsap.to('.cakeCutout', { y: -16, rotate: 1.5, duration: 3.4, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.to('.ringHalo', { rotate: 360, duration: 28, ease: 'none', repeat: -1 })
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
