import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Mail,
  Menu,
  Phone,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitInquiry } from "@/lib/inquiry.functions";
import { projects } from "@/lib/projects";
import hero from "@/assets/hero.asset.json";
import crescent from "@/assets/crescent.asset.json";
import dream from "@/assets/dream.asset.json";
import oceancay from "@/assets/oceancay.asset.json";
import oceancay2 from "@/assets/oceancay2.asset.json";
import keybiscayne from "@/assets/keybiscayne.asset.json";

const socials = [
  ["Instagram", "https://www.instagram.com/genesis_interiors/"],
  ["LinkedIn", "https://www.linkedin.com/company/genesis-interiors-llc/"],
  ["Facebook", "https://www.facebook.com/GenesisInteriorsLLC#/"],
  ["YouTube", "https://www.youtube.com/channel/UCizFJ8o3C_lvOKTVKLN-qow/"],
  ["Houzz", "https://www.houzz.com/pro/genesisinteriors/genesis-interiors-llc/"],
  ["Pinterest", "https://www.pinterest.com/genesisinteriors/"],
  ["X", "https://x.com/Gen_Interiors/"],
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Genesis Interiors | Luxury Yacht & Residential Millwork" },
      {
        name: "description",
        content:
          "Italian-crafted bespoke millwork, superyacht interiors and luxury residential installations. Explore Genesis Interiors’ portfolio and request a private project consultation.",
      },
      { property: "og:title", content: "Genesis Interiors | Luxury Yacht & Residential Millwork" },
      {
        property: "og:description",
        content:
          "Traditional Italian craftsmanship meets engineering precision for superyachts and private estates. Discover our work and begin a private consultation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  { label: "Expertise", href: "#expertise" },
  { label: "Selected work", href: "#work" },
  { label: "Fit-Lock®", href: "#fitlock" },
  { label: "Project archive", href: "#archive" },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<keyof typeof projects>("Yacht interiors");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Yacht refit",
    projectName: "",
    message: "",
    website: "",
  });
  const filtered = useMemo(
    () =>
      projects[category].filter((p) =>
        `${p.name} ${p.length} ${p.year} ${p.location} ${p.collaborator}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [category, query],
  );
  const visible = showAll || query ? filtered : filtered.slice(0, 8);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setStatus("idle");
    try {
      await submitInquiry({
        data: {
          ...form,
          projectType: form.projectType as
            "Yacht new build" | "Yacht refit" | "Residence" | "Furniture" | "Other",
        },
      });
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        projectType: "Yacht refit",
        projectName: "",
        message: "",
        website: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorText(
        error instanceof Error
          ? error.message
          : "Your inquiry could not be sent. Please call or email us directly.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="bg-background text-foreground">
      <header className="site-header">
        <div className="site-header-inner">
          <a href="#top" className="wordmark" aria-label="Genesis Interiors, back to top">
            <span className="wordmark-main">GENESIS</span>
            <span className="wordmark-sub">I N T E R I O R S</span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <Button asChild className="nav-cta">
            <a href="#consultation">
              Private Consultation <ArrowUpRight size={15} />
            </a>
          </Button>
          <Button
            className="mobile-menu-button"
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
                <ArrowUpRight size={16} />
              </a>
            ))}
            <a href="#consultation" onClick={() => setMenuOpen(false)}>
              Private Consultation <ArrowUpRight size={16} />
            </a>
          </nav>
        )}
      </header>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <img
          className="hero-image"
          src={hero.url}
          alt="Custom woodwork and sculptural dining table aboard a Genesis Interiors yacht project"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-content page-width">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="eyebrow-line" /> FORT LAUDERDALE{" "}
              <span className="eyebrow-separator">/</span> VIAREGGIO
            </p>
            <h1 id="hero-title">
              Genesis <em>Interiors</em>
            </h1>
            <p className="hero-tagline">Luxury interiors for yachts & residences.</p>
            <p className="hero-description">
              Traditional Italian craftsmanship. Engineering precision. Bespoke spaces made to
              endure far beyond the ordinary.
            </p>
            <div className="hero-actions">
              <Button asChild size="lg">
                <a href="#consultation">
                  Discuss your project <ArrowUpRight size={17} />
                </a>
              </Button>
              <a className="text-link light" href="#work">
                Explore our work <ArrowDown size={17} />
              </a>
            </div>
          </div>
          <div className="hero-index">
            <span>01 / 04</span>
            <span className="hero-index-rule" />
            <span>THE ART OF WHAT'S POSSIBLE</span>
          </div>
        </div>
      </section>

      <section className="intro-band" aria-label="Genesis in brief">
        <div className="page-width intro-grid">
          <p className="eyebrow">AN INTERNATIONAL ATELIER</p>
          <p>
            From a singular piece of furniture to the interior of a 141-metre vessel, every
            commission begins with the same belief:{" "}
            <em>exceptional craft should be felt in every detail.</em>
          </p>
          <div className="intro-mark">
            G<span>®</span>
          </div>
        </div>
      </section>

      <section id="expertise" className="section expertise-section">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / OUR DISCIPLINES</p>
              <h2>
                Craft, <em>engineered.</em>
              </h2>
            </div>
            <p>
              Two traditions. One uncompromising standard. From concept and fabrication to final
              installation.
            </p>
          </div>
          <div className="service-grid">
            <article className="service-item">
              <span className="service-number">01</span>
              <div>
                <h3>
                  Superyacht interiors
                  <br />& refits
                </h3>
                <p>
                  Complete custom interiors for vessels from 48′ to over 462′. Mockups, fabrication,
                  disassembly, shipping and installation on board.
                </p>
              </div>
              <ArrowUpRight className="service-arrow" size={22} />
            </article>
            <article className="service-item">
              <span className="service-number">02</span>
              <div>
                <h3>
                  Residential
                  <br />
                  millwork
                </h3>
                <p>
                  Superyacht-level cabinetry, kitchens, home theaters and architectural woodwork for
                  distinguished homes across the US and Europe.
                </p>
              </div>
              <ArrowUpRight className="service-arrow" size={22} />
            </article>
            <article className="service-item">
              <span className="service-number">03</span>
              <div>
                <h3>
                  Bespoke
                  <br />
                  furniture
                </h3>
                <p>
                  One-of-a-kind pieces composed in fine wood veneers, hand-painted finishes, leather
                  and Italian marble.
                </p>
              </div>
              <ArrowUpRight className="service-arrow" size={22} />
            </article>
          </div>
        </div>
      </section>

      <section id="work" className="section work-section">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / SELECTED WORK</p>
              <h2>
                Made to <em>belong.</em>
              </h2>
            </div>
            <p>
              Distinctive environments, realized with the exacting eye of an artisan and the rigor
              of a manufacturer.
            </p>
          </div>
          <div className="work-grid">
            <figure className="project-figure project-figure-large">
              <div className="image-frame">
                <img src={dream.url} alt="Custom interior aboard M/Y Dream" loading="lazy" />
              </div>
              <figcaption>
                <span>
                  <strong>M/Y Dream</strong>
                  <small>YACHT INTERIOR · 106 M · 2018</small>
                </span>
                <ArrowUpRight size={20} />
              </figcaption>
            </figure>
            <figure className="project-figure">
              <div className="image-frame">
                <img
                  src={oceancay2.url}
                  alt="Crafted bedroom interior at Ocean Cay Villa"
                  loading="lazy"
                />
              </div>
              <figcaption>
                <span>
                  <strong>Ocean Cay Villa</strong>
                  <small>RESIDENTIAL · FLORIDA</small>
                </span>
                <ArrowUpRight size={20} />
              </figcaption>
            </figure>
            <figure className="project-figure">
              <div className="image-frame">
                <img
                  src={crescent.url}
                  alt="Detail of the custom interior aboard M/Y Crescent"
                  loading="lazy"
                />
              </div>
              <figcaption>
                <span>
                  <strong>M/Y Crescent</strong>
                  <small>YACHT INTERIOR · 50 M · 2021</small>
                </span>
                <ArrowUpRight size={20} />
              </figcaption>
            </figure>
            <figure className="project-figure">
              <div className="image-frame">
                <img
                  src={keybiscayne.url}
                  alt="Custom built-ins in a Key Biscayne residence"
                  loading="lazy"
                />
              </div>
              <figcaption>
                <span>
                  <strong>Key Biscayne Residence</strong>
                  <small>RESIDENTIAL · FLORIDA</small>
                </span>
                <ArrowUpRight size={20} />
              </figcaption>
            </figure>
          </div>
          <p className="work-note">
            Photography from Genesis Interiors’ own portfolio. Additional and confidential
            commissions are discussed privately.
          </p>
        </div>
      </section>

      <section id="fitlock" className="fitlock-section">
        <div className="page-width fitlock-grid">
          <div className="fitlock-visual">
            <img
              src={oceancay.url}
              alt="Ocean Cay Villa, a residential project by Genesis Interiors"
              loading="lazy"
            />
            <div className="fitlock-overlay">
              <span>BUILT TO FIT.</span>
              <span>BUILT TO LAST.</span>
            </div>
          </div>
          <div className="fitlock-copy">
            <p className="eyebrow">03 / THE ENGINEERING ADVANTAGE</p>
            <h2>
              Precision you can <em>feel.</em>
            </h2>
            <p>
              In our 22,000-square-foot Fort Lauderdale workshop, complex interiors can be
              pre-assembled and inspected before they reach the vessel or residence. Our facilities
              in Florida and Viareggio connect American engineering with generations of Italian
              making.
            </p>
            <div className="fitlock-detail">
              <span className="fitlock-detail-index">01 —</span>
              <div>
                <h3>Full-scale pre-assembly</h3>
                <p>Fit and finish checked in-house before final installation.</p>
              </div>
            </div>
            <div className="fitlock-detail">
              <span className="fitlock-detail-index">02 —</span>
              <div>
                <h3>The Fit-Lock® System</h3>
                <p>
                  Our patented pressure-panel assembly system enables access to ceiling, wall and
                  furniture panels for inspection and maintenance.
                </p>
              </div>
            </div>
            <a
              href="https://www.genesisinteriors.com/fitlock"
              className="text-link"
              target="_blank"
              rel="noreferrer"
            >
              Explore Fit-Lock® <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section id="archive" className="section archive-section">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow">04 / PROJECT ARCHIVE</p>
              <h2>
                A life’s work <em>at sea.</em>
              </h2>
            </div>
            <p>
              A selection of new builds, interiors and refits from the Genesis project record.
              Projects dated 2026 are listed as supplied, not represented here as completed.
            </p>
          </div>
          <div className="archive-controls">
            <div className="archive-tabs" role="tablist" aria-label="Project category">
              {(Object.keys(projects) as Array<keyof typeof projects>).map((key) => (
                <Button
                  key={key}
                  role="tab"
                  aria-selected={category === key}
                  variant="ghost"
                  className={category === key ? "archive-tab active" : "archive-tab"}
                  onClick={() => {
                    setCategory(key);
                    setShowAll(false);
                  }}
                >
                  {key} <span>{projects[key].length}</span>
                </Button>
              ))}
            </div>
            <label className="archive-search">
              <Search size={17} />
              <span className="sr-only">Search projects</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the archive"
              />
            </label>
          </div>
          <div className="archive-list" role="tabpanel">
            {visible.length ? (
              visible.map((p, index) => (
                <div className="archive-row" key={`${p.name}-${p.year}-${index}`}>
                  <span className="archive-row-index">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{p.name}</strong>
                  <span>{p.length}</span>
                  <span>
                    {p.year} · {p.location}
                  </span>
                  <span>{p.collaborator}</span>
                </div>
              ))
            ) : (
              <p className="archive-empty">No projects match your search.</p>
            )}
          </div>
          {!query && filtered.length > 8 && (
            <Button variant="outline" className="archive-more" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show fewer projects" : `View all ${filtered.length} projects`}{" "}
              <ChevronDown className={showAll ? "rotate-180" : ""} size={17} />
            </Button>
          )}
        </div>
      </section>

      <section id="consultation" className="consultation-section">
        <div className="page-width consultation-grid">
          <div className="consultation-copy">
            <p className="eyebrow">05 / BEGIN A CONVERSATION</p>
            <h2>
              Every great interior begins <em>in private.</em>
            </h2>
            <p>
              Tell us about your yacht, estate or one-of-a-kind commission. We can discuss
              engineering feasibility, pre-assembly, material sourcing and the possibilities for a
              custom 3D mockup as part of an initial consultation.
            </p>
            <div className="consultation-points">
              <span>
                <Check size={16} /> A conversation tailored to your brief
              </span>
              <span>
                <Check size={16} /> Direct access to our Fort Lauderdale team
              </span>
              <span>
                <Check size={16} /> Thoughtful planning from the outset
              </span>
            </div>
            <div className="direct-contact">
              <a href="tel:+19543169212">
                <Phone size={17} /> +1 (954) 316-9212
              </a>
              <a href="mailto:info@genesisinteriors.com">
                <Mail size={17} /> info@genesisinteriors.com
              </a>
            </div>
          </div>
          <div className="inquiry-panel">
            {status === "success" ? (
              <div className="success-state" role="status">
                <span className="success-icon">
                  <Check size={28} />
                </span>
                <h3>Thank you for reaching out.</h3>
                <p>
                  Your project inquiry has been received. For immediate assistance, please call our
                  Fort Lauderdale office.
                </p>
                <Button variant="outline" onClick={() => setStatus("idle")}>
                  Send another inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <p className="form-eyebrow">PRIVATE PROJECT INQUIRY</p>
                <h3>Tell us what you envision.</h3>
                <div className="form-grid">
                  <label>
                    YOUR NAME{" "}
                    <input
                      required
                      autoComplete="name"
                      maxLength={120}
                      minLength={2}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Full name"
                    />
                  </label>
                  <label>
                    EMAIL ADDRESS{" "}
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      maxLength={254}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@example.com"
                    />
                  </label>
                  <label>
                    PHONE{" "}
                    <input
                      type="tel"
                      autoComplete="tel"
                      maxLength={40}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Optional"
                    />
                  </label>
                  <label>
                    PROJECT TYPE{" "}
                    <select
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    >
                      <option>Yacht refit</option>
                      <option>Yacht new build</option>
                      <option>Residence</option>
                      <option>Furniture</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label className="form-full">
                    VESSEL OR PROPERTY{" "}
                    <input
                      maxLength={160}
                      value={form.projectName}
                      onChange={(e) => setForm({ ...form, projectName: e.target.value })}
                      placeholder="Name or location, if applicable"
                    />
                  </label>
                  <label className="form-full">
                    YOUR BRIEF{" "}
                    <textarea
                      required
                      minLength={20}
                      maxLength={4000}
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share the scope, timing, and what matters most to you."
                    />
                  </label>
                </div>
                <label className="honeypot" aria-hidden="true">
                  Website{" "}
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                  />
                </label>
                {status === "error" && (
                  <p className="form-error" role="alert">
                    {errorText}
                  </p>
                )}
                <Button type="submit" disabled={sending} className="form-submit">
                  {sending ? "Sending inquiry…" : "Request a private consultation"}{" "}
                  <ArrowUpRight size={17} />
                </Button>
                <p className="form-note">Your details are used only to respond to your inquiry.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="page-width">
          <div className="footer-top">
            <div>
              <div className="footer-wordmark">
                GENESIS <em>INTERIORS</em>
              </div>
              <p>Luxury interiors for yachts & residences.</p>
            </div>
            <a href="#top" className="back-top" aria-label="Back to top">
              <ArrowUpRight size={22} />
            </a>
          </div>
          <div className="footer-columns">
            <div>
              <p className="eyebrow">FORT LAUDERDALE</p>
              <address>
                4040 Southwest 30th Avenue
                <br />
                Fort Lauderdale, FL 33312, USA
              </address>
              <a href="https://maps.app.goo.gl/qfoS2Y7NrK65r8pC6/" target="_blank" rel="noreferrer">
                Get directions <ArrowUpRight size={14} />
              </a>
            </div>
            <div>
              <p className="eyebrow">THE GENESIS GROUP</p>
              <a href="https://www.genesisyachts.com" target="_blank" rel="noreferrer">
                Genesis Yachts <ArrowUpRight size={14} />
              </a>
              <a href="https://www.cantiereviareggio.com" target="_blank" rel="noreferrer">
                Cantiere Viareggio <ArrowUpRight size={14} />
              </a>
            </div>
            <div>
              <p className="eyebrow">FOLLOW THE WORK</p>
              <div className="social-list">
                {socials.map(([name, url]) => (
                  <a key={name} href={url} target="_blank" rel="noreferrer">
                    {name} <ArrowUpRight size={13} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Genesis Interiors</span>
            <span>Fort Lauderdale, Florida · Viareggio, Italy</span>
            <a href="https://www.genesisinteriors.com" target="_blank" rel="noreferrer">
              Official website <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
