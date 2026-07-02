import { useRef, useState } from 'react'
import {
  Mail,
  Send,
  Briefcase,
  Handshake,
  Coffee,
  MessageCircle,
  CheckCircle2,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
} from 'lucide-react'
import { Avatar, Badge, Button, Card, Input, Textarea, Divider, Tooltip } from '@/components/ui'

// Benzon's real, working links. LinkedIn/Twitter aren't public yet — shown
// as disabled placeholders rather than fabricated URLs (see note at the
// bottom of the page for how to activate them).
const CONTACT_EMAIL = 'rheychristian26@gmail.com'
const GITHUB_URL = 'https://github.com/Agii26'

const SUBJECTS = [
  {
    id: 'freelance',
    label: 'Freelance work',
    Icon: Briefcase,
    template: "Hi Benzon,\n\nI'm reaching out about a potential freelance project. Here's what I have in mind:\n\n",
  },
  {
    id: 'collab',
    label: 'Collaboration',
    Icon: Handshake,
    template: "Hi Benzon,\n\nI'd love to collaborate on something together. A bit about the idea:\n\n",
  },
  {
    id: 'hi',
    label: 'Just saying hi',
    Icon: Coffee,
    template: "Hey Benzon!\n\nJust came across BNZN.dev and wanted to say — ",
  },
  {
    id: 'other',
    label: 'Something else',
    Icon: MessageCircle,
    template: '',
  },
]

const SOCIAL_LINKS = [
  { id: 'github',   label: 'GitHub',   Icon: Github,   href: GITHUB_URL, active: true  },
  { id: 'linkedin', label: 'LinkedIn', Icon: Linkedin, href: null,       active: false },
  { id: 'twitter',  label: 'Twitter',  Icon: Twitter,  href: null,       active: false },
]

function SectionHeader({ children }) {
  return (
    <div style={{
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-sub)',
      textTransform: 'uppercase',
      letterSpacing: '0.6px',
      marginBottom: 'var(--sp-3)',
    }}>
      {children}
    </div>
  )
}

function SubjectChip({ label, Icon, active, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        minHeight: 36,
        padding: '0 var(--sp-4)',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--fs-xs)',
        fontWeight: 'var(--fw-semibold)',
        background: active ? 'var(--amber)' : 'var(--surf)',
        color: active ? 'var(--text-inverse)' : 'var(--text-sub)',
        border: `1px solid ${active ? 'var(--amber)' : 'var(--border)'}`,
        transition: 'all var(--transition-fast)',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.borderColor = 'var(--border-bright)' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.borderColor = 'var(--border)' }}
    >
      <Icon size={13} strokeWidth={2} aria-hidden="true" />
      {label}
    </button>
  )
}

function SocialLink({ label, Icon, href, active }) {
  const content = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--sp-2)',
        padding: 'var(--sp-3) var(--sp-4)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        background: 'var(--surf)',
        color: active ? 'var(--text-sub)' : 'var(--text-muted)',
        opacity: active ? 1 : 0.5,
        fontSize: 'var(--fs-sm)',
        fontWeight: 'var(--fw-medium)',
        minHeight: 44,
        transition: 'all var(--transition-fast)',
      }}
    >
      <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
      {label}
      {active && <ExternalLink size={12} strokeWidth={2} aria-hidden="true" style={{ marginLeft: 2, opacity: 0.6 }} />}
    </div>
  )

  if (!active) {
    return (
      <Tooltip content="Not linked yet" position="top">
        <div aria-disabled="true" style={{ cursor: 'not-allowed' }}>{content}</div>
      </Tooltip>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in new tab)`}
      style={{ textDecoration: 'none' }}
    >
      {content}
    </a>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Contact() {
  const [subject, setSubject] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'sent'

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const messageRef = useRef(null)

  function selectSubject(s) {
    const wasActive = subject === s.id
    setSubject(wasActive ? null : s.id)
    if (!wasActive) {
      setForm(f => ({ ...f, message: f.message || s.template }))
    }
  }

  function updateField(key, value) {
    setForm(f => ({ ...f, [key]: value }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }))
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address'
    if (!form.message.trim()) e.message = "A short message helps a lot"
    setErrors(e)

    if (e.name) nameRef.current?.focus()
    else if (e.email) emailRef.current?.focus()
    else if (e.message) messageRef.current?.focus()

    return Object.keys(e).length === 0
  }

  function handleSend() {
    if (!validate()) return
    setStatus('sending')

    const subjectLabel = SUBJECTS.find(s => s.id === subject)?.label ?? 'General inquiry'
    const mailSubject = encodeURIComponent(`[BNZN.dev] ${subjectLabel} — from ${form.name}`)
    const mailBody = encodeURIComponent(`${form.message}\n\n—\n${form.name}\n${form.email}`)

    // Simulated brief send delay for feedback, then hand off to the user's
    // own email client via mailto — this site has no backend, so nothing
    // is transmitted until the person hits send in their own mail app.
    window.setTimeout(() => {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`
      setStatus('sent')
    }, 500)
  }

  function resetForm() {
    setStatus('idle')
    setForm({ name: '', email: '', message: '' })
    setSubject(null)
    setErrors({})
  }

  return (
    <div className="anim-page-enter" style={{ minHeight: '100vh' }}>
      <div className="page-content">

        {/* ── DM header ── */}
        <Card
          variant="raised"
          padding="lg"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--sp-3)',
            marginBottom: 'var(--sp-5)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <Avatar name="Benzon" size="md" status="online" ring />
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-md)', color: 'var(--text)' }}>
                Message Benzon
              </div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                @benzon · usually responds within 24–48h
              </div>
            </div>
          </div>
          <Badge variant="outline" color="green" dot>Available for work</Badge>
        </Card>

        {status !== 'sent' ? (
          <Card variant="base" padding="lg" style={{ marginBottom: 'var(--sp-6)' }}>

            {/* ── Subject tagging + quick templates ── */}
            <SectionHeader>What&rsquo;s this about?</SectionHeader>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)', marginBottom: 'var(--sp-5)' }}>
              {SUBJECTS.map(s => (
                <SubjectChip key={s.id} {...s} active={subject === s.id} onClick={() => selectSubject(s)} />
              ))}
            </div>

            <Divider style={{ marginBottom: 'var(--sp-5)' }} />

            {/* ── Name + email ── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--sp-4)',
              marginBottom: 'var(--sp-4)',
            }}>
              <Input
                ref={nameRef}
                label="Your name"
                required
                placeholder="Ada Lovelace"
                value={form.name}
                onChange={e => updateField('name', e.target.value)}
                error={errors.name}
              />
              <Input
                ref={emailRef}
                label="Your email"
                type="email"
                required
                placeholder="ada@example.com"
                value={form.email}
                onChange={e => updateField('email', e.target.value)}
                error={errors.email}
              />
            </div>

            {/* ── Message ── */}
            <Textarea
              ref={messageRef}
              label="Message"
              required
              rows={7}
              maxLength={1000}
              placeholder="What would you like to build together?"
              value={form.message}
              onChange={e => updateField('message', e.target.value)}
              error={errors.message}
              style={{ marginBottom: 'var(--sp-5)' }}
            />

            {/* ── Send row ── */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--sp-3)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                <Mail size={13} strokeWidth={1.8} aria-hidden="true" style={{ flexShrink: 0 }} />
                Opens in your email client — nothing sends until you hit send there.
              </div>
              <Button
                variant="primary"
                size="md"
                rightIcon={Send}
                loading={status === 'sending'}
                onClick={handleSend}
              >
                Send Message
              </Button>
            </div>
          </Card>
        ) : (
          <Card
            variant="raised"
            padding="lg"
            className="anim-scale-in"
            style={{ textAlign: 'center', marginBottom: 'var(--sp-6)' }}
          >
            <div style={{
              width: 48, height: 48,
              borderRadius: '50%',
              background: 'var(--green-faint)',
              border: '1px solid var(--green-glow)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto var(--sp-4)',
            }}>
              <CheckCircle2 size={22} aria-hidden="true" style={{ color: 'var(--green)' }} />
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-lg)', color: 'var(--text)', marginBottom: 'var(--sp-2)' }}>
              Message drafted
            </div>
            <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-sub)', lineHeight: 'var(--lh-relaxed)', maxWidth: 420, margin: '0 auto var(--sp-5)' }}>
              Your email client should now be open with everything pre-filled. Hit send there and Benzon
              will get back to you within 24–48 hours.
            </p>
            <Button variant="secondary" size="sm" onClick={resetForm}>
              Write another message
            </Button>
          </Card>
        )}

        {/* ── Social links ── */}
        <div>
          <SectionHeader>Or find Benzon here</SectionHeader>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)' }}>
            {SOCIAL_LINKS.map(link => <SocialLink key={link.id} {...link} />)}
          </div>
        </div>

      </div>
    </div>
  )
}
