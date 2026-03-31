export function RestaurantJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Through the Vine',
    description:
      "Fort Lauderdale's boutique wine bar in Flagler Village. Curated global wines, inventive tapas-style bites by Executive Chef Paul Pincus, craft cocktails, and unforgettable brunch.",
    url: 'https://throughthevine.com',
    telephone: '+19545551234',
    email: 'info@throughthevine.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '444 NE 7th St, Unit 1A',
      addressLocality: 'Fort Lauderdale',
      addressRegion: 'FL',
      postalCode: '33304',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 26.1255,
      longitude: -80.1373,
    },
    image: 'https://throughthevine.com/images/throughthevineftl_0027.jpg',
    servesCuisine: ['Wine Bar', 'Tapas', 'Brunch', 'American'],
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '16:00',
        closes: '00:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '12:00',
        closes: '20:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com/throughthevineftl/',
    ],
    hasMenu: 'https://throughthevine.com/menu',
    acceptsReservations: 'True',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '120',
      bestRating: '5',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
