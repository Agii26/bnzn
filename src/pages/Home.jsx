import { useState } from 'react'
import {
  Heart,
  Share2,
  Bookmark,
  Code2,
  TrendingUp,
  Layers,
  BookOpen,
  Lock,
  Github,
  ExternalLink,
  ArrowRight,
} from 'lucide-react'
import { Avatar, Badge, Button, Divider, Modal, Tooltip } from '@/components/ui'

// ── Story highlight rings ──────────────────────────────────────────────────────
const STORIES = [
  { label: 'Dev',     Icon: Code2,       gradient: 'var(--gradient-blue-purple)', active: true  },
  { label: 'Trading', Icon: TrendingUp,  gradient: 'var(--gradient-red-purple)',  active: false },
  { label: 'Design',  Icon: Layers,      gradient: 'var(--gradient-purple-blue)', active: false },
  { label: 'Blog',    Icon: BookOpen,    gradient: 'var(--gradient-brand)',        active: false },
]

// ── Mock feed posts ────────────────────────────────────────────────────────────
const MOCK_POSTS = [
  {
    id: 1,
    title: 'TradeDesk v2',
    description:
      'React + Vite crypto trading dashboard with 10-criterion confluence scoring engine and real-time candlestick charts.',
    tags: ['React', 'Vite', 'Crypto', 'Express'],
    headerGradient: 'linear-gradient(135deg, #F43F5E 0%, #A855F7 100%)',
    stats: { likes: 24, shares: 8, bookmarks: 12 },
    domain: 'dev',
    date: 'May 2026',
    featured: true,
  },
  {
    id: 2,
    title: 'Geospatial Farm Monitor',
    description:
      'Government IT internship — Django + Leaflet + PostgreSQL geospatial monitoring system for the Provincial IT Office of Bulacan.',
    tags: ['Django', 'PostgreSQL', 'Leaflet', 'Python'],
    headerGradient: 'linear-gradient(135deg, #3B82F6 0%, #A855F7 100%)',
    stats: { likes: 31, shares: 5, bookmarks: 18 },
    domain: 'dev',
    date: 'Jun 2025',
    featured: false,
  },
]

// ── Build progress (mirrors the Obsidian Build Log) ─────────────────────────────
const BUILD_PHASES = [
  { phase: 0, name: 'Foundation',          status: 'done'   },
  { phase: 1, name: 'Design System',       status: 'done'   },
  { phase: 2, name: 'App Shell',           status: 'next'   },
  { phase: 3, name: 'Profile + Feed',      status: 'locked' },
  { phase: 4, name: 'Explore + Contact',   status: 'locked' },
  { phase: 5, name: 'Innovation Layer',    status: 'locked' },
  { phase: 6, name: 'Polish + Deploy',     status: 'locked' },
]

const STATUS_STYLES = {
  done:   { variant: 'solid',   color: 'green',  label: 'Done'   },
  next:   { variant: 'glow',    color: 'purple', label: 'Next'   },
  locked: { variant: 'outline', color: 'gray',   label: 'Locked' },
}

// ── Story ring ────────────────────────────────────────────────────────────────
function StoryRing({ label, Icon, gradient, active }) {
  function handleActivate() {
    // Phase 3: opens domain story / filter
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${label} stories`}
      onClick={handleActivate}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleActivate()
        }
      }}
      style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 6,
        cursor: 'pointer', flexShrink: 0,
      }}
    >
      {/* Gradient ring border */}
      <div
        style={{
          width: 60, height: 60, borderRadius: '50%',
          background: active ? gradient : 'var(--border)',
          padding: 2.5,
          transition: 'transform var(--transition-fast)',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: 'var(--card)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon
            size={22}
            strokeWidth={1.5}
            aria-hidden="true"
            style={{ color: active ? 'var(--text)' : 'var(--text-muted)' }}
          />
        </div>
      </div>

      <span style={{
        fontSize: 'var(--fs-xs)',
        color: active ? 'var(--text)' : 'var(--text-muted)',
        fontWeight: active ? 'var(--fw-semibold)' : 'var(--fw-normal)',
      }}>
        {label}
      </span>
    </div>
  )
}

// ── Post card ─────────────────────────────────────────────────────────────────
function PostCard({ post, index }) {
  const ACTION_BUTTONS = [
    { Icon: Heart,    count: post.stats.likes,     label: 'Like',     hoverColor: 'var(--red)'    },
    { Icon: Share2,   count: post.stats.shares,    label: 'Share',    hoverColor: 'var(--blue)'   },
    { Icon: Bookmark, count: post.stats.bookmarks, label: 'Bookmark', hoverColor: 'var(--purple)' },
  ]

  return (
    <div
      className={`anim-fade-up delay-${index + 2}`}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        transition: 'border-color var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--border-bright)'
        e.currentTarget.style.transform   = 'translateY(-2px)'
        e.currentTarget.style.boxShadow   = 'var(--shadow-md)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform   = 'translateY(0)'
        e.currentTarget.style.boxShadow   = 'none'
      }}
    >
      {/* ── Screenshot header ── */}
      <div style={{
        height: 164,
        background: post.headerGradient,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Dot-grid texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }} />

        {/* Center label */}
        <div style={{
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 'var(--radius-full)',
          padding: '7px 18px',
          fontSize: 'var(--fs-xs)',
          fontWeight: 'var(--fw-semibold)',
          color: 'rgba(255,255,255,0.8)',
          display: 'flex', alignItems: 'center', gap: 'var(--sp-2)',
          position: 'relative',
          zIndex: 1,
        }}>
          <Code2 size={12} aria-hidden="true" />
          Screenshot in Phase 3
        </div>

        {/* Top-right badges */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          display: 'flex', gap: 'var(--sp-2)',
          zIndex: 1,
        }}>
          {post.featured && (
            <div style={{
              background: 'rgba(244,63,94,0.85)',
              backdropFilter: 'blur(8px)',
              borderRadius: 'var(--radius-full)',
              padding: '3px 10px',
              fontSize: 'var(--fs-2xs)',
              fontWeight: 'var(--fw-black)',
              color: 'white',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
            }}>
              Featured
            </div>
          )}
          <div style={{
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 'var(--radius-full)',
            padding: '3px 10px',
            fontSize: 'var(--fs-2xs)',
            fontWeight: 'var(--fw-bold)',
            color: 'var(--blue-light)',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
          }}>
            {post.domain}
          </div>
        </div>

        {/* Top-left action buttons */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          display: 'flex', gap: 8,
          zIndex: 1,
        }}>
          {[
            { Icon: Github,       label: 'GitHub' },
            { Icon: ExternalLink, label: 'Live Demo' },
          ].map(({ Icon, label }) => (
            <button
              key={label}
              aria-label={label}
              style={{
                width: 36, height: 36,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.7)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.5)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
              }}
            >
              <Icon size={14} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      {/* ── Post body ── */}
      <div style={{ padding: 'var(--sp-4)' }}>

        {/* Author row */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: 'var(--sp-3)', marginBottom: 'var(--sp-3)',
        }}>
          <Avatar name="Benzon" size="sm" status="online" />
          <div>
            <div style={{
              fontSize: 'var(--fs-sm)',
              fontWeight: 'var(--fw-semibold)',
              color: 'var(--text)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              Benzon
              {/* Domain verification badge */}
              <span style={{
                background: 'var(--blue-faint)',
                border: '1px solid var(--blue-glow)',
                color: 'var(--blue)',
                fontSize: 'var(--fs-2xs)',
                fontWeight: 'var(--fw-black)',
                padding: '1px 5px',
                borderRadius: 3,
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.5px',
              }}>
                DEV
              </span>
            </div>
            <div style={{
              fontSize: 'var(--fs-xs)',
              color: 'var(--text-muted)',
              marginTop: 2,
            }}>
              @benzon · {post.date}
            </div>
          </div>
        </div>

        {/* Title */}
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--fs-xl)',
          fontWeight: 'var(--fw-bold)',
          color: 'var(--text)',
          letterSpacing: '-0.4px',
          marginBottom: 'var(--sp-2)',
        }}>
          {post.title}
        </div>

        {/* Description */}
        <p style={{
          fontSize: 'var(--fs-sm)',
          color: 'var(--text-sub)',
          lineHeight: 'var(--lh-normal)',
          marginBottom: 'var(--sp-4)',
        }}>
          {post.description}
        </p>

        {/* Tech tag pills */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 6,
          marginBottom: 'var(--sp-4)',
        }}>
          {post.tags.map(tag => (
            <Badge key={tag} variant="outline" color="purple" size="sm">{tag}</Badge>
          ))}
        </div>

        {/* Action bar — each button gets a Tooltip label on hover/focus */}
        <div style={{
          display: 'flex', alignItems: 'center',
          borderTop: '1px solid var(--border-muted)',
          paddingTop: 'var(--sp-3)',
        }}>
          {ACTION_BUTTONS.map(({ Icon, count, label, hoverColor }) => (
            <Tooltip key={label} content={label} position="top">
              <button
                aria-label={`${label}: ${count}`}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 6,
                  flex: 1,
                  minHeight: 44,
                  color: 'var(--text-muted)',
                  fontSize: 'var(--fs-xs)',
                  fontWeight: 'var(--fw-medium)',
                  padding: 'var(--sp-3)',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'color var(--transition-fast), background var(--transition-fast)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color      = hoverColor
                  e.currentTarget.style.background = 'var(--surf)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color      = 'var(--text-muted)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
                <span>{count}</span>
              </button>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [buildLogOpen, setBuildLogOpen] = useState(false)

  return (
    <div className="anim-page-enter" style={{ minHeight: '100vh' }}>

      {/* ── Sticky header ── */}
      <div style={{
        position: 'sticky', top: 0,
        zIndex: 'var(--z-sticky)',
        background: 'rgba(8, 8, 14, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        padding: 'var(--sp-4) var(--sp-6)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--fs-xl)',
          fontWeight: 'var(--fw-black)',
          letterSpacing: '-0.5px',
          margin: 0,
        }}>
          Feed
        </h1>
        <Badge variant="glow" color="purple" size="sm" dot>Phase 3 Preview</Badge>
      </div>

      {/* ── Feed content ── */}
      <div className="page-content">

        {/* Story highlights */}
        <div style={{
          display: 'flex', gap: 'var(--sp-5)',
          overflowX: 'auto',
          paddingBottom: 'var(--sp-2)',
          marginBottom: 'var(--sp-6)',
          scrollbarWidth: 'none',
        }}>
          {STORIES.map(story => <StoryRing key={story.label} {...story} />)}
        </div>

        {/* Post cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          {MOCK_POSTS.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}

          {/* Section divider — separates real posts from the roadmap teaser */}
          <Divider label="What's coming" color="purple" />

          {/* Phase-lock card */}
          <div
            className="anim-fade-up delay-4"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--sp-8)',
              textAlign: 'center',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 'var(--sp-4)',
            }}
          >
            <div style={{
              width: 48, height: 48,
              borderRadius: 'var(--radius-lg)',
              background: 'var(--surf)',
              border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Lock size={20} aria-hidden="true" style={{ color: 'var(--text-muted)' }} />
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--fs-md)',
                fontWeight: 'var(--fw-bold)',
                color: 'var(--text)',
                marginBottom: 6,
              }}>
                Full feed arrives in Phase 3
              </div>
              <div style={{
                fontSize: 'var(--fs-sm)',
                color: 'var(--text-muted)',
                lineHeight: 'var(--lh-relaxed)',
              }}>
                Infinite scroll · Project cards · Trading showcases · Milestones
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              rightIcon={ArrowRight}
              onClick={() => setBuildLogOpen(true)}
            >
              View Build Log
            </Button>
          </div>
        </div>

      </div>

      {/* ── Build progress modal ── */}
      <Modal
        isOpen={buildLogOpen}
        onClose={() => setBuildLogOpen(false)}
        title="Build progress"
        size="sm"
        footer={
          <Button variant="secondary" size="sm" onClick={() => setBuildLogOpen(false)}>
            Got it
          </Button>
        }
      >
        <p style={{ marginBottom: 'var(--sp-4)' }}>
          BNZN.dev is being built in 7 phases — design system first, then the
          social feed, profile, and the rest of the interactive layer.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {BUILD_PHASES.map(({ phase, name, status }, i) => {
            const s = STATUS_STYLES[status]
            return (
              <div
                key={phase}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--sp-2) 0',
                  borderBottom: i < BUILD_PHASES.length - 1 ? '1px solid var(--border-muted)' : 'none',
                }}
              >
                <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text)' }}>
                  <span style={{
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    marginRight: 8,
                  }}>
                    {String(phase).padStart(2, '0')}
                  </span>
                  {name}
                </span>
                <Badge variant={s.variant} color={s.color} size="sm">{s.label}</Badge>
              </div>
            )
          })}
        </div>

        <p style={{
          marginTop: 'var(--sp-4)',
          fontSize: 'var(--fs-xs)',
          color: 'var(--text-muted)',
        }}>
          Full session-by-session log lives in the Obsidian vault under{' '}
          <span style={{ fontFamily: 'var(--font-mono)' }}>Projects/BNZN.dev/Build Log.md</span>.
        </p>
      </Modal>
    </div>
  )
}
