import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Copy, Disc3 } from 'lucide-react';
import { Header } from './components/Header';
import { InquiryModal } from './components/InquiryModal';
import { ProjectModal } from './components/ProjectModal';
import {
  CAREER_TIMELINE,
  CREDENTIALS,
  EDUCATION_CREDENTIALS,
  METHOD_PHASES,
  PRACTICES,
  PROFILE,
  PROJECTS,
  SOCIAL_LINKS,
  SOUNDTRACK_PROFILE,
  STACK_GROUPS,
  type ProjectCategory,
  type ProjectItem,
} from './data/profileData';

const CATEGORIES: ProjectCategory[] = [
  'All Works',
  'Strategy & Web',
  'SaaS & Systems',
  'Engineering & NDT',
  'Creative',
];

function ProjectImage({ project }: { project: ProjectItem }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#0C1220] px-6 text-center">
        <span className="font-serif text-lg text-[#C9A24B]">{project.title}</span>
        <span className="text-xs text-[#6E7B91] mt-1">{project.category}</span>
      </div>
    );
  }

  return (
    <img
      src={project.image}
      alt={project.imageAlt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    />
  );
}

export function App() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All Works');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryContext, setInquiryContext] = useState<string | undefined>(undefined);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [coverFailed, setCoverFailed] = useState(false);

  const filteredProjects =
    activeCategory === 'All Works'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeCategory);

  const currentPhase = METHOD_PHASES[activePhase];

  const handleOpenInquiry = (context?: string) => {
    setInquiryContext(context);
    setInquiryOpen(true);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      setCopiedEmail(false);
    }
  };

  return (
    <div id="top" className="min-h-screen bg-[#080B12] text-[#F1F4F9]">
      <Header onOpenInquiry={() => handleOpenInquiry()} />

      <main className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* HERO SPLIT SECTION */}
        <section className="pt-14 pb-16 lg:pt-20 lg:pb-20 border-b border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: Editorial Hierarchy */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium tracking-wide text-[#C9A24B]">
                  {PROFILE.fullName} · {PROFILE.company}
                </p>

                <h1 className="mt-5 font-serif text-[clamp(2.35rem,4.2vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-[#F1F4F9]">
                  Solutions Strategist for problems left unsolved.
                </h1>

                <p className="mt-6 text-base sm:text-[17px] leading-relaxed text-[#A1ACBF] max-w-[54ch]">
                  {PROFILE.tagline} Across strategy, software engineering, visual direction, data &amp;
                  AI, and industrial NDT — the domain changes, while the method remains constant: read
                  the pattern, build the strategy, execute with discipline.
                </p>
              </div>

              <div className="mt-10">
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#works"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#080B12] bg-[#C9A24B] hover:bg-[#D8B562] rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Explore Selected Works</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleOpenInquiry()}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#E2E8F0] border border-white/[0.14] hover:border-[#C9A24B]/60 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Book Consulting Scope</span>
                  </button>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#7E8BA3]">
                  <span>{PROFILE.personality}</span>
                  <span aria-hidden="true">·</span>
                  <span>{PROFILE.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>Freelance &amp; Consulting</span>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Repository Cover Plate + Profile Dossier */}
            <div className="lg:col-span-6 flex">
              <div className="w-full bg-[#0F1420] border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col justify-between">
                <div className="relative bg-[#0B101D] border-b border-white/[0.08] aspect-[16/6.6] w-full overflow-hidden">
                  {!coverFailed ? (
                    <img
                      src={PROFILE.coverImage}
                      alt="SrChZ Solutions Strategist constellation cover: Engineering, Technology, Visual, Data and AI"
                      referrerPolicy="no-referrer"
                      onError={() => setCoverFailed(true)}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center px-6 text-center">
                      <span className="font-serif text-2xl font-semibold text-[#F1F4F9]">
                        Solutions Strategist
                      </span>
                      <span className="text-xs tracking-[0.2em] text-[#8FA8D6] mt-2">
                        ENGINEERING · TECHNOLOGY · VISUAL · DATA &amp; AI
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    <div>
                      <div className="text-xs text-[#6E7B91]">Identity</div>
                      <div className="text-[#ECEFF4] font-medium mt-0.5">{PROFILE.aliases}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#6E7B91]">Registered Entity</div>
                      <div className="text-[#ECEFF4] font-mono text-xs tabular-nums mt-1">
                        {PROFILE.cnpj}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[#6E7B91]">Academic Foundation</div>
                      <div className="text-[#CBD4E3] mt-0.5">{PROFILE.education}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#6E7B91]">Languages</div>
                      <div className="text-[#CBD4E3] mt-0.5">{PROFILE.languages}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
                    <p className="font-serif italic text-sm text-[#C9A24B] leading-snug">
                      “{PROFILE.motto}”
                    </p>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#CBD4E3] hover:text-[#F1F4F9] border border-white/[0.1] hover:border-[#C9A24B]/60 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#C9A24B]" />
                          <span>Email Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width 4-column Credential Strip below the Hero Split */}
          <div className="mt-14 pt-10 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {CREDENTIALS.map((metric) => (
              <div key={metric.label} className="space-y-1.5">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono tabular-nums text-2xl sm:text-[26px] font-semibold text-[#F1F4F9] tracking-tight">
                    {metric.value}
                  </span>
                  <span className="text-xs font-medium text-[#C9A24B]">{metric.unit}</span>
                </div>
                <p className="text-xs leading-relaxed text-[#8E9BB0]">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 01. IDENTITY & METHOD */}
        <section id="identity" className="py-20 lg:py-24 border-b border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#F1F4F9]">
                01. Identity &amp; Philosophy
              </h2>
              <p className="text-[15px] leading-relaxed text-[#A1ACBF]">
                Founder of <strong className="text-[#F1F4F9] font-semibold">SrChZ Technologies</strong>{' '}
                — a formally registered practice, not a side project. The name comes from{' '}
                <em className="font-serif text-[#DCE2EC]">The Chaos Order</em>: every chaos follows a
                pattern, and the work is to isolate that pattern and turn it into a reliable system.
              </p>
              <p className="text-[15px] leading-relaxed text-[#98A4B8]">
                <strong className="text-[#ECEFF4] font-medium">WebSrChZ</strong> reads “Web Chaos”;{' '}
                <strong className="text-[#ECEFF4] font-medium">SrChZ Technologies</strong> reads “Chaos
                Technologies.” Trained in both Computer Engineering and Psychoanalysis, I think in
                systems rather than isolated tasks. Job titles are tools — what I deliver is the
                solution.
              </p>
            </div>

            {/* Interactive Method Stepper */}
            <div className="lg:col-span-7 bg-[#0F1420] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <span className="text-xs font-medium text-[#8E9BB0]">Operating Method</span>
                <div
                  className="inline-flex items-center gap-1 p-1 bg-[#080B12] rounded-lg border border-white/[0.06]"
                  role="tablist"
                  aria-label="Operating method phases"
                >
                  {METHOD_PHASES.map((phase, idx) => (
                    <button
                      key={phase.step}
                      type="button"
                      role="tab"
                      aria-selected={activePhase === idx}
                      onClick={() => setActivePhase(idx)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        activePhase === idx
                          ? 'bg-[#C9A24B] text-[#080B12] font-semibold'
                          : 'text-[#A1ACBF] hover:text-[#F1F4F9]'
                      }`}
                    >
                      {phase.step}. {phase.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-7" role="tabpanel">
                <div className="font-mono tabular-nums text-xs text-[#C9A24B]">
                  Phase {currentPhase.step} of 03
                </div>
                <h3 className="mt-2 font-serif text-2xl sm:text-[28px] font-semibold text-[#F1F4F9] tracking-tight">
                  {currentPhase.headline}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-[#A1ACBF] max-w-[60ch]">
                  {currentPhase.description}
                </p>
                <div className="mt-6 pt-5 border-t border-white/[0.06] text-xs font-mono text-[#8E9BB0]">
                  Deliverable focus: <span className="text-[#DCE2EC]">{currentPhase.output}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02. PRACTICE AREAS */}
        <section id="practices" className="py-20 lg:py-24 border-b border-white/[0.08]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#F1F4F9]">
                02. What I Solve
              </h2>
              <p className="mt-3 text-base text-[#A1ACBF] max-w-[58ch]">
                From digital software architecture to industrial ultrasonic inspection — the domain does
                not limit the diagnostic rigor.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleOpenInquiry('Multidisciplinary Advisory')}
              className="self-start md:self-auto text-sm font-medium text-[#C9A24B] hover:text-[#D8B562] inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Request a root-cause assessment</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {PRACTICES.map((practice) => (
              <article
                key={practice.index}
                className="pt-6 border-t border-white/[0.12] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#6E7B91] font-mono tabular-nums">
                    <span>{practice.index}</span>
                    <span className="text-[#C9A24B] font-sans">{practice.scope}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#F1F4F9] tracking-tight">
                    {practice.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#98A4B8]">
                    {practice.description}
                  </p>
                </div>

                <ul className="mt-6 pt-5 border-t border-white/[0.06] space-y-2 text-xs text-[#CBD4E3]">
                  {practice.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2">
                      <span className="text-[#C9A24B]" aria-hidden="true">
                        ·
                      </span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* 03. SELECTED WORKS */}
        <section id="works" className="py-20 lg:py-24 border-b border-white/[0.08]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#F1F4F9]">
                03. Selected Works
              </h2>
              <p className="mt-3 text-base text-[#A1ACBF] max-w-[58ch]">
                Deployed web hubs, client SaaS portals, published ultrasonic NDT engineering literature,
                and interactive archives. Select any work to inspect its architecture.
              </p>
            </div>

            {/* Interactive Category Filter Buttons */}
            <div
              className="flex flex-wrap items-center gap-1 p-1 bg-[#0F1420] border border-white/[0.08] rounded-lg self-start lg:self-auto"
              role="group"
              aria-label="Filter projects by discipline"
            >
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeCategory === category
                      ? 'bg-[#C9A24B] text-[#080B12] font-semibold'
                      : 'text-[#A1ACBF] hover:text-[#F1F4F9]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => setSelectedProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Inspect case study: ${project.title}`}
                className="group bg-[#0F1420] border border-white/[0.08] hover:border-[#C9A24B]/50 rounded-2xl overflow-hidden flex flex-col transition-colors cursor-pointer"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#080B12] border-b border-white/[0.06]">
                  <ProjectImage project={project} />
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4 text-xs text-[#8E9BB0]">
                      <span>
                        <span className="text-[#C9A24B]">{project.category}</span>
                        <span aria-hidden="true"> · </span>
                        <span className="font-mono tabular-nums">{project.year}</span>
                      </span>
                      {project.hasSoundPathTool && (
                        <span className="text-xs font-mono text-[#CBD4E3]">
                          Includes UT Calculator
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 font-serif text-xl sm:text-2xl font-semibold text-[#F1F4F9] group-hover:text-[#C9A24B] transition-colors tracking-tight">
                      {project.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-[#98A4B8]">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between gap-4">
                    <div className="text-xs font-mono text-[#6E7B91] truncate">
                      {project.stack.join(' · ')}
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#F1F4F9] group-hover:text-[#C9A24B] transition-colors whitespace-nowrap shrink-0">
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 04. TRAJECTORY, EDUCATION & STACK */}
        <section id="trajectory" className="py-20 lg:py-24 border-b border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
            {/* Chronological Background */}
            <div className="lg:col-span-7">
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#F1F4F9]">
                04. Trajectory &amp; Stack
              </h2>
              <p className="mt-3 text-base text-[#A1ACBF] max-w-[54ch]">
                Started early — IT at 14, first client revenue from design and customer experience
                before 20, now bridging industrial engineering and digital strategy.
              </p>

              <div className="mt-10 divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
                {CAREER_TIMELINE.map((entry) => (
                  <div
                    key={`${entry.period}-${entry.organization}`}
                    className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
                  >
                    <div className="sm:col-span-4 font-mono tabular-nums text-xs text-[#C9A24B]">
                      {entry.period}
                    </div>
                    <div className="sm:col-span-8">
                      <div className="text-base font-semibold text-[#F1F4F9]">
                        {entry.organization}
                        <span className="text-[#6E7B91] font-normal"> — {entry.role}</span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#98A4B8]">
                        {entry.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Technical Stack Index */}
            <div className="lg:col-span-5 space-y-10">
              <div>
                <h3 className="text-sm font-semibold text-[#F1F4F9] tracking-tight pb-3 border-b border-white/[0.08]">
                  Education &amp; Certifications
                </h3>
                <div className="mt-5 space-y-5">
                  {EDUCATION_CREDENTIALS.map((edu) => (
                    <div key={edu.credential}>
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-sm font-semibold text-[#ECEFF4]">
                          {edu.credential}
                        </span>
                        <span className="text-xs text-[#C9A24B] whitespace-nowrap shrink-0">
                          {edu.institution}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-[#8E9BB0]">{edu.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#F1F4F9] tracking-tight pb-3 border-b border-white/[0.08]">
                  Technical &amp; Operational Stack
                </h3>
                <div className="mt-5 space-y-5">
                  {STACK_GROUPS.map((group) => (
                    <div key={group.group}>
                      <div className="text-xs text-[#6E7B91] mb-1.5">{group.group}</div>
                      <div className="text-sm font-mono text-[#CBD4E3] leading-relaxed">
                        {group.items.join(' · ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05. SOUNDTRACK & AVAILABILITY */}
        <section className="py-20 lg:py-24 border-b border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Consulting CTA Block */}
            <div className="lg:col-span-7 bg-[#0F1420] border border-white/[0.08] rounded-2xl p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium text-[#C9A24B]">Available for Consulting</p>
                <h2 className="mt-3 font-serif text-3xl sm:text-[34px] font-semibold tracking-tight text-[#F1F4F9]">
                  Got something stuck that no one can solve?
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-[#A1ACBF] max-w-[54ch]">
                  Open to freelance and advisory mandates across strategy, technology, visual
                  production, and data &amp; AI. If the problem requires someone who thinks deeply
                  before executing, let us define the root cause together.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleOpenInquiry()}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#080B12] bg-[#C9A24B] hover:bg-[#D8B562] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Start Inquiry</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-sm font-mono text-[#CBD4E3] hover:text-[#C9A24B] transition-colors"
                >
                  {PROFILE.email}
                </a>
              </div>
            </div>

            {/* Musical Biography / Sonic Profile */}
            <div className="lg:col-span-5 bg-[#0F1420] border border-white/[0.08] rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-[#8E9BB0]">
                  <span className="inline-flex items-center gap-2 text-[#C9A24B] font-medium">
                    <Disc3 className="w-4 h-4" aria-hidden="true" />
                    <span>Soundtrack &amp; Vibe</span>
                  </span>
                  <span className="font-mono tabular-nums">
                    {SOUNDTRACK_PROFILE.likedSongs} tracks
                  </span>
                </div>

                <div className="mt-6 space-y-4 text-sm">
                  <div>
                    <div className="text-xs text-[#6E7B91]">On Rotation</div>
                    <div className="text-[#F1F4F9] font-medium mt-0.5">
                      {SOUNDTRACK_PROFILE.nowPlaying}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#6E7B91]">Core Genres</div>
                    <div className="text-[#CBD4E3] mt-0.5">
                      {SOUNDTRACK_PROFILE.genres.join(' · ')}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#6E7B91]">Recurring Artists</div>
                    <div className="text-[#CBD4E3] mt-0.5">
                      {SOUNDTRACK_PROFILE.artists.join(' · ')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 pt-5 border-t border-white/[0.08]">
                <a
                  href={SOUNDTRACK_PROFILE.archiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#C9A24B] hover:text-[#D8B562] transition-colors whitespace-nowrap"
                >
                  <span>Open Musical Biography</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* EPIGRAPH */}
        <section className="py-16 text-center">
          <blockquote className="max-w-2xl mx-auto">
            <p className="font-serif italic text-lg sm:text-xl text-[#CBD4E3] leading-relaxed">
              “{PROFILE.epigraph}”
            </p>
            <footer className="mt-3 text-xs font-mono text-[#7E8BA3]">
              — {PROFILE.epigraphSource}
            </footer>
          </blockquote>
        </section>
      </main>

      {/* QUIET EDITORIAL FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#06080E]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-serif text-base font-semibold text-[#F1F4F9]">
              {PROFILE.company}
            </div>
            <div className="text-xs text-[#6E7B91] mt-1 font-mono tabular-nums">
              {PROFILE.fullName} · {PROFILE.cnpj}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#98A4B8]">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="hover:text-[#C9A24B] transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquireAbout={(title) => handleOpenInquiry(title)}
      />

      <InquiryModal
        isOpen={inquiryOpen}
        initialContext={inquiryContext}
        onClose={() => setInquiryOpen(false)}
      />
    </div>
  );
}

export default App;
