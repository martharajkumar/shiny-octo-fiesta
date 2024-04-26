import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { CDN_IMG_URL } from "../utils/constants";

export default function RestaurantMenuItem(props) {
  const { title, itemCards } = props?.menu;
  console.log(props, "::::::::::::::::::::::::::props");
  return (
    <div>
      <Accordion style={{ width: "80%" }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-label="Expand"
          aria-controls="-content"
          id="-header"
        >
          <Typography style={{ fontWeight: 700 }}>{title}</Typography>
        </AccordionSummary>
        {itemCards.map((dish, index) => (
          <>
            <AccordionDetails>
              <div class="menu-item">
                <div class="item-details">
                  <h2 class="item-name">{dish?.card?.info?.name}</h2>
                  <p class="item-description">
                    {dish?.card?.info?.description}
                  </p>
                  <p class="item-price">
                    ₹
                    {dish?.card?.info?.price / 100 ||
                      dish?.card?.info?.defaultPrice / 100}
                  </p>
                  {/* <span class="item-rating">4.0 (916)</span> */}
                </div>
                <div class="item-image">
                  <img
                    src={CDN_IMG_URL + dish?.card?.info?.imageId}
                    alt="Item Image"
                  />
                </div>
              </div>

              {/* <div
                className="menu-accordion-details"
                key={index}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div style={{ marginRight: "20px" }}>
                  <div className="item-name">{dish?.card?.info?.name}</div>
                  <div>{dish?.card?.info?.description}</div>
                </div>
                <div className="item-image-container">
                  <img
                    className="menu-res-image"
                    src={CDN_IMG_URL + dish?.card?.info?.imageId}
                    alt="menu-img"
                  />
                </div>
              </div> */}
            </AccordionDetails>
          </>
        ))}
      </Accordion>
    </div>
  );
}
