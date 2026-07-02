import { useEffect, useMemo, useState } from 'react'
import {
  Search,
  Code2,
  TrendingUp,
  TrendingDown,
  Layers,
  Sparkles,
  Zap,
  Tag,
  Compass,
  X,
} from 'lucide-react'
import { Input, Button, Card } from '@/components/ui'
import PostCard from '@/components/feed/PostCard'
import SkillBar from '@/components/skills/SkillBar'
import projects from '@/data/projects.json'
import skills from '@/data/skills.json'

// ── Domain filter definitions — same three categories used by Home's story
//    rings and Profile's domain badges, so the taxonomy stays consistent
//    across the whole app. ──────────────────────────────────────────────────
const DOMAINS = [
  { id: 'all',     label: 'All',      Icon: Sparkles   },
  { id: 'dev',     label: 'Dev',      Icon: Code2      },
  { id: 'trading', label: 'Trading',  Icon: TrendingUp },
  { id: 'design',  label: 'Design',   Icon: Layers     },
]

// Hand-picked ticker symbols for known skills; anything else falls back to
// an auto-derived 4-letter code so new entries in skills.json never break.
const SYMBOLS = {
  React: 'RCT', JavaScript: 'JS', Python: 'PY', Vite: 'VITE', Django: 'DJO',
  PostgreSQL: 'PSQL', 'Node.js': 'NODE', TypeScript: 'TS', Zustand: 'ZUS', Leaflet: 'LEAF',
}
function symbolFor(name) {
  return SYMBOLS[name] ?? name.replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase()
}

// Deterministic pseudo "24h change" per skill — stable across renders/reloads
// so the ticker doesn't jitter, without needing a real market-data source.
// Purely illustrative; labeled as such in the UI.
function seededChange(seed) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  return Math.round(((hash % 2000) / 100 - 8) * 10) / 10 // ≈ -8.0 … +12.0
}

// ── Small building blocks ────────────────────────────────────────────────────

function SectionHeader({ icon: Icon, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', marginBottom: 'var(--sp-3)' }}>
      <Icon size={14} aria-hidden="true" style={{ color: 'var(--amber)' }} />
      <span style={{
        fontSize: 'var(--fs-xs)',
        fontWeight: 'var(--fw-semibold)',
        color: 'var(--text-sub)',
        textTransform: 'uppercase',
        letterSpacing: '0.6px',
      }}>
        {label}
      </span>
    </div>
  )
}

function EmptyState({ label }) {
  return (
    <div style={{
      background: 'var(--card)',
      border: '1px dashed var(--border-bright)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--sp-8)',
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontSize: 'var(--fs-sm)',
    }}>
      {label}
    </div>
  )
}

function DomainChip({ label, Icon, active, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        flexShrink: 0,
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

function TagChip({ tag, active, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      style={{
        minHeight: 34,
        padding: '0 var(--sp-3)',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--fs-xs)',
        fontWeight: 'var(--fw-semibold)',
        fontFamily: 'var(--font-mono)',
        background: active ? 'var(--amber-faint)' : 'transparent',
        color: active ? 'var(--amber)' : 'var(--text-muted)',
        border: `1px solid ${active ? 'var(--amber-glow)' : 'var(--border)'}`,
        transition: 'all var(--transition-fast)',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text-sub)' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-muted)' }}
    >
      {tag}
    </button>
  )
}

function TickerItem({ skill }) {
  const change = seededChange(skill.name)
  const up = change >= 0
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--sp-3)',
      padding: '0 var(--sp-5)',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-xs)',
        fontWeight: 'var(--fw-bold)',
        color: 'var(--text)',
        letterSpacing: '0.4px',
      }}>
        {symbolFor(skill.name)}
      </span>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-xs)',
        color: 'var(--text-sub)',
      }}>
        {skill.level.toFixed(1)}
      </span>
      <span style={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-2xs)',
        fontWeight: 'var(--fw-semibold)',
        color: up ? 'var(--green)' : 'var(--red)',
      }}>
        {up ? <TrendingUp size={11} aria-hidden="true" /> : <TrendingDown size={11} aria-hidden="true" />}
        {up ? '+' : ''}{change}%
      </span>
    </div>
  )
}

function MarketCapWidget({ items }) {
  if (items.length === 0) {
    return (
      <Card variant="raised" padding="lg">
        <SectionHeader icon={Zap} label="Skill Market Cap" />
        <EmptyState label="No skills logged in this domain yet — check back as case studies get added." />
      </Card>
    )
  }

  const withChange = items.map(s => ({ ...s, change: seededChange(s.name) }))
  const gainer = withChange.reduce((a, b) => (b.change > a.change ? b : a))
  const loser  = withChange.reduce((a, b) => (b.change < a.change ? b : a))

  return (
    <Card variant="raised" padding="lg">
      <SectionHeader icon={Zap} label="Skill Market Cap" />

      {/* Scrolling ticker — content duplicated once for a seamless -50% loop */}
      <div
        aria-hidden="true"
        style={{
          overflow: 'hidden',
          borderTop: '1px solid var(--border-muted)',
          borderBottom: '1px solid var(--border-muted)',
          padding: 'var(--sp-3) 0',
          marginBottom: 'var(--sp-4)',
        }}
      >
        <div className="anim-ticker">
          {[...items, ...items].map((s, i) => <TickerItem key={`${s.name}-${i}`} skill={s} />)}
        </div>
      </div>

      {/* Screen-reader friendly summary of the same data (charts alone
          aren't accessible — provide an equivalent text alternative) */}
      <ul className="sr-only">
        {withChange.map(s => (
          <li key={s.name}>{s.name}: {s.level}% proficiency, {s.change >= 0 ? 'up' : 'down'} {Math.abs(s.change)}%</li>
        ))}
      </ul>

      <div style={{ display: 'flex', gap: 'var(--sp-6)', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)', marginBottom: 2 }}>Top mover</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--fs-sm)', color: 'var(--green)', fontWeight: 'var(--fw-semibold)' }}>
            <TrendingUp size={13} aria-hidden="true" /> {gainer.name} +{gainer.change}%
          </div>
        </div>
        <div>
          <div style={{ fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)', marginBottom: 2 }}>Cooling off</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--fs-sm)', color: 'var(--red)', fontWeight: 'var(--fw-semibold)' }}>
            <TrendingDown size={13} aria-hidden="true" /> {loser.name} {loser.change}%
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'var(--sp-4)', fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)', fontStyle: 'italic' }}>
        Illustrative — derived from proficiency level, not real market data.
      </div>
    </Card>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Explore() {
  const [domain, setDomain] = useState('all')
  const [tagFilters, setTagFilters] = useState([])
  const [query, setQuery] = useState('')

  const domainSkills = useMemo(
    () => (domain === 'all' ? skills : skills.filter(s => s.domain === domain)),
    [domain]
  )
  const domainProjects = useMemo(
    () => (domain === 'all' ? projects : projects.filter(p => p.domain === domain)),
    [domain]
  )

  const availableTags = useMemo(() => {
    const set = new Set()
    domainProjects.forEach(p => p.tags.forEach(t => set.add(t)))
    return Array.from(set).sort()
  }, [domainProjects])

  // Drop any selected tag that's no longer valid after a domain switch
  useEffect(() => {
    setTagFilters(prev => prev.filter(t => availableTags.includes(t)))
  }, [availableTags])

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase()
    return domainProjects.filter(p => {
      const matchesQuery = !q
        || p.title.toLowerCase().includes(q)
        || p.description.toLowerCase().includes(q)
        || p.tags.some(t => t.toLowerCase().includes(q))
      const matchesTags = tagFilters.length === 0 || tagFilters.every(t => p.tags.includes(t))
      return matchesQuery && matchesTags
    })
  }, [domainProjects, query, tagFilters])

  function toggleTag(tag) {
    setTagFilters(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]))
  }

  const hasActiveFilters = domain !== 'all' || query !== '' || tagFilters.length > 0

  function clearFilters() {
    setDomain('all')
    setQuery('')
    setTagFilters([])
  }

  return (
    <div className="anim-page-enter" style={{ minHeight: '100vh' }}>
      <div className="page-content-wide">

        {/* ── Search ── */}
        <Input
          placeholder="Search projects, tech, domains…"
          leftIcon={Search}
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search projects and skills"
          style={{ marginBottom: 'var(--sp-5)' }}
        />

        {/* ── Domain filter ── */}
        <div
          role="group"
          aria-label="Filter by domain"
          style={{
            display: 'flex',
            gap: 'var(--sp-2)',
            overflowX: 'auto',
            paddingBottom: 'var(--sp-1)',
            marginBottom: 'var(--sp-6)',
            scrollbarWidth: 'none',
          }}
        >
          {DOMAINS.map(d => (
            <DomainChip key={d.id} {...d} active={domain === d.id} onClick={() => setDomain(d.id)} />
          ))}
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" leftIcon={X} onClick={clearFilters} style={{ flexShrink: 0 }}>
              Clear
            </Button>
          )}
        </div>

        {/* ── Skill market cap widget ── */}
        <div style={{ marginBottom: 'var(--sp-6)' }}>
          <MarketCapWidget items={domainSkills} />
        </div>

        {/* ── Tech stack breakdown ── */}
        <div style={{ marginBottom: 'var(--sp-6)' }}>
          <SectionHeader icon={Code2} label="Tech Stack Breakdown" />
          {domainSkills.length > 0 ? (
            <Card variant="base" padding="lg" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
              {domainSkills.map(s => <SkillBar key={s.name} {...s} />)}
            </Card>
          ) : (
            <EmptyState label="No proficiency data logged for this domain yet." />
          )}
        </div>

        {/* ── Tag filter ── */}
        {availableTags.length > 0 && (
          <div style={{ marginBottom: 'var(--sp-5)' }}>
            <SectionHeader icon={Tag} label="Filter by tech" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
              {availableTags.map(tag => (
                <TagChip key={tag} tag={tag} active={tagFilters.includes(tag)} onClick={() => toggleTag(tag)} />
              ))}
            </div>
          </div>
        )}

        {/* ── Results ── */}
        <div>
          <SectionHeader
            icon={Compass}
            label={`Projects${filteredProjects.length ? ` (${filteredProjects.length})` : ''}`}
          />
          {filteredProjects.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'var(--sp-4)',
            }}>
              {filteredProjects.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} pinned={post.pinned} />
              ))}
            </div>
          ) : (
            <EmptyState label="No projects match these filters yet. Try clearing a filter or broadening your search." />
          )}
        </div>

      </div>
    </div>
  )
}
