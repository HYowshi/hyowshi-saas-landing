import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

const HeroScene = lazy(() => import('./HeroScene'))
const RingScene = lazy(() => import('./RingScene'))

gsap.registerPlugin(ScrollTrigger)

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
const routes = ['/luxury-rings', '/protein-caffeine', '/bakery-atelier', '/barbershop-studio'] as const
type Route = (typeof routes)[number]

function BrandNav({ tone = 'dark' }: { tone?: 'dark' | 'light' | 'ivory' }) {
  return (
    <nav className={`topNav ${tone}`} aria-label="Main navigation">
      <a className="brandMark" href="#/">
        HY
      </a>
      <div className="navLinks">
        <a href="#/">Work</a>
        <a href="#/protein-caffeine">Protein</a>
        <a href="#/barbershop-studio">Barber</a>
        <a href="#/bakery-atelier">Bakery</a>
        <a href="#/luxury-rings">Rings</a>
      </div>
    </nav>
  )
}

function SiteFooter({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <footer className={`siteFooter ${tone}`}>
      <div>
        <p className="eyebrow">Harashi Yowshi</p>
        <h2>Visual frontend portfolio.</h2>
      </div>
      <div className="footerLinks">
        <a href="#/">Work</a>
        <a href="#/protein-caffeine">Protein</a>
        <a href="#/barbershop-studio">Barber</a>
        <a href="#/bakery-atelier">Bakery</a>
        <a href="#/luxury-rings">Rings</a>
        <a href="mailto:HarashiYowshi@gmail.com">Email</a>
        <a href="https://github.com/HYowshi">GitHub</a>
      </div>
    </footer>
  )
}

function SplashScreen() {
  return (
    <div className="splashScreen" aria-hidden="true">
      <div className="splashAura splashAuraOne" />
      <div className="splashAura splashAuraTwo" />
      <div className="splashShell">
        <div className="splashGrid">
          <span>HY</span>
          <span>Visual Frontend Studio</span>
          <span>React / GSAP / Three.js</span>
        </div>
        <div className="splashSystem">
          <span>Loading product scenes</span>
          <strong>Portfolio / Protein / Barber / Cake / Ring</strong>
        </div>
        <div className="splashOrbit">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="splashBar" />
    </div>
  )
}

function AwardTitle({ text, className = '' }: { text: string; className?: string }) {
  return (
    <h2 className={`awardTitle ${className}`}>
      {text.split(' ').map((word, index) => (
        <span className="awardWord" key={`${word}-${index}`}>
          {word}
        </span>
      ))}
    </h2>
  )
}

function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [style, setStyle] = useState<CSSProperties>({})

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    const rotateX = (y - 0.5) * -7
    const rotateY = (x - 0.5) * 7
    setStyle({
      '--spot-x': `${x * 100}%`,
      '--spot-y': `${y * 100}%`,
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`,
    } as CSSProperties)
  }

  return (
    <div
      className={`tiltSurface ${className}`}
      onPointerMove={onMove}
      onPointerLeave={() => setStyle({})}
      style={style}
    >
      {children}
    </div>
  )
}

function PortfolioHome() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const work = [
    ['Protein Caffeine', 'Primary brand campaign', '#/protein-caffeine', 'awwwards-assets/images/Final.png'],
    ['Barber House', 'Barbershop booking site', '#/barbershop-studio', 'barbershop-assets/home-bg.png'],
    ['Maison Miel', 'Bakery website', '#/bakery-atelier', 'showcase-assets/bakery-cake-cutout.png'],
    ['AURELIA', 'Ring boutique', '#/luxury-rings', 'showcase-assets/luxury-ring.png'],
  ]
  const timeline = [
    ['01', 'Brief', 'Audience, offer, references'],
    ['02', 'Visual', 'Layout, imagery, motion mood'],
    ['03', 'Build', 'React, CSS, GSAP, 3D'],
    ['04', 'Ship', 'Build, test, GitHub deploy'],
  ]
  const tickerItems = ['Portfolio', 'Protein Caffeine', 'GSAP', 'Three.js', 'React', 'Brand Motion']
  const skills = [
    ['Frontend', 'React / TypeScript / Vite'],
    ['Motion', 'GSAP / ScrollTrigger / clip-path'],
    ['3D', 'Three.js canvas / product staging'],
    ['Layout', 'Responsive grids / campaign sections'],
    ['Delivery', 'GitHub repo / live deploy / handoff'],
    ['Commerce', 'Menus / catalogues / product CTAs'],
  ]
  const workflow = [
    ['Discover', 'Brief, audience, references, content, and product goal.'],
    ['Design', 'Visual direction, section plan, imagery, and motion rhythm.'],
    ['Develop', 'React build, responsive CSS, GSAP, 3D, and interactions.'],
    ['Deliver', 'Live link, GitHub repo, QA notes, and handoff.'],
  ]
  const craftChips = ['React', 'GSAP', 'Three.js', 'Layout', 'Brand UI', 'Deploy']
  const capabilityCards = [
    ['Landing Page', 'Brand-first hero, scroll story, responsive conversion flow.'],
    ['Product Demo', '3D/product visuals, catalog sections, proof, and CTA.'],
    ['Portfolio Build', 'Case-study layout, skills wall, contact, and GitHub handoff.'],
  ]

  const copyEmail = async () => {
    await navigator.clipboard.writeText('HarashiYowshi@gmail.com')
    setCopiedEmail(true)
    window.setTimeout(() => setCopiedEmail(false), 1800)
  }

  return (
    <main className="portfolioPage">
      <BrandNav />

      <section className="studioHero portfolioHeroPrime">
        <div className="studioHeadline">
          <p className="eyebrow motion-rise">Portfolio / Harashi Yowshi</p>
          <h1 className="motion-rise">Portfolio</h1>
          <p className="portfolioHeroText motion-rise">
            Visual frontend portfolio built around one flagship product: Protein Caffeine,
            supported by Barber, Cake, and Ring demos for brand, product, motion, and responsive layout work.
          </p>
          <div className="heroActions motion-rise">
            <a className="button primary" href="#work">
              View work
            </a>
            <a className="button secondary" href="#/protein-caffeine">
              Protein Caffeine
            </a>
          </div>
          <div className="heroProfilePanel motion-rise">
            <span className="statusDot" />
            <p>Flagship: Protein Caffeine. Role: React, GSAP, visual layout, responsive delivery.</p>
          </div>
        </div>
        <div className="studioScene motion-rise">
          <Suspense fallback={<div className="sceneFallback" />}>
            <HeroScene />
          </Suspense>
          <div className="sceneBadge badgeTop">
            <span>Role</span>
            <strong>Visual Frontend</strong>
          </div>
          <div className="sceneBadge badgeBottom">
            <span>Stack</span>
            <strong>React / GSAP / 3D</strong>
          </div>
        </div>
      </section>

      <section className="ticker">
        <div className="tickerTrack">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      <section className="portfolioServiceSummary">
        <div className="serviceLine serviceLineOne motion-rise">Strategy</div>
        <div className="serviceLine serviceLineTwo motion-rise">
          <span>Motion</span>
          <i />
          <span>Frontend</span>
        </div>
        <div className="serviceLine serviceLineThree motion-rise">
          <span>Product</span>
          <i />
          <span>Campaign</span>
          <i />
          <span>Deploy</span>
        </div>
        <div className="serviceLine serviceLineFour motion-rise">Portfolio</div>
      </section>

      <section className="aboutStudio motion-rise">
        <div>
          <p className="eyebrow">About</p>
          <h2>A portfolio built like a product presentation, not a resume page.</h2>
        </div>
        <p>
          The main proof is Protein Caffeine: a video-led GSAP campaign page with product assets,
          clip-path titles, flavor system, responsive layout, and launch-style storytelling.
        </p>
      </section>

      <section className="portfolioAboutAwwwards">
        <div className="aboutPortrait motion-rise">
          <img src={asset('avatar.png')} alt="Harashi Yowshi portrait." />
        </div>
        <div className="aboutCopyAwwwards motion-rise">
          <p className="eyebrow">Profile</p>
          <h2>Designer-minded frontend developer for product websites.</h2>
          <p>
            I focus on the visible quality clients judge first: hierarchy, spacing, scroll rhythm,
            product imagery, animation restraint, mobile fit, and a clean deployed handoff.
          </p>
        </div>
      </section>

      <section className="portfolioBento">
        <TiltCard className="bentoProfile motion-rise">
          <div>
            <p className="eyebrow">Profile</p>
            <h3>Harashi Yowshi</h3>
            <p>Frontend builder for visual product websites with a strong taste for motion and layout.</p>
          </div>
        </TiltCard>
        <TiltCard className="bentoCraft motion-rise">
          <p>Code is craft</p>
          {craftChips.map((chip, index) => (
            <span className={`craftChip chip${index + 1}`} key={chip}>
              {chip}
            </span>
          ))}
        </TiltCard>
        <TiltCard className="bentoAvailability motion-rise">
          <p className="eyebrow">Remote</p>
          <h3>Asia/Saigon timezone, online delivery.</h3>
          <span>GitHub repo + live deploy + QA notes</span>
        </TiltCard>
        <TiltCard className="bentoContact motion-rise">
          <p className="eyebrow">Contact</p>
          <h3>Start a project together.</h3>
          <button className="copyEmailButton" type="button" onClick={copyEmail}>
            {copiedEmail ? 'Email copied' : 'Copy email'}
          </button>
        </TiltCard>
        <TiltCard className="bentoStack motion-rise">
          <div>
            <p className="eyebrow">Technical stack</p>
            <h3>React, TypeScript, GSAP, Three.js, Vite.</h3>
          </div>
          <div className="stackOrbit" aria-hidden="true">
            {['R', 'TS', 'G', '3D', 'V'].map((item, index) => (
              <span className={`orbitItem orbit${index + 1}`} key={item}>
                {item}
              </span>
            ))}
          </div>
        </TiltCard>
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
          <a className={`workTile portfolioWorkTile workTile${index + 1} motion-rise`} href={href} key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <img src={asset(image)} alt="" />
            <div>
              <p>{label}</p>
              <h2>{title}</h2>
            </div>
          </a>
        ))}
      </section>

      <section className="portfolioCapability">
        <div className="motion-rise">
          <p className="eyebrow">Services</p>
          <AwardTitle text="Premium frontend work with enough polish to sell the idea." />
        </div>
        <div className="capabilityGrid">
          {capabilityCards.map(([title, detail]) => (
            <TiltCard className="capabilityCard motion-rise" key={title}>
              <h3>{title}</h3>
              <p>{detail}</p>
            </TiltCard>
          ))}
        </div>
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

      <section className="workflowSection">
        <div className="workflowIntro motion-rise">
          <p className="eyebrow">Workflow</p>
          <h2>From client brief to live portfolio-ready website.</h2>
        </div>
        <div className="workflowGrid">
          {workflow.map(([title, detail], index) => (
            <article className="workflowCard motion-rise" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="studioContact motion-rise">
        <h2>Need a polished product website?</h2>
        <div className="contactLinks">
          <a href="mailto:HarashiYowshi@gmail.com">HarashiYowshi@gmail.com</a>
          <a href="https://github.com/HYowshi">GitHub</a>
          <a href="#/protein-caffeine">Protein Caffeine</a>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

function BakeryAtelier() {
  const products = [
    ['Strawberry cake', '$12', 'bedim-cake-assets/product-strawberry-1.png'],
    ['Chocolate cake', '$15', 'bedim-cake-assets/product-chocolate-1.png'],
    ['Vanilla cake', '$13', 'bedim-cake-assets/product-vanilla-1.png'],
    ['Dried fruit cake', '$18', 'bedim-cake-assets/product-dried-fruit-1.png'],
    ['Honey cupcake', '$9', 'bedim-cake-assets/product-others-1.png'],
  ]

  const newCakes = [
    ['Pink velvet', 'Berry cream, vanilla sponge, rose sugar.', 'bedim-cake-assets/new-cake-1.png'],
    ['Cocoa crown', 'Chocolate mousse, glossy ganache, almond crumb.', 'bedim-cake-assets/new-cake-2.png'],
    ['Lemon cloud', 'Citrus curd, whipped cream, toasted meringue.', 'bedim-cake-assets/new-cake-3.png'],
    ['Party slice', 'Confetti sponge, strawberry jam, soft buttercream.', 'bedim-cake-assets/new-cake-4.png'],
    ['Dream roll', 'Swiss roll, cherry cream, ribbon finish.', 'bedim-cake-assets/new-cake-5.png'],
  ]

  return (
    <main className="brandPage bakeryPage">
      <BrandNav tone="light" />

      <section className="bedimHero">
        <div className="bedimHeroCopy motion-rise">
          <p className="scriptKicker">Maison Cake</p>
          <h1>Custom cakes for every celebration.</h1>
          <p>
            A soft, playful cake shop experience with layered hero art, product browsing, seasonal drops, and a clear order path for birthdays, weddings, and weekend dessert boxes.
          </p>
          <div className="heroActions">
            <a className="button berry" href="#menu">
              Order cake
            </a>
            <a className="button cream" href="#new-cakes">
              New cakes
            </a>
          </div>
          <div className="bakeryStats" aria-label="Bakery highlights">
            <span><strong>24h</strong> custom quote</span>
            <span><strong>5</strong> signature flavors</span>
            <span><strong>4.9</strong> customer rating</span>
          </div>
        </div>
        <div className="bedimHeroVisual motion-rise" aria-hidden="true">
          <img className="heroBlob" src={asset('bedim-cake-assets/home-blob.svg')} alt="" />
          <img className="homeBalloons" src={asset('bedim-cake-assets/home-balloons.png')} alt="" />
          <img className="heroCake cakeOne" src={asset('bedim-cake-assets/home-cake-1.png')} alt="" />
          <img className="heroCake cakeTwo" src={asset('bedim-cake-assets/home-cake-2.png')} alt="" />
          <img className="heroCake cakeThree" src={asset('bedim-cake-assets/home-cake-3.png')} alt="" />
          <img className="heroCake cakeFour" src={asset('bedim-cake-assets/home-cake-4.png')} alt="" />
          <img className="heroSlice sliceOne" src={asset('bedim-cake-assets/home-slice-cake-1.png')} alt="" />
          <img className="heroSlice sliceTwo" src={asset('bedim-cake-assets/home-slice-cake-2.png')} alt="" />
          <img className="heroBase" src={asset('bedim-cake-assets/home-base.png')} alt="" />
          <img className="cakeLeaf leafOne" src={asset('bedim-cake-assets/leaf-1.png')} alt="" />
          <img className="cakeLeaf leafTwo" src={asset('bedim-cake-assets/leaf-2.png')} alt="" />
          <span className="pastrySticker stickerOne">Fresh today</span>
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

      <section className="bedimAbout">
        <div className="aboutCakeVisual motion-rise">
          <img className="aboutBlob" src={asset('bedim-cake-assets/about-blob.svg')} alt="" />
          <img className="aboutMainCake" src={asset('bedim-cake-assets/about-img.png')} alt="Decorated strawberry cake on a cake stand." />
          <img className="aboutCupcake cupOne" src={asset('bedim-cake-assets/about-cupcake-1.png')} alt="" />
          <img className="aboutCupcake cupTwo" src={asset('bedim-cake-assets/about-cupcake-2.png')} alt="" />
          <img className="aboutCupcake cupThree" src={asset('bedim-cake-assets/about-cupcake-3.png')} alt="" />
        </div>
        <div className="featureCopy motion-rise">
          <p className="scriptKicker">About us</p>
          <h2>Made by pastry chefs who care about the first photo and the last bite.</h2>
          <p>
            Every cake page needs to sell appetite fast: a clear hero product, visible flavors, emotional occasion copy, and a direct ordering flow. This concept uses cutout imagery, layered motion, warm typography, and focused conversion blocks.
          </p>
          <a className="textLink" href="#menu">
            Browse flavors
          </a>
        </div>
      </section>

      <section className="awardClipScene cakeClipScene">
        <div className="clipCopy motion-rise">
          <p className="scriptKicker">Flavor film</p>
          <AwardTitle text="A cake page should feel edible before it explains anything." />
        </div>
        <div className="clipFrame motion-rise">
          <img src={asset('bedim-cake-assets/new-cake-1.png')} alt="" />
          <img src={asset('bedim-cake-assets/new-cake-3.png')} alt="" />
          <span>Limited weekend drop</span>
        </div>
      </section>

      <section className="bedimProducts" id="menu">
        <div className="sectionHeader motion-rise">
          <p className="scriptKicker">Popular cakes</p>
          <h2>Choose the flavor, size, finish, and pickup date.</h2>
        </div>
        <img className="productsBlob" src={asset('bedim-cake-assets/products-blob.svg')} alt="" aria-hidden="true" />
        <img className="cakeLeaf productLeaf" src={asset('bedim-cake-assets/leaf-3.png')} alt="" aria-hidden="true" />
      </section>

      <section className="menuGrid cakeMenuGrid">
        {products.map(([name, price, image]) => (
          <article className="menuCard motion-rise" key={name}>
            <img src={asset(image)} alt="" />
            <div>
              <span>{price}</span>
              <h3>{name}</h3>
              <p>Soft sponge, balanced cream, boxed for pickup or delivery.</p>
            </div>
          </article>
        ))}
      </section>

      <section className="bedimNewCakes" id="new-cakes">
        <div className="sectionHeader motion-rise">
          <p className="scriptKicker">Fresh arrivals</p>
          <h2>Seasonal cakes styled for launches, birthdays, and social campaigns.</h2>
        </div>
        <div className="newCakeRail">
          {newCakes.map(([name, detail, image], index) => (
            <article className="newCakeCard motion-rise" key={name}>
              <span>0{index + 1}</span>
              <img src={asset(image)} alt="" />
              <h3>{name}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bakeryServices cakeServiceGrid">
        {[
          ['Custom cakes', 'Sizes, flavors, message, finish, candle kit, and pickup window.'],
          ['Local delivery', 'Same-day city route with insulated packaging and handoff status.'],
          ['Dessert catering', 'Mini desserts, gift boxes, and full event tables for private gatherings.'],
          ['Weekend boxes', 'Limited drops with seasonal fruit, cream, and launch-ready visuals.'],
        ].map(([item, detail]) => (
          <article className="motion-rise" key={item}>
            <img src={asset(`bedim-cake-assets/sticker-${(item.length % 5) + 1}.svg`)} alt="" />
            <h3>{item}</h3>
            <p>{detail}</p>
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

      <section className="productDetailGrid bakeryDetailGrid">
        {[
          ['Brand system', 'Soft pink palette, cake-script accents, rounded product cards, and joyful cutout imagery.'],
          ['Conversion flow', 'Menu, new cakes, order process, service blocks, and one clear contact card.'],
          ['Motion layer', 'Floating hero assets, hover lift, reveal timeline, and lightweight CSS animation.'],
        ].map(([title, detail]) => (
          <article className="motion-rise" key={title}>
            <span>{title}</span>
            <p>{detail}</p>
          </article>
        ))}
      </section>

      <section className="bakeryStory motion-rise">
        <div className="storyCakeStack" aria-hidden="true">
          <img src={asset('bedim-cake-assets/footer-blob.svg')} alt="" />
          <img src={asset('bedim-cake-assets/new-cake-5.png')} alt="" />
        </div>
        <div>
          <p className="scriptKicker">Maison Cake</p>
          <h2>Ready to turn a cake shop into a brand people remember?</h2>
          <p>Built as a complete product demo: emotional first screen, real food imagery, clear menu, micro-interactions, and a practical sales path.</p>
          <a className="button berry" href="#/">
            Portfolio
          </a>
        </div>
      </section>

      <SiteFooter tone="light" />
    </main>
  )
}

function LuxuryRings() {
  const gemOptions = [
    ['Diamond', '0.82ct', 'Brilliant cut center stone'],
    ['Emerald', '0.64ct', 'Deep green heritage accent'],
    ['Ruby', '0.58ct', 'Warm red ceremonial setting'],
    ['Aqua', '0.71ct', 'Pale blue modern finish'],
  ]

  const storyFrames = [
    ['01', 'Hero view', 'A large fixed 3D product moment introduces the ring before any sales copy competes with it.'],
    ['02', 'Material close-up', 'Gold, rose gold, diamond light, and prong detail are separated into readable product moments.'],
    ['03', 'Configurator', 'The customer sees metal, stone, size, service, and appointment options in one premium flow.'],
  ]

  return (
    <main className="brandPage luxuryPage">
      <BrandNav tone="ivory" />

      <section className="luxuryHero webgiHero">
        <div className="luxuryCopy motion-rise">
          <p className="kicker">AURELIA 3D</p>
          <h1>Design the ring in cinematic 3D.</h1>
          <p>
            A luxury jewelry product page inspired by WebGi storytelling: large interactive ring render, scroll-reactive motion, material cards, gemstone options, and private appointment conversion.
          </p>
          <div className="heroActions">
            <a className="button gold" href="#collections">
              Explore ring
            </a>
            <a className="button ghostGold" href="#configurator">
              Configure
            </a>
          </div>
          <div className="webgiSpecs">
            <span><strong>18K</strong> gold</span>
            <span><strong>3D</strong> product view</span>
            <span><strong>4</strong> stone moods</span>
          </div>
        </div>
        <div className="ringStage webgiRingStage motion-rise">
          <div className="ringHalo" />
          <Suspense fallback={<div className="ringCanvasFallback" />}>
            <RingScene className="ringCanvas" />
          </Suspense>
          <span className="ringTag tagTop">Scroll reactive</span>
          <span className="ringTag tagBottom">Procedural 3D ring</span>
        </div>
      </section>

      <section className="luxuryRibbon motion-rise">
        <span>3D Viewer</span>
        <span>Metal System</span>
        <span>Gem Config</span>
        <span>Private Sale</span>
      </section>

      <section className="luxuryEditorial webgiEditorial">
        <img className="editorialImage motion-rise" src={asset('showcase-assets/ring-detail.png')} alt="" />
        <div className="editorialCopy motion-rise">
          <p className="kicker">Craft camera</p>
          <h2>From hero render to macro material story.</h2>
          <p>
            The page behaves like a guided product film: strong first screen, restrained copy, gold-on-black contrast, and each scroll section gives one reason to trust the purchase.
          </p>
        </div>
      </section>

      <section className="webgiStoryRail">
        {storyFrames.map(([number, title, detail]) => (
          <article className="webgiStoryCard motion-rise" key={title}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{detail}</p>
          </article>
        ))}
      </section>

      <section className="awardClipScene ringClipScene">
        <div className="clipCopy motion-rise">
          <p className="kicker">Cinematic reveal</p>
          <AwardTitle text="Luxury needs fewer words and a stronger object." />
        </div>
        <div className="clipFrame ringClipFrame motion-rise">
          <Suspense fallback={<div className="ringCanvasFallback" />}>
            <RingScene className="ringCanvas miniRingCanvas" />
          </Suspense>
          <span>3D inspection mode</span>
        </div>
      </section>

      <section className="webgiConfigurator" id="configurator">
        <div className="motion-rise">
          <p className="kicker">Configurator</p>
          <h2>Choose stone, metal, size, and service without leaving the story.</h2>
        </div>
        <div className="gemGrid">
          {gemOptions.map(([name, carat, detail]) => (
            <article className="gemCard motion-rise" key={name}>
              <span>{carat}</span>
              <h3>{name}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="collectionBand webgiCollection" id="collections">
        {['Solenne', 'Vela', 'Nocturne', 'Ellipse'].map((name, index) => (
          <article className="collectionCard motion-rise" key={name}>
            <span>0{index + 1}</span>
            <h3>{name}</h3>
            <p>
              {index === 0 && 'Classic solitaire with bright diamond crown.'}
              {index === 1 && 'Slim architectural band with rose-gold warmth.'}
              {index === 2 && 'Black-tie ring language with deep shadow contrast.'}
              {index === 3 && 'Modern oval profile for editorial campaigns.'}
            </p>
          </article>
        ))}
      </section>

      <section className="luxuryServices" id="service">
        {['Sizing salon', 'Stone selection', '3D inspection', 'Gift concierge'].map((item) => (
          <article className="motion-rise" key={item}>
            <h3>{item}</h3>
            <p>
              {item === 'Sizing salon' && 'Compare ring profiles and confirm the right fit.'}
              {item === 'Stone selection' && 'Review cut, clarity, carat, and setting options.'}
              {item === '3D inspection' && 'Inspect crown, prong, side stones, and metal finish before appointment.'}
              {item === 'Gift concierge' && 'Private pickup, packaging, and proposal timing.'}
            </p>
          </article>
        ))}
      </section>

      <section className="luxuryShowcase motion-rise">
        <div>
          <p className="kicker">Boutique story</p>
          <h2>Scroll, inspect, configure, book.</h2>
        </div>
        <div className="showcaseLines">
          <span>Fixed 3D product canvas</span>
          <span>Scroll-based camera language</span>
          <span>Material and gemstone selection</span>
          <span>Private viewing call-to-action</span>
        </div>
      </section>

      <section className="productDetailGrid ringDetailGrid">
        {[
          ['3D technique', 'Three.js procedural ring, physical materials, diamond refraction, prongs, side stones, and environment lighting.'],
          ['WebGi learning', 'Adopts the WebGi idea of one premium object moving through a scroll story and configurator.'],
          ['Commercial safety', 'No licensed WebGi model copied; the ring render is rebuilt for this portfolio demo.'],
        ].map(([title, detail]) => (
          <article className="motion-rise" key={title}>
            <span>{title}</span>
            <p>{detail}</p>
          </article>
        ))}
      </section>

      <section className="luxuryAppointment motion-rise">
        <h2>Book a private viewing.</h2>
        <a className="button gold" href="#/">
          Portfolio
        </a>
      </section>

      <SiteFooter />
    </main>
  )
}

function ProteinCaffeine() {
  const flavors = [
    ['Chocolate Milk', 'brown', 'Protein, caffeine, cocoa punch.'],
    ['Strawberry Rush', 'red', 'Berry energy with a soft creamy finish.'],
    ['Cookies & Cream', 'blue', 'Nostalgic dessert flavor for launch buzz.'],
    ['Peanut Butter', 'orange', 'Bold snack mood with campaign-ready color.'],
    ['Vanilla Shake', 'white', 'Clean bright pack shot for lifestyle scenes.'],
    ['Max Chocolate', 'black', 'Dark high-contrast bottle for hero moments.'],
  ]
  const benefits = [
    ['Clip-path titles', 'Awwwards-style text bands reveal on scroll with staggered motion.'],
    ['Pinned video', 'A circular video mask expands into a full editorial product film.'],
    ['Product rail', 'Cutout bottle assets, flavor cards, tilted layouts, and layered graphics.'],
    ['Responsive art', 'Mobile keeps the campaign readable without breaking the composition.'],
  ]

  return (
    <main className="brandPage campaignPage">
      <BrandNav />

      <section className="motionCampaignHero">
        <video className="campaignHeroVideo" src={asset('awwwards-assets/videos/hero-bg.mp4')} autoPlay muted loop playsInline />
        <div className="campaignHeroOverlay" />
        <div className="campaignHeroContent motion-rise">
          <p className="campaignKicker">Protein Caffeine / Flagship product</p>
          <div className="campaignTitleMask">
            <h1>Freaking Delicious</h1>
          </div>
          <div className="campaignTitleBand">
            <span>Protein + Caffeine</span>
          </div>
          <p>
            A flagship brand campaign landing page inspired by the GSAP Awwwards repo: bold product staging,
            video background, clip-path reveals, scroll story, and a flavor rail that feels made for a real launch.
          </p>
          <div className="heroActions">
            <a className="button milkButton" href="#flavors">
              Explore flavors
            </a>
            <a className="button brownButton" href="#film">
              Watch motion
            </a>
          </div>
        </div>
        <img className="campaignHeroBottle motion-rise" src={asset('awwwards-assets/images/hero-img.png')} alt="SPYLT product bottle." />
      </section>

      <section className="campaignTicker">
        <div>
          {[...['Protein Caffeine', 'GSAP', 'Clip Path', 'Pinned Video', 'Product Rail', 'ScrollTrigger'], ...['Protein Caffeine', 'GSAP', 'Clip Path', 'Pinned Video', 'Product Rail', 'ScrollTrigger']].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      <section className="campaignMessage">
        <p className="motion-rise">Built for a drink brand that needs to feel loud, tactile, and memorable before the visitor reads the full story.</p>
        <AwardTitle text="Stir up the product story with motion, color, and appetite." />
      </section>

      <section className="flavorShowcase" id="flavors">
        <div className="flavorIntro motion-rise">
          <p className="campaignKicker">Flavor system</p>
          <h2>Each product gets its own color world.</h2>
          <p>Layered backgrounds, cutout bottles, floating ingredients, and tilted cards make the catalog feel campaign-grade instead of template-made.</p>
        </div>
        <div className="flavorRail">
          {flavors.map(([name, color, detail], index) => (
            <TiltCard className={`flavorCard flavorCard${index + 1} motion-rise`} key={name}>
              <img className="flavorBg" src={asset(`awwwards-assets/images/${color}-bg.svg`)} alt="" />
              <img className="flavorElements" src={asset(`awwwards-assets/images/${color}-elements.webp`)} alt="" />
              <img className="flavorDrink" src={asset(`awwwards-assets/images/${color}-drink.webp`)} alt={`${name} bottle.`} />
              <div>
                <span>0{index + 1}</span>
                <h3>{name}</h3>
                <p>{detail}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="campaignBenefits">
        <div className="benefitIntro motion-rise">
          <p className="campaignKicker">Motion ingredients</p>
          <h2>Shelf-stable layouts with scroll-triggered energy.</h2>
        </div>
        <div className="benefitStack">
          {benefits.map(([title, detail], index) => (
            <article className={`campaignBenefit benefit${index + 1} motion-rise`} key={title}>
              <span>{title}</span>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="campaignVideoPin" id="film">
        <div className="videoPinCopy motion-rise">
          <p className="campaignKicker">Pinned product film</p>
          <AwardTitle text="Let the motion sell the first sip." />
        </div>
        <div className="videoPinFrame motion-rise">
          <video src={asset('awwwards-assets/videos/pin-video.mp4')} autoPlay muted loop playsInline />
          <div className="playOrbit">
            <img src={asset('awwwards-assets/images/circle-text.svg')} alt="" />
            <span>
              <img src={asset('awwwards-assets/images/play.svg')} alt="" />
            </span>
          </div>
        </div>
      </section>

      <section className="campaignCards">
        {[
          ['Hero video', 'Full-bleed animated background with product cutout in the first viewport.'],
          ['Scroll reveal', 'GSAP motion-rise, award word reveals, clip frame expansion, and parallax.'],
          ['Real assets', 'Video, bottle renders, ingredient overlays, and visual flavor families.'],
        ].map(([title, detail]) => (
          <TiltCard className="campaignProofCard motion-rise" key={title}>
            <h3>{title}</h3>
            <p>{detail}</p>
          </TiltCard>
        ))}
      </section>

      <section className="campaignFinal motion-rise">
        <img src={asset('awwwards-assets/images/big-img.png')} alt="SPYLT campaign product composition." />
        <div>
          <p className="campaignKicker">Flagship case study</p>
          <h2>Protein Caffeine is the lead product in this portfolio.</h2>
          <p>
            This product page shows GSAP, layout, video, product art direction, flavor systems, responsive delivery, and scroll storytelling in one stronger client-facing demo.
          </p>
          <a className="button milkButton" href="#/">
            Back to portfolio
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

function BarbershopStudio() {
  const services = [
    ['Signature cut', '$32', 'Consultation, precision cut, wash, and texture finish.'],
    ['Skin fade', '$38', 'Clean gradient fade, razor line-up, and styling product.'],
    ['Beard ritual', '$24', 'Hot towel, shape, razor edge, oil, and aftercare.'],
    ['Groom package', '$58', 'Cut, beard, shampoo, scalp massage, and finish photo.'],
  ]
  const gallery = ['work-img-1.png', 'work-img-3.png', 'work-img-5.png', 'work-img-8.png', 'work-img-10.png']
  const locations = [
    ['Downtown Studio', '21 Mercer Street', 'work-img-2.png'],
    ['Old Quarter', '48 Pine Lane, 2nd floor', 'work-img-4.png'],
    ['Market House', '2 Kensington Walk', 'work-img-6.png'],
    ['West End', '990 Wellington Row', 'work-img-7.png'],
  ]
  const experts = [
    ['Marco', 'Fade specialist', 'expert-img-1.png'],
    ['Leo', 'Classic cuts', 'expert-img-2.png'],
    ['Andre', 'Beard ritual', 'expert-img-3.png'],
    ['Noah', 'Texture styling', 'expert-img-4.png'],
  ]

  return (
    <main className="brandPage barberPage">
      <BrandNav tone="ivory" />

      <section className="barberHero">
        <div className="barberHeroBg" aria-hidden="true">
          <img src={asset('barbershop-assets/home-bg.png')} alt="" />
        </div>
        <div className="barberHeroCopy motion-rise">
          <p className="barberKicker">Barber House / Booking website</p>
          <h1>Precision cuts with a cinematic booking flow.</h1>
          <p>
            A premium barbershop landing page using Bedimcode assets upgraded with stronger product storytelling,
            GSAP reveals, editorial image rhythm, clear services, team trust, and a direct appointment CTA.
          </p>
          <div className="heroActions">
            <a className="button amberButton" href="#barber-services">
              Book a chair
            </a>
            <a className="button darkAmberButton" href="#barber-gallery">
              View cuts
            </a>
          </div>
          <div className="barberQuickNav">
            {['Appointments', 'Services', 'Barbers', 'Gift cards'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="barberSeal motion-rise">
          <img src={asset('barbershop-assets/home-logo.svg')} alt="" />
          <span>Since 2026</span>
        </div>
      </section>

      <section className="barberTicker">
        <div>
          {[...['Fade', 'Classic cut', 'Beard ritual', 'Hot towel', 'Booking', 'Style'], ...['Fade', 'Classic cut', 'Beard ritual', 'Hot towel', 'Booking', 'Style']].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      <section className="barberAppointment" id="barber-appointment">
        <div className="barberAppointmentIntro motion-rise">
          <p className="barberKicker">Book an appointment</p>
          <h2>Pick a chair, choose a barber, and lock the time.</h2>
          <p>
            Inspired by real multi-location barbershop booking flows: location cards,
            visible addresses, service confidence, and one clear booking action per shop.
          </p>
        </div>
        <div className="locationGrid">
          {locations.map(([name, address, image]) => (
            <article className="locationCard motion-rise" key={name}>
              <img src={asset(`barbershop-assets/${image}`)} alt="" />
              <div>
                <h3>{name}</h3>
                <p>{address}</p>
                <a href="#barber-services">Book now</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="barberAbout">
        <div className="barberAboutImage motion-rise">
          <img src={asset('barbershop-assets/about-img.png')} alt="Barbershop chair and interior." />
        </div>
        <div className="barberAboutCopy motion-rise">
          <p className="barberKicker">The experience</p>
          <AwardTitle text="A shop website should sell trust before the booking form." />
          <p>
            The page structure makes the brand feel established: a strong first image, service pricing, recent work,
            expert profiles, testimonials-style proof, and a booking footer that stays simple.
          </p>
        </div>
      </section>

      <section className="barberServices" id="barber-services">
        {services.map(([name, price, detail], index) => (
          <TiltCard className="barberServiceCard motion-rise" key={name}>
            <span>0{index + 1}</span>
            <h3>{name}</h3>
            <strong>{price}</strong>
            <p>{detail}</p>
          </TiltCard>
        ))}
      </section>

      <section className="barberGallery" id="barber-gallery">
        <div className="barberGalleryIntro motion-rise">
          <p className="barberKicker">Recent work</p>
          <h2>Cut gallery built like an editorial rail.</h2>
        </div>
        <div className="barberImageRail">
          {gallery.map((image, index) => (
            <img className={`motion-rise barberGalleryImage galleryImage${index + 1}`} src={asset(`barbershop-assets/${image}`)} alt="" key={image} />
          ))}
        </div>
      </section>

      <section className="barberExperts">
        <div className="motion-rise">
          <p className="barberKicker">Experts</p>
          <h2>Four barber profiles so the shop feels real.</h2>
        </div>
        <div className="expertGrid">
          {experts.map(([name, role, image]) => (
            <article className="expertCard motion-rise" key={name}>
              <img src={asset(`barbershop-assets/${image}`)} alt="" />
              <h3>{name}</h3>
              <p>{role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="barberGift motion-rise">
        <div>
          <p className="barberKicker">Gift cards</p>
          <h2>Give someone a clean cut, hot towel, and a reason to come back.</h2>
        </div>
        <div className="giftCardMock">
          <span>BARBER HOUSE</span>
          <strong>Gift Card</strong>
          <p>Redeem for cuts, beard rituals, styling, and shop products.</p>
        </div>
      </section>

      <section className="barberNewsletter motion-rise">
        <div>
          <p className="barberKicker">Stay in touch</p>
          <h2>Promotions, events, new barbers, and grooming notes.</h2>
        </div>
        <form className="newsletterForm">
          <input aria-label="Email address" placeholder="Email address" type="email" />
          <button type="button">Sign up</button>
        </form>
      </section>

      <section className="barberBooking motion-rise">
        <div>
          <p className="barberKicker">Appointment</p>
          <h2>Choose service, barber, time, and walk in sharp.</h2>
        </div>
        <a className="button amberButton" href="#/">
          Portfolio
        </a>
      </section>

      <SiteFooter />
    </main>
  )
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const skipSplash = new URLSearchParams(window.location.search).has('nosplash')
  const [route, setRoute] = useState(window.location.hash.replace('#', '') || '/')
  const [showSplash, setShowSplash] = useState(!skipSplash)

  useEffect(() => {
    if (skipSplash) return
    const splashTimer = window.setTimeout(() => setShowSplash(false), 1900)
    return () => window.clearTimeout(splashTimer)
  }, [skipSplash])

  useEffect(() => {
    const syncRoute = () => setRoute(window.location.hash.replace('#', '') || '/')
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      if (skipSplash) {
        ScrollTrigger.refresh()
        return
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setShowSplash(false)
        return
      }

      gsap
        .timeline({
          onComplete: () => setShowSplash(false),
        })
        .from('.splashGrid span', { opacity: 0, y: 18, stagger: 0.08, duration: 0.45, ease: 'power3.out' })
        .fromTo('.splashBar', { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', duration: 0.55, ease: 'power3.inOut' }, '-=0.12')
        .to('.splashScreen', { opacity: 0, yPercent: -6, duration: 0.42, ease: 'power2.inOut' }, '+=0.08')

      gsap.set('.motion-rise', { opacity: 0, y: 38 })
      gsap.set('.awardWord', { opacity: 0, rotateX: 42, rotateY: 18, yPercent: 80, transformPerspective: 700 })
      gsap.set('.clipFrame', { clipPath: 'polygon(10% 0, 88% 8%, 100% 86%, 0 100%)' })
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.brandMark', { opacity: 0, scale: 0.82, duration: 0.45 })
        .from('.navLinks a', { opacity: 0, y: -10, stagger: 0.05, duration: 0.35 }, '-=0.15')
        .to('.studioHero .motion-rise, .bedimHero .motion-rise, .bakeryHero .motion-rise, .luxuryHero .motion-rise, .motionCampaignHero .motion-rise, .barberHero .motion-rise', {
          opacity: 1,
          y: 0,
          stagger: 0.09,
          duration: 0.85,
        })

      gsap.utils
        .toArray<HTMLElement>(
          '.motion-rise:not(.studioHero .motion-rise):not(.bedimHero .motion-rise):not(.bakeryHero .motion-rise):not(.luxuryHero .motion-rise):not(.motionCampaignHero .motion-rise):not(.barberHero .motion-rise)',
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

      gsap.utils.toArray<HTMLElement>('.awardTitle').forEach((title) => {
        gsap.to(title.querySelectorAll('.awardWord'), {
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          yPercent: 0,
          stagger: 0.035,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { start: 'top 82%', trigger: title },
        })
      })

      gsap.utils.toArray<HTMLElement>('.clipFrame').forEach((frame) => {
        gsap.to(frame, {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          borderRadius: '8px',
          ease: 'none',
          scrollTrigger: { scrub: 0.6, start: 'top 86%', end: 'bottom 46%', trigger: frame },
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
      if (!window.matchMedia('(max-width: 720px)').matches) {
        gsap.to('.serviceLineOne', {
          xPercent: 12,
          ease: 'none',
          scrollTrigger: { scrub: true, start: 'top bottom', end: 'bottom top', trigger: '.portfolioServiceSummary' },
        })
        gsap.to('.serviceLineTwo', {
          xPercent: -12,
          ease: 'none',
          scrollTrigger: { scrub: true, start: 'top bottom', end: 'bottom top', trigger: '.portfolioServiceSummary' },
        })
        gsap.to('.serviceLineThree', {
          xPercent: 18,
          ease: 'none',
          scrollTrigger: { scrub: true, start: 'top bottom', end: 'bottom top', trigger: '.portfolioServiceSummary' },
        })
      }
      gsap.fromTo(
        '.aboutPortrait',
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.15,
          ease: 'power4.out',
          scrollTrigger: { start: 'top 78%', trigger: '.portfolioAboutAwwwards' },
        },
      )
      gsap.to('.cakeCutout, .ringStage, .studioScene, .clipFrame, .campaignHeroBottle, .videoPinFrame, .barberHeroBg img', {
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
      {showSplash && <SplashScreen />}
      {route === '/bakery-atelier' && <BakeryAtelier />}
      {route === '/luxury-rings' && <LuxuryRings />}
      {route === '/protein-caffeine' && <ProteinCaffeine />}
      {route === '/barbershop-studio' && <BarbershopStudio />}
      {!routes.includes(route as Route) && <PortfolioHome />}
    </div>
  )
}

export default App
