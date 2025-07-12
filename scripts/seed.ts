
import { PrismaClient, UserRole, GigCategory, VerificationStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed process...')

  // Clear existing data
  console.log('🗑️ Clearing existing data...')
  await prisma.review.deleteMany()
  await prisma.message.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.contract.deleteMany()
  await prisma.projectArtist.deleteMany()
  await prisma.projectClient.deleteMany()
  await prisma.project.deleteMany()
  await prisma.gigApplication.deleteMany()
  await prisma.gig.deleteMany()
  await prisma.portfolioItem.deleteMany()
  await prisma.portfolio.deleteMany()
  await prisma.subscription.deleteMany()
  await prisma.artistProfile.deleteMany()
  await prisma.clientProfile.deleteMany()
  await prisma.userProfile.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()
  await prisma.brooklynNeighborhood.deleteMany()

  // Seed Brooklyn neighborhoods
  console.log('🏙️ Creating Brooklyn neighborhoods...')
  const neighborhoods = [
    { name: 'Williamsburg', slug: 'williamsburg', latitude: 40.7081, longitude: -73.9571 },
    { name: 'DUMBO', slug: 'dumbo', latitude: 40.7033, longitude: -73.9917 },
    { name: 'Park Slope', slug: 'park-slope', latitude: 40.6782, longitude: -73.9776 },
    { name: 'Bushwick', slug: 'bushwick', latitude: 40.6948, longitude: -73.9165 },
    { name: 'Red Hook', slug: 'red-hook', latitude: 40.6741, longitude: -74.0121 },
    { name: 'Carroll Gardens', slug: 'carroll-gardens', latitude: 40.6781, longitude: -73.9995 },
    { name: 'Cobble Hill', slug: 'cobble-hill', latitude: 40.6853, longitude: -73.9965 },
    { name: 'Brooklyn Heights', slug: 'brooklyn-heights', latitude: 40.6962, longitude: -73.9935 },
    { name: 'Fort Greene', slug: 'fort-greene', latitude: 40.6914, longitude: -73.9740 },
    { name: 'Prospect Heights', slug: 'prospect-heights', latitude: 40.6788, longitude: -73.9708 },
    { name: 'Gowanus', slug: 'gowanus', latitude: 40.6740, longitude: -73.9885 },
    { name: 'Sunset Park', slug: 'sunset-park', latitude: 40.6531, longitude: -74.0137 },
    { name: 'Bay Ridge', slug: 'bay-ridge', latitude: 40.6263, longitude: -74.0276 },
    { name: 'Crown Heights', slug: 'crown-heights', latitude: 40.6683, longitude: -73.9442 },
    { name: 'Bed-Stuy', slug: 'bed-stuy', latitude: 40.6895, longitude: -73.9441 }
  ]

  const createdNeighborhoods = await Promise.all(
    neighborhoods.map(n => 
      prisma.brooklynNeighborhood.create({ data: n })
    )
  )

  // Test admin user (required)
  console.log('👤 Creating test admin user...')
  const hashedAdminPassword = await bcrypt.hash('johndoe123', 12)
  
  await prisma.user.create({
    data: {
      email: 'john@doe.com',
      password: hashedAdminPassword,
      role: UserRole.CLIENT,
      profile: {
        create: {
          firstName: 'John',
          lastName: 'Doe',
        }
      },
      clientProfile: {
        create: {
          companyName: 'Admin Test Company',
          companySize: '1-10',
          industry: 'Technology',
          description: 'Test admin account for platform testing',
          neighborhoodId: createdNeighborhoods[0].id,
          location: 'Brooklyn, NY'
        }
      },
      subscription: {
        create: {
          tier: 'PRO',
          active: true,
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        }
      }
    }
  })

  // Create sample artists
  console.log('🎨 Creating sample artists...')
  const artists = [
    {
      email: 'maya.rodriguez@email.com',
      firstName: 'Maya',
      lastName: 'Rodriguez',
      businessName: 'Maya Rodriguez Art',
      skills: ['Street Art', 'Murals', 'Community Art', 'Spray Paint'],
      experienceYears: 8,
      hourlyRate: 85.00,
      portfolioTitle: 'Community Storytelling Through Murals',
      portfolioDescription: 'I specialize in large-scale community murals that tell the stories of Brooklyn neighborhoods.',
      verificationStatus: VerificationStatus.VERIFIED,
      neighborhood: createdNeighborhoods[0], // Williamsburg
      category: GigCategory.MURALIST
    },
    {
      email: 'james.chen@email.com',
      firstName: 'James',
      lastName: 'Chen',
      businessName: 'Chen Design Studio',
      skills: ['Brand Identity', 'Logo Design', 'Print Design', 'Digital Marketing'],
      experienceYears: 6,
      hourlyRate: 75.00,
      portfolioTitle: 'Clean Modern Branding for Local Businesses',
      portfolioDescription: 'Helping Brooklyn businesses stand out with memorable, effective design.',
      verificationStatus: VerificationStatus.VERIFIED,
      neighborhood: createdNeighborhoods[1], // DUMBO
      category: GigCategory.GRAPHIC_DESIGNER
    },
    {
      email: 'sarah.williams@email.com',
      firstName: 'Sarah',
      lastName: 'Williams',
      businessName: 'Williams Photography',
      skills: ['Event Photography', 'Portraits', 'Wedding Photography', 'Commercial'],
      experienceYears: 10,
      hourlyRate: 120.00,
      portfolioTitle: 'Capturing Authentic Brooklyn Moments',
      portfolioDescription: 'Professional photography that captures the real essence of people and places.',
      verificationStatus: VerificationStatus.VERIFIED,
      neighborhood: createdNeighborhoods[2], // Park Slope
      category: GigCategory.PHOTOGRAPHER
    },
    {
      email: 'alex.thompson@email.com',
      firstName: 'Alex',
      lastName: 'Thompson',
      businessName: 'Thompson Digital',
      skills: ['Web Development', 'UI/UX Design', 'E-commerce', 'Responsive Design'],
      experienceYears: 7,
      hourlyRate: 95.00,
      portfolioTitle: 'Modern Web Experiences for Creative Businesses',
      portfolioDescription: 'Building beautiful, functional websites that help creative businesses thrive online.',
      verificationStatus: VerificationStatus.VERIFIED,
      neighborhood: createdNeighborhoods[3], // Bushwick
      category: GigCategory.WEB_DESIGNER
    }
  ]

  const createdArtists = []
  for (const artist of artists) {
    const hashedPassword = await bcrypt.hash('password123', 12)
    const { neighborhood, category, ...artistData } = artist
    
    const user = await prisma.user.create({
      data: {
        email: artist.email,
        password: hashedPassword,
        role: UserRole.ARTIST,
        profile: {
          create: {
            firstName: artistData.firstName,
            lastName: artistData.lastName,
          }
        },
        artistProfile: {
          create: {
            businessName: artistData.businessName,
            skills: artistData.skills,
            experienceYears: artistData.experienceYears,
            hourlyRate: artistData.hourlyRate,
            portfolioTitle: artistData.portfolioTitle,
            portfolioDescription: artistData.portfolioDescription,
            verificationStatus: artistData.verificationStatus,
            neighborhoodId: neighborhood.id,
            location: `${neighborhood.name}, Brooklyn`,
            isOpenToWork: true,
            completedProjects: Math.floor(Math.random() * 15) + 5,
            averageRating: 4.5 + Math.random() * 0.5
          }
        }
      },
      include: {
        artistProfile: true
      }
    })
    
    createdArtists.push({ user, category })
  }

  // Create sample clients
  console.log('🏢 Creating sample clients...')
  const clients = [
    {
      email: 'maria.santos@brooklynroasters.com',
      firstName: 'Maria',
      lastName: 'Santos',
      companyName: 'Brooklyn Roasters',
      companySize: '11-50',
      industry: 'Food & Beverage',
      description: 'Local coffee shop chain looking for creative branding and murals',
      neighborhood: createdNeighborhoods[4] // Red Hook
    },
    {
      email: 'david.kim@techstartup.com',
      firstName: 'David',
      lastName: 'Kim',
      companyName: 'InnovateNYC',
      companySize: '1-10',
      industry: 'Technology',
      description: 'Tech startup needing branding, web design, and marketing materials',
      neighborhood: createdNeighborhoods[1] // DUMBO
    }
  ]

  const createdClients = []
  for (const client of clients) {
    const hashedPassword = await bcrypt.hash('password123', 12)
    const { neighborhood, ...clientData } = client
    
    const user = await prisma.user.create({
      data: {
        email: client.email,
        password: hashedPassword,
        role: UserRole.CLIENT,
        profile: {
          create: {
            firstName: clientData.firstName,
            lastName: clientData.lastName,
          }
        },
        clientProfile: {
          create: {
            companyName: clientData.companyName,
            companySize: clientData.companySize,
            industry: clientData.industry,
            description: clientData.description,
            neighborhoodId: neighborhood.id,
            location: `${neighborhood.name}, Brooklyn`
          }
        }
      },
      include: {
        clientProfile: true
      }
    })
    
    createdClients.push(user)
  }

  // Create portfolios for artists
  console.log('🎨 Creating artist portfolios...')
  for (const { user, category } of createdArtists) {
    const portfolio = await prisma.portfolio.create({
      data: {
        artistId: user.artistProfile!.id,
        title: 'Featured Work',
        description: 'A collection of my best projects',
        isPublic: true,
        coverImage: getPortfolioImage(category)
      }
    })

    // Add portfolio items
    const portfolioItems = getPortfolioItems(category)
    for (let i = 0; i < portfolioItems.length; i++) {
      await prisma.portfolioItem.create({
        data: {
          portfolioId: portfolio.id,
          title: portfolioItems[i].title,
          description: portfolioItems[i].description,
          imageUrl: portfolioItems[i].imageUrl,
          category: category,
          tags: portfolioItems[i].tags,
          order: i
        }
      })
    }
  }

  // Create sample gigs
  console.log('💼 Creating sample gigs...')
  const sampleGigs = [
    {
      clientId: createdClients[0].clientProfile!.id,
      title: 'Coffee Shop Exterior Mural',
      description: 'Looking for a vibrant mural for our new Brooklyn Roasters location. Should reflect coffee culture and local community.',
      category: GigCategory.MURALIST,
      budget: 2500.00,
      budgetType: 'fixed',
      timeline: '2-3 weeks',
      requirements: ['Experience with outdoor murals', 'Portfolio of food/beverage themed work', 'Available for site visits'],
      skills: ['Mural Painting', 'Weather-resistant paints', 'Community engagement'],
      neighborhoodId: createdNeighborhoods[4].id,
      location: 'Red Hook, Brooklyn',
      isRemote: false,
      featured: true,
      deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000)
    },
    {
      clientId: createdClients[1].clientProfile!.id,
      title: 'Tech Startup Brand Identity',
      description: 'Complete brand identity package for our innovative tech startup. Need logo, business cards, and brand guidelines.',
      category: GigCategory.GRAPHIC_DESIGNER,
      budget: 1800.00,
      budgetType: 'fixed',
      timeline: '2 weeks',
      requirements: ['Tech industry experience', 'Modern design aesthetic', 'Brand strategy knowledge'],
      skills: ['Logo Design', 'Brand Identity', 'Print Design', 'Digital Assets'],
      neighborhoodId: createdNeighborhoods[1].id,
      location: 'DUMBO, Brooklyn',
      isRemote: true,
      featured: false,
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    }
  ]

  for (const gigData of sampleGigs) {
    await prisma.gig.create({ data: gigData })
  }

  console.log('✅ Seed completed successfully!')
  console.log('📊 Created:')
  console.log(`  - ${neighborhoods.length} Brooklyn neighborhoods`)
  console.log(`  - ${artists.length + 1} users (including test admin)`)
  console.log(`  - ${artists.length} artist profiles with portfolios`)
  console.log(`  - ${clients.length} client profiles`)
  console.log(`  - ${sampleGigs.length} sample gigs`)
  console.log('\n🔑 Test Accounts:')
  console.log('  Admin: john@doe.com / johndoe123')
  console.log('  Artist: maya.rodriguez@email.com / password123')
  console.log('  Client: maria.santos@brooklynroasters.com / password123')
}

function getPortfolioImage(category: GigCategory): string {
  switch (category) {
    case GigCategory.MURALIST:
      return 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop'
    case GigCategory.GRAPHIC_DESIGNER:
      return 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop'
    case GigCategory.PHOTOGRAPHER:
      return 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop'
    case GigCategory.WEB_DESIGNER:
      return 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop'
    default:
      return 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop'
  }
}

function getPortfolioItems(category: GigCategory) {
  switch (category) {
    case GigCategory.MURALIST:
      return [
        {
          title: 'Community Garden Mural',
          description: 'Large-scale mural celebrating local urban farming',
          imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop',
          tags: ['Community Art', 'Nature', 'Urban Farming']
        },
        {
          title: 'Restaurant Interior Mural',
          description: 'Custom mural design for local restaurant',
          imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
          tags: ['Interior Design', 'Food & Beverage', 'Custom Art']
        }
      ]
    case GigCategory.GRAPHIC_DESIGNER:
      return [
        {
          title: 'Local Bakery Brand Identity',
          description: 'Complete brand package including logo and packaging design',
          imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
          tags: ['Brand Identity', 'Logo Design', 'Packaging']
        },
        {
          title: 'Music Festival Poster Series',
          description: 'Event poster designs for Brooklyn music festival',
          imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
          tags: ['Event Design', 'Poster Design', 'Music']
        }
      ]
    case GigCategory.PHOTOGRAPHER:
      return [
        {
          title: 'Brooklyn Wedding Photography',
          description: 'Intimate wedding ceremony in Prospect Park',
          imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop',
          tags: ['Wedding Photography', 'Couples', 'Outdoor']
        },
        {
          title: 'Restaurant Food Photography',
          description: 'Commercial food photography for local restaurant menu',
          imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop',
          tags: ['Food Photography', 'Commercial', 'Menu Design']
        }
      ]
    case GigCategory.WEB_DESIGNER:
      return [
        {
          title: 'Artist Portfolio Website',
          description: 'Custom portfolio website for local painter',
          imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
          tags: ['Web Design', 'Portfolio', 'Artist Website']
        },
        {
          title: 'E-commerce Store Design',
          description: 'Online store for handmade jewelry business',
          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
          tags: ['E-commerce', 'Online Store', 'Jewelry']
        }
      ]
    default:
      return []
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
