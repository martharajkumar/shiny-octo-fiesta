import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

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

  return (
    <>
      <div className="restaurant-menu-container">
        <div className="restauarant-name">
          {restaurantMenu?.data?.cards[0]?.card?.card?.text}
        </div>
        {restaurantMenu?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.map(
          (menuCard, index) => (
            <div className="menu-accordion " key={index}>
              {console.log(menuCard, ":::::::::::menucard")}
              {menuCard?.card?.card?.title != undefined ? (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography>{menuCard?.card?.card?.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ) : undefined}
            </div>
          )
        )}
      </div>
    </>
  );
};
export default RestaurantMenu;
