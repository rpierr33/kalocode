import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🍷 Seeding Through the Vine database...\n')

  // ─── Admin User ───────────────────────────────────────────
  // ⚠️ IMPORTANT: Change this password immediately after first login!
  const hashedPassword = await bcrypt.hash('TTV@dmin2025!', 12)

  await prisma.user.upsert({
    where: { email: 'admin@throughthevine.com' },
    update: {},
    create: {
      email: 'admin@throughthevine.com',
      password: hashedPassword,
      role: 'admin',
    },
  })
  console.log('✓ Admin user seeded: admin@throughthevine.com')

  // ─── Menu Items ───────────────────────────────────────────

  // Clear existing menu items
  await prisma.orderItem.deleteMany({})
  await prisma.menuItem.deleteMany({})

  const menuItems = [
    // APPETIZERS
    { name: 'Bruschetta', description: 'Fresh baguette, tomatoes, capers, basil, EVOO, crème fraîche, pesto', price: 15, category: 'appetizer', imageUrl: '/images/throughthevineftl_0009.jpg', tags: ['vegetarian'], sortOrder: 1 },
    { name: 'Charcuterie Board', description: 'Black Pepper Salami, Piccante Salami, assorted cured meats, fig spread, Marcona almonds, fresh fruit, truffle honey, crostini, pita chips', price: 39, category: 'appetizer', tags: ['signature'], sortOrder: 2 },
    { name: 'Artisan Cheese Board', description: 'Aged Holland, Port Wine Derby England, Manchego Spain; fig spread, Marcona almonds, fresh fruit, truffle honey, crostini, pita chips', price: 25, category: 'appetizer', tags: ['vegetarian'], sortOrder: 3 },
    { name: 'Hummus Dip', description: 'English cucumbers, crostini, pita chips', price: 16, category: 'appetizer', imageUrl: '/images/throughthevineftl_0024.jpg', tags: ['vegetarian', 'vegan'], sortOrder: 4 },
    { name: 'Whipped Feta & Tzatziki Dip', description: 'English cucumbers, crostini, pita chips', price: 15, category: 'appetizer', tags: ['vegetarian'], sortOrder: 5 },
    { name: 'Three Oysters', description: 'Cocktail sauce, freshly grated horseradish', price: 10, category: 'appetizer', tags: [], sortOrder: 6 },

    // SALADS
    { name: 'Heirloom Tomato & Burrata', description: 'Aged balsamic glaze; add prosciutto +$6', price: 16, category: 'salad', imageUrl: '/images/throughthevineftl_0023.jpg', tags: ['vegetarian', 'add_prosciutto'], sortOrder: 1 },
    { name: 'Danish Blue Cheese Wedge Salad', description: 'Iceberg lettuce, candied bacon, cherry tomatoes, blue cheese + Port Wine cheese crumbles, balsamic dressing', price: 15, category: 'salad', tags: [], sortOrder: 2 },

    // FLATBREADS
    { name: 'Margherita Flatbread', description: 'San Marzano tomato sauce, fresh mozzarella, basil, Parmigiano-Reggiano, EVOO; add prosciutto +$6', price: 19, category: 'flatbread', imageUrl: '/images/throughthevineftl_0015.jpg', tags: ['vegetarian', 'add_prosciutto'], sortOrder: 1 },
    { name: 'Greek Flatbread', description: 'Tomatoes, onions, olives, feta, arugula, marinated artichokes, San Marzano sauce', price: 19.50, category: 'flatbread', tags: ['vegetarian'], sortOrder: 2 },
    { name: 'Italian Sausage Flatbread', description: 'Italian sausage, mozzarella, sharp cheddar, herb oil, peppered honey', price: 20, category: 'flatbread', imageUrl: '/images/throughthevineftl_0022.jpg', tags: [], sortOrder: 3 },
    { name: 'Smoked Gouda Flatbread', description: 'Gouda, caramelized onions, candied bacon, herb oil, peppered honey', price: 19, category: 'flatbread', tags: [], sortOrder: 4 },

    // HANDHELDS
    { name: 'Say Cheese Grilled Cheese', description: 'Brioche, Havarti, Gouda, Sharp Cheddar; served with tomato bisque or crispy chips', price: 17, category: 'handheld', imageUrl: '/images/throughthevineftl_0018.jpg', tags: ['vegetarian'], sortOrder: 1 },
    { name: 'Salsalito Turkey Sandwich', description: "Brioche, Boar's Head Bold Salsalito Turkey, Havarti, Gruyère, tomato, arugula, mayo, pickles; crispy chips", price: 20, category: 'handheld', imageUrl: '/images/throughthevineftl_0032.jpg', tags: [], sortOrder: 2 },
    { name: 'Caprese Sandwich', description: 'Brioche, ripe tomatoes, basil, mozzarella, pesto, balsamic glaze; add prosciutto +$6', price: 18, category: 'handheld', tags: ['vegetarian', 'add_prosciutto'], sortOrder: 3 },

    // DESSERTS
    { name: 'Tiramisu', description: 'Caramel whipped cream, rich chocolate sauce, golden caramel drizzle', price: 13, category: 'dessert', tags: [], sortOrder: 1 },
    { name: 'Chocolate Lava Cake', description: 'Flambéed with 151 rum, whipped cream, fresh berries', price: 12.50, category: 'dessert', imageUrl: '/images/throughthevineftl_0012.jpg', tags: ['signature'], sortOrder: 2 },
    { name: 'Cheesecake', description: 'Berry purée, seasonal fresh berries', price: 12, category: 'dessert', imageUrl: '/images/throughthevineftl_0002.jpg', tags: [], sortOrder: 3 },

    // TWISTED VINES COCKTAILS
    { name: 'Lychee Blossom', description: 'Delicate Floral · Effervescent — A sparkling fusion of floral lychee, prosecco, and citrus spritzed to perfection.', price: 12, category: 'cocktail', tags: ['twisted_vines'], sortOrder: 1 },
    { name: 'Melon Mist', description: 'Refreshing · Crisp · Garden-Fresh — Juicy watermelon and cool cucumber meet sparkling wine.', price: 12, category: 'cocktail', tags: ['twisted_vines'], sortOrder: 2 },
    { name: 'Fifty Shades Of Fizz', description: 'Passionfruit · Vanilla · Flirtatious — Luscious passionfruit, a touch of vanilla, and a kiss of bubbles.', price: 12, category: 'cocktail', tags: ['twisted_vines'], sortOrder: 3 },
    { name: "Tropic Like It's Hot", description: 'Tropical · Creamy · Unexpected — Coconut-pineapple beach vibes with a wine-forward twist.', price: 12, category: 'cocktail', tags: ['twisted_vines'], sortOrder: 4 },
    { name: 'NY "Amour"etto Sour', description: 'Rich · Tangy · Sophisticated — Amaretto wine-based liqueur, fresh citrus, and a splash of Malbec.', price: 12, category: 'cocktail', tags: ['twisted_vines'], sortOrder: 5 },
    { name: 'Something About Mary', description: 'Savory · Spiced · Bold — A wine-based Bloody Mary. Bursting with tomato, herbs, and spice.', price: 12, category: 'cocktail', tags: ['twisted_vines'], sortOrder: 6 },

    // WHITE WINES
    { name: 'Terrazas De Los Andes, Chardonnay', price: 15, category: 'wine_white', glassPrice: 15, bottlePrice: 45, tags: [], sortOrder: 1 },
    { name: 'Cave De Lugny Mâcon Village, Chardonnay', price: 14, category: 'wine_white', glassPrice: 14, bottlePrice: 43, tags: [], sortOrder: 2 },
    { name: 'The Calling Dutton Ranch, Chardonnay', price: 66, category: 'wine_white', bottlePrice: 66, tags: [], sortOrder: 3 },
    { name: 'Lingua Franca, Chardonnay', price: 70, category: 'wine_white', bottlePrice: 70, tags: [], sortOrder: 4 },
    { name: 'Domaine Laroche Saint Martin Chablis', price: 78, category: 'wine_white', bottlePrice: 78, tags: [], sortOrder: 5 },
    { name: 'Far Niente, Chardonnay', price: 140, category: 'wine_white', bottlePrice: 140, tags: ['premium'], sortOrder: 6 },
    { name: 'Sylvain Dussort Meursault', price: 195, category: 'wine_white', bottlePrice: 195, tags: ['premium'], sortOrder: 7 },
    { name: 'Louis Latour Chassagne Montrachet', price: 230, category: 'wine_white', bottlePrice: 230, tags: ['premium'], sortOrder: 8 },
    { name: 'Tutela, Pinot Grigio', price: 14, category: 'wine_white', glassPrice: 14, bottlePrice: 40, tags: ['happy_hour'], sortOrder: 9 },
    { name: 'Pierre Sparr, Pinot Gris', price: 47, category: 'wine_white', bottlePrice: 47, tags: [], sortOrder: 10 },
    { name: 'The Crossings, Sauvignon Blanc', price: 12, category: 'wine_white', glassPrice: 12, bottlePrice: 38, tags: ['happy_hour'], sortOrder: 11 },
    { name: 'Comte De La Chevalière Sancerre, Sauvignon Blanc', price: 89, category: 'wine_white', bottlePrice: 89, tags: [], sortOrder: 12 },
    { name: 'Sauvion Vouvray, Chenin Blanc', price: 14, category: 'wine_white', glassPrice: 14, bottlePrice: 44, tags: [], sortOrder: 13 },
    { name: 'Mooiplaas, Chenin Blanc', price: 49, category: 'wine_white', bottlePrice: 49, tags: [], sortOrder: 14 },
    { name: 'August Kesseler Kabinett, Riesling', price: 13, category: 'wine_white', glassPrice: 13, bottlePrice: 38, tags: [], sortOrder: 15 },
    { name: 'Dr. Bürklin-Wolf Trocken, Riesling', price: 52, category: 'wine_white', bottlePrice: 52, tags: [], sortOrder: 16 },
    { name: 'Les Clos Du Caillou, White Blend', price: 15, category: 'wine_white', glassPrice: 15, tags: [], sortOrder: 17 },

    // RED WINES
    { name: 'Daou, Cabernet Sauvignon', price: 16, category: 'wine_red', glassPrice: 16, bottlePrice: 45, tags: [], sortOrder: 1 },
    { name: 'Fabre Montmayou, Cabernet Sauvignon', price: 16, category: 'wine_red', glassPrice: 16, bottlePrice: 45, tags: [], sortOrder: 2 },
    { name: 'Route Stock RT 29, Cabernet Sauvignon', price: 62, category: 'wine_red', bottlePrice: 62, tags: [], sortOrder: 3 },
    { name: 'Quilt - Thread Count, Cabernet Sauvignon', price: 20, category: 'wine_red', glassPrice: 20, bottlePrice: 70, tags: [], sortOrder: 4 },
    { name: 'Caymus, Cabernet Sauvignon', price: 185, category: 'wine_red', bottlePrice: 185, tags: ['premium'], sortOrder: 5 },
    { name: 'Domaine Grosbois Ma Mere Chinon, Cabernet Franc', price: 16, category: 'wine_red', glassPrice: 16, bottlePrice: 58, tags: [], sortOrder: 6 },
    { name: 'Haras De Pirque Galantas, Cabernet Franc', price: 75, category: 'wine_red', bottlePrice: 75, tags: [], sortOrder: 7 },
    { name: 'La Perruche Chinon, Cabernet Franc', price: 68, category: 'wine_red', bottlePrice: 68, tags: [], sortOrder: 8 },
    { name: 'Ken Wright, Pinot Noir', price: 19, category: 'wine_red', glassPrice: 19, bottlePrice: 58, tags: [], sortOrder: 9 },
    { name: 'Domaine Bouchard Burgundy', price: 62, category: 'wine_red', bottlePrice: 62, tags: [], sortOrder: 10 },
    { name: 'Domaine Faiveley Gevrey Chambertain', price: 178, category: 'wine_red', bottlePrice: 178, tags: ['premium'], sortOrder: 11 },
    { name: 'Skyfall, Merlot', price: 45, category: 'wine_red', bottlePrice: 45, tags: [], sortOrder: 12 },
    { name: 'Comte De La Chevalière Sancerre, Pinot Noir', price: 88, category: 'wine_red', bottlePrice: 88, tags: [], sortOrder: 13 },
    { name: 'Belle Glos Dairyman Pinot Noir', price: 20, category: 'wine_red', glassPrice: 20, bottlePrice: 66, tags: [], sortOrder: 14 },
    { name: 'Barolo, Nebbiolo', price: 148, category: 'wine_red', bottlePrice: 148, tags: ['premium'], sortOrder: 15 },
    { name: 'Carlos Serres Rioja, Tempranillo', price: 15, category: 'wine_red', glassPrice: 15, bottlePrice: 44, tags: [], sortOrder: 16 },
    { name: 'Windstorm Old Vine, Zinfandel', price: 12, category: 'wine_red', glassPrice: 12, bottlePrice: 36, tags: [], sortOrder: 17 },
    { name: 'Numanthia Termes, Tinta De Toro', price: 68, category: 'wine_red', bottlePrice: 68, tags: [], sortOrder: 18 },
    { name: 'Valdubon Reserva, Tempranillo', price: 52, category: 'wine_red', bottlePrice: 52, tags: [], sortOrder: 19 },
    { name: 'Beronia Gran Reserva Rioja, Tempranillo', price: 98, category: 'wine_red', bottlePrice: 98, tags: [], sortOrder: 20 },
    { name: 'Saldo, Zinfandel', price: 65, category: 'wine_red', bottlePrice: 65, tags: [], sortOrder: 21 },
    { name: 'Achaval Ferrer, Malbec', price: 15, category: 'wine_red', glassPrice: 15, bottlePrice: 40, tags: ['happy_hour'], sortOrder: 22 },
    { name: 'Clos De Los Siete, Bordeaux Blend', price: 15, category: 'wine_red', glassPrice: 15, bottlePrice: 45, tags: [], sortOrder: 23 },
    { name: "Penfolds Max's, Cabernet Sauv / Shiraz", price: 45, category: 'wine_red', bottlePrice: 45, tags: [], sortOrder: 24 },
    { name: 'Haras De Pirque Ecral, Carmenère', price: 75, category: 'wine_red', bottlePrice: 75, tags: [], sortOrder: 25 },
    { name: 'Viña Vik La Piu Belle, Carmenère Blend', price: 185, category: 'wine_red', bottlePrice: 185, tags: ['premium'], sortOrder: 26 },
    { name: "Porta D'Armas, Red Blend", price: 15, category: 'wine_red', glassPrice: 15, bottlePrice: 49, tags: [], sortOrder: 27 },
    { name: 'Chateau Deyrem Valentin Margaux', price: 95, category: 'wine_red', bottlePrice: 95, tags: [], sortOrder: 28 },
    { name: 'Produttori Barbaresco', price: 120, category: 'wine_red', bottlePrice: 120, tags: ['premium'], sortOrder: 29 },
    { name: 'Massolino Barolo', price: 135, category: 'wine_red', bottlePrice: 135, tags: ['premium'], sortOrder: 30 },
    { name: "Feudo Montoni, Nero D'Avola", price: 58, category: 'wine_red', bottlePrice: 58, tags: [], sortOrder: 31 },
    { name: "Pio Cesare, Barbera D'Alba", price: 55, category: 'wine_red', bottlePrice: 55, tags: [], sortOrder: 32 },
    { name: 'Chateau De Sales Pomerol', price: 95, category: 'wine_red', bottlePrice: 95, tags: [], sortOrder: 33 },
    { name: 'San Polo Rubio "Organic", Sangiovese', price: 45, category: 'wine_red', bottlePrice: 45, tags: ['organic'], sortOrder: 34 },

    // BEER
    { name: 'Delirium Tremens', description: 'Belgian Strong Ale', price: 14, category: 'beer', imageUrl: '/images/throughthevineftl_0026.jpg', tags: ['belgian'], sortOrder: 1 },
    { name: 'Chimay Blue', description: 'Trappist Ale', price: 16, category: 'beer', imageUrl: '/images/throughthevineftl_0020.jpg', tags: ['belgian', 'trappist'], sortOrder: 2 },
    { name: 'Duvel', description: 'Belgian Strong Blond', price: 10, category: 'beer', imageUrl: '/images/throughthevineftl_0028.jpg', tags: ['belgian', 'happy_hour'], sortOrder: 3 },
    { name: 'Ommegang Three Philosophers Quad', description: 'Belgian-style Quadrupel', price: 10, category: 'beer', tags: ['belgian'], sortOrder: 4 },
    { name: 'Kentucky Bourbon Barrel Ale', description: 'Bourbon Barrel Ale', price: 9, category: 'beer', tags: [], sortOrder: 5 },
    { name: 'Wynwood La Rubia', description: 'Blonde Ale', price: 8, category: 'beer', tags: ['local'], sortOrder: 6 },
    { name: 'Funky Buddha Floridian', description: 'Hefeweizen', price: 8, category: 'beer', tags: ['local'], sortOrder: 7 },
    { name: 'Cigar City Jai Alai', description: 'IPA', price: 8, category: 'beer', tags: ['local', 'happy_hour'], sortOrder: 8 },
    { name: 'Elysian Space Dust', description: 'IPA', price: 8, category: 'beer', tags: [], sortOrder: 9 },
    { name: 'Dogfish 90 Min', description: 'Imperial IPA', price: 9, category: 'beer', tags: [], sortOrder: 10 },
    { name: 'Blue Moon', description: 'Belgian White', price: 8, category: 'beer', tags: ['happy_hour'], sortOrder: 11 },
    { name: 'High Noon (various)', description: 'Hard Seltzer', price: 7, category: 'beer', tags: ['happy_hour'], sortOrder: 12 },
    { name: 'Surfside (various)', description: 'Hard Seltzer', price: 7, category: 'beer', tags: [], sortOrder: 13 },
    { name: "O'Douls (NA)", description: 'Non-Alcoholic', price: 6, category: 'beer', tags: ['na'], sortOrder: 14 },
    { name: 'Samuel Smith Organic Chocolate Stout', description: 'Chocolate Stout', price: 10, category: 'beer', tags: ['organic'], sortOrder: 15 },
    { name: 'Lindemans Framboise Lambic', description: 'Raspberry Lambic', price: 10, category: 'beer', imageUrl: '/images/throughthevineftl_0005.jpg', tags: ['belgian'], sortOrder: 16 },
    { name: 'Golden Road Mango Cart', description: 'Mango Wheat Ale', price: 8, category: 'beer', tags: [], sortOrder: 17 },
    { name: 'Founders Porter', description: 'Porter', price: 9, category: 'beer', tags: [], sortOrder: 18 },
    { name: 'Angry Orchard', description: 'Hard Cider', price: 7, category: 'beer', tags: [], sortOrder: 19 },
    { name: 'Stella Artois', description: 'Belgian Lager', price: 8, category: 'beer', imageUrl: '/images/throughthevineftl_0013.jpg', tags: ['happy_hour'], sortOrder: 20 },

    // SOFT DRINKS
    { name: 'Coca-Cola 8oz', price: 4, category: 'soft_drink', tags: [], sortOrder: 1 },
    { name: 'Diet Coke 8oz', price: 4, category: 'soft_drink', tags: [], sortOrder: 2 },
    { name: 'Sprite 8oz', price: 4, category: 'soft_drink', tags: [], sortOrder: 3 },
    { name: 'Acqua Panna Still Water 750ml', price: 9, category: 'soft_drink', tags: [], sortOrder: 4 },
    { name: 'San Pellegrino Sparkling Water 750ml', price: 9, category: 'soft_drink', tags: [], sortOrder: 5 },
  ]

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: {
        name: item.name,
        description: item.description || null,
        price: item.price,
        category: item.category,
        imageUrl: item.imageUrl || null,
        glassPrice: item.glassPrice || null,
        bottlePrice: item.bottlePrice || null,
        tags: item.tags || [],
        sortOrder: item.sortOrder || 0,
      },
    })
  }

  console.log(`✓ ${menuItems.length} menu items seeded`)

  // ─── Sample Data ──────────────────────────────────────────

  await prisma.inquiry.create({
    data: {
      name: 'Emily Rodriguez',
      email: 'emily@example.com',
      phone: '(954) 555-0101',
      message: 'Hi! I\'d love to host a private wine tasting for my company\'s holiday party. We\'re looking at around 25-30 people in early December. Do you offer custom wine pairing packages?',
      inquiryType: 'private_event',
      status: 'new',
    },
  })

  await prisma.inquiry.create({
    data: {
      name: 'Fort Lauderdale Magazine',
      email: 'features@ftlmag.com',
      message: 'We\'re doing a feature on the best wine bars in South Florida for our spring issue. Would Chef Pincus be available for an interview and photo shoot?',
      inquiryType: 'media_press',
      status: 'new',
    },
  })

  console.log('✓ Sample inquiries seeded')
  console.log('\n🍷 Seeding complete!\n')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('  Admin Login:')
  console.log('  Email:    admin@throughthevine.com')
  console.log('  Password: TTV@dmin2025!')
  console.log('  ⚠️  CHANGE THIS IMMEDIATELY AFTER FIRST LOGIN')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
