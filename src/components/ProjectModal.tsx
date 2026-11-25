import { useEffect, useState } from 'react';
import { ArrowUpRight, Calculator, X } from 'lucide-react';
import type { ProjectItem } from '../data/profileData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquireAbout: (projectTitle: string) => void;
}

const PRESET_ANGLES = [45, 60, 70];

function SoundPathCalculator() {
  const [thicknessMm, setThicknessMm] = useState<number>(20);
  const [angleDeg, setAngleDeg] = useState<number>(60);

  const safeThickness = Math.max(1, Math.min(250, Number.isFinite(thicknessMm) ? thicknessMm : 20));
  const safeAngle = Math.max(30, Math.min(80, Number.isFinite(angleDeg) ? angleDeg : 60));

  const radians = (safeAngle * Math.PI) / 180;
  const halfSkipSoundPath = safeThickness / Math.cos(radians);
  const fullSkipSoundPath = halfSkipSoundPath * 2;
  const halfSkipSurface = safeThickness * Math.tan(radians);
  const fullSkipSurface = halfSkipSurface * 2;

  // Normalized coordinates for SVG V-path beam schematic
  const plateTop = 36;
  const plateBottom = 116;
  const startX = 36;
  const span = Math.min(210, Math.max(70, (halfSkipSurface / safeThickness) * 92));
  const bounceX = startX + span;
  const fullSkipX = startX + span * 2;

  return (
    <div className="mt-8 pt-8 border-t border-white/[0.08]">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <h4 className="text-base font-semibold text-[#F1F4F9] flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#C9A24B]" aria-hidden="true" />
            <span>Ultrasonic Sound Path Calculator</span>
          </h4>
          <p className="text-xs text-[#8E9BB0] mt-1">
            Interactive UT Level II shear-wave trigonometry for weld inspection planning.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="ut-thickness"
              className="block text-xs font-medium text-[#A1ACBF] mb-1.5"
            >
              Wall Thickness (mm)
            </label>
            <input
              id="ut-thickness"
              type="number"
              min={1}
              max={250}
              step={1}
              value={thicknessMm}
              onChange={(e) => setThicknessMm(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-[#080B12] border border-white/[0.12] rounded-lg text-sm font-mono tabular-nums text-[#F1F4F9] focus:border-[#C9A24B] focus:outline-none"
            />
          </div>

          <div>
            <span className="block text-xs font-medium text-[#A1ACBF] mb-1.5">
              Probe Refracted Angle (°)
            </span>
            <div className="flex items-center gap-2">
              {PRESET_ANGLES.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAngleDeg(preset)}
                  className={`px-3.5 py-2 text-xs font-mono tabular-nums rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    angleDeg === preset
                      ? 'bg-[#C9A24B] text-[#080B12] font-semibold'
                      : 'bg-[#080B12] text-[#A1ACBF] border border-white/[0.1] hover:text-[#F1F4F9]'
                  }`}
                >
                  {preset}°
                </button>
              ))}
              <input
                aria-label="Custom refracted angle in degrees"
                type="number"
                min={30}
                max={80}
                value={angleDeg}
                onChange={(e) => setAngleDeg(Number(e.target.value))}
                className="w-20 px-3 py-2 bg-[#080B12] border border-white/[0.12] rounded-lg text-xs font-mono tabular-nums text-[#F1F4F9] focus:border-[#C9A24B] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/[0.06]">
            <div>
              <div className="text-xs text-[#6E7B91]">Half Skip Path (S₁)</div>
              <div className="text-lg font-mono tabular-nums font-medium text-[#F1F4F9] mt-0.5">
                {halfSkipSoundPath.toFixed(1)} mm
              </div>
            </div>
            <div>
              <div className="text-xs text-[#6E7B91]">Full Skip Path (S₂)</div>
              <div className="text-lg font-mono tabular-nums font-medium text-[#C9A24B] mt-0.5">
                {fullSkipSoundPath.toFixed(1)} mm
              </div>
            </div>
            <div>
              <div className="text-xs text-[#6E7B91]">Half Skip Surface</div>
              <div className="text-base font-mono tabular-nums text-[#CBD4E3] mt-0.5">
                {halfSkipSurface.toFixed(1)} mm
              </div>
            </div>
            <div>
              <div className="text-xs text-[#6E7B91]">Full Skip Surface</div>
              <div className="text-base font-mono tabular-nums text-[#CBD4E3] mt-0.5">
                {fullSkipSurface.toFixed(1)} mm
              </div>
            </div>
          </div>
        </div>

        {/* Acoustic Beam V-Path Diagram */}
        <div className="bg-[#080B12] border border-white/[0.08] rounded-xl p-4">
          <div className="text-xs text-[#8E9BB0] mb-2 flex justify-between font-mono tabular-nums">
            <span>V-Path Beam Geometry</span>
            <span>θ = {safeAngle}° · t = {safeThickness} mm</span>
          </div>
          <svg
            viewBox="0 0 460 150"
            className="w-full h-36"
            role="img"
            aria-label={`Ultrasonic beam path diagram for ${safeThickness}mm plate at ${safeAngle} degrees`}
          >
            {/* Steel specimen cross-section */}
            <rect
              x="16"
              y={plateTop}
              width="428"
              height={plateBottom - plateTop}
              fill="#111827"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="1"
            />
            {/* Transducer wedge */}
            <rect
              x={startX - 16}
              y={plateTop - 16}
              width="32"
              height="16"
              rx="2"
              fill="#C9A24B"
            />
            {/* First leg (Half skip) */}
            <line
              x1={startX}
              y1={plateTop}
              x2={Math.min(436, bounceX)}
              y2={plateBottom}
              stroke="#C9A24B"
              strokeWidth="2"
            />
            {/* Second leg (Full skip) */}
            <line
              x1={Math.min(436, bounceX)}
              y1={plateBottom}
              x2={Math.min(436, fullSkipX)}
              y2={plateTop}
              stroke="#8FA8D6"
              strokeWidth="2"
              strokeDasharray="5 4"
            />
            {/* Reflection & surface nodes */}
            <circle cx={Math.min(436, bounceX)} cy={plateBottom} r="3.5" fill="#C9A24B" />
            <circle cx={Math.min(436, fullSkipX)} cy={plateTop} r="3.5" fill="#8FA8D6" />

            <text x="20" y="138" fill="#8E9BB0" fontSize="11" fontFamily="JetBrains Mono, monospace">
              1st Leg: {halfSkipSoundPath.toFixed(1)}mm
            </text>
            <text
              x="230"
              y="138"
              fill="#8FA8D6"
              fontSize="11"
              fontFamily="JetBrains Mono, monospace"
            >
              Full Skip: {fullSkipSurface.toFixed(1)}mm
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

export function ProjectModal({ project, onClose, onInquireAbout }: ProjectModalProps) {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0F1420] border border-white/[0.1] rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar inside modal */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-[#0F1420]/95 backdrop-blur-md border-b border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs text-[#8E9BB0] truncate">
            <span className="text-[#C9A24B] font-medium">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{project.year}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#CBD4E3] hover:text-[#F1F4F9] hover:bg-white/[0.06] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero image */}
        <div className="aspect-[16/9] w-full bg-[#080B12] overflow-hidden border-b border-white/[0.08]">
          {!imgFailed ? (
            <img
              src={project.image}
              alt={project.imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#0C1220] px-8 text-center">
              <span className="font-serif text-xl text-[#C9A24B]">{project.title}</span>
            </div>
          )}
        </div>

        {/* Monograph Body */}
        <div className="p-6 sm:p-8">
          <h3
            id="project-modal-title"
            className="font-serif text-2xl sm:text-3xl font-semibold text-[#F1F4F9] tracking-tight"
          >
            {project.title}
          </h3>
          <p className="text-sm text-[#C9A24B] mt-1.5">{project.subtitle}</p>

          <p className="text-[15px] leading-relaxed text-[#CBD4E3] mt-6">{project.summary}</p>
          <p className="text-[15px] leading-relaxed text-[#98A4B8] mt-4">
            {project.architectureNote}
          </p>

          {/* Deliverables */}
          <div className="mt-7 pt-6 border-t border-white/[0.08]">
            <h4 className="text-xs font-medium text-[#8E9BB0] mb-3">Key Deliverables</h4>
            <ul className="space-y-2 text-sm text-[#DCE2EC]">
              {project.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-[#C9A24B] select-none" aria-hidden="true">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack metadata — unboxed text */}
          <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-[#8E9BB0]">
            {project.stack.map((tech, idx) => (
              <span key={tech} className="inline-flex items-center gap-2.5">
                {idx > 0 && <span aria-hidden="true">·</span>}
                <span>{tech}</span>
              </span>
            ))}
          </div>

          {/* Interactive UT Sound Path tool when viewing Ultrassom Nível II */}
          {project.hasSoundPathTool && <SoundPathCalculator />}

          {/* Modal Actions */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#080B12] bg-[#C9A24B] hover:bg-[#D8B562] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>Visit {project.urlLabel}</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => {
                const title = project.title;
                onClose();
                onInquireAbout(title);
              }}
              className="px-4 py-2.5 text-sm font-medium text-[#DCE2EC] border border-white/[0.12] hover:border-[#C9A24B]/60 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Discuss a Similar Solution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
