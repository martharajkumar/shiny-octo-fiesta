import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { CDN_IMG_URL } from "../utils/constants";

export default function RestaurantMenuItem(props) {
  const { title, itemCards } = props?.menu;
  return (
    <div>
      <Accordion style={{ width: "80%" }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-label="Expand"
          aria-controls="-content"
          id="-header"
        >
          <Typography style={{ fontWeight: 700 }}>
            {itemCards?.length != undefined
              ? title + "(" + itemCards?.length + ")"
              : title}
          </Typography>
        </AccordionSummary>
        {itemCards.map((dish, index) => (
          <div key={index}>
            <AccordionDetails>
              <div className="menu-item">
                <div className="item-details">
                  <h2 className="item-name">{dish?.card?.info?.name}</h2>
                  <p className="item-description">
                    {dish?.card?.info?.description}
                  </p>
                  <p className="item-price">
                    ₹
                    {dish?.card?.info?.price / 100 ||
                      dish?.card?.info?.defaultPrice / 100}
                  </p>
                  {/* <span className="item-rating">4.0 (916)</span> */}
                </div>
                <div className="item-image">
                  <img
                    src={CDN_IMG_URL + dish?.card?.info?.imageId}
                    alt="Item Image"
                  />
                </div>
              </div>
            </AccordionDetails>
          </div>
        ))}
      </Accordion>
    </div>
  );
}
