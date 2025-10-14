export interface Article {
  id: string;
  title: string;
  language: string;
  hasMap: boolean,
  lnglat: [number, number],
  bbox: [[number, number], [number, number]],
  excerpt: string;
  content: string;
}

export const articles: Article[] = [
  {
    id: "1",
    title: "Discovering Denver: The Mile High City",
    language: 'en',
    hasMap: true,
    lnglat: [-104.9903, 39.7392],
    bbox: [[-105.1099, 39.6144], [-104.5991, 39.9142]],
    excerpt: "A quick journey into the Mile High City — where urban life meets the Rocky Mountains.",
    content: `
        Denver, Colorado, sits exactly one mile above sea level and offers a rare mix of
        outdoor adventure and city living. With more than 300 days of sunshine a year,
        it's a haven for hikers, bikers, and skiers alike.

        The city’s downtown is anchored by Union Station, a restored 100-year-old
        train hub that’s now home to restaurants, coffee shops, and co-working spaces.
        Just outside the city, Red Rocks Amphitheatre stands as one of the most iconic
        concert venues in the world, blending natural rock formations with world-class
        music.

        Whether you’re catching a Broncos game, sipping craft beer from one of the
        dozens of microbreweries, or exploring the nearby Rockies, Denver is a launchpad
        for adventure.
    `
  },
  {
    id: "2",
    title: "Seattle: Innovation Meets the Outdoors",
    language: 'es',
    hasMap: true,
    lnglat: [-122.3321, 47.6062],
    bbox: [  [-122.4597, 47.4810], [-122.2244, 47.7341]],
    excerpt: "Exploring Seattle’s blend of tech culture, waterfront charm, and Pacific Northwest landscapes.",
    content: `
        Seattle, Washington, is a city defined by water, mountains, and forward-thinking
        innovation. The Space Needle remains its most famous landmark, but the city’s
        true character can be found in Pike Place Market, where fishmongers toss salmon
        to cheering crowds and small artisans sell local goods.

        Known as the birthplace of Microsoft, Amazon, and Starbucks, Seattle has shaped
        both the digital and cultural landscape of the U.S. Beyond the skyscrapers,
        however, lies easy access to kayaking on Lake Union, hiking in the Cascades, and
        ferry rides across Puget Sound.

        Seattle is also at the forefront of sustainability, with an emphasis on green
        space and renewable energy. It’s a city where a morning can start with a
        venture-capital pitch and end with a sunset paddleboard.
    `   
  },
  {
    id: "3",
    title: "Austin: The Live Music Capital",
    language: 'fr',
    excerpt: "From tacos to tech, Austin’s mix of music, food, and startups makes it uniquely Texan.",
    hasMap: true,
    lnglat: [-97.7431, 30.2672],
    bbox: [[-97.9368, 30.0988], [-97.5684, 30.5169]],
    content: `
        Austin, Texas, has earned its reputation as the Live Music Capital of the World.
        Every night of the week, bars and venues spill out blues, rock, and indie beats
        onto Sixth Street and South Congress.

        Food culture here is equally important — think breakfast tacos, brisket from
        legendary barbecue pits, and experimental fusion from food trucks lining every
        corner. The city also hosts South by Southwest (SXSW), a global festival that
        blends music, film, and technology.

        Beyond culture, Austin has become a magnet for startups and tech companies,
        earning comparisons to Silicon Valley. Yet despite the growth, Barton Springs
        Pool and Lady Bird Lake still offer escapes for locals and visitors to cool off
        under the Texas sun.
    `
  },
  {
  id: "4",
  title: "Delhi: The Heart of India",
  language: 'hi',
  excerpt: "Where centuries of history meet a fast-growing modern capital, Delhi captures the essence of India.",
  hasMap: true,
  lnglat: [77.2090, 28.6139],
  bbox: [[76.8376, 28.4040], [77.3828, 28.8832]],
  content: `
      Delhi, India’s capital, is a city layered with history. Ancient walls and Mughal
      forts stand alongside colonial boulevards and glass towers, each narrating a chapter
      of the city’s evolving story.

      At its heart is Old Delhi — with the Red Fort, Jama Masjid, and the bustling lanes of
      Chandni Chowk, where spices, sweets, and textiles crowd every corner. In contrast,
      New Delhi offers wide avenues, government buildings, and modern districts like
      Connaught Place.

      The food culture is as diverse as the city itself: butter chicken, street-side
      chaat, parathas, and Mughlai kebabs are must-tastes. Festivals like Diwali and Holi
      light up neighborhoods with color, music, and celebration.

      Today, Delhi is not only a political capital but also a cultural and technological
      hub, linking the traditions of India’s past with the possibilities of its future.
  `
}, 
{
  id: "5",
  title: "Chicago: The Windy City",
  language: 'en',
  hasMap: true,
  lnglat: [-87.6298, 41.8781],
  bbox: [[-87.9401, 41.6445], [-87.5239, 42.0230]],
  excerpt: "Chicago blends architecture, music, and culture on the shores of Lake Michigan — a city where innovation meets Midwestern charm.",
  content: `
      Chicago, Illinois, stands tall on the southwestern shores of Lake Michigan and is
      renowned for its skyline, deep-dish pizza, and architectural legacy. Known as the
      “Windy City,” it’s home to iconic landmarks like the Willis Tower, Millennium Park,
      and the Cloud Gate sculpture — affectionately called “The Bean.”

      The city’s neighborhoods each tell a different story: from the jazz clubs of
      Bronzeville and murals of Pilsen to the upscale restaurants of River North.
      Chicago’s cultural heartbeat pulses through its festivals — none more famous than
      Lollapalooza, the annual music festival in Grant Park that draws visitors from
      around the world.

      Beyond its arts and food, Chicago’s history is tied to innovation and resilience —
      rebuilt after the Great Fire of 1871, it became a model for modern urban planning.
      Today, the city continues to balance progress and tradition, where a walk along the
      lakefront reveals both world-class architecture and classic Midwest warmth.
  `
}


];
