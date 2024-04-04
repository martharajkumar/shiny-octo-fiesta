import React, { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantData, setRestaurantData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const resp = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.98625&lng=79.563608&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const resData = await resp.json();
    setRestaurants(
      resData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setRestaurantData(resData);
  };

  console.log(restaurantData);
  return (
    <>
      <div style={{ fontWeight: 800, fontSize: "30px" }}>
        {restaurantData?.data?.cards[2]?.card?.card?.title}
      </div>
      <div className="res-container">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resInfo={restaurant.info} />
        ))}
      </div>
    </>
    // <div className="res-container">
    //   {restaurants.map((restaurant, key) => {
    //     <RestaurantCard
    //       // key={restaurant?.info?.id}
    //       // resInfo={restaurant?.info}
    //     />;
    //   })}
    //   {/* <RestaurantCard /> */}
    //   {/* <RestaurantCard />
    //   <RestaurantCard />
    //   <RestaurantCard />
    //   <RestaurantCard />
    //   <RestaurantCard />
    //   <RestaurantCard />
    //   <RestaurantCard />
    //   <RestaurantCard /> */}
    // </div>
  );
}
