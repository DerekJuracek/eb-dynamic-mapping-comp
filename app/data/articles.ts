export interface Article {
  id: string;
  origin: "india" | "default";
  size?: "large" | "small";
  title: string;
  language: string;
  type: "interactive" | "static-preview" | "popup";
  hasMap: boolean;
  lnglat: [number, number];
  bbox: [[number, number], [number, number]];
  excerpt: string;
  content: string;
  url: string;
}

export const articles: Article[] = [
  {
    id: "1",
    origin: "default",
    size: "large",
    title: "Eiffel Tower",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [2.2944813, 48.8583701],
    bbox: [[2.2934008, 48.8566838], [2.2963146, 48.8593818]],
    excerpt:
      "The Eiffel Tower, Paris’s most iconic landmark, stands as a symbol of art, architecture, and innovation.",
    content: `Rising above the Champ de Mars, the Eiffel Tower has come to define the Parisian skyline.`,
    url: "https://www.britannica.com/topic/Eiffel-Tower-Paris-France",
  },
   {
    id: "2",
    origin: "default",
    size: "large",
    title: "Nile River",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [32.15770737905076, 23.55979236573434],
    bbox: [[30.2512728, 15.6073172], [34.0641419, 31.5122675]],
    excerpt:
      "The Nile River flows over 4,100 miles through Africa, nurturing civilizations for millennia.",
    content: `The Nile has been the foundation of African agriculture and settlement since ancient Egypt.`,
    url: "https://www.britannica.com/place/Nile-River",
  },
   {
    id: "3",
    origin: "default",
    size: "large",
    title: "Colorado",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [-105.7820674, 39.5500507],
    bbox: [[-109.060204, 36.992449], [-102.041522, 41.0034439]],
    excerpt: "Colorado is a state defined by its mountains, plains, and adventurous spirit.",
    content: `From Denver’s skyline to the peaks of the Rockies, Colorado balances nature and innovation.`,
    url: "https://www.britannica.com/place/Colorado-state",
  },
  {
  id: "4",
  origin: "default",
  size: "large",
  title: "Lollapalooza",
  language: "en",
  type: "interactive",
  hasMap: true,
  lnglat: [-87.6200004, 41.8721453], // Grant Park center
  bbox: [
    [-87.6287, 41.8647], // SW corner of Grant Park festival footprint
    [-87.6138, 41.8822]  // NE corner
  ],
  excerpt:
    "Lollapalooza is one of the world’s largest and most influential music festivals, held each summer in Chicago’s Grant Park.",
  content: `
    Founded in 1991 by Perry Farrell, Lollapalooza has grown into a global festival brand.
    The Chicago edition spans four days and features hundreds of artists across multiple stages,
    drawing fans from around the world to the shores of Lake Michigan.
  `,
  url: "https://www.britannica.com/art/Lollapalooza",
},

  {
    id: "5",
    origin: "default",
    size: "small",
    title: "Kilimanjaro",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [37.3556273, -3.0674247],
    bbox: [[37.3542783, -3.0687737], [37.3569763, -3.0660757]],
    excerpt:
      "Africa’s tallest peak, Kilimanjaro rises above Tanzania’s plains with snow-capped majesty.",
    content: `A dormant volcano with three cones, Kilimanjaro attracts climbers from across the globe.`,
    url: "https://www.britannica.com/place/Kilimanjaro",
  },
 
  {
    id: "6",
    origin: "default",
    size: "large",
    title: "Loch Ness",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [-4.4243817, 57.3228575],
    bbox: [[-4.6756821, 57.1383591], [-4.3276873, 57.4097118]],
    excerpt: "Loch Ness, famed for legends of its monster, lies deep in the Scottish Highlands.",
    content: `Beyond myth and folklore, Loch Ness is a breathtaking freshwater loch surrounded by rolling hills.`,
    url: "https://www.britannica.com/place/Loch-Ness-lake-Scotland-United-Kingdom",
  },
  {
    id: "7",
    origin: "default",
    size: "large",
    title: "Red Square",
    language: "en",
    type: "static-preview",
    hasMap: true,
    lnglat: [37.6218572, 55.7533818],
    bbox: [[37.6182555, 55.751468], [37.6248623, 55.7550396]],
    excerpt:
      "Red Square is Moscow’s heart — a meeting point of Russian history, power, and culture.",
    content: `Home to St. Basil’s Cathedral and the Kremlin, Red Square has witnessed centuries of Russian history.`,
    url: "https://www.britannica.com/topic/Red-Square",
  },
    {
    id: "8",
    origin: "default",
    size: "large",
    title: "Woodstock",
    language: "en",
    type: "popup",
    hasMap: true,
    lnglat: [-74.1181971, 42.0409247],
    bbox: [[-74.1604979, 42.0160319], [-74.076456, 42.066465]],
    excerpt:
      "Woodstock, New York, became a symbol of music, peace, and counterculture after the 1969 festival.",
    content: `The town of Woodstock remains an enduring icon of art and free expression.`,
    url: "https://www.britannica.com/event/Woodstock",
  },
    {
    id: "9",
    origin: "india",
    size: "large",
    title: "New Delhi - India Users",
    language: "en",
    type: "static-preview",
    hasMap: true,
    lnglat: [77.2088282, 28.6139298],
    bbox: [[77.0730101, 28.4041], [77.3449601, 28.7053937]],
    excerpt:
      "New Delhi blends India’s past and present with monuments, government buildings, and vibrant culture.",
    content: `Built by the British in the early 20th century, New Delhi is home to India Gate and Rashtrapati Bhavan.`,
    url: "https://www.britannica.com/place/Delhi",
  },
   {
    id: "10",
    origin: "default",
    size: "large",
    title: "New Delhi - Non-India Users",
    language: "en",
    type: "static-preview",
    hasMap: true,
    lnglat: [77.2088282, 28.6139298],
    bbox: [[77.0730101, 28.4041], [77.3449601, 28.7053937]],
    excerpt:
      "New Delhi blends India’s past and present with monuments, government buildings, and vibrant culture.",
    content: `Built by the British in the early 20th century, New Delhi is home to India Gate and Rashtrapati Bhavan.`,
    url: "https://www.britannica.com/place/Delhi",
  },
  {
    id: "11",
    origin: "default",
    size: "large",
    title: "Panama Canal",
    language: "pt",
    type: "interactive",
    hasMap: true,
    lnglat: [-79.72851610370265, 9.14380343698933],
    bbox: [[-79.9416549, 8.8865749], [-79.5153773, 9.401032]],
    excerpt: "The Panama Canal connects the Atlantic and Pacific, revolutionizing world trade.",
    content: `Opened in 1914, the canal remains one of the most strategic waterways in the world.`,
    url: "https://www.britannica.com/topic/Panama-Canal",
  },
  {
    id: "12",
    origin: "default",
    size: "large",
    title: "Tierra del Fuego",
    language: "es",
    type: "interactive",
    hasMap: true,
    lnglat: [-69.32367235500021, -54.21161194647284],
    bbox: [[-74.9454458, -55.9964175], [-63.7018989, -52.4268064]],
    excerpt:
      "Tierra del Fuego marks the southernmost tip of South America — where land meets Antarctic winds.",
    content: `This remote archipelago straddles Chile and Argentina, known for glaciers and rugged mountains.`,
    url: "https://www.britannica.com/place/Tierra-del-Fuego-archipelago-South-America",
  },
  {
  id: "13",
  origin: "default",
  size: "large",
  title: "Gulf of America / Gulf of Mexico",
  language: "en",
  type: "interactive",
  hasMap: true,
  lnglat: [-90.0, 24.5],
  bbox: [[-97.0, 18.0], [-81.0, 30.0]],
  excerpt:
    "The Gulf of Mexico—sometimes called the Gulf of America—is a vast ocean basin bordered by the United States, Mexico, and Cuba.",
  content: `Known for its warm waters and rich marine life, the Gulf of Mexico (also called the Gulf of America) connects to the Atlantic Ocean through the Florida Straits and the Caribbean Sea via the Yucatán Channel. It plays a vital role in global shipping, energy, and coastal ecosystems.`,
  url: "https://www.britannica.com/place/Gulf-of-Mexico",
},
{
  id: "14",
  origin: "india",
  size: "large",
  title: "Gulf of Mexico - Non-US Users",
  language: "en",
  type: "interactive",
  hasMap: true,
  lnglat: [-90.0, 24.5],
  bbox: [[-97.0, 18.0], [-81.0, 30.0]],
  excerpt:
    "The Gulf of Mexico—sometimes called the Gulf of America—is a vast ocean basin bordered by the United States, Mexico, and Cuba.",
  content: `Known for its warm waters and rich marine life, the Gulf of Mexico (also called the Gulf of America) connects to the Atlantic Ocean through the Florida Straits and the Caribbean Sea via the Yucatán Channel. It plays a vital role in global shipping, energy, and coastal ecosystems.`,
  url: "https://www.britannica.com/place/Gulf-of-Mexico",
},
 
   {
    id: "15",
    origin: "default",
    size: "large",
    title: "Chicago",
    language: "pt",
    type: "popup",
    hasMap: true,
    lnglat: [-87.6323879, 41.88325],
    bbox: [[-87.940097, 41.644286], [-87.523661, 42.0231351]],
    excerpt: "Chicago blends architecture, music, and culture on the shores of Lake Michigan.",
    content: `Known for its skyline, jazz, and deep-dish pizza, Chicago represents America’s spirit of innovation.`,
    url: "https://www.britannica.com/place/Illinois-state",
  },
  {
    id: "16",
    origin: "default",
    size: "large",
    title: "Field Museum",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [-87.6169805, 41.866261],
    bbox: [[-87.6186799, 41.864562], [-87.6142176, 41.86726]],
    excerpt:
      "The Field Museum in Chicago houses one of the world’s largest natural history collections.",
    content: `Founded in 1893, the Field Museum showcases millions of specimens and cultural artifacts.`,
    url: "https://www.britannica.com/topic/Field-Museum",
  },
  {
    id: "17",
    origin: "default",
    size: "large",
    title: "Shedd Aquarium",
    language: "es",
    type: "interactive",
    hasMap: true,
    lnglat: [-87.614038, 41.8675726],
    bbox: [[-87.6158876, 41.8658195], [-87.6131897, 41.8685174]],
    excerpt:
      "The Shedd Aquarium immerses visitors in marine life from around the globe.",
    content: `Opened in 1930 along Chicago’s lakefront, Shedd Aquarium combines conservation and education.`,
    url: "https://www.britannica.com/topic/Shedd-Aquarium",
  },
  {
    id: "18",
    origin: "default",
    size: "large",
    title: "Wrigley Field",
    language: "pt",
    type: "interactive",
    hasMap: true,
    lnglat: [-87.6553327, 41.9484384],
    bbox: [[-87.6568684, 41.9468182], [-87.6541704, 41.9495161]],
    excerpt:
      "Wrigley Field, home of the Chicago Cubs, is a temple of American baseball history.",
    content: `Built in 1914, this ivy-covered ballpark has witnessed a century of games and unforgettable moments.`,
    url: "https://www.britannica.com/place/Wrigley-Field",
  },
  {
    id: "19",
    origin: "default",
    size: "large",
    title: "Illinois River",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [-89.4617115, 40.186832],
    bbox: [[-90.6773046, 38.9445774], [-88.2461183, 41.4290866]],
    excerpt:
      "The Illinois River meanders through the heart of the state, connecting land and life.",
    content: `Once vital for transportation and trade, the Illinois River continues to sustain ecosystems.`,
    url: "https://www.britannica.com/place/Illinois-River",
  },
  {
    id: "20",
    origin: "default",
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
    `,
    url: "https://www.britannica.com/place/Illinois-River",
  },
{
    id: "21",
    origin: "default",
    size: "large",
    title: "Quad Cities",
    language: "pt",
    type: "interactive",
    hasMap: true,
    lnglat: [-90.580012, 41.523643],
    bbox: [[-90.734733, 41.408372], [-90.423166, 41.610281]],
    excerpt:
      "The Quad Cities region unites communities along the Mississippi River on the Illinois-Iowa border.",
    content: `
      A metropolitan area including Moline, Rock Island, Davenport, and Bettendorf, the Quad Cities
      are known for their industrial heritage and riverside culture.
    `,
    url: "https://www.britannica.com/place/Quad-Cities",
  },
  {
    id: "22",
    origin: "default",
    size: "large",
    title: "Wisconsin Dells",
    language: "es",
    type: "interactive",
    hasMap: true,
    lnglat: [-89.770963, 43.627479],
    bbox: [[-89.830287, 43.566821], [-89.710571, 43.675981]],
    excerpt:
      "Wisconsin Dells, carved by glaciers, is famous for its sandstone formations and family resorts.",
    content: `
      The Dells region features striking gorges along the Wisconsin River and a vibrant tourism scene.
    `,
    url: "https://www.britannica.com/place/Wisconsin-Dells",
  },
  {
    id: "23",
    origin: "default",
    size: "large",
    title: "Aurora",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [-88.3200715, 41.7605849],
    bbox: [[-88.392817, 41.730338], [-88.259892, 41.801516]],
    excerpt:
      "Aurora, Illinois, blends historic architecture and modern development along the Fox River.",
    content: `
      Once a manufacturing hub, Aurora has become one of Chicago’s most dynamic suburban centers.
    `,
    url: "https://www.britannica.com/place/Aurora-Illinois",
  },
  {
    id: "24",
    origin: "default",
    size: "large",
    title: "Museum of Science and Industry",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [-87.606982, 41.791262],
    bbox: [[-87.6084, 41.7897], [-87.6053, 41.7926]],
    excerpt:
      "Chicago’s Museum of Science and Industry celebrates human ingenuity through hands-on exhibits.",
    content: `
      Opened in 1933, the museum inspires curiosity across science, technology, and history disciplines.
    `,
    url: "https://www.britannica.com/topic/Museum-of-Science-and-Industry",
  },
  {
    id: "25",
    origin: "default",
    size: "large",
    title: "Rockford",
    language: "es",
    type: "interactive",
    hasMap: true,
    lnglat: [-89.0939952, 42.2711311],
    bbox: [[-89.1816, 42.2402], [-89.0219, 42.3126]],
    excerpt:
      "Rockford, located on the Rock River, combines Midwestern charm with industrial heritage.",
    content: `
      The city is known for its manufacturing roots and its cultural attractions, including museums and gardens.
    `,
    url: "https://www.britannica.com/place/Rockford",
  },
  {
    id: "26",
    origin: "default",
    size: "large",
    title: "Notre Dame",
    language: "pt",
    type: "interactive",
    hasMap: true,
    lnglat: [-86.2354, 41.7031],
    bbox: [[-86.2452, 41.6956], [-86.2258, 41.7097]],
    excerpt:
      "The University of Notre Dame, in Indiana, stands as a cornerstone of American higher education.",
    content: `
      Founded in 1842, the campus is renowned for its Golden Dome, academic excellence, and Fighting Irish spirit.
    `,
    url: "https://www.britannica.com/topic/University-of-Notre-Dame",
  },
  {
    id: "27",
    origin: "default",
    size: "large",
    title: "American Airlines Flight 191",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [-87.9381, 41.9744],
    bbox: [[-87.95, 41.96], [-87.925, 41.985]],
    excerpt:
      "American Airlines Flight 191 remains the deadliest aviation accident in U.S. history.",
    content: `
      On May 25, 1979, Flight 191 crashed shortly after takeoff from Chicago O'Hare, claiming 273 lives.
    `,
    url: "https://www.britannica.com/event/American-Airlines-Flight-191",
  },
  {
    id: "28",
    origin: "default",
    size: "large",
    title: "Peoria",
    language: "es",
    type: "interactive",
    hasMap: true,
    lnglat: [-89.5889864, 40.6936488],
    bbox: [[-89.684, 40.625], [-89.522, 40.78]],
    excerpt:
      "Peoria, situated along the Illinois River, represents the heart of the American Midwest.",
    content: `
      Known for its manufacturing legacy and cultural vitality, Peoria remains a vital Illinois city.
    `,
    url: "https://www.britannica.com/place/Peoria-Illinois",
  },
  {
    id: "29",
    origin: "default",
    size: "large",
    title: "Pentagon",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [-77.0562669, 38.8718568],
    bbox: [[-77.060921, 38.8667376], [-77.0529616, 38.8756014]],
    excerpt:
      "Located in Arlington, Virginia, the Pentagon stands as the center of U.S. military operations.",
    content: `Completed in 1943, the Pentagon houses the Department of Defense and serves as a global hub for strategy.`,
    url: "https://www.britannica.com/topic/Pentagon",
  },
  {
    id: "30",
    origin: "default",
    size: "large",
    title: "Andes Mountains",
    language: "es",
    type: "interactive",
    hasMap: true,
    lnglat: [-66.7752471, -21.1607667],
    bbox: [[-113.9929303, -56.1608728], [-22.8513537, 12.4558421]],
    excerpt:
      "Stretching 4,300 miles, the Andes form the longest continental mountain range on Earth.",
    content: `Spanning seven countries, the Andes shape South America’s climate, cultures, and ecosystems.`,
    url: "https://www.britannica.com/place/Andes-Mountains",
  },
  {
    id: "31",
    origin: "default",
    size: "large",
    title: "Sydney Harbour Bridge",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [151.2105443, -33.8524232],
    bbox: [[151.205873, -33.8593354], [151.2131584, -33.8450964]],
    excerpt:
      "The Sydney Harbour Bridge unites Australia’s largest city with its sweeping coastal views.",
    content: `Completed in 1932, this steel arch bridge stands as one of Australia’s most recognizable landmarks.`,
    url: "https://www.britannica.com/topic/Sydney-Harbour-Bridge",
  },
  {
    id: "32",
    origin: "default",
    size: "large",
    title: "Ginza",
    language: "pt",
    type: "interactive",
    hasMap: true,
    lnglat: [139.7664859, 35.6712228],
    bbox: [[139.7585774, 35.6632621], [139.7725008, 35.6759902]],
    excerpt:
      "Ginza, Tokyo’s luxury district, epitomizes modern Japan through fashion, design, and neon lights.",
    content: `Blending traditional Japanese refinement with global luxury, Ginza is a showcase of urban life.`,
    url: "https://www.britannica.com/place/Ginza-Japan",
  },
  {
    id: "33",
    origin: "default",
    size: "large",
    title: "Carthage",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [10.3320773, 36.8551087],
    bbox: [[10.330468, 36.8538933], [10.333166, 36.8565912]],
    excerpt:
      "Once a rival to Rome, Carthage was a maritime empire that shaped Mediterranean trade and history.",
    content: `The ruins of Carthage near modern Tunis preserve the memory of a civilization known for its naval strength.`,
    url: "https://www.britannica.com/place/Carthage-ancient-city-Tunisia",
  },
  {
    id: "34",
    origin: "default",
    size: "large",
    title: "Amazon Rainforest",
    language: "es",
    type: "interactive",
    hasMap: true,
    lnglat: [-55.491477, -8.783195],
    bbox: [[-111.0136956, -58.3693668], [-12.9824389, 18.8384895]],
    excerpt: "The Amazon Rainforest, spanning nine countries, is Earth’s richest ecosystem.",
    content: `Home to millions of species, the Amazon plays a crucial role in regulating global climate.`,
    url: "https://www.britannica.com/place/Amazon-Rainforest",
  },
  {
    id: "35",
    origin: "default",
    size: "large",
    title: "Langjökull",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [-20.1531477, 64.6561868],
    bbox: [[-20.6708579, 64.4931801], [-19.7644412, 64.9051518]],
    excerpt:
      "Langjökull is a massive glacier in Iceland, offering ice caves and sweeping arctic vistas.",
    content: `Located in the western highlands, Langjökull provides scientists a window into climate change.`,
    url: "https://www.britannica.com/place/Langjokull",
  },
 
   {
    id: "36",
    origin: "default",
    size: "large",
    title: "Bosporus",
    language: "en",
    type: "interactive",
    hasMap: true,
    lnglat: [29.1290157, 41.2213125],
    bbox: [[28.9776197, 40.9910628], [29.1647778, 41.2340735]],
    excerpt:
      "The Bosporus strait separates Europe and Asia, connecting the Black Sea to the Mediterranean.",
    content: `This narrow waterway defines Istanbul’s geography and history, blending East and West.`,
    url: "https://www.britannica.com/place/Bosporus",
  },
  

];
