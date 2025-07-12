
import { Header } from "@/components/navigation/header"
import { ArtistsBrowse } from "@/components/artists/artists-browse"

export default function ArtistsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ArtistsBrowse />
    </div>
  )
}
