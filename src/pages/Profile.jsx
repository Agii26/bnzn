import { User } from 'lucide-react'
import PagePlaceholder from '@/components/ui/PagePlaceholder'

export default function Profile() {
  return (
    <PagePlaceholder
      icon={User}
      color="purple"
      title="Profile"
      phase={3}
      description="Your full social profile — avatar, banner, bio, stats, pinned post, and story highlight rings showcasing key career moments."
      features={[
        'Profile header with avatar + gradient banner',
        'Bio, location, and available-for-work status',
        'Social-style stats: projects, skills, years exp',
        'Story highlight rings (achievements)',
        'Pinned project post',
        'Domain verification badges: Dev · Trading · Design',
      ]}
    />
  )
}
