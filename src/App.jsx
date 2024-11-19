import { useEffect, useState } from "react";
import Header from "./components/Header";
import Product from "./components/Product";
import ShopContextProvider from "./components/ShopContext";

function App() {
  const [availableMeals, setAvailableMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const responseData = await fetch("https://food-api-9wi2.onrender.com/meals");
        const meals = await responseData.json();
        setAvailableMeals(meals);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMeals();
  }, []);

  return (
    <ShopContextProvider>
      <main>
        <Header />
        <section id="products">
          {availableMeals.map((meal) => {
            return (
              <Product
                key={meal.id}
                name={meal.name}
                price={meal.price}
                description={meal.description}
                image={`https://food-api-9wi2.onrender.com/${meal.image}`}
              />
            );
          })}
        </section>
        <footer>
          Image designed by <a href="https://www.freepik.com/">Freepik</a>
        </footer>
      </main>
    </ShopContextProvider>
  );
}

export default App;
