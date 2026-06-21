import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MapPin,
  CalendarDays,
  CircleDot,
  MessageSquare,
  Share2,
  Code2,
  Sparkles,
  Rocket,
  Briefcase,
} from 'lucide-react'
import { Avatar, Badge, Button, Tooltip } from '@/components/ui'
import PostCard from '@/components/feed/PostCard'
import projects from '@/data/projects.json'
import skills from '@/data/skills.json'
import timeline from '@/data/timeline.json'

// Maps the string icon keys stored in timeline.json to Lucide components
// (JSON can't hold component references).
const TIMELINE_ICONS = { Sparkles, Rocket, Briefcase }

const DOMAIN_BADGES = [
  { label: 'Dev',      color: 'amber', variant: 'solid'   },
  { label: 'Trading',  color: 'gray',  variant: 'outline' },
  { label: 'Design',   color: 'gray',  variant: 'outline' },
]

const TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'skills',   label: 'Skills'   },
  { id: 'about',    label: 'About'    },
]

// ── Small building blocks ────────────────────────────────────────────────────

function MetaItem({ icon: Icon, children, color }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--sp-2)',
        fontSize: 'var(--fs-sm)',
        color: color || 'var(--text-muted)',
      }}
    >
      <Icon size={15} strokeWidth={1.8} aria-hidden="true" style={{ flexShrink: 0 }} />
      {children}
    </div>
  )
}

function Stat({ value, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
      <span
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--fs-lg)',
          fontWeight: 'var(--fw-black)',
          color: 'var(--text)',
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{label}</span>
    </div>
  )
}

function HighlightRing({ title, date, icon: Icon }) {
  return (
    <Tooltip content={`${title} — ${date}`} position="bottom">
      <div
        role="button"
        tabIndex={0}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 7,
          cursor: 'pointer',
          flexShrink: 0,
          width: 78,
        }}
      >
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: '50%',
            background: 'var(--amber-faint)',
            border: '2px solid var(--amber)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform var(--transition-fast)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.07)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          <Icon size={22} style={{ color: 'var(--amber)' }} aria-hidden="true" />
        </div>
        <span
          style={{
            fontSize: 'var(--fs-2xs)',
            color: 'var(--text-muted)',
            fontWeight: 'var(--fw-medium)',
            textAlign: 'center',
            lineHeight: 1.3,
          }}
        >
          {title}
        </span>
      </div>
    </Tooltip>
  )
}

function SkillBar({ name, level }) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text)', fontWeight: 'var(--fw-medium)' }}>
          {name}
        </span>
        <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          {level}%
        </span>
      </div>
      <div
        style={{
          height: 6,
          borderRadius: 'var(--radius-full)',
          background: 'var(--surf)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
        }}
      >
        <div
          className="anim-fade-left"
          style={{
            height: '100%',
            width: `${level}%`,
            background: 'var(--amber)',
            borderRadius: 'var(--radius-full)',
          }}
        />
      </div>
    </div>
  )
}

function TimelineItem({ item, isLast }) {
  const Icon = TIMELINE_ICONS[item.icon] ?? Sparkles

  return (
    <div style={{ display: 'flex', gap: 'var(--sp-4)' }}>
      {/* Icon + connecting line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'var(--amber-faint)',
            border: '1px solid var(--amber)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={16} style={{ color: 'var(--amber)' }} aria-hidden="true" />
        </div>
        {!isLast && (
          <div
            aria-hidden="true"
            style={{ width: 1, flex: 1, background: 'var(--border)', marginTop: 4 }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: 'var(--sp-6)', minWidth: 0 }}>
        <div
          style={{
            fontSize: 'var(--fs-sm)',
            fontWeight: 'var(--fw-semibold)',
            color: 'var(--text)',
            marginBottom: 2,
          }}
        >
          {item.title}
        </div>
        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginBottom: 4 }}>
          {item.subtitle}
        </div>
        <div
          style={{
            fontSize: 'var(--fs-2xs)',
            color: 'var(--amber)',
            fontFamily: 'var(--font-mono)',
            fontWeight: 'var(--fw-medium)',
          }}
        >
          {item.date}
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Profile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('projects')

  const pinnedProject = projects.find(p => p.pinned)
  const otherProjects = projects.filter(p => !p.pinned)

  return (
    <div className="anim-page-enter" style={{ minHeight: '100vh' }}>
      <div className="page-content-wide">

        {/* ── Header card: banner + avatar + identity ── */}
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'visible',
            marginBottom: 'var(--sp-6)',
          }}
        >
          {/* Banner */}
          <div
            aria-hidden="true"
            style={{
              height: 168,
              background: 'var(--card-raised)',
              borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
          </div>

          <div style={{ padding: '0 var(--sp-6) var(--sp-6)' }}>
            {/* Avatar overlaps banner */}
            <div style={{ marginTop: -44, marginBottom: 'var(--sp-3)' }}>
              <Avatar name="Benzon" size="xl" status="online" ring />
            </div>

            {/* Name row + actions */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: 'var(--sp-3)',
                marginBottom: 'var(--sp-3)',
              }}
            >
              <div>
                <h1
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--fs-2xl)',
                    fontWeight: 'var(--fw-black)',
                    letterSpacing: '-0.6px',
                    color: 'var(--text)',
                    lineHeight: 1.1,
                  }}
                >
                  Benzon
                </h1>
                <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', marginTop: 4 }}>
                  @benzon
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={MessageSquare}
                  onClick={() => navigate('/contact')}
                >
                  Contact
                </Button>
                <Tooltip content="Share profile" position="top">
                  <Button variant="ghost" size="sm" aria-label="Share profile">
                    <Share2 size={14} aria-hidden="true" />
                  </Button>
                </Tooltip>
              </div>
            </div>

            {/* Bio */}
            <p
              style={{
                fontSize: 'var(--fs-base)',
                color: 'var(--text-sub)',
                lineHeight: 'var(--lh-relaxed)',
                marginBottom: 'var(--sp-4)',
                maxWidth: 560,
              }}
            >
              Solo developer building across the dev, trading, and design domains.
              Currently shipping <strong style={{ color: 'var(--text)' }}>BNZN.dev</strong> —
              this portfolio — in public, one phase at a time.
            </p>

            {/* Meta row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--sp-4)',
                marginBottom: 'var(--sp-4)',
              }}
            >
              <MetaItem icon={MapPin}>Bulacan, Philippines</MetaItem>
              <MetaItem icon={CalendarDays}>Building since 2025</MetaItem>
              <MetaItem icon={CircleDot} color="var(--green)">Available for work</MetaItem>
            </div>

            {/* Domain badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 'var(--sp-5)' }}>
              {DOMAIN_BADGES.map(b => (
                <Badge key={b.label} variant={b.variant} color={b.color} size="sm" dot>
                  {b.label}
                </Badge>
              ))}
            </div>

            {/* Stats row */}
            <div
              style={{
                display: 'flex',
                gap: 'var(--sp-6)',
                paddingTop: 'var(--sp-4)',
                borderTop: '1px solid var(--border-muted)',
              }}
            >
              <Stat value={projects.length} label="Projects" />
              <Stat value={skills.length} label="Skills" />
              <Stat value="1+" label="Years Exp" />
            </div>
          </div>
        </div>

        {/* ── Achievement highlights ── */}
        <div style={{ marginBottom: 'var(--sp-6)' }}>
          <div
            style={{
              fontSize: 'var(--fs-xs)',
              fontWeight: 'var(--fw-semibold)',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              marginBottom: 'var(--sp-3)',
            }}
          >
            Highlights
          </div>
          <div
            style={{
              display: 'flex',
              gap: 'var(--sp-5)',
              overflowX: 'auto',
              paddingBottom: 'var(--sp-1)',
              scrollbarWidth: 'none',
            }}
          >
            {timeline.map(item => (
              <HighlightRing
                key={item.id}
                title={item.title}
                date={item.date}
                icon={TIMELINE_ICONS[item.icon] ?? Sparkles}
              />
            ))}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div
          role="tablist"
          aria-label="Profile sections"
          style={{
            display: 'flex',
            gap: 'var(--sp-2)',
            borderBottom: '1px solid var(--border)',
            marginBottom: 'var(--sp-6)',
          }}
        >
          {TABS.map(tab => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: 'var(--sp-3) var(--sp-4)',
                  fontSize: 'var(--fs-sm)',
                  fontWeight: isActive ? 'var(--fw-semibold)' : 'var(--fw-medium)',
                  color: isActive ? 'var(--amber)' : 'var(--text-muted)',
                  borderBottom: isActive ? '2px solid var(--amber)' : '2px solid transparent',
                  marginBottom: -1,
                  minHeight: 44,
                  transition: 'color var(--transition-fast), border-color var(--transition-fast)',
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-sub)'
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-muted)'
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* ── Tab panels ── */}
        {activeTab === 'projects' && (
          <div
            role="tabpanel"
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', maxWidth: 600 }}
          >
            {pinnedProject && (
              <PostCard post={pinnedProject} index={0} pinned />
            )}
            {otherProjects.map((post, i) => (
              <PostCard key={post.id} post={post} index={i + 1} />
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div
            role="tabpanel"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--sp-6)',
              maxWidth: 600,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sp-4)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--sp-2)',
                marginBottom: 'var(--sp-1)',
              }}
            >
              <Code2 size={15} style={{ color: 'var(--amber)' }} aria-hidden="true" />
              <span
                style={{
                  fontSize: 'var(--fs-xs)',
                  fontWeight: 'var(--fw-semibold)',
                  color: 'var(--text-sub)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                }}
              >
                Tech Stack
              </span>
            </div>
            {skills.map(skill => (
              <SkillBar key={skill.name} {...skill} />
            ))}
            <div
              style={{
                marginTop: 'var(--sp-2)',
                fontSize: 'var(--fs-2xs)',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Full skill market-cap view → Phase 4
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div
            role="tabpanel"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--sp-6)',
              maxWidth: 600,
            }}
          >
            <div
              style={{
                fontSize: 'var(--fs-xs)',
                fontWeight: 'var(--fw-semibold)',
                color: 'var(--text-sub)',
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                marginBottom: 'var(--sp-5)',
              }}
            >
              Timeline
            </div>
            {timeline.map((item, i) => (
              <TimelineItem key={item.id} item={item} isLast={i === timeline.length - 1} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
