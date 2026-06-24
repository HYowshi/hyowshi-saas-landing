import './App.css'

const features = [
  'Responsive React sections for desktop, tablet, and mobile',
  'Conversion-focused copy blocks with clear calls to action',
  'SEO-friendly structure and fast Vite production build',
]

const services = [
  {
    title: 'Landing Pages',
    body: 'Clean hero sections, trust blocks, pricing, FAQ, forms, and launch-ready layouts.',
  },
  {
    title: 'UI Fixes',
    body: 'Spacing, typography, responsiveness, broken layouts, and cross-browser polish.',
  },
  {
    title: 'Frontend Builds',
    body: 'React components from brief, reference site, or Figma-style direction.',
  },
]

function App() {
  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Harashi Yowshi portfolio home">
          HY
        </a>
        <div className="navLinks">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">React frontend developer</p>
          <h1>Fast, polished landing pages for founders and small teams.</h1>
          <p className="lead">
            I build responsive React websites with clean code, strong visual hierarchy,
            and practical handoff through GitHub.
          </p>
          <div className="heroActions">
            <a className="button primary" href="mailto:HarashiYowshi@gmail.com">
              Hire Harashi
            </a>
            <a className="button secondary" href="https://github.com/HYowshi">
              View GitHub
            </a>
          </div>
        </div>

        <aside className="proofPanel" aria-label="Project highlights">
          <div>
            <span className="metric">3-5d</span>
            <span className="label">typical landing page delivery</span>
          </div>
          <div>
            <span className="metric">React</span>
            <span className="label">Vite, TypeScript, HTML, CSS</span>
          </div>
          <div>
            <span className="metric">GitHub</span>
            <span className="label">clean repo, README, deployment notes</span>
          </div>
        </aside>
      </section>

      <section className="featureStrip" aria-label="Capabilities">
        {features.map((feature) => (
          <p key={feature}>{feature}</p>
        ))}
      </section>

      <section className="section" id="services">
        <div className="sectionHeader">
          <p className="eyebrow">What I can deliver</p>
          <h2>Focused frontend work clients can review quickly.</h2>
        </div>
        <div className="serviceGrid">
          {services.map((service) => (
            <article className="serviceCard" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section work" id="work">
        <div className="sectionHeader">
          <p className="eyebrow">Sample project</p>
          <h2>Modern SaaS MVP landing page.</h2>
          <p>
            This repository is a reusable example for freelance proposals: fast setup,
            responsive layout, CTA sections, and clear handoff instructions.
          </p>
        </div>
        <div className="mockup" aria-label="Landing page preview">
          <div className="mockupBar">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="mockupBody">
            <div className="mockHero"></div>
            <div className="mockLines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </section>

      <section className="cta" id="contact">
        <div>
          <p className="eyebrow">Available for small fixed-price projects</p>
          <h2>Need a clean landing page or frontend fix?</h2>
        </div>
        <a className="button primary" href="mailto:HarashiYowshi@gmail.com">
          Contact Harashi
        </a>
      </section>
    </main>
  )
}

export default App
