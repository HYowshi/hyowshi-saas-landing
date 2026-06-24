import { Suspense, lazy } from 'react'
import './App.css'

const HeroScene = lazy(() => import('./HeroScene'))

const projects = [
  {
    title: 'Luxury Product Experience',
    type: 'Premium ecommerce concept',
    body: 'High-end product storytelling with cinematic hero sections, conversion-focused CTA flow, responsive product detail blocks, and room for WebGL or video.',
    stack: ['React', 'TypeScript', 'Motion', '3D-ready UI'],
  },
  {
    title: 'SaaS Landing System',
    type: 'Startup MVP landing page',
    body: 'Fast landing page structure for founders: hero, feature proof, pricing-ready sections, FAQ, contact CTA, clean GitHub handoff, and production build.',
    stack: ['React', 'Vite', 'SEO basics', 'GitHub Pages'],
  },
  {
    title: 'Frontend Rescue Sprint',
    type: 'Bug fix and polish',
    body: 'Focused repair for broken React pages, layout issues, mobile bugs, build errors, unused components, and maintainability cleanup.',
    stack: ['Debugging', 'Responsive CSS', 'Build checks', 'README'],
  },
]

const skills = [
  ['Frontend', 'React, TypeScript, JavaScript, HTML, CSS'],
  ['Visual UI', 'Responsive layout, typography, spacing, component polish'],
  ['Effects', 'WebGL/Three.js, CSS animation, transitions, micro-interactions'],
  ['Delivery', 'GitHub repo, README, deployment notes, clean commits'],
  ['Quality', 'Build checks, linting, accessibility basics, performance basics'],
  ['Tools', 'Vite, Git, GitHub CLI, Vercel/Netlify/GitHub Pages'],
]

const process = [
  'Clarify the business goal and visible deliverables.',
  'Build the core product first, then add premium polish.',
  'Verify responsive behavior, build output, and handoff docs.',
  'Deliver a clean repo, demo link, and concise client update.',
]

function App() {
  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Harashi Yowshi portfolio home">
          HY
        </a>
        <div className="navLinks">
          <a href="#projects">Products</a>
          <a href="#skills">Skills</a>
          <a href="#technical">Technical</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">Frontend developer for premium web experiences</p>
          <h1>React websites that look sharp, move well, and ship clean.</h1>
          <p className="lead">
            I build portfolio-worthy landing pages, product sites, and frontend fixes
            with polished UI, responsive behavior, WebGL-ready visuals, and professional
            GitHub handoff.
          </p>
          <div className="heroActions">
            <a className="button primary" href="mailto:HarashiYowshi@gmail.com">
              Contact Harashi
            </a>
            <a className="button secondary" href="https://github.com/HYowshi">
              GitHub Profile
            </a>
          </div>
          <div className="heroStats" aria-label="Portfolio strengths">
            <span>React + TypeScript</span>
            <span>3D/WebGL capable</span>
            <span>Deploy-ready repos</span>
          </div>
        </div>

        <div className="heroVisual" aria-label="Animated 3D frontend showcase">
          <Suspense fallback={<div className="sceneFallback" aria-hidden="true" />}>
            <HeroScene />
          </Suspense>
          <div className="floatingCard cardTop">
            <strong>Build</strong>
            <span>production-ready React</span>
          </div>
          <div className="floatingCard cardBottom">
            <strong>Polish</strong>
            <span>motion, layout, speed</span>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="Capabilities">
        <span>Landing pages</span>
        <span>Luxury product sites</span>
        <span>Frontend bug fixes</span>
        <span>Responsive rebuilds</span>
        <span>Three.js/WebGL effects</span>
      </section>

      <section className="section" id="projects">
        <div className="sectionHeader">
          <p className="eyebrow">Products and project types</p>
          <h2>Work that gives clients something they can actually show.</h2>
          <p>
            Each project is shaped around the client outcome: credibility, conversion,
            clear browsing, or a repaired frontend that is easier to maintain.
          </p>
        </div>
        <div className="projectGrid">
          {projects.map((project) => (
            <article className="projectCard" key={project.title}>
              <div className="projectPreview" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p className="projectType">{project.type}</p>
              <h3>{project.title}</h3>
              <p>{project.body}</p>
              <div className="tagList">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split" id="skills">
        <div className="sectionHeader">
          <p className="eyebrow">Skills</p>
          <h2>Clear technical coverage, not vague promises.</h2>
          <p>
            I focus on the stack clients request most often for small web projects:
            React builds, UI polish, responsive behavior, and clean delivery.
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

      <section className="technical" id="technical">
        <div className="technicalInner">
          <div>
            <p className="eyebrow">Technical workflow</p>
            <h2>From brief to demo link without messy handoff.</h2>
          </div>
          <ol className="processList">
            {process.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div>
          <p className="eyebrow">Available for fixed-scope frontend work</p>
          <h2>Send the brief. I will turn it into a clean, reviewable web product.</h2>
          <p>
            Best fit: landing pages, portfolio websites, premium product pages, React
            UI fixes, and frontend cleanup tasks.
          </p>
        </div>
        <div className="contactPanel">
          <a href="mailto:HarashiYowshi@gmail.com">HarashiYowshi@gmail.com</a>
          <a href="https://github.com/HYowshi">github.com/HYowshi</a>
          <a href="https://hyowshi.github.io/hyowshi-saas-landing/">
            Live portfolio demo
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
