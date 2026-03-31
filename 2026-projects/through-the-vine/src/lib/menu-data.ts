export interface MenuItemData {
  name: string
  description?: string
  price: number
  category: string
  imageUrl?: string
  glassPrice?: number
  bottlePrice?: number
  tags?: string[]
}

export const MENU_DATA: MenuItemData[] = [
  // APPETIZERS
  { name: 'Bruschetta', description: 'Fresh baguette, tomatoes, capers, basil, EVOO, crème fraîche, pesto', price: 15, category: 'appetizer', imageUrl: '/images/throughthevineftl_0009.jpg' },
  { name: 'Charcuterie Board', description: 'Black Pepper Salami, Piccante Salami, assorted cured meats, fig spread, Marcona almonds, fresh fruit, truffle honey, crostini, pita chips', price: 39, category: 'appetizer' },
  { name: 'Artisan Cheese Board', description: 'Aged Holland, Port Wine Derby England, Manchego Spain; fig spread, Marcona almonds, fresh fruit, truffle honey, crostini, pita chips', price: 25, category: 'appetizer' },
  { name: 'Hummus Dip', description: 'English cucumbers, crostini, pita chips', price: 16, category: 'appetizer', imageUrl: '/images/throughthevineftl_0024.jpg' },
  { name: 'Whipped Feta & Tzatziki Dip', description: 'English cucumbers, crostini, pita chips', price: 15, category: 'appetizer' },
  { name: 'Three Oysters', description: 'Cocktail sauce, freshly grated horseradish', price: 10, category: 'appetizer' },

  // SALADS
  { name: 'Heirloom Tomato & Burrata', description: 'Aged balsamic glaze; add prosciutto +$6', price: 16, category: 'salad', imageUrl: '/images/throughthevineftl_0023.jpg', tags: ['add_prosciutto'] },
  { name: 'Danish Blue Cheese Wedge Salad', description: 'Iceberg lettuce, candied bacon, cherry tomatoes, blue cheese + Port Wine cheese crumbles, balsamic dressing', price: 15, category: 'salad' },

  // FLATBREADS
  { name: 'Margherita Flatbread', description: 'San Marzano tomato sauce, fresh mozzarella, basil, Parmigiano-Reggiano, EVOO; add prosciutto +$6', price: 19, category: 'flatbread', imageUrl: '/images/throughthevineftl_0015.jpg', tags: ['add_prosciutto'] },
  { name: 'Greek Flatbread', description: 'Tomatoes, onions, olives, feta, arugula, marinated artichokes, San Marzano sauce', price: 19.50, category: 'flatbread' },
  { name: 'Italian Sausage Flatbread', description: 'Italian sausage, mozzarella, sharp cheddar, herb oil, peppered honey', price: 20, category: 'flatbread', imageUrl: '/images/throughthevineftl_0022.jpg' },
  { name: 'Smoked Gouda Flatbread', description: 'Gouda, caramelized onions, candied bacon, herb oil, peppered honey', price: 19, category: 'flatbread' },

  // HANDHELDS
  { name: 'Say Cheese Grilled Cheese', description: 'Brioche, Havarti, Gouda, Sharp Cheddar; served with tomato bisque or crispy chips', price: 17, category: 'handheld', imageUrl: '/images/throughthevineftl_0018.jpg' },
  { name: 'Salsalito Turkey Sandwich', description: 'Brioche, Boar\'s Head Bold Salsalito Turkey, Havarti, Gruyère, tomato, arugula, mayo, pickles; crispy chips', price: 20, category: 'handheld', imageUrl: '/images/throughthevineftl_0032.jpg' },
  { name: 'Caprese Sandwich', description: 'Brioche, ripe tomatoes, basil, mozzarella, pesto, balsamic glaze; add prosciutto +$6', price: 18, category: 'handheld', tags: ['add_prosciutto'] },

  // DESSERTS
  { name: 'Tiramisu', description: 'Caramel whipped cream, rich chocolate sauce, golden caramel drizzle', price: 13, category: 'dessert' },
  { name: 'Chocolate Lava Cake', description: 'Flambéed with 151 rum, whipped cream, fresh berries', price: 12.50, category: 'dessert', imageUrl: '/images/throughthevineftl_0012.jpg' },
  { name: 'Cheesecake', description: 'Berry purée, seasonal fresh berries', price: 12, category: 'dessert', imageUrl: '/images/throughthevineftl_0002.jpg' },

  // TWISTED VINES COCKTAILS
  { name: 'Lychee Blossom', description: 'Delicate Floral · Effervescent — A sparkling fusion of floral lychee, prosecco, and citrus spritzed to perfection. Light, aromatic, and dangerously sippable.', price: 12, category: 'cocktail' },
  { name: 'Melon Mist', description: 'Refreshing · Crisp · Garden-Fresh — Juicy watermelon and cool cucumber meet sparkling wine in this ultra-refreshing spritz.', price: 12, category: 'cocktail' },
  { name: 'Fifty Shades Of Fizz', description: 'Passionfruit · Vanilla · Flirtatious — A naughty nod to the Pornstar Martini, with luscious passionfruit, a touch of vanilla, and a kiss of bubbles.', price: 12, category: 'cocktail' },
  { name: 'Tropic Like It\'s Hot', description: 'Tropical · Creamy · Unexpected — Coconut-pineapple beach vibes with a wine-forward twist.', price: 12, category: 'cocktail' },
  { name: 'NY "Amour"etto Sour', description: 'Rich · Tangy · Sophisticated — Amaretto wine-based liqueur, fresh citrus, and a splash of Malbec.', price: 12, category: 'cocktail' },
  { name: 'Something About Mary', description: 'Savory · Spiced · Bold — A wine-based Bloody Mary. Bursting with tomato, herbs, and spice.', price: 12, category: 'cocktail' },

  // WHITE WINES
  { name: 'Terrazas De Los Andes, Chardonnay', category: 'wine_white', price: 45, glassPrice: 15, bottlePrice: 45 },
  { name: 'Cave De Lugny Mâcon Village, Chardonnay', category: 'wine_white', price: 43, glassPrice: 14, bottlePrice: 43 },
  { name: 'The Calling Dutton Ranch, Chardonnay', category: 'wine_white', price: 66, bottlePrice: 66 },
  { name: 'Lingua Franca, Chardonnay', category: 'wine_white', price: 70, bottlePrice: 70 },
  { name: 'Domaine Laroche Saint Martin Chablis', category: 'wine_white', price: 78, bottlePrice: 78 },
  { name: 'Far Niente, Chardonnay', category: 'wine_white', price: 140, bottlePrice: 140 },
  { name: 'Sylvain Dussort Meursault', category: 'wine_white', price: 195, bottlePrice: 195 },
  { name: 'Louis Latour Chassagne Montrachet', category: 'wine_white', price: 230, bottlePrice: 230 },
  { name: 'Tutela, Pinot Grigio', category: 'wine_white', price: 40, glassPrice: 14, bottlePrice: 40 },
  { name: 'Pierre Sparr, Pinot Gris', category: 'wine_white', price: 47, bottlePrice: 47 },
  { name: 'The Crossings, Sauvignon Blanc', category: 'wine_white', price: 38, glassPrice: 12, bottlePrice: 38 },
  { name: 'Comte De La Chevalière Sancerre, Sauvignon Blanc', category: 'wine_white', price: 89, bottlePrice: 89 },
  { name: 'Sauvion Vouvray, Chenin Blanc', category: 'wine_white', price: 44, glassPrice: 14, bottlePrice: 44 },
  { name: 'Mooiplaas, Chenin Blanc', category: 'wine_white', price: 49, bottlePrice: 49 },
  { name: 'August Kesseler Kabinett, Riesling', category: 'wine_white', price: 38, glassPrice: 13, bottlePrice: 38 },
  { name: 'Dr. Bürklin-Wolf Trocken, Riesling', category: 'wine_white', price: 52, bottlePrice: 52 },
  { name: 'Les Clos Du Caillou, White Blend', category: 'wine_white', price: 15, glassPrice: 15 },

  // RED WINES
  { name: 'Daou, Cabernet Sauvignon', category: 'wine_red', price: 45, glassPrice: 16, bottlePrice: 45 },
  { name: 'Fabre Montmayou, Cabernet Sauvignon', category: 'wine_red', price: 45, glassPrice: 16, bottlePrice: 45 },
  { name: 'Route Stock RT 29, Cabernet Sauvignon', category: 'wine_red', price: 62, bottlePrice: 62 },
  { name: 'Quilt - Thread Count, Cabernet Sauvignon', category: 'wine_red', price: 70, glassPrice: 20, bottlePrice: 70 },
  { name: 'Caymus, Cabernet Sauvignon', category: 'wine_red', price: 185, bottlePrice: 185 },
  { name: 'Domaine Grosbois Ma Mere Chinon, Cabernet Franc', category: 'wine_red', price: 58, glassPrice: 16, bottlePrice: 58 },
  { name: 'Haras De Pirque Galantas, Cabernet Franc', category: 'wine_red', price: 75, bottlePrice: 75 },
  { name: 'La Perruche Chinon, Cabernet Franc', category: 'wine_red', price: 68, bottlePrice: 68 },
  { name: 'Ken Wright, Pinot Noir', category: 'wine_red', price: 58, glassPrice: 19, bottlePrice: 58, imageUrl: '/images/throughthevineftl_0019.jpg' },
  { name: 'Domaine Bouchard Burgundy', category: 'wine_red', price: 62, bottlePrice: 62 },
  { name: 'Domaine Faiveley Gevrey Chambertain', category: 'wine_red', price: 178, bottlePrice: 178 },
  { name: 'Skyfall, Merlot', category: 'wine_red', price: 45, bottlePrice: 45 },
  { name: 'Comte De La Chevalière Sancerre, Pinot Noir', category: 'wine_red', price: 88, bottlePrice: 88 },
  { name: 'Belle Glos Dairyman Pinot Noir', category: 'wine_red', price: 66, glassPrice: 20, bottlePrice: 66 },
  { name: 'Barolo, Nebbiolo', category: 'wine_red', price: 148, bottlePrice: 148 },
  { name: 'Carlos Serres Rioja, Tempranillo', category: 'wine_red', price: 44, glassPrice: 15, bottlePrice: 44 },
  { name: 'Windstorm Old Vine, Zinfandel', category: 'wine_red', price: 36, glassPrice: 12, bottlePrice: 36 },
  { name: 'Numanthia Termes, Tinta De Toro', category: 'wine_red', price: 68, bottlePrice: 68 },
  { name: 'Valdubon Reserva, Tempranillo', category: 'wine_red', price: 52, bottlePrice: 52 },
  { name: 'Beronia Gran Reserva Rioja, Tempranillo', category: 'wine_red', price: 98, bottlePrice: 98 },
  { name: 'Saldo, Zinfandel', category: 'wine_red', price: 65, bottlePrice: 65 },
  { name: 'Achaval Ferrer, Malbec', category: 'wine_red', price: 40, glassPrice: 15, bottlePrice: 40 },
  { name: 'Clos De Los Siete, Bordeaux Blend', category: 'wine_red', price: 45, glassPrice: 15, bottlePrice: 45 },
  { name: 'Penfolds Max\'s, Cabernet Sauv / Shiraz', category: 'wine_red', price: 45, bottlePrice: 45 },
  { name: 'Haras De Pirque Ecral, Carmenère', category: 'wine_red', price: 75, bottlePrice: 75 },
  { name: 'Viña Vik La Piu Belle, Carmenère Blend', category: 'wine_red', price: 185, bottlePrice: 185 },
  { name: 'Porta D\'Armas, Red Blend', category: 'wine_red', price: 49, glassPrice: 15, bottlePrice: 49 },
  { name: 'Chateau Deyrem Valentin Margaux', category: 'wine_red', price: 95, bottlePrice: 95 },
  { name: 'Produttori Barbaresco', category: 'wine_red', price: 120, bottlePrice: 120 },
  { name: 'Massolino Barolo', category: 'wine_red', price: 135, bottlePrice: 135 },
  { name: 'Feudo Montoni, Nero D\'Avola', category: 'wine_red', price: 58, bottlePrice: 58 },
  { name: 'Pio Cesare, Barbera D\'Alba', category: 'wine_red', price: 55, bottlePrice: 55 },
  { name: 'Chateau De Sales Pomerol', category: 'wine_red', price: 95, bottlePrice: 95 },
  { name: 'San Polo Rubio "Organic", Sangiovese', category: 'wine_red', price: 45, bottlePrice: 45 },

  // BEER
  { name: 'Delirium Tremens', description: 'Belgian Strong Ale', price: 14, category: 'beer', imageUrl: '/images/throughthevineftl_0026.jpg' },
  { name: 'Chimay Blue', description: 'Trappist Ale', price: 16, category: 'beer', imageUrl: '/images/throughthevineftl_0020.jpg' },
  { name: 'Duvel', description: 'Belgian Strong Blond', price: 10, category: 'beer', imageUrl: '/images/throughthevineftl_0028.jpg' },
  { name: 'Ommegang Three Philosophers Quad', description: 'Belgian-style Quadrupel', price: 10, category: 'beer' },
  { name: 'Kentucky Bourbon Barrel Ale', description: 'Bourbon Barrel Ale', price: 9, category: 'beer' },
  { name: 'Wynwood La Rubia', description: 'Blonde Ale', price: 8, category: 'beer' },
  { name: 'Funky Buddha Floridian', description: 'Hefeweizen', price: 8, category: 'beer' },
  { name: 'Cigar City Jai Alai', description: 'IPA', price: 8, category: 'beer' },
  { name: 'Elysian Space Dust', description: 'IPA', price: 8, category: 'beer' },
  { name: 'Dogfish 90 Min', description: 'Imperial IPA', price: 9, category: 'beer' },
  { name: 'Blue Moon', description: 'Belgian White', price: 8, category: 'beer' },
  { name: 'High Noon (various flavors)', description: 'Hard Seltzer', price: 7, category: 'beer' },
  { name: 'Surfside (various flavors)', description: 'Hard Seltzer', price: 7, category: 'beer' },
  { name: 'O\'Douls (NA)', description: 'Non-Alcoholic', price: 6, category: 'beer' },
  { name: 'Samuel Smith Organic Chocolate Stout', description: 'Chocolate Stout', price: 10, category: 'beer' },
  { name: 'Lindemans Framboise Lambic', description: 'Raspberry Lambic', price: 10, category: 'beer', imageUrl: '/images/throughthevineftl_0005.jpg' },
  { name: 'Golden Road Mango Cart', description: 'Mango Wheat Ale', price: 8, category: 'beer' },
  { name: 'Founders Porter', description: 'Porter', price: 9, category: 'beer' },
  { name: 'Angry Orchard', description: 'Hard Cider', price: 7, category: 'beer' },
  { name: 'Stella Artois', description: 'Belgian Lager', price: 8, category: 'beer', imageUrl: '/images/throughthevineftl_0013.jpg' },

  // SOFT DRINKS
  { name: 'Coca-Cola 8oz', price: 4, category: 'soft_drink' },
  { name: 'Diet Coke 8oz', price: 4, category: 'soft_drink' },
  { name: 'Sprite 8oz', price: 4, category: 'soft_drink' },
  { name: 'Acqua Panna Still Water 750ml', price: 9, category: 'soft_drink' },
  { name: 'San Pellegrino Sparkling Water 750ml', price: 9, category: 'soft_drink' },

  // HAPPY HOUR FOOD
  { name: 'Three Oysters', description: 'Happy Hour Special', price: 10, category: 'happy_hour_food', tags: ['happy_hour'] },
  { name: 'Bruschetta', description: 'Happy Hour Special', price: 10, category: 'happy_hour_food', tags: ['happy_hour'] },
  { name: 'Hummus Dip', description: 'Happy Hour Special', price: 10, category: 'happy_hour_food', tags: ['happy_hour'] },
  { name: 'Whipped Feta & Tzatziki Dip', description: 'Happy Hour Special', price: 10, category: 'happy_hour_food', tags: ['happy_hour'] },
  { name: 'Half Sandwich', description: 'Grilled Cheese, Salsalito Turkey, or Caprese; with chips', price: 10, category: 'happy_hour_food', tags: ['happy_hour'] },
  { name: 'Half Focaccia Flatbread', description: 'Greek, Italian Sausage, or Smoked Gouda', price: 10, category: 'happy_hour_food', tags: ['happy_hour'] },

  // HAPPY HOUR DRINKS
  { name: 'Abadia, Albarino', price: 9, category: 'happy_hour_drink', tags: ['happy_hour'] },
  { name: 'Tutela, Pinot Grigio', price: 9, category: 'happy_hour_drink', tags: ['happy_hour'] },
  { name: 'Crossings, Sauvignon Blanc', price: 9, category: 'happy_hour_drink', tags: ['happy_hour'] },
  { name: 'Borgo Scopeto, Chianti', price: 9, category: 'happy_hour_drink', tags: ['happy_hour'] },
  { name: 'Achaval Ferrer, Malbec', price: 9, category: 'happy_hour_drink', tags: ['happy_hour'] },
  { name: 'Can Sumoi La Rosa, Rosé', price: 9, category: 'happy_hour_drink', tags: ['happy_hour'] },
  { name: 'Ackerman, Cremant', price: 9, category: 'happy_hour_drink', tags: ['happy_hour'] },
  { name: 'Avissi, Prosecco', price: 9, category: 'happy_hour_drink', tags: ['happy_hour'] },
  { name: 'Stella Artois', price: 6, category: 'happy_hour_drink', tags: ['happy_hour'] },
  { name: 'Corona', price: 6, category: 'happy_hour_drink', tags: ['happy_hour'] },
  { name: 'Duvel', price: 6, category: 'happy_hour_drink', tags: ['happy_hour'] },
  { name: 'Cigar City Jai Alai', price: 6, category: 'happy_hour_drink', tags: ['happy_hour'] },
  { name: 'Blue Moon', price: 6, category: 'happy_hour_drink', tags: ['happy_hour'] },
  { name: 'High Noon', price: 6, category: 'happy_hour_drink', tags: ['happy_hour'] },
]
