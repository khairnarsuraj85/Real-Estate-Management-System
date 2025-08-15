export const properties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    price: 1250000,
    location: "Beverly Hills, CA",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    images: [
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Stunning modern villa with panoramic city views, premium finishes, and smart home technology.",
    amenities: ["Swimming Pool", "Garage", "Garden", "Security System", "Smart Home"],
    yearBuilt: 2020,
    status: "For Sale",
    agent: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah@estatevision.com"
    }
  },
  {
    id: 2,
    title: "Downtown Penthouse",
    price: 850000,
    location: "Manhattan, NY",
    type: "Penthouse",
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    images: [
      "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Luxurious penthouse in the heart of Manhattan with floor-to-ceiling windows and private terrace.",
    amenities: ["City View", "Terrace", "Concierge", "Gym", "Parking"],
    yearBuilt: 2018,
    status: "For Sale",
    agent: {
      name: "Michael Chen",
      phone: "+1 (555) 234-5678",
      email: "michael@estatevision.com"
    }
  },
  {
    id: 3,
    title: "Coastal Family Home",
    price: 675000,
    location: "Malibu, CA",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    images: [
      "https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Beautiful coastal home with direct beach access, perfect for family living and entertaining.",
    amenities: ["Beach Access", "Deck", "Fireplace", "Ocean View", "Parking"],
    yearBuilt: 2015,
    status: "For Rent",
    agent: {
      name: "Emily Rodriguez",
      phone: "+1 (555) 345-6789",
      email: "emily@estatevision.com"
    }
  },
  {
    id: 4,
    title: "Urban Loft Apartment",
    price: 425000,
    location: "Brooklyn, NY",
    type: "Loft",
    bedrooms: 2,
    bathrooms: 2,
    area: 1800,
    images: [
      "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Converted industrial loft with exposed brick walls, high ceilings, and modern amenities.",
    amenities: ["High Ceilings", "Exposed Brick", "Modern Kitchen", "Parking", "Rooftop Access"],
    yearBuilt: 2019,
    status: "For Sale",
    agent: {
      name: "David Thompson",
      phone: "+1 (555) 456-7890",
      email: "david@estatevision.com"
    }
  },
  {
    id: 5,
    title: "Suburban Family Estate",
    price: 950000,
    location: "Westchester, NY",
    type: "Estate",
    bedrooms: 6,
    bathrooms: 5,
    area: 5500,
    images: [
      "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Spacious family estate on 2 acres with tennis court, pool, and three-car garage.",
    amenities: ["Tennis Court", "Swimming Pool", "Large Garden", "3-Car Garage", "Home Office"],
    yearBuilt: 2012,
    status: "For Sale",
    agent: {
      name: "Lisa Park",
      phone: "+1 (555) 567-8901",
      email: "lisa@estatevision.com"
    }
  },
  {
    id: 6,
    title: "Modern Condo Tower",
    price: 320000,
    location: "Austin, TX",
    type: "Condo",
    bedrooms: 1,
    bathrooms: 1,
    area: 900,
    images: [
      "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Sleek studio condo in downtown Austin with amenities and city views.",
    amenities: ["City View", "Gym", "Pool", "Concierge", "Parking"],
    yearBuilt: 2021,
    status: "For Rent",
    agent: {
      name: "James Wilson",
      phone: "+1 (555) 678-9012",
      email: "james@estatevision.com"
    }
  }
];

export const analyticsData = {
  marketTrends: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Price ($)',
        data: [650000, 675000, 680000, 695000, 710000, 725000],
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        tension: 0.4
      }
    ]
  },
  propertyTypes: {
    labels: ['Houses', 'Condos', 'Apartments', 'Villas', 'Lofts'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#667eea',
          '#f093fb',
          '#4facfe',
          '#43e97b',
          '#fa709a'
        ]
      }
    ]
  },
  salesVolume: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Properties Sold',
        data: [120, 145, 160, 135],
        backgroundColor: 'rgba(102, 126, 234, 0.8)'
      }
    ]
  },
  locationPopularity: [
    { location: 'Manhattan, NY', count: 45, growth: '+12%' },
    { location: 'Beverly Hills, CA', count: 38, growth: '+8%' },
    { location: 'Miami, FL', count: 32, growth: '+15%' },
    { location: 'Austin, TX', count: 28, growth: '+22%' },
    { location: 'Seattle, WA', count: 25, growth: '+6%' }
  ]
};