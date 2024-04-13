import React, { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function Home() {
  const [location, setLocation] = useState({ lat: null, long: null });
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantData, setRestaurantData] = useState({});
  const [chipActive, setChipActive] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    fetchData(location?.lat, location?.long);
  }, [location]);

  const fetchData = async (lat, long) => {
    const resp = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const resData = await resp.json();
    setRestaurants(
      resData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setRestaurantData(resData);
  };

  const handleFilter = () => {
    setChipActive(true);
    console.log("click");
  };

  console.log(restaurantData, "::::::::::::::::::::res data");
  return (
    <>
      <div style={{ fontWeight: 800, fontSize: "30px" }}>
        {restaurantData?.data?.cards[2]?.card?.card?.title}
      </div>
      <Stack direction="row" spacing={1}>
        {restaurantData?.data?.cards[3]?.card?.card?.sortConfigs?.map(
          (config) => (
            <Chip
              key={config.key}
              label={config.title == "Rating" ? "Ratings 4.0+" : config?.title}
              variant="outlined"
              onClick={() => handleFilter()}
              onDelete={chipActive ? () => console.log("delete") : undefined}
            />
          )
        )}
      </Stack>
      <div className="res-container">
        {restaurants?.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resInfo={restaurant.info} />
        ))}
      </div>
    </>
  );
}
