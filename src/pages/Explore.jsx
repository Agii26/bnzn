import { Compass } from 'lucide-react'
import PagePlaceholder from '@/components/ui/PagePlaceholder'

export default function Explore() {
  return (
    <PagePlaceholder
      icon={Compass}
      title="Explore"
      phase={4}
      description="Discover skills, filter projects by technology or domain, and explore the full technology stack behind every build."
      features={[
        'Filter projects by tag, domain, or tech stack',
        'Skill market cap widget (like crypto tickers)',
        'Tech stack breakdown with proficiency bars',
        'Domain explorer: Dev · Trading · Design',
        'Search across all projects and posts',
        'Related / trending skills feed',
      ]}
    />
  )
}
