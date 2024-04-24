import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { CDN_IMG_URL } from "../utils/constants";
import RestaurantCard from "../components/RestaurantCard";

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

  console.log(restaurantMenu, ":::::::card.card.info::::::props");

  return (
    <div>
      <div className="restauarant-name">
        <RestaurantCard
          resInfo={restaurantMenu?.data?.cards[2]?.card?.card?.info}
        />
      </div>
      {/* {restaurantMenu?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map(
        (menuCard, index) => (
          <div className="menu-accordion-container" key={index}>
            {menuCard?.card?.card?.title != undefined &&
            menuCard?.card?.card?.title != "Top Picks" ? (
              <Accordion style={{ width: "80%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography style={{ fontWeight: 700 }}>
                    {menuCard?.card?.card?.itemCards?.length != undefined
                      ? menuCard?.card?.card?.title +
                        "(" +
                        menuCard?.card?.card?.itemCards?.length +
                        ")"
                      : menuCard?.card?.card?.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {menuCard?.card?.card?.itemCards?.map((item, index) => {
                    console.log(item); // Log item object
                    return (
                      <div className="menu-accordion-details" key={index}>
                        <div className="item-name">
                          {item?.card?.info?.name}
                        </div>
                        <div className="item-image-container">
                          <img
                            className="menu-res-image"
                            src={CDN_IMG_URL + item?.card?.info?.imageId}
                            alt="menu-img"
                          />
                        </div>
                      </div>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            ) : undefined}
          </div>
        )
      )} */}
    </div>
  );
}
