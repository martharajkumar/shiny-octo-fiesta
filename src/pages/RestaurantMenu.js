import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { CDN_IMG_URL } from "../utils/constants";
import RestaurantCard from "../components/RestaurantCard";
import RestaurantMenuItem from "../components/RestaurantMenuItem";

export default function RestaurantMenu() {
  const [restaurantMenu, setRestaurantMenu] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const { resId, long, lat } = useParams();

  const fetchMenu = async () => {
    const res = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${long}&restaurantId=${resId}&catalog_qa=undefined&isMenuUx4=true&submitAction=ENTER`
    );
    const resMenu = await res.json();
    setRestaurantMenu(resMenu);
  };


  const ItemCategory="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  const NestedItemCategory="type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"

  const restaurantMenuItem=
    restaurantMenu?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (itemCategory) =>
        itemCategory?.card?.card["@type"] ==ItemCategory||NestedItemCategory
    );


    console.log(restaturantMenuItem,":::::::::::::::::::::rest")

  return (
    <div>
      <div className="restauarant-name">
        <RestaurantCard
          resInfo={restaurantMenu?.data?.cards[2]?.card?.card?.info}
        />
      </div>
        {restaturantMenuItem?.map((menuItem, index) => (
          <div className="menu-accordion-container" key={index}>
            <RestaurantMenuItem menu={menuItem?.card?.card} key={index} />
          </div>
        ))}
        {restaturantMenuItem?.categories?.map((menuItem, index) => (
          <div className="menu-accordion-container" key={index}>
            <RestaurantMenuItem menu={menuItem?.card?.card} key={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
