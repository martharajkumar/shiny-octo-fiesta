import React, { useEffect, useState, useRef } from "react";
import RestaurantCard from "../components/RestaurantCard";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function Home() {
  const [location, setLocation] = useState({ lat: null, long: null });
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantData, setRestaurantData] = useState({});
  const [chipActive, setChipActive] = useState(null);

  const originalResData = useRef([]);

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
    originalResData.current =
      resData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
  };

  const handleFilter = (filter, index) => {
    switch (index) {
      case 1:
        const filterDevileryTimeAscData = originalResData.current.sort(
          (restaurant1, restaurant2) => {
            const restaurantData1 = restaurant1?.info?.sla?.deliveryTime;
            const restaurantData2 = restaurant2?.info?.sla?.deliveryTime;
            return restaurantData1 - restaurantData2;
          }
        );
        setRestaurants(filterDevileryTimeAscData);
        setChipActive(index);
        break;

      case 2:
        const filterRatingData = originalResData.current.filter(
          (restaurant) => restaurant.info.avgRating > 4
        );
        setRestaurants(filterRatingData);
        setChipActive(index);
        break;

      case 3:
        const filterCostforTwoAscData = originalResData.current.sort(
          (restaurant1, restaurant2) => {
            const restaurantData1 = parseInt(
              restaurant1?.info?.costForTwo.replace("₹", "").trim()
            );
            const restaurantData2 = parseInt(
              restaurant2?.info?.costForTwo.replace("₹", "").trim()
            );
            return restaurantData1 - restaurantData2;
          }
        );
        setRestaurants(filterCostforTwoAscData);
        setChipActive(index);
        break;

      case 4:
        const filterCostforTwoDescData = originalResData.current.sort(
          (restaurant1, restaurant2) => {
            const restaurantData1 = parseInt(
              restaurant1?.info?.costForTwo.replace("₹", "").trim()
            );
            const restaurantData2 = parseInt(
              restaurant2?.info?.costForTwo.replace("₹", "").trim()
            );
            return restaurantData2 - restaurantData1;
          }
        );
        setRestaurants(filterCostforTwoDescData);
        setChipActive(index);
        break;

      default:
        setRestaurants(originalResData.current);
        setChipActive(index);
        break;
    }
  };

  const handleClickDelete = () => {
    setRestaurants(originalResData.current);
    setChipActive(null);
  };

  return (
    <>
      <div style={{ fontWeight: 800, fontSize: "30px" }}>
        {restaurantData?.data?.cards[2]?.card?.card?.title}
      </div>
      <Stack direction="row" spacing={1}>
        {restaurantData?.data?.cards[3]?.card?.card?.sortConfigs?.map(
          (config, index) => (
            <Chip
              key={config.key}
              label={config.title == "Rating" ? "Ratings 4.0+" : config?.title}
              variant="outlined"
              color={chipActive == index ? "primary" : "default"}
              onClick={() => handleFilter(config?.title, index)}
              onDelete={
                chipActive == index ? () => handleClickDelete() : undefined
              }
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
