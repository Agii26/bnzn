import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, TrendingDown, ArrowRight, Zap } from 'lucide-react'
import { Avatar, Badge, Button, Card, Tooltip } from '@/components/ui'

/**
 * RightPanel — Phase 2 component (desktop only, ≥1024px)
 *
 * Three sections:
 *   1. Profile mini-card  — Avatar, name, handle, live status
 *   2. Top Skills         — 5 Badge pills representing strongest domains
 *   3. Bull/Bear Poll     — "Bullish on Benzon?" sentiment vote
 *                           (Zustand-backed in Phase 5; local state for now)
 *
 * Width: var(--right-panel-width) = 280px
 */

const TOP_SKILLS = ['React', 'Python', 'Vite', 'Django', 'TypeScript']

export default function RightPanel() {
  const navigate = useNavigate()

  // Local vote state — wired to Zustand in Phase 5
  const [votes, setVotes] = useState({ bull: 24, bear: 3 })
  const [voted, setVoted] = useState(null) // 'bull' | 'bear' | null

  function handleVote(side) {
    if (voted) return // already voted
    setVoted(side)
    setVotes(v => ({ ...v, [side]: v[side] + 1 }))
  }

  const totalVotes = votes.bull + votes.bear
  const bullPct    = Math.round((votes.bull / totalVotes) * 100)

  return (
    <aside
      aria-label="Profile panel"
      style={{
        width:        'var(--right-panel-width)',
        flexShrink:   0,
        borderLeft:   '1px solid var(--border)',
        height:       '100vh',
        overflowY:    'auto',
        overflowX:    'hidden',
        padding:      'var(--sp-5)',
        display:      'flex',
        flexDirection:'column',
        gap:          'var(--sp-4)',
        background:   'var(--bg)',
        position:     'sticky',
        top:          0,
      }}
    >

      {/* ── 1. Profile mini-card ── */}
      <Card variant="raised" style={{ padding: 'var(--sp-4)' }}>

        {/* Avatar + name row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-3)' }}>
          <Avatar name="Benzon" size="md" status="online" ring />
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily:   'var(--font-heading)',
              fontSize:     'var(--fs-sm)',
              fontWeight:   'var(--fw-bold)',
              color:        'var(--text)',
              lineHeight:   1.2,
              overflow:     'hidden',
              textOverflow: 'ellipsis',
              whiteSpace:   'nowrap',
            }}>
              Benzon
            </div>
            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: 2 }}>
              @benzon
            </div>
          </div>
        </div>

        {/* Live status row */}
        <div style={{
          display:      'flex',
          alignItems:   'center',
          gap:          'var(--sp-2)',
          background:   'var(--green-faint)',
          border:       '1px solid var(--green-glow)',
          borderRadius: 'var(--radius-md)',
          padding:      'var(--sp-2) var(--sp-3)',
          marginBottom: 'var(--sp-3)',
        }}>
          <div
            className="anim-breathe"
            aria-hidden="true"
            style={{
              width:        7,
              height:       7,
              borderRadius: '50%',
              background:   'var(--green)',
              flexShrink:   0,
            }}
          />
          <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--green)', fontWeight: 'var(--fw-semibold)' }}>
            Available for work
          </span>
        </div>

        {/* View Profile button */}
        <Button
          variant="ghost"
          size="sm"
          rightIcon={ArrowRight}
          onClick={() => navigate('/profile')}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          View Full Profile
        </Button>
      </Card>

      {/* ── 2. Top Skills ── */}
      <Card variant="raised" style={{ padding: 'var(--sp-4)' }}>
        <div style={{
          display:      'flex',
          alignItems:   'center',
          gap:          'var(--sp-2)',
          marginBottom: 'var(--sp-3)',
        }}>
          <Zap size={14} aria-hidden="true" style={{ color: 'var(--amber)' }} />
          <span style={{
            fontSize:   'var(--fs-xs)',
            fontWeight: 'var(--fw-semibold)',
            color:      'var(--text-sub)',
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
          }}>
            Top Skills
          </span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
          {TOP_SKILLS.map(label => (
            <Tooltip key={label} content={label} position="top">
              <Badge variant="outline" color="gray" size="sm">
                {label}
              </Badge>
            </Tooltip>
          ))}
        </div>

        {/* Teaser — full skill market cap view in Phase 4 */}
        <div style={{
          marginTop:  'var(--sp-3)',
          fontSize:   'var(--fs-2xs)',
          color:      'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
        }}>
          Full skill P&amp;L chart → Phase 4
        </div>
      </Card>

      {/* ── 3. Bull/Bear Poll ── */}
      <Card variant="raised" style={{ padding: 'var(--sp-4)' }}>

        {/* Header */}
        <div style={{ marginBottom: 'var(--sp-3)' }}>
          <div style={{
            fontSize:   'var(--fs-sm)',
            fontWeight: 'var(--fw-bold)',
            color:      'var(--text)',
            marginBottom: 4,
          }}>
            Bullish on Benzon?
          </div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
            {totalVotes} votes · {voted ? 'voted' : 'cast your vote'}
          </div>
        </div>

        {/* Vote buttons */}
        <div style={{ display: 'flex', gap: 'var(--sp-2)', marginBottom: 'var(--sp-3)' }}>

          {/* Bull */}
          <button
            type="button"
            onClick={() => handleVote('bull')}
            disabled={!!voted}
            aria-label="Vote bullish"
            aria-pressed={voted === 'bull'}
            style={{
              flex:           1,
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              gap:            4,
              padding:        'var(--sp-3) var(--sp-2)',
              borderRadius:   'var(--radius-md)',
              border:         `1px solid ${voted === 'bull' ? 'var(--green-glow)' : 'var(--border)'}`,
              background:     voted === 'bull' ? 'var(--green-faint)' : 'var(--surf)',
              cursor:         voted ? 'not-allowed' : 'pointer',
              opacity:        voted && voted !== 'bull' ? 0.5 : 1,
              transition:     'all var(--transition-fast)',
              color:          voted === 'bull' ? 'var(--green)' : 'var(--text-sub)',
              minHeight:      56,
            }}
            onMouseEnter={e => { if (!voted) e.currentTarget.style.borderColor = 'var(--green-glow)' }}
            onMouseLeave={e => { if (!voted) e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            <TrendingUp size={18} strokeWidth={2} aria-hidden="true" />
            <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semibold)' }}>
              Bull
            </span>
            <span style={{ fontSize: 'var(--fs-2xs)', fontFamily: 'var(--font-mono)' }}>
              {votes.bull}
            </span>
          </button>

          {/* Bear */}
          <button
            type="button"
            onClick={() => handleVote('bear')}
            disabled={!!voted}
            aria-label="Vote bearish"
            aria-pressed={voted === 'bear'}
            style={{
              flex:           1,
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              gap:            4,
              padding:        'var(--sp-3) var(--sp-2)',
              borderRadius:   'var(--radius-md)',
              border:         `1px solid ${voted === 'bear' ? 'var(--red-glow)' : 'var(--border)'}`,
              background:     voted === 'bear' ? 'var(--red-faint)' : 'var(--surf)',
              cursor:         voted ? 'not-allowed' : 'pointer',
              opacity:        voted && voted !== 'bear' ? 0.5 : 1,
              transition:     'all var(--transition-fast)',
              color:          voted === 'bear' ? 'var(--red)' : 'var(--text-sub)',
              minHeight:      56,
            }}
            onMouseEnter={e => { if (!voted) e.currentTarget.style.borderColor = 'var(--red-glow)' }}
            onMouseLeave={e => { if (!voted) e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            <TrendingDown size={18} strokeWidth={2} aria-hidden="true" />
            <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semibold)' }}>
              Bear
            </span>
            <span style={{ fontSize: 'var(--fs-2xs)', fontFamily: 'var(--font-mono)' }}>
              {votes.bear}
            </span>
          </button>
        </div>

        {/* Bull % bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>
              {bullPct}% bull
            </span>
            <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--red)', fontFamily: 'var(--font-mono)' }}>
              {100 - bullPct}% bear
            </span>
          </div>

          {/* Progress track */}
          <div style={{
            height:       6,
            borderRadius: 'var(--radius-full)',
            background:   'var(--red-faint)',
            overflow:     'hidden',
            border:       '1px solid var(--border)',
          }}>
            <div style={{
              height:     '100%',
              width:      `${bullPct}%`,
              background: 'var(--green)',
              borderRadius: 'var(--radius-full)',
              transition: 'width var(--transition-base)',
            }} />
          </div>
        </div>
      </Card>

    </aside>
  )
}
