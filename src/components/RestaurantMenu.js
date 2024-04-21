import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [restaurantMenu, setRestaurantMenu] = useState({});

  useEffect(() => {
    fecthMenu();
  }, []);

  const { resId, long, lat } = useParams();

  const fecthMenu = async () => {
    const res = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${long}&restaurantId=${resId}&catalog_qa=undefined&isMenuUx4=true&submitAction=ENTER`
    );
    const resMenu = await res.json();
    setRestaurantMenu(resMenu);
  };

  console.log(restaurantMenu);

  return (
    <>
      <div className="restaurant-menu-container">Menu</div>
    </>
  );
};
export default RestaurantMenu;
