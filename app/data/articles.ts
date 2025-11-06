export interface Article {
  id: string;
  size?: 'small' | 'large';
  title: string;
  language: string;
  type: string;
  hasMap: boolean,
  lnglat: [number, number],
  bbox: [[number, number], [number, number]],
  excerpt: string;
  content: string;
}

export const articles: Article[] = [
  {
    id: "1",
    size: "large",
    title: "Eiffel Tower: Paris Icon",
    language: 'en',
    type: 'static-preview',
    hasMap: true,
    lnglat: [2.2944813, 48.8583701],
    bbox: [[2.2934008, 48.8566838], [2.2963146, 48.8593818]],
    excerpt: "The Eiffel Tower, Paris’s most iconic landmark, stands as a symbol of art, architecture, and innovation.",
    content: `
        Rising above the Champ de Mars, the Eiffel Tower has come to define the Parisian skyline.
        Constructed in 1889 for the Exposition Universelle, it was initially criticized but later
        became one of the most visited monuments in the world.
        
        Today, the tower remains a cultural and engineering marvel, offering panoramic views
        across the City of Light.
    `
  },
  {
    id: "2",
    size: "small",
    title: "Nile River: Lifeline of Africa",
    language: 'pt',
    type: 'popup',
    hasMap: true,
    lnglat: [32.15770737905076, 23.55979236573434],
    bbox: [[30.2512728, 15.6073172], [34.0641419, 31.5122675]],
    excerpt: "The Nile River flows over 4,100 miles through Africa, nurturing civilizations for millennia.",
    content: `
        The Nile, stretching across multiple countries, has been the foundation of African agriculture
        and settlement since ancient Egypt. From its sources in East Africa to its delta in Egypt,
        it sustains life and history along its banks.
    `
  },
  {
    id: "3",
    size: "small",
    title: "Loch Ness: Scotland’s Mysterious Lake",
    language: 'es',
    type: 'interactive',
    hasMap: true,
    lnglat: [-4.4243817, 57.3228575],
    bbox: [[-4.6756821, 57.1383591], [-4.3276873, 57.4097118]],
    excerpt: "Loch Ness, famed for legends of its monster, lies deep in the Scottish Highlands.",
    content: `
        Beyond myth and folklore, Loch Ness is a breathtaking freshwater loch surrounded by rolling hills.
        Its dark waters and vast depth have inspired centuries of stories and exploration.
    `
  },
  {
    id: "4",
    size: "large",
    title: "New Delhi: India’s Capital Heart",
    language: 'es',
    type: 'interactive',
    hasMap: true,
    lnglat: [77.2088282, 28.6139298],
    bbox: [[77.0730101, 28.4041], [77.3449601, 28.7053937]],
    excerpt: "New Delhi blends India’s past and present with monuments, government buildings, and vibrant culture.",
    content: `
        Built by the British in the early 20th century, New Delhi is home to the nation’s parliament,
        ministries, and historical landmarks such as India Gate and Rashtrapati Bhavan.
    `
  },
  {
    id: "5",
    size: "large",
    title: "Chicago: The Windy City",
    language: 'pt',
    type: 'interactive',
    hasMap: true,
    lnglat: [-87.6323879, 41.88325],
    bbox: [[-87.940097, 41.644286], [-87.523661, 42.0231351]],
    excerpt: "Chicago blends architecture, music, and culture on the shores of Lake Michigan.",
    content: `
        Known for its skyline, jazz, and deep-dish pizza, Chicago represents America’s spirit of
        innovation and resilience. It’s a city of neighborhoods, arts, and constant reinvention.
    `
  },
  {
    id: "6",
    size: "large",
    title: "Tierra del Fuego: Edge of the World",
    language: 'es',
    type: 'interactive',
    hasMap: true,
    lnglat: [-69.32367235500021, -54.21161194647284],
    bbox: [[-74.9454458, -55.9964175], [-63.7018989, -52.4268064]],
    excerpt: "Tierra del Fuego marks the southernmost tip of South America — where land meets Antarctic winds.",
    content: `
        This remote archipelago straddles Chile and Argentina, known for glaciers, rugged mountains,
        and isolated beauty at the edge of the world.
    `
  },
  {
    id: "7",
    size: "large",
    title: "The Pentagon: Symbol of U.S. Defense",
    language: 'en',
    type: 'interactive',
    hasMap: true,
    lnglat: [-77.0562669, 38.8718568],
    bbox: [[-77.060921, 38.8667376], [-77.0529616, 38.8756014]],
    excerpt: "Located in Arlington, Virginia, the Pentagon stands as the center of U.S. military operations.",
    content: `
        Completed in 1943, the Pentagon houses the Department of Defense and serves as a global hub
        for military coordination and strategy.
    `
  },
  {
    id: "8",
    size: "large",
    title: "Panama Canal: Gateway Between Oceans",
    language: 'es',
    type: 'interactive',
    hasMap: true,
    lnglat: [-79.72851610370265, 9.14380343698933],
    bbox: [[-79.9416549, 8.8865749], [-79.5153773, 9.401032]],
    excerpt: "The Panama Canal connects the Atlantic and Pacific, revolutionizing world trade.",
    content: `
        Opened in 1914, the canal remains one of the most strategic waterways in the world,
        symbolizing human ingenuity and global commerce.
    `
  },
  {
    id: "9",
    size: "large",
    title: "Red Square: Moscow’s Historic Center",
    language: 'en',
    type: 'interactive',
    hasMap: true,
    lnglat: [37.6218572, 55.7533818],
    bbox: [[37.6182555, 55.751468], [37.6248623, 55.7550396]],
    excerpt: "Red Square is Moscow’s heart — a meeting point of Russian history, power, and culture.",
    content: `
        Home to St. Basil’s Cathedral and the Kremlin, Red Square has witnessed centuries of
        Russian history, from coronations to modern celebrations.
    `
  },
  {
    id: "10",
    size: "large",
    title: "Bosporus: The Continental Divide",
    language: 'en',
    type: 'interactive',
    hasMap: true,
    lnglat: [29.1290157, 41.2213125],
    bbox: [[28.9776197, 40.9910628], [29.1647778, 41.2340735]],
    excerpt: "The Bosporus strait separates Europe and Asia, connecting the Black Sea to the Mediterranean.",
    content: `
        This narrow waterway defines Istanbul’s geography and history, blending East and West
        across millennia.
    `
  },
  {
    id: "11",
    size: "large",
    title: "Grand Canyon National Park",
    language: 'en',
    type: 'interactive',
    hasMap: true,
    lnglat: [-112.3535253, 36.2678855],
    bbox: [[-113.8860446, 35.6745486], [-111.8002234, 36.5102703]],
    excerpt: "The Grand Canyon reveals Earth’s history through its layered rock and stunning scale.",
    content: `
        Carved by the Colorado River, this natural wonder is one of the most visited parks in the U.S.,
        offering views that stretch across eons.
    `
  },
  {
    id: "12",
    size: "large",
    title: "Mount Kilimanjaro: Roof of Africa",
    language: 'en',
    type: 'interactive',
    hasMap: true,
    lnglat: [37.3556273, -3.0674247],
    bbox: [[37.3542783, -3.0687737], [37.3569763, -3.0660757]],
    excerpt: "Africa’s tallest peak, Kilimanjaro rises above Tanzania’s plains with snow-capped majesty.",
    content: `
        A dormant volcano with three cones, Kilimanjaro attracts climbers from across the globe.
        Its glaciers are among the most iconic in Africa.
    `
  },
  {
    id: "13",
    size: "large",
    title: "Andes Mountains: The Spine of South America",
    language: 'es',
    type: 'interactive',
    hasMap: true,
    lnglat: [-66.7752471, -21.1607667],
    bbox: [[-113.9929303, -56.1608728], [-22.8513537, 12.4558421]],
    excerpt: "Stretching 4,300 miles, the Andes form the longest continental mountain range on Earth.",
    content: `
        Spanning seven countries, the Andes shape South America’s climate, cultures, and ecosystems.
    `
  },
  {
    id: "14",
    size: "large",
    title: "Sydney Harbour Bridge",
    language: 'en',
    type: 'interactive',
    hasMap: true,
    lnglat: [151.2105443, -33.8524232],
    bbox: [[151.205873, -33.8593354], [151.2131584, -33.8450964]],
    excerpt: "The Sydney Harbour Bridge unites Australia’s largest city with its sweeping coastal views.",
    content: `
        Completed in 1932, this steel arch bridge stands as one of Australia’s most recognizable landmarks.
    `
  },
  {
    id: "15",
    size: "large",
    title: "Ginza: Tokyo’s Modern District",
    language: 'pt',
    type: 'interactive',
    hasMap: true,
    lnglat: [139.7664859, 35.6712228],
    bbox: [[139.7585774, 35.6632621], [139.7725008, 35.6759902]],
    excerpt: "Ginza, Tokyo’s luxury district, epitomizes modern Japan through fashion, design, and neon lights.",
    content: `
        Blending traditional Japanese refinement with global luxury, Ginza is a showcase of urban life
        and creativity in Tokyo.
    `
  },
  {
    id: "16",
    size: "large",
    title: "Carthage: Ancient Power of the Mediterranean",
    language: 'en',
    type: 'interactive',
    hasMap: true,
    lnglat: [10.3320773, 36.8551087],
    bbox: [[10.3304680, 36.8538933], [10.3331660, 36.8565912]],
    excerpt: "Once a rival to Rome, Carthage was a maritime empire that shaped Mediterranean trade and history.",
    content: `
        The ruins of Carthage near modern Tunis preserve the memory of a civilization known for its
        naval strength and tragic wars with Rome.
    `
  },
  {
    id: "17",
    size: "large",
    title: "Amazon Rainforest: Lungs of the Earth",
    language: 'es',
    type: 'interactive',
    hasMap: true,
    lnglat: [-55.491477, -8.783195],
    bbox: [[-111.0136956, -58.3693668], [-12.9824389, 18.8384895]],
    excerpt: "The Amazon Rainforest, spanning nine countries, is Earth’s richest ecosystem.",
    content: `
        Home to millions of species, the Amazon plays a crucial role in regulating global climate
        and biodiversity.
    `
  },
  {
    id: "18",
    size: "large",
    title: "Langjökull: Iceland’s Second-Largest Glacier",
    language: 'en',
    type: 'interactive',
    hasMap: true,
    lnglat: [-20.1531477, 64.6561868],
    bbox: [[-20.6708579, 64.4931801], [-19.7644412, 64.9051518]],
    excerpt: "Langjökull is a massive glacier in Iceland, offering ice caves and sweeping arctic vistas.",
    content: `
        Located in the western highlands, Langjökull provides scientists a window into climate change
        and adventure for explorers.
    `
  },
  {
    id: "19",
    size: "large",
    title: "South Pole: The Earth's Southernmost Point",
    language: 'en',
    type: 'interactive',
    hasMap: true,
    lnglat: [0.0, -90.0],
    bbox: [[-180.0, -90.0], [180.0, -89.9]],
    excerpt: "The South Pole marks Earth’s axis of rotation and stands amid Antarctica’s icy expanse.",
    content: `
        A place of scientific research and extreme conditions, the South Pole remains among the
        planet’s most remote locations.
    `
  },
  {
    id: "20",
    size: "large",
    title: "Colorado: Gateway to the Rockies",
    language: 'en',
    type: 'interactive',
    hasMap: true,
    lnglat: [-105.7820674, 39.5500507],
    bbox: [[-109.060204, 36.992449], [-102.041522, 41.0034439]],
    excerpt: "Colorado is a state defined by its mountains, plains, and adventurous spirit.",
    content: `
        From Denver’s mile-high skyline to the peaks of the Rockies, Colorado balances nature,
        innovation, and outdoor culture.
    `
  },
   {
  id: "21",
  size: "large",
  title: "Woodstock: A Cultural Milestone",
  language: 'en',
  type: 'interactive',
  hasMap: true,
  lnglat: [-74.1181971, 42.0409247],
  bbox: [[-74.1604979, 42.0160319], [-74.076456, 42.066465]],
  excerpt: "Woodstock, New York, became a symbol of music, peace, and counterculture after the 1969 festival.",
  content: `
      Although the famous Woodstock Festival of 1969 was actually held in Bethel, New York,
      the town of Woodstock remains an enduring icon of art and free expression. Nestled in
      the Catskill Mountains, it continues to draw artists, musicians, and travelers inspired
      by its creative legacy and scenic charm.
  `
},
{
    id: "22",
    size: "large",
    title: "Field Museum: Chicago’s Natural Wonder",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [-87.6169805, 41.866261],
    bbox: [[-87.6186799, 41.864562], [-87.6142176, 41.86726]],
    excerpt: "The Field Museum in Chicago houses one of the world’s largest natural history collections.",
    content: `
        Founded in 1893, the Field Museum showcases millions of specimens and cultural artifacts.
        Its iconic exhibitions include Sue the T. rex and extensive anthropology galleries.
    `
  },
  {
    id: "23",
    size: "large",
    title: "Shedd Aquarium: Beneath Chicago’s Waves",
    language: "es",
    type: "interactive",
    hasMap: true,
    lnglat: [-87.614038, 41.8675726],
    bbox: [[-87.6158876, 41.8658195], [-87.6131897, 41.8685174]],
    excerpt: "The Shedd Aquarium immerses visitors in marine life from around the globe.",
    content: `
        Opened in 1930 along Chicago’s lakefront, Shedd Aquarium combines conservation,
        education, and breathtaking underwater exhibits from coral reefs to the Amazon.
    `
  },
  {
    id: "24",
    size: "large",
    title: "Wrigley Field: Chicago’s Baseball Cathedral",
    language: "pt",
    type: "interactive",
    hasMap: true,
    lnglat: [-87.6553327, 41.9484384],
    bbox: [[-87.6568684, 41.9468182], [-87.6541704, 41.9495161]],
    excerpt: "Wrigley Field, home of the Chicago Cubs, is a temple of American baseball history.",
    content: `
        Built in 1914, this ivy-covered ballpark has witnessed a century of games, fans, and unforgettable moments
        in the heart of Chicago’s North Side.
    `
  },
  {
    id: "25",
    size: "large",
    title: "Illinois River: Flowing Through the Prairie State",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [-89.4617115, 40.186832],
    bbox: [[-90.6773046, 38.9445774], [-88.2461183, 41.4290866]],
    excerpt: "The Illinois River meanders through the heart of the state, connecting land and life.",
    content: `
        Once vital for transportation and trade, the Illinois River continues to sustain ecosystems
        and communities across central Illinois.
    `
  },
  {
    id: "26",
    size: "large",
    title: "Illinois: The Prairie State",
    language: "es",
    type: "interactive",
    hasMap: true,
    lnglat: [-89.3985283, 40.6331249],
    bbox: [[-91.513079, 36.970298], [-87.019935, 42.5084809]],
    excerpt: "Illinois, a hub of agriculture, industry, and culture, anchors the American Midwest.",
    content: `
        From Chicago’s skyline to rural farmlands, Illinois bridges innovation and tradition
        as one of the United States’ most dynamic states.
    `
  },
  {
    id: "27",
    size: "large",
    title: "Quad Cities: Unity Across the Mississippi",
    language: "pt",
    type: "interactive",
    hasMap: true,
    lnglat: [-93.097702, 41.8780025],
    bbox: [[-96.6394849, 40.37544], [-90.1400609, 43.5011961]],
    excerpt: "The Quad Cities unite Illinois and Iowa along the mighty Mississippi River.",
    content: `
        Encompassing Davenport and Rock Island among others, the region thrives as a center of
        manufacturing, culture, and cross-state cooperation.
    `
  },
  {
    id: "28",
    size: "large",
    title: "Wisconsin Dells: The Waterpark Capital",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [-89.7748503, 43.6248766],
    bbox: [[-89.8183351, 43.603516], [-89.73862, 43.6713341]],
    excerpt: "Wisconsin Dells draws millions for its natural sandstone cliffs and family attractions.",
    content: `
        Located along the Wisconsin River, the Dells combine stunning scenery with entertainment,
        making it a Midwestern vacation classic.
    `
  },
  {
    id: "29",
    size: "large",
    title: "Aurora: The City of Lights",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [-88.3200715, 41.7605849],
    bbox: [[-88.408369, 41.679869], [-88.204982, 41.822179]],
    excerpt: "Aurora, Illinois shines as a hub of culture, history, and architecture west of Chicago.",
    content: `
        Known as the City of Lights for its early adoption of electric street lighting, Aurora
        continues to blend innovation and heritage along the Fox River.
    `
  },
  {
    id: "30",
    size: "large",
    title: "Museum of Science and Industry",
    language: "es",
    type: "interactive",
    hasMap: true,
    lnglat: [-87.5830659, 41.7905726],
    bbox: [[-87.5843255, 41.7895872], [-87.5804814, 41.7922852]],
    excerpt: "Chicago’s Museum of Science and Industry brings innovation and discovery to life.",
    content: `
        Opened in 1933, the museum remains one of the largest of its kind, featuring interactive
        exhibits on technology, space, and the human body.
    `
  },
  {
    id: "31",
    size: "large",
    title: "Rockford: Industrial Heritage of Illinois",
    language: "pt",
    type: "interactive",
    hasMap: true,
    lnglat: [-89.0877748, 42.2677214],
    bbox: [[-89.195274, 42.143238], [-88.9408549, 42.33864]],
    excerpt: "Rockford reflects Illinois’s manufacturing roots and Midwestern charm.",
    content: `
        Positioned along the Rock River, Rockford combines industry, architecture, and a growing
        arts scene within northern Illinois.
    `
  },
  {
    id: "32",
    size: "large",
    title: "University of Notre Dame: A Legacy of Learning",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [-86.2376772, 41.7018991],
    bbox: [[-86.2388991, 41.7006655], [-86.2362012, 41.7033635]],
    excerpt: "The University of Notre Dame stands as one of America’s premier Catholic institutions.",
    content: `
        Founded in 1842 in Indiana, Notre Dame is known for academic excellence, Fighting Irish football,
        and its iconic Golden Dome.
    `
  },
  {
    id: "33",
    size: "large",
    title: "American Airlines Flight 191: Remembering Tragedy",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [-87.8946175, 42.0096524],
    bbox: [[-87.8959594, 42.0081828], [-87.8932615, 42.0108807]],
    excerpt: "The 1979 crash of Flight 191 near Chicago remains one of America’s worst air disasters.",
    content: `
        Moments after takeoff from O’Hare Airport, the DC-10 crash claimed 273 lives.  
        The memorial in Des Plaines honors those lost and the safety improvements that followed.
    `
  }

];
