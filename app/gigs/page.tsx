
import { Header } from "@/components/navigation/header"
import { GigsBrowse } from "@/components/gigs/gigs-browse"

export default function GigsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <GigsBrowse />
    </div>
  )
}
