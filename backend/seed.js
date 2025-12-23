import mongoose from 'mongoose';
import dotenv from 'dotenv';
import itemModal from './modals/itemModal.js';
import path from 'path';

dotenv.config();

const items = [
  // Breakfast
  { name: 'Eggs Benedict', price: 80, rating: 4.2, imageUrl: '/uploads/EggsBenedict.png', category: 'Breakfast', description: 'Poached eggs over toasted English muffins with hollandaise sauce.' },
  { name: 'Avocado Toast', price: 70, rating: 4.5, imageUrl: '/uploads/AvocadoToast.png', category: 'Breakfast', description: 'Toasted bread topped with smashed avocado and spices.' },
  { name: 'Pancakes with Maple Syrup', price: 60, rating: 4.3, imageUrl: '/uploads/PancakeswithMapleSyrup.png', category: 'Breakfast', description: 'Fluffy pancakes drizzled with pure maple syrup.' },
  { name: 'Fruit Smoothie Bowl', price: 90, rating: 4.6, imageUrl: '/uploads/FruitSmoothieBowl.png', category: 'Breakfast', description: 'A bowl full of fresh fruits blended into a refreshing smoothie.' },
  { name: 'Sunny Oats', price: 65, rating: 4.4, imageUrl: '/uploads/SunnyOats.png', category: 'Breakfast', description: 'Creamy oatmeal swirled with cinnamon and honey.' },
  { name: 'Banana Toast', price: 60, rating: 4.3, imageUrl: '/uploads/BananaToast.png', category: 'Breakfast', description: 'Toast topped with peanut butter and banana slices.' },
  { name: 'Bagel Smash', price: 80, rating: 4.5, imageUrl: '/uploads/BagelSmash.png', category: 'Breakfast', description: 'Toasted bagel with cream cheese and smoked salmon.' },
  { name: 'Fruit Waffle', price: 75, rating: 4.7, imageUrl: '/uploads/FruitWaffle.png', category: 'Breakfast', description: 'Crispy waffle topped with strawberries and whipped cream.' },
  { name: 'French Toast', price: 87, rating: 4.4, imageUrl: '/uploads/FrenchToast.png', category: 'Breakfast', description: 'Classic French toast served with powdered sugar and berries.' },
  { name: 'Breakfast Burrito', price: 99, rating: 4.2, imageUrl: '/uploads/BreakfastBurrito.png', category: 'Breakfast', description: 'Eggs, cheese, and veggies wrapped in a soft tortilla.' },
  { name: 'Bagel with Lox', price: 10, rating: 4.5, imageUrl: '/uploads/BagelwithLox.png', category: 'Breakfast', description: 'Toasted bagel topped with smoked salmon, cream cheese, and capers.' },
  { name: 'Granola Parfait', price: 75, rating: 4.3, imageUrl: '/uploads/GranolaParfait.png', category: 'Breakfast', description: 'Layers of granola, yogurt, and fresh berries.' },

  // Lunch
  { name: 'Chicken Caesar Salad', price: 199, rating: 4.4, imageUrl: '/uploads/ChickenCaesarSalad.png', category: 'Lunch', description: 'Crisp romaine with grilled chicken, parmesan, and Caesar dressing.' },
  { name: 'Club Sandwich', price: 150, rating: 4.3, imageUrl: '/uploads/ClubSandwich.png', category: 'Lunch', description: 'Triple-decker sandwich with turkey, bacon, and fresh veggies.' },
  { name: 'Veggie Wrap', price: 109, rating: 4.2, imageUrl: '/uploads/VeggieWrap.png', category: 'Lunch', description: 'A wrap filled with a mix of seasonal vegetables and hummus.' },
  { name: 'Grilled Cheese Sandwich', price: 89, rating: 4.0, imageUrl: '/uploads/GrilledCheeseSandwich.png', category: 'Lunch', description: 'Classic grilled cheese with melted cheddar on sourdough.' },
  { name: 'Grilled Salmon Bowl', price: 225, rating: 4.7, imageUrl: '/uploads/GrilledSalmonBowl.png', category: 'Lunch', description: 'Grilled salmon over quinoa, roasted veggies, and lemon-dill sauce.' },
  { name: 'Spicy Beef Tacos', price: 180, rating: 4.5, imageUrl: '/uploads/SpicyBeefTacos.png', category: 'Lunch', description: 'Soft tortillas filled with seasoned beef, salsa, and avocado.' },
  { name: 'Sushi Combo', price: 240, rating: 4.8, imageUrl: '/uploads/SushiCombo.png', category: 'Lunch', description: 'Assorted sushi rolls with tuna, salmon, avocado, and soy sauce.' },
  { name: 'Red Chicken Curry', price: 89, rating: 4.0, imageUrl: '/uploads/RedChickenCurry.png', category: 'Lunch', description: 'A balance of creamy, sweet, and slightly spicy notes.' },
  { name: 'Turkey Panini', price: 130, rating: 4.5, imageUrl: '/uploads/TurkeyPanini.png', category: 'Lunch', description: 'Pressed panini with turkey, Swiss cheese, and pesto.' },
  { name: 'Quinoa Salad', price: 118, rating: 4.3, imageUrl: '/uploads/QuinoaSalad.png', category: 'Lunch', description: 'Healthy salad with quinoa, mixed greens, and vinaigrette.' },
  { name: 'Pasta Salad', price: 100, rating: 4.2, imageUrl: '/uploads/PastaSalad.png', category: 'Lunch', description: 'Chilled pasta salad with fresh vegetables and Italian dressing.' },
  { name: 'Fish Tacos', price: 129, rating: 4.4, imageUrl: '/uploads/FishTacos.png', category: 'Lunch', description: 'Grilled fish tacos with cabbage slaw and lime crema.' },

  // Dinner
  { name: 'Grilled Ribeye Steak', price: 249, rating: 4.7, imageUrl: '/uploads/GrilledRibeyeSteak.png', category: 'Dinner', description: 'Juicy ribeye steak grilled to perfection.' },
  { name: 'Salmon Fillet', price: 220, rating: 4.5, imageUrl: '/uploads/SalmonFillet.png', category: 'Dinner', description: 'Fresh salmon fillet with a lemon butter sauce.' },
  { name: 'Roast Chicken', price: 199, rating: 4.4, imageUrl: '/uploads/RoastChicken.png', category: 'Dinner', description: 'Herb-roasted chicken served with seasonal vegetables.' },
  { name: 'Pasta Primavera', price: 199, rating: 4.3, imageUrl: '/uploads/PastaPrimavera.png', category: 'Dinner', description: 'Pasta with fresh seasonal vegetables in a light sauce.' },
  { name: 'Chicken Parmesan', price: 199, rating: 4.5, imageUrl: '/uploads/ChickenParmesan.png', category: 'Dinner', description: 'Crispy breaded chicken topped with marinara sauce and melted mozzarella.' },
  { name: 'Pesto Pasta with Shrimp', price: 219, rating: 4.7, imageUrl: '/uploads/PestoPastaWithShrimp.png', category: 'Dinner', description: 'Linguine tossed in a vibrant pesto sauce with succulent shrimp.' },
  { name: 'Garlic Butter Lamb Chops', price: 269, rating: 4.7, imageUrl: '/uploads/GarlicButterLambChops.png', category: 'Dinner', description: 'Tender lamb chops glazed with rosemary garlic butter.' },
  { name: 'Vegetarian Stuffed Peppers', price: 189, rating: 4.5, imageUrl: '/uploads/VegetarianStuffedPeppers.png', category: 'Dinner', description: 'Bell peppers filled with a savory mix of quinoa, black beans, and vegetables.' },
  { name: 'Beef Bourguignon', price: 250, rating: 4.6, imageUrl: '/uploads/BeefBourguignon.png', category: 'Dinner', description: 'Classic French beef stew with red wine and mushrooms.' },
  { name: 'Vegetable Stir Fry', price: 150, rating: 4.2, imageUrl: '/uploads/VegetableStirFry.png', category: 'Dinner', description: 'Crispy vegetables stir-fried in a tangy sauce.' },
  { name: 'Shrimp Scampi', price: 199, rating: 4.5, imageUrl: '/uploads/ShrimpScampi.png', category: 'Dinner', description: 'Shrimp cooked in garlic butter sauce over linguine.' },
  { name: 'Lamb Chops', price: 28.50, rating: 4.8, imageUrl: '/uploads/LambChops.png', category: 'Dinner', description: 'Grilled lamb chops with rosemary and garlic.' },

  // Mexican
  { name: 'Tacos al Pastor', price: 11.99, rating: 4.6, imageUrl: '/uploads/TacosalPastor.png', category: 'Mexican', description: 'Tacos with marinated pork, pineapple, and cilantro.' },
  { name: 'Chicken Quesadilla', price: 100, rating: 4.4, imageUrl: '/uploads/ChickenQuesadilla.png', category: 'Mexican', description: 'Grilled quesadilla filled with chicken, cheese, and salsa.' },
  { name: 'Enchiladas', price: 199, rating: 4.5, imageUrl: '/uploads/Enchiladas.png', category: 'Mexican', description: 'Corn tortillas rolled around a filling and smothered in spicy sauce.' },
  { name: 'Fajitas', price: 13.50, rating: 4.7, imageUrl: '/uploads/Fajitas.png', category: 'Mexican', description: 'Sizzling steak or chicken served with peppers and onions.' },
  { name: 'Chiles Rellenos', price: 12.49, rating: 4.5, imageUrl: '/uploads/ChilesRellenos.png', category: 'Mexican', description: 'Roasted poblano peppers stuffed with cheese, lightly battered and fried, served with a tangy tomato sauce.' },
  { name: 'Mole Poblano', price: 14.99, rating: 4.8, imageUrl: '/uploads/MolePoblano.png', category: 'Mexican', description: 'Tender chicken simmered in a complex, rich mole sauce with hints of chocolate and spices, served with rice.' },
  { name: 'Pozole Rojo', price: 13.99, rating: 4.8, imageUrl: '/uploads/PozoleRojo.png', category: 'Mexican', description: 'Traditional soup with hominy, pork, and red chiles, garnished with radish and lime.' },
  { name: 'Churros', price: 8.99, rating: 4.7, imageUrl: '/uploads/Churros.png', category: 'Mexican', description: 'Fried dough pastries rolled in cinnamon sugar, served with chocolate sauce.' },
  { name: 'Nachos', price: 99, rating: 4.3, imageUrl: '/uploads/Nachos.png', category: 'Mexican', description: 'Crispy tortilla chips loaded with cheese and toppings.' },
  { name: 'Burrito', price: 150, rating: 4.2, imageUrl: '/uploads/Burrito.png', category: 'Mexican', description: 'A large flour tortilla filled with beans, rice, and meat.' },
  { name: 'Tamales', price: 89, rating: 4.4, imageUrl: '/uploads/Tamales.png', category: 'Mexican', description: 'Steamed masa filled with meats or vegetables.' },
  { name: 'Chilaquiles', price: 199, rating: 4.5, imageUrl: '/uploads/Chilaquiles.png', category: 'Mexican', description: 'Tortilla chips simmered in a red or green salsa.' },

  // Italian
  { name: 'Spaghetti Carbonara', price: 199, rating: 4.7, imageUrl: '/uploads/SpaghettiCarbonara.png', category: 'Italian', description: 'Classic pasta with eggs, cheese, pancetta, and pepper.' },
  { name: 'Lasagna', price: 150, rating: 4.6, imageUrl: '/uploads/Lasagna.png', category: 'Italian', description: 'Layers of pasta with meat sauce, cheese, and béchamel.' },
  { name: 'Risotto', price: 699, rating: 4.5, imageUrl: '/uploads/Risotto.png', category: 'Italian', description: 'Creamy Arborio rice cooked with broth and parmesan.' },
  { name: 'Margherita Pizza', price: 150, rating: 4.8, imageUrl: '/uploads/MargheritaPizza.png', category: 'Italian', description: 'Pizza topped with tomato sauce, mozzarella, and basil.' },
  { name: 'Penne Arrabbiata', price: 189, rating: 4.6, imageUrl: '/uploads/PenneArrabbiata.png', category: 'Italian', description: 'Penne pasta tossed in a spicy tomato sauce infused with garlic and red chili flakes.' },
  { name: 'Caprese Salad', price: 169, rating: 4.5, imageUrl: '/uploads/CapreseSalad.png', category: 'Italian', description: 'Fresh slices of tomato, mozzarella, and basil drizzled with extra virgin olive oil and balsamic glaze.' },
  { name: 'Eggplant Parmesan', price: 209, rating: 4.7, imageUrl: '/uploads/EggplantParmesan.png', category: 'Italian', description: 'Breaded eggplant layered with marinara sauce, mozzarella, and Parmesan cheese, baked to perfection.' },
  { name: 'Focaccia Bread', price: 129, rating: 4.4, imageUrl: '/uploads/FocacciaBread.png', category: 'Italian', description: 'Soft, herbed focaccia with a crispy crust, drizzled with olive oil and sprinkled with sea salt.' },
  { name: 'Fettuccine Alfredo', price: 140, rating: 4.4, imageUrl: '/uploads/FettuccineAlferdo.png', category: 'Italian', description: 'Pasta in a rich and creamy Alfredo sauce.' },
  { name: 'Pesto Pasta', price: 599, rating: 4.3, imageUrl: '/uploads/PestoPasta.png', category: 'Italian', description: 'Pasta tossed in a vibrant basil pesto sauce.' },
  { name: 'Gnocchi', price: 999, rating: 4.2, imageUrl: '/uploads/Gnocchi.png', category: 'Italian', description: 'Soft potato dumplings served with a marinara sauce.' },
  { name: 'Osso Buco', price: 18.50, rating: 4.7, imageUrl: '/uploads/OssoBuco.png', category: 'Italian', description: 'Braised veal shanks with vegetables and white wine.' },

  // Desserts
  { name: 'Tiramisu', price: 650, rating: 4.7, imageUrl: '/uploads/TiramisuCake.png', category: 'Desserts', description: 'Classic Italian dessert with coffee and mascarpone.' },
  { name: 'Gelato', price: 599, rating: 4.5, imageUrl: '/uploads/Gelato.png', category: 'Desserts', description: 'Italian-style ice cream available in various flavors.' },
  { name: 'Cannoli', price: 700, rating: 4.6, imageUrl: '/uploads/Cannoli.png', category: 'Desserts', description: 'Crispy pastry tubes filled with sweet ricotta cream.' },
  { name: 'Panna Cotta', price: 499, rating: 4.4, imageUrl: '/uploads/PannaCotta.png', category: 'Desserts', description: 'Smooth, creamy dessert topped with berry compote.' },
  { name: 'Pavlova', price: 680, rating: 4.5, imageUrl: '/uploads/Pavlova.png', category: 'Desserts', description: 'Crispy meringue with a soft, light inside, topped with fresh fruits and whipped cream.' },
  { name: 'Chocolate Lava Cake', price: 750, rating: 4.8, imageUrl: '/uploads/ChocolateLavaCake.png', category: 'Desserts', description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.' },
  { name: 'Baklava', price: 600, rating: 4.7, imageUrl: '/uploads/Baklava.png', category: 'Desserts', description: 'Layered pastry with chopped nuts and honey, a Middle Eastern delight.', total: 0 },
  { name: 'Strawberry Shortcake', price: 680, rating: 4.5, imageUrl: '/uploads/StrawberryShortcake.png', category: 'Desserts', description: 'Fluffy cake layered with fresh strawberries and whipped cream.' },
  { name: 'Cheesecake', price: 99, rating: 4.5, imageUrl: '/uploads/Cheesecake.png', category: 'Desserts', description: 'Rich cheesecake with a graham cracker crust.' },
  { name: 'Chocolate Mousse', price: 650, rating: 4.4, imageUrl: '/uploads/ChocolateMousse.png', category: 'Desserts', description: 'Light and airy chocolate mousse with whipped cream.' },
  { name: 'Profiteroles', price: 725, rating: 4.3, imageUrl: '/uploads/Profiteroles.png', category: 'Desserts', description: 'Cream-filled pastry puffs drizzled with chocolate sauce.' },
  { name: 'Ricotta Pie', price: 675, rating: 4.2, imageUrl: '/uploads/RicottaPie.png', category: 'Desserts', description: 'Traditional ricotta pie with a light, flaky crust.' },

  // Drinks
  { name: 'Iced Latte', price: 50, rating: 4.0, imageUrl: '/uploads/IcedLatte.png', category: 'Drinks', description: 'Cool and refreshing espresso-based iced latte.' },
  { name: 'Mojito', price: 99, rating: 4.3, imageUrl: '/uploads/Mojito.png', category: 'Drinks', description: 'Classic mojito with mint, lime, and rum.' },
  { name: 'Smoothie', price: 60, rating: 4.2, imageUrl: '/uploads/Smoothie.png', category: 'Drinks', description: 'A blended mix of fruits for a refreshing drink.' },
  { name: 'Iced Tea', price: 39, rating: 4.0, imageUrl: '/uploads/IcedTea.png', category: 'Drinks', description: 'Chilled iced tea with a hint of lemon.' },
  { name: 'Mocha Frappuccino', price: 55, rating: 4.1, imageUrl: '/uploads/MochaFrappuccino.png', category: 'Drinks', description: 'Chilled coffee mixed with chocolate and blended with ice.' },
  { name: 'Green Tea Smoothie', price: 60, rating: 4.3, imageUrl: '/uploads/GreenTeaSmoothie.png', category: 'Drinks', description: 'A vibrant mix of green tea, fruits, and a splash of honey for sweetness.' },
  { name: 'Caramel Macchiato', price: 55, rating: 4.3, imageUrl: '/uploads/CaramelMacchiato.png', category: 'Drinks', description: 'Layered espresso with steamed milk, topped with caramel drizzle.' },
  { name: 'Strawberry Milkshake', price: 65, rating: 4.4, imageUrl: '/uploads/StrawberryMilkshake.png', category: 'Drinks', description: 'Creamy milkshake loaded with fresh strawberries and a hint of vanilla.' },
  { name: 'Lemonade', price: 45, rating: 4.1, imageUrl: '/uploads/Lemonade.png', category: 'Drinks', description: 'Freshly squeezed lemonade with a tangy kick.' },
  { name: 'Espresso', price: 30, rating: 4.2, imageUrl: '/uploads/Espresso.png', category: 'Drinks', description: 'Strong and rich espresso shot to start your day.' },
  { name: 'Margarita', price: 70, rating: 4.3, imageUrl: '/uploads/Margarita.png', category: 'Drinks', description: 'Refreshing margarita with tequila, lime, and a salt rim.' },
  { name: 'Cappuccino', price: 49, rating: 4.2, imageUrl: '/uploads/Cappuccino.png', category: 'Drinks', description: 'Frothy cappuccino with a perfect balance of espresso and milk.' },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    // Optional: Clear existing items to avoid duplicates
    // await itemModal.deleteMany({}); 
    // console.log('Existing items cleared');

    for (const item of items) {
      // Check if item exists to prevent duplicates
      const exists = await itemModal.findOne({ name: item.name });
      if (!exists) {
        await itemModal.create(item);
        console.log(`Added: ${item.name}`);
      } else {
        console.log(`Skipped (already exists): ${item.name}`);
      }
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
