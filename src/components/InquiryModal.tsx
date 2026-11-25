import { useEffect, useState } from 'react';
import { Check, Copy, Mail, X } from 'lucide-react';
import { PROFILE } from '../data/profileData';

interface InquiryModalProps {
  isOpen: boolean;
  initialContext?: string;
  onClose: () => void;
}

const DOMAINS = [
  'Strategy & Analysis',
  'Technology & SaaS',
  'Visual Production',
  'Data, AI & NDT Engineering',
];

export function InquiryModal({ isOpen, initialContext, onClose }: InquiryModalProps) {
  const [selectedDomain, setSelectedDomain] = useState<string>(DOMAINS[0]);
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [problem, setProblem] = useState('');
  const [copiedState, setCopiedState] = useState<'idle' | 'email' | 'brief'>('idle');

  useEffect(() => {
    if (initialContext) {
      setProblem(`Interested in discussing a solution related to ${initialContext}.`);
    }
  }, [initialContext]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formattedBrief = [
    `Domain: ${selectedDomain}`,
    `From: ${name || 'Prospective Client'}${organization ? ` (${organization})` : ''}`,
    '',
    'Problem / Context:',
    problem || 'Looking to discuss a consulting or freelance engagement.',
  ].join('\n');

  const mailtoHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    `[SrChZ Inquiry] ${selectedDomain} — ${name || 'New Project'}`
  )}&body=${encodeURIComponent(formattedBrief)}`;

  const handleCopy = async (text: string, type: 'email' | 'brief') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedState(type);
      window.setTimeout(() => setCopiedState('idle'), 2400);
    } catch {
      setCopiedState('idle');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#0F1420] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
          <div>
            <h3 id="inquiry-modal-title" className="font-serif text-xl font-semibold text-[#F1F4F9]">
              Start a Consulting Inquiry
            </h3>
            <p className="text-xs text-[#8E9BB0] mt-0.5">
              {PROFILE.company} · {PROFILE.cnpj}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close inquiry modal"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#CBD4E3] hover:text-[#F1F4F9] hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <span className="block text-xs font-medium text-[#A1ACBF] mb-2">Practice Domain</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DOMAINS.map((domain) => (
                <button
                  key={domain}
                  type="button"
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-3.5 py-2.5 text-left text-xs font-medium rounded-lg transition-colors whitespace-nowrap truncate cursor-pointer ${
                    selectedDomain === domain
                      ? 'bg-[#C9A24B] text-[#080B12] font-semibold'
                      : 'bg-[#080B12] text-[#CBD4E3] border border-white/[0.08] hover:border-white/[0.2]'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="inquiry-name" className="block text-xs font-medium text-[#A1ACBF] mb-1.5">
                Your Name
              </label>
              <input
                id="inquiry-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Rivera"
                className="w-full px-3.5 py-2.5 bg-[#080B12] border border-white/[0.1] rounded-lg text-sm text-[#F1F4F9] placeholder:text-[#5B677D] focus:border-[#C9A24B] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="inquiry-org" className="block text-xs font-medium text-[#A1ACBF] mb-1.5">
                Company / Team
              </label>
              <input
                id="inquiry-org"
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Optional"
                className="w-full px-3.5 py-2.5 bg-[#080B12] border border-white/[0.1] rounded-lg text-sm text-[#F1F4F9] placeholder:text-[#5B677D] focus:border-[#C9A24B] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="inquiry-problem" className="block text-xs font-medium text-[#A1ACBF] mb-1.5">
              What problem is stuck?
            </label>
            <textarea
              id="inquiry-problem"
              rows={4}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Outline the bottleneck, technical context, or strategic goal..."
              className="w-full px-3.5 py-2.5 bg-[#080B12] border border-white/[0.1] rounded-lg text-sm text-[#F1F4F9] placeholder:text-[#5B677D] focus:border-[#C9A24B] focus:outline-none resize-none"
            />
          </div>

          {/* Direct email utility */}
          <div className="flex items-center justify-between gap-3 px-4 py-3 bg-[#080B12] border border-white/[0.08] rounded-lg">
            <div className="min-w-0">
              <div className="text-[11px] text-[#6E7B91]">Direct Email</div>
              <div className="text-xs font-mono text-[#DCE2EC] truncate">{PROFILE.email}</div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(PROFILE.email, 'email')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#CBD4E3] hover:text-[#F1F4F9] border border-white/[0.1] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedState === 'email' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <a
              href={mailtoHref}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#080B12] bg-[#C9A24B] hover:bg-[#D8B562] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>Open Email Brief</span>
            </a>

            <button
              type="button"
              onClick={() => handleCopy(formattedBrief, 'brief')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#DCE2EC] border border-white/[0.12] hover:border-[#C9A24B]/60 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedState === 'brief' ? (
                <>
                  <Check className="w-4 h-4 text-[#C9A24B]" />
                  <span>Brief Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Formatted Brief</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
