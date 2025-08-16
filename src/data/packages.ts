import { Package, SriLankaPackage, MaldivesPackage } from '../types/package';
import { getAssetPath } from '@/lib/utils';

// Sample Sri Lanka Packages with complete details
const sriLankaPackages: SriLankaPackage[] = [
  {
    id: 'sl-001',
    type: 'sriLanka',
    title: '5N6D SRI LANKA TOUR',
    shortDescription: 'Experience the best of Sri Lanka in 6 days covering Kandy, Bentota, and Colombo with cultural sites, beaches, and city exploration.',
    longDescription: 'Embark on an extraordinary 6-day journey through Sri Lanka\'s most captivating destinations. From the cultural heart of Kandy to the pristine beaches of Bentota and the vibrant city of Colombo, this tour offers the perfect blend of heritage, nature, and modern experiences.',
    imageUrl: getAssetPath('/assets/images/Sri_Lankan_01.jpg'),
    price: 424,
    duration: '5 nights / 6 days',
    highlights: [
      'Visit Pinnawala Elephant Orphanage',
      'Explore the Temple of the Sacred Tooth Relic in Kandy',
      'Experience traditional Kandyan Cultural Show',
      'Tour Royal Botanical Garden at Peradeniya',
      'Relax at beautiful Bentota beaches',
      'Comprehensive Colombo city tour'
    ],
    inclusions: [
      '2 nights accommodation in Kandy with breakfast and dinner',
      '2 nights accommodation in Bentota with breakfast and dinner', 
      '1 night accommodation in Colombo with breakfast and dinner',
      'All transfers and sightseeing by air-conditioned vehicle',
      'English speaking licensed driver/guide throughout the tour',
      'Entrance fees to major attractions',
      'All taxes and banking charges'
    ],
    exclusions: [
      'Lunch and beverages',
      'Kandy Esala Perehera supplement',
      'Water Sports',
      'Extras of personal nature',
      'Tips and gratuities',
      'Extra services other than those specified'
    ],
    detailedItinerary: [
      {
        day: 1,
        title: 'ARRIVAL COLOMBO – PINNAWALA – KANDY',
        description: 'Welcome to Sri Lanka! Your adventure begins with arrival in Colombo and transfer to the cultural capital, Kandy.',
        activities: [
          'Arrival at Colombo International Airport at 13:00 Hrs (Approx)',
          'Onward transfer to Kandy (4 hrs)',
          'Enroute visit Pinnawala Elephant Orphanage',
          'Lunch at a restaurant (direct payment)',
          'Upon arrival at Kandy, transfer to hotel and check-in',
          'Dinner and overnight in Kandy'
        ],
        meals: ['Dinner'],
        accommodation: 'Kandy Hotel'
      },
      {
        day: 2,
        title: 'KANDY',
        description: 'Immerse yourself in the rich cultural heritage of Kandy with temple visits and cultural performances.',
        activities: [
          'Breakfast at hotel',
          'Morning visit to the Holy Tooth Relic Temple for observing the puja ceremony (09:30 AM Puja)',
          'Later visit the Royal Sacred City',
          'Orientation tour covering Kandy lake, university area etc.',
          'Lunch at a restaurant (direct payment)',
          'In the late afternoon Kandyan Cultural Show',
          'Dinner and overnight in Kandy'
        ],
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Kandy Hotel'
      },
      {
        day: 3,
        title: 'KANDY – PERADENIYA - BENTOTA',
        description: 'Journey from the hill country to the coast, visiting botanical gardens and tea plantations.',
        activities: [
          'Breakfast and check-out',
          'Transfer to Bentota via Peradeniya',
          'Enroute visit a Tea Plantation',
          'Upon arrival at Peradeniya, visit the Royal Botanical Garden',
          'Lunch at a restaurant (direct payment)',
          'Continue transfer to Bentota',
          'Free afternoon for leisure and exploration',
          'Dinner and overnight in Bentota'
        ],
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Bentota Hotel'
      },
      {
        day: 4,
        title: 'BENTOTA',
        description: 'Explore the southern coast with visits to historic Galle and beautiful Mirissa.',
        activities: [
          'Breakfast at hotel',
          'Morning half day tour of Galle and Mirissa',
          'Lunch at a restaurant (direct payment)',
          'Free afternoon at Bentota beach',
          'Dinner and overnight in Bentota'
        ],
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Bentota Hotel'
      },
      {
        day: 5,
        title: 'BENTOTA – COLOMBO',
        description: 'Experience the vibrant capital city with comprehensive sightseeing before your final night.',
        activities: [
          'Breakfast at hotel',
          'Free morning in Bentota',
          'Checkout at midday and transfer to Colombo',
          'Lunch at a restaurant (direct payment)',
          'Upon arrival in Colombo, orientation tour covering Gangaramaya Temple, Independence Square, Galle Face, Beira Lake, Colombo National Museum, Viharamahadevi Park, Dutch Hospital & Pettah',
          'Transfer to hotel in Colombo',
          'Dinner and overnight in Colombo'
        ],
        meals: ['Breakfast', 'Dinner'],
        accommodation: 'Colombo Hotel'
      },
      {
        day: 6,
        title: 'DEPARTURE COLOMBO',
        description: 'Final departure with packed breakfast and airport transfer.',
        activities: [
          'At dawn checkout with packed breakfast',
          'Transfer to Colombo International Airport',
          'Board flight departing at 06:40 AM'
        ],
        meals: ['Packed Breakfast'],
        accommodation: 'Departure'
      }
    ],
    pricingTable: {
      currency: 'USD',
      validFrom: '01 MAY 2025',
      validTo: '31 OCT 2025',
      categories: [
        {
          name: '3 Star',
          prices: {
            '2Pax': 538,
            '4Pax': 424,
            '6Pax': 382,
            '8Pax': 348,
            'ExtraAdult': 519,
            'ChildWithBed': 269,
            'ChildWithoutBed': 135
          }
        },
        {
          name: '3.5 Star',
          prices: {
            '2Pax': 582,
            '4Pax': 467,
            '6Pax': 418,
            '8Pax': 386,
            'ExtraAdult': 552,
            'ChildWithBed': 291,
            'ChildWithoutBed': 146
          }
        },
        {
          name: '4 Star',
          prices: {
            '2Pax': 596,
            '4Pax': 482,
            '6Pax': 432,
            '8Pax': 398,
            'ExtraAdult': 578,
            'ChildWithBed': 298,
            'ChildWithoutBed': 149
          }
        },
        {
          name: '5 Star',
          prices: {
            '2Pax': 672,
            '4Pax': 556,
            '6Pax': 494,
            '8Pax': 462,
            'ExtraAdult': 664,
            'ChildWithBed': 336,
            'ChildWithoutBed': 168
          }
        }
      ]
    },
    supplements: [
      'On arrival lunch US$8 per person in a local restaurant'
    ],
    seasonalSupplements: {
      kandyEsalaPerehera: {
        period: '28th July to 10th August 2025',
        rates: {
          '3Star': 30,
          '3.5Star': 35,
          '4Star': 60,
          '5Star': 70
        }
      },
      peakSeason: {
        period: '01st July – 31st Aug 2025',
        rates: {
          '3Star': 10,
          '3.5Star': 15,
          '4Star': 20,
          '5Star': 25
        }
      }
    },
    hotelList: {
      '3Star': {
        Kandy: 'Travelers Nest Hotel',
        Beach: 'Blue Beach Hotel',
        Colombo: 'Grand Oriental Hotel'
      },
      '3.5Star': {
        Kandy: 'Topaz Hotel',
        Beach: 'Coral Sands Hotel',
        Colombo: 'Ocean Colombo Hotel'
      },
      '4Star': {
        Kandy: 'Thilanka Hotel',
        Beach: 'Laya Beach Hotel',
        Colombo: 'Mirage Hotel Colombo'
      },
      '5Star': {
        Kandy: 'Grand Kandyan Hotel',
        Beach: 'Blue Water Hotel & Spa',
        Colombo: 'NH Collection Colombo'
      }
    },
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Transfer to Kandy',
        description: 'Welcome to Sri Lanka! Upon arrival at Bandaranaike International Airport, you\'ll be met by your private guide and transferred to Kandy via Pinnawala.',
        activities: [
          'Airport pickup and welcome briefing',
          'Visit Pinnawala Elephant Orphanage',
          'Scenic drive to Kandy',
          'Check-in and evening at leisure'
        ]
      },
      {
        day: 2,
        title: 'Kandy Cultural Exploration',
        description: 'Immerse yourself in Kandy\'s rich cultural heritage with temple visits and traditional performances.',
        activities: [
          'Visit Temple of the Sacred Tooth Relic',
          'Kandy city tour including lake and markets',
          'Traditional Kandyan cultural show',
          'Evening at leisure'
        ]
      }
    ],
    featured: true,
    locations: ['Kandy', 'Bentota', 'Colombo', 'Pinnawala', 'Peradeniya', 'Galle'],
    culturalExperiences: [
      'Local crafts workshop'
    ]
  },
  {
    id: 'sl-002',
    type: 'sriLanka',
    title: 'Coastal Paradise Retreat',
    shortDescription: 'Relax on pristine beaches and discover the southern coast\'s colonial charm and natural beauty.',
    longDescription: 'Indulge in the ultimate coastal escape along Sri Lanka\'s pristine southern shores. This luxurious 7-day retreat balances idyllic beach relaxation with cultural discoveries, offering you the perfect mix of adventure and tranquility. From the historic colonial charm of Galle Fort to the untouched beaches of Tangalle and the vibrant marine life of Mirissa, this journey showcases the diverse beauty of Sri Lanka\'s coastline.',
    imageUrl: getAssetPath('/assets/images/Sri_Lankan_02.jpg'),
    price: 1800,
    duration: '7 days / 6 nights',
    highlights: [
      'Relax on pristine beaches along the southern coast',
      'Explore the historic Galle Fort, a UNESCO World Heritage site',
      'Whale watching excursion in Mirissa (seasonal)',
      'Visit traditional stilt fishermen',
      'Discover hidden coves and secluded beaches'
    ],
    inclusions: [
      'Luxury beachfront accommodation',
      'Daily breakfast and selected meals',
      'Private air-conditioned transportation',
      'English-speaking guide',
      'Whale watching tour (seasonal)',
      'Sunset cruise in Mirissa',
      'Welcome cocktail'
    ],
    exclusions: [
      'International airfare',
      'Visa fees',
      'Travel insurance',
      'Personal expenses',
      'Gratuities',
      'Optional activities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Transfer to Bentota',
        description: 'Upon arrival, you\'ll be transferred to your beachfront resort in Bentota, known for its golden sands and water sports opportunities.',
        activities: [
          'Airport pickup and welcome briefing',
          'Scenic coastal drive to Bentota',
          'Welcome dinner at beachside restaurant',
          'Evening at leisure to enjoy the resort'
        ]
      },
      {
        day: 2,
        title: 'Bentota Beach Day & River Safari',
        description: 'Enjoy a relaxing morning on the beach followed by an afternoon river safari on the Madu Ganga, home to mangroves and diverse wildlife.',
        activities: [
          'Morning yoga on the beach (optional)',
          'Leisure time for swimming and sunbathing',
          'Afternoon Madu Ganga river safari',
          'Visit to a cinnamon island'
        ]
      },
      {
        day: 3,
        title: 'Galle Fort Exploration',
        description: 'Travel to the historic Galle Fort, a UNESCO World Heritage site with its well-preserved colonial architecture and charming streets.',
        activities: [
          'Guided walking tour of Galle Fort',
          'Visit to the Maritime Museum and old churches',
          'Free time for shopping and photography',
          'Sunset views from the ramparts'
        ]
      },
      {
        day: 4,
        title: 'Mirissa Beach & Whale Watching',
        description: 'Transfer to Mirissa and embark on an early morning whale watching excursion (seasonal) to spot blue whales and dolphins.',
        activities: [
          'Early morning whale watching expedition (seasonal)',
          'Relaxation at Mirissa Beach',
          'Optional surfing lesson',
          'Seafood dinner on the beach'
        ]
      },
      {
        day: 5,
        title: 'Tangalle & Secret Beaches',
        description: 'Discover the less-crowded beaches of Tangalle, known for their pristine beauty and tranquility.',
        activities: [
          'Visit to secluded beaches',
          'Swimming and snorkeling opportunities',
          'Optional visit to sea turtle conservation project',
          'Sunset cocktails at clifftop location'
        ]
      },
      {
        day: 6,
        title: 'Weligama & Traditional Fishing',
        description: 'Explore Weligama Bay and witness the iconic stilt fishermen practicing their traditional fishing method.',
        activities: [
          'Photography session with stilt fishermen',
          'Visit to local fish market',
          'Cooking demonstration of Sri Lankan seafood dishes',
          'Farewell dinner with ocean views'
        ]
      },
      {
        day: 7,
        title: 'Leisure Day and Departure',
        description: 'Final day at leisure before transferring to the airport for your departure flight.',
        activities: [
          'Morning at leisure for last-minute shopping or beach time',
          'Checkout and airport transfer',
          'Assistance with departure formalities'
        ]
      }
    ],
    featured: true,
    locations: ['Bentota', 'Galle', 'Mirissa', 'Tangalle', 'Weligama'],
    culturalExperiences: [
      'Stilt fishing demonstration',
      'Local market visits',
      'Traditional mask making',
      'Seafood cooking class'
    ]
  },
  {
    id: 'sl-003',
    type: 'sriLanka',
    title: 'Tea Plantation & Hill Country Tour',
    shortDescription: 'Journey through misty mountains, lush tea estates, and colonial hill stations in Sri Lanka\'s picturesque highlands.',
    longDescription: 'Escape to the cool climes and verdant landscapes of Sri Lanka\'s central highlands on this enchanting 6-day journey. Wind your way through mist-covered mountains, emerald tea plantations, and charming colonial-era hill stations that seem frozen in time. From the scenic train ride to Ella and the tea factories of Nuwara Eliya to the biodiversity of Horton Plains National Park, this tour showcases the serene beauty and rich heritage of Sri Lanka\'s hill country.',
    imageUrl: getAssetPath('/assets/images/Sri_Lankan_03.jpg'),
    price: 1500,
    duration: '6 days / 5 nights',
    highlights: [
      'Scenic train journey through tea plantations',
      'Visit to working tea factories with tea tasting',
      'Hiking in Horton Plains National Park to World\'s End',
      'Exploration of colonial architecture in Nuwara Eliya',
      'Discover the Nine Arch Bridge and Little Adam\'s Peak in Ella'
    ],
    inclusions: [
      'Charming boutique hotel accommodation',
      'Daily breakfast and selected meals',
      'First-class train tickets',
      'Private transportation outside train journey',
      'English-speaking guide',
      'Tea factory tours and tastings',
      'National park entrance fees'
    ],
    exclusions: [
      'International airfare',
      'Visa fees',
      'Travel insurance',
      'Personal expenses',
      'Gratuities',
      'Alcoholic beverages'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Colombo to Kandy',
        description: 'Begin your hill country adventure with a drive from Colombo to Kandy, the last capital of the ancient kings of Sri Lanka.',
        activities: [
          'Morning departure from Colombo',
          'Stop at Peradeniya Botanical Gardens',
          'Visit to the Temple of the Sacred Tooth Relic',
          'Evening cultural dance performance'
        ]
      },
      {
        day: 2,
        title: 'Kandy to Nuwara Eliya',
        description: 'Journey to Nuwara Eliya, known as "Little England," visiting tea plantations and waterfalls along the way.',
        activities: [
          'Visit to tea plantation and factory',
          'Tea tasting experience',
          'Stop at Ramboda Falls',
          'Walking tour of colonial Nuwara Eliya'
        ]
      },
      {
        day: 3,
        title: 'Horton Plains National Park',
        description: 'Early morning excursion to Horton Plains National Park to witness World\'s End, a sheer cliff with a drop of about 4,000 feet.',
        activities: [
          'Sunrise departure to Horton Plains',
          'Hiking to World\'s End viewpoint',
          'Visit to Baker\'s Falls',
          'Afternoon golf or high tea at colonial hotel'
        ]
      },
      {
        day: 4,
        title: 'Train Journey to Ella',
        description: 'Experience one of the world\'s most beautiful train journeys from Nanu Oya to Ella, through stunning landscapes of tea plantations and mountains.',
        activities: [
          'Scenic train journey to Ella',
          'Photography stops at viewpoints',
          'Arrival and check-in at Ella accommodation',
          'Dinner with mountain views'
        ]
      },
      {
        day: 5,
        title: 'Ella Exploration',
        description: 'Discover the natural beauty of Ella with visits to the Nine Arch Bridge, Little Adam\'s Peak, and Ravana Falls.',
        activities: [
          'Morning hike to Little Adam\'s Peak',
          'Visit to the iconic Nine Arch Bridge',
          'Exploration of Ravana Falls',
          'Optional cooking class of hill country cuisine'
        ]
      },
      {
        day: 6,
        title: 'Descent to Coastal Plains and Departure',
        description: 'Descend from the highlands back to Colombo or directly to the airport, with stops at interesting sites along the way.',
        activities: [
          'Morning at leisure in Ella',
          'Scenic drive through changing landscapes',
          'Optional stop at elephant transit home',
          'Transfer to Colombo or airport'
        ]
      }
    ],
    featured: false,
    locations: ['Kandy', 'Nuwara Eliya', 'Horton Plains', 'Ella'],
    culturalExperiences: [
      'Tea plucking experience',
      'Colonial high tea ceremony',
      'Traditional hill country cuisine',
      'Local train travel'
    ]
  },
];

// Sample Maldives Packages
const maldivesPackages: MaldivesPackage[] = [
  {
    id: 'mv-001',
    type: 'maldives',
    title: 'Luxury Overwater Villa Experience',
    shortDescription: 'Indulge in ultimate luxury with a stay in an overwater villa at an exclusive Maldivian resort.',
    longDescription: 'Experience the epitome of luxury and tranquility with our exclusive Overwater Villa package in the Maldives. Suspended above crystal-clear turquoise waters, these elegant villas offer unparalleled privacy and direct access to the vibrant marine life below. Wake up to panoramic ocean views, enjoy breakfast delivered by boat, and fall asleep to the gentle lapping of waves beneath you. This carefully curated 5-day retreat combines luxurious accommodation with exceptional dining experiences and tailored activities designed to create memories that will last a lifetime.',
    imageUrl: getAssetPath('/assets/images/Maldives_bg.jpg'),
    price: 3200,
    duration: '5 days / 4 nights',
    highlights: [
      'Exclusive stay in a luxury overwater villa',
      'Direct lagoon access from your private deck',
      'Sunset dolphin cruise with champagne',
      'Private dining experience under the stars',
      'Complimentary water sports activities'
    ],
    inclusions: [
      'Luxury overwater villa accommodation',
      'Daily gourmet breakfast',
      'Half-board dining package',
      'Roundtrip seaplane transfers',
      'Welcome champagne and fruits',
      'One private dining experience',
      'Selected non-motorized water sports'
    ],
    exclusions: [
      'International airfare',
      'Travel insurance',
      'Spa treatments',
      'Motorized water sports',
      'Premium alcoholic beverages',
      'Additional excursions'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Resort Transfer',
        description: 'Upon arrival at Velana International Airport, you\'ll be greeted and escorted to the exclusive seaplane lounge before your scenic transfer to the resort.',
        activities: [
          'VIP airport welcome',
          'Refreshments at seaplane lounge',
          'Scenic seaplane journey to resort',
          'Villa check-in and orientation',
          'Welcome dinner at sunset'
        ]
      },
      {
        day: 2,
        title: 'Overwater Villa Experience',
        description: 'A full day to enjoy your overwater villa and the resort\'s facilities, including snorkeling directly from your villa\'s private deck.',
        activities: [
          'Floating breakfast in villa',
          'Guided house reef snorkeling tour',
          'Afternoon at leisure',
          'Sunset cocktails at overwater bar'
        ]
      },
      {
        day: 3,
        title: 'Marine Adventures',
        description: 'Explore the vibrant underwater world with guided marine activities and a sunset dolphin cruise.',
        activities: [
          'Morning snorkeling excursion to nearby reefs',
          'Marine biologist presentation',
          'Sunset dolphin cruise with canapés and champagne',
          'Beachside dinner'
        ]
      },
      {
        day: 4,
        title: 'Island Indulgence',
        description: 'Balance relaxation with island exploration, ending with an exclusive private dining experience.',
        activities: [
          'Morning yoga session (optional)',
          'Island hopping tour to local islands',
          'Afternoon leisure time',
          'Private dining experience under the stars'
        ]
      },
      {
        day: 5,
        title: 'Farewell and Departure',
        description: 'Final morning in paradise before your seaplane transfer back to Male for your departure flight.',
        activities: [
          'Final morning for swimming or relaxation',
          'Late checkout (subject to availability)',
          'Seaplane transfer to Male',
          'Departure assistance'
        ]
      }
    ],
    featured: true,
    resortName: 'Blue Lagoon Maldives Resort & Spa',
    resortRating: 5,
    waterActivities: [
      'Snorkeling with manta rays',
      'Sunset fishing',
      'Paddleboarding',
      'Kayaking through crystal waters',
      'Windsurfing'
    ]
  },
  {
    id: 'mv-002',
    type: 'maldives',
    title: 'Family Beach Villa Getaway',
    shortDescription: 'Perfect family holiday with spacious beach villas, kids\' club activities, and family-friendly excursions.',
    longDescription: 'Create unforgettable family memories with our specially designed Family Beach Villa Getaway in the Maldives. Combining luxury accommodation with family-friendly amenities, this 6-day package offers the perfect balance of togetherness and individual enjoyment for all ages. Stay in spacious beachfront villas with separate children\'s sleeping areas, enjoy dedicated kids\' club activities, and participate in family excursions specially designed to engage and delight the whole family. With babysitting services available and family-focused dining options, this package ensures that parents can relax knowing that every family member is having the vacation of a lifetime.',
    imageUrl: getAssetPath('/assets/images/valentin-petrov-m-mal-01.jpg'),
    price: 4500,
    duration: '6 days / 5 nights',
    highlights: [
      'Spacious family beach villa accommodation',
      'Dedicated kids\' club with daily activities',
      'Family snorkeling safari',
      'Sandbank picnic excursion',
      'Child-friendly menus and dining options'
    ],
    inclusions: [
      'Two-bedroom family beach villa',
      'Full board meal plan',
      'Roundtrip speedboat transfers',
      'Kids\' club access',
      'One family excursion',
      'Welcome amenities for children',
      'Family photoshoot session'
    ],
    exclusions: [
      'International airfare',
      'Travel insurance',
      'Babysitting services',
      'Premium activities',
      'Spa treatments',
      'Premium beverages'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Family Arrival and Welcome',
        description: 'Warm welcome at Male Airport followed by a comfortable speedboat transfer to your family-friendly resort.',
        activities: [
          'Fast-track immigration for families',
          'Kid-friendly welcome at airport lounge',
          'Speedboat transfer with refreshments',
          'Family villa check-in with resort orientation',
          'Welcome dinner with entertainment'
        ]
      },
      {
        day: 2,
        title: 'Beach Day & Kids\' Activities',
        description: 'While children enjoy supervised activities at the kids\' club, parents can relax on the beach or indulge in spa treatments.',
        activities: [
          'Breakfast with character mascots',
          'Kids\' club enrollment and activities',
          'Parents\' leisure time',
          'Family beach games in afternoon',
          'Movie night under the stars'
        ]
      },
      {
        day: 3,
        title: 'Family Snorkeling Adventure',
        description: 'Guided family snorkeling safari to discover the colorful marine life in safe, shallow waters suitable for children.',
        activities: [
          'Snorkeling lesson for beginners',
          'Guided family snorkeling safari',
          'Marine life identification challenge',
          'Beach barbecue dinner'
        ]
      },
      {
        day: 4,
        title: 'Island Exploration Day',
        description: 'Discover island life with a mix of educational and fun activities for the whole family.',
        activities: [
          'Island treasure hunt for kids',
          'Palm leaf weaving workshop',
          'Family cooking class of Maldivian dishes',
          'Sunset fishing trip (optional)'
        ]
      },
      {
        day: 5,
        title: 'Sandbank Picnic Excursion',
        description: 'Special excursion to a pristine sandbank for a day of swimming, playing, and enjoying a gourmet picnic lunch.',
        activities: [
          'Boat trip to private sandbank',
          'Beach games and swimming',
          'Gourmet family picnic',
          'Farewell dinner with cultural performance'
        ]
      },
      {
        day: 6,
        title: 'Farewell to Paradise',
        description: 'Final morning to enjoy resort facilities before returning to Male for your departure flight.',
        activities: [
          'Last-minute swimming or activities',
          'Family photo presentation',
          'Checkout and return speedboat transfer',
          'Departure assistance'
        ]
      }
    ],
    featured: true,
    resortName: 'Palm Grove Island Resort',
    resortRating: 4.5,
    waterActivities: [
      'Child-friendly snorkeling',
      'Glass-bottom boat tours',
      'Banana boat rides',
      'Dolphin watching',
      'Semi-submarine excursion'
    ]
  },
  {
    id: 'mv-003',
    type: 'maldives',
    title: 'All-Inclusive Diving Retreat',
    shortDescription: 'Paradise for diving enthusiasts with unlimited dives, PADI courses, and access to world-class dive sites.',
    longDescription: 'Calling all diving enthusiasts! Our All-Inclusive Diving Retreat offers the ultimate underwater adventure in one of the world\'s premier diving destinations. This specialized 7-day package combines luxury accommodation with exceptional diving experiences tailored to all skill levels. From beginners taking their first PADI courses to experienced divers exploring renowned dive sites, this retreat provides unlimited access to the Maldives\' spectacular underwater world. With expert dive masters, top-quality equipment, and a resort selected specifically for its proximity to the best dive sites, this package delivers an unparalleled diving vacation.',
    imageUrl: getAssetPath('/assets/images/after.png'),
    price: 2800,
    duration: '7 days / 6 nights',
    highlights: [
      'Unlimited guided dive excursions',
      'Access to over 30 world-class dive sites',
      'Optional PADI certification courses',
      'Night diving experience',
      'Underwater photography workshop'
    ],
    inclusions: [
      'Beach bungalow accommodation',
      'All-inclusive meal plan with beverages',
      'Domestic flight and speedboat transfers',
      'Unlimited guided dive excursions (2-3 daily)',
      'Complete dive equipment rental',
      'Nitrox fills for certified divers',
      'House reef unlimited diving'
    ],
    exclusions: [
      'International airfare',
      'Travel insurance',
      'PADI certification fees',
      'Specialized dive excursions',
      'Private dive guide',
      'Underwater camera rental'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival and Dive Center Introduction',
        description: 'Arrival at your diving-focused resort, followed by orientation and equipment setup at the dive center.',
        activities: [
          'Airport welcome and domestic transfer',
          'Resort and dive center orientation',
          'Equipment fitting and check',
          'House reef snorkeling introduction',
          'Welcome dinner with dive team'
        ]
      },
      {
        day: 2,
        title: 'House Reef Diving Day',
        description: 'Begin your diving adventure with guided dives at the house reef to acclimate and refresh your skills.',
        activities: [
          'Morning house reef dive',
          'Dive skills refresher (if needed)',
          'Afternoon house reef dive',
          'Evening marine biology presentation'
        ]
      },
      {
        day: 3,
        title: 'Channel Diving Experience',
        description: 'Boat excursions to famous channel dive sites, known for strong currents and pelagic marine life.',
        activities: [
          'Two-tank morning boat dive',
          'Surface interval with lunch on boat',
          'Afternoon channel dive',
          'Post-dive analysis and marine identification'
        ]
      },
      {
        day: 4,
        title: 'Thilas and Underwater Formations',
        description: 'Explore the unique underwater pinnacles (thilas) famous in the Maldives for their rich marine biodiversity.',
        activities: [
          'Morning thila dive',
          'Underwater photography workshop',
          'Afternoon dive at different thila',
          'Evening video presentation of day\'s dives'
        ]
      },
      {
        day: 5,
        title: 'Manta and Whale Shark Sites',
        description: 'Full-day excursion to sites known for manta ray and whale shark sightings (seasonal).',
        activities: [
          'Early departure to manta cleaning stations',
          'Multiple dives at known manta sites',
          'Whale shark search snorkeling session',
          'Late return with sunset dolphin watching'
        ]
      },
      {
        day: 6,
        title: 'Night Diving and Reef Conservation',
        description: 'Experience the magic of night diving and participate in a reef conservation activity.',
        activities: [
          'Morning leisure dive',
          'Reef conservation activity',
          'Sunset dive',
          'Special night diving experience',
          'Farewell barbecue dinner'
        ]
      },
      {
        day: 7,
        title: 'Final Dive and Departure',
        description: 'One final morning dive before preparing for departure.',
        activities: [
          'Early morning farewell dive',
          'Equipment return and settlement',
          'Departure transfers',
          'Diving logbook certification'
        ]
      }
    ],
    featured: false,
    resortName: 'Coral Reef Dive Resort',
    resortRating: 4,
    waterActivities: [
      'Technical diving',
      'Wreck exploration',
      'Underwater scooter',
      'Fluorescent night diving',
      'Underwater photography'
    ]
  },
];

// Combine all packages
const allPackages: Package[] = [...sriLankaPackages, ...maldivesPackages];

export { allPackages, sriLankaPackages, maldivesPackages }; 