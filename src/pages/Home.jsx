import { useState } from 'react'
import {
  Code2,
  TrendingUp,
  Layers,
  BookOpen,
  ArrowRight,
} from 'lucide-react'
import { Badge, Button, Divider, Modal } from '@/components/ui'
import PostCard from '@/components/feed/PostCard'
import ActivityChart from '@/components/build/ActivityChart'
import projects from '@/data/projects.json'
import commitActivity from '@/data/commitActivity.json'

// ── Story highlight rings ──────────────────────────────────────────────────────
const STORIES = [
  { label: 'Dev',     Icon: Code2,      active: true  },
  { label: 'Trading', Icon: TrendingUp, active: false },
  { label: 'Design',  Icon: Layers,     active: false },
  { label: 'Blog',    Icon: BookOpen,   active: false },
]

// ── Build progress (mirrors the Obsidian Build Log) ─────────────────────────────
const BUILD_PHASES = [
  { phase: 0, name: 'Foundation',          status: 'done'   },
  { phase: 1, name: 'Design System',       status: 'done'   },
  { phase: 2, name: 'App Shell',           status: 'done'   },
  { phase: 3, name: 'Profile + Feed',      status: 'done'   },
  { phase: 4, name: 'Explore + Contact',   status: 'done'   },
  { phase: 5, name: 'Build Activity',      status: 'done'   },
  { phase: 6, name: 'Polish + Deploy',     status: 'next'   },
]

const STATUS_STYLES = {
  done:   { variant: 'solid',   color: 'green',  label: 'Done'   },
  next:   { variant: 'glow',    color: 'amber',  label: 'Next'   },
  locked: { variant: 'outline', color: 'gray',   label: 'Locked' },
}

// ── Story ring ────────────────────────────────────────────────────────────────
function StoryRing({ label, Icon, active }) {
  function handleActivate() {
    // Phase 5: opens domain story / filter
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
      <div
        style={{
          width: 60, height: 60, borderRadius: '50%',
          background: active ? 'var(--amber)' : 'var(--border)',
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
            style={{ color: active ? 'var(--amber)' : 'var(--text-muted)' }}
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

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [buildLogOpen, setBuildLogOpen] = useState(false)

  return (
    <div className="anim-page-enter" style={{ minHeight: '100vh' }}>

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

        {/* Post cards — driven by data/projects.json */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          {projects.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} pinned={post.pinned} />
          ))}

          {/* Section divider — this used to precede a locked teaser card;
              Phase 5 shipped, so it now precedes real content instead. */}
          <Divider label="Build activity" color="amber" />

          <div className="anim-fade-up delay-4">
            <ActivityChart commits={commitActivity} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="secondary"
              size="sm"
              rightIcon={ArrowRight}
              onClick={() => setBuildLogOpen(true)}
            >
              View full build log
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
