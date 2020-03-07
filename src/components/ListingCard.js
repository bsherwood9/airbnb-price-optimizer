import React, { useState } from "react";
import { getBaseOptionValue } from "../utils/baseOptions";
import img from "../assets/houses.jpeg";
import "../styles/ListingCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBed,
  faBath,
  faDoorClosed,
  faEdit,
  faTrashAlt,
  faAngleDown,
  faAngleUp
} from "@fortawesome/free-solid-svg-icons";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const ListingCard = ({
  item,
  listings,
  setListings,
  hostId,
  setEditCard,
  editCard
}) => {
  const [open, setOpen] = useState(false);
  const deleteListing = () => {
    console.log("Clicked this");
    axiosWithAuth()
      .delete(`host/${hostId}/properties/${item.id}`)
      .then(res => {
        console.log(res);
        // console.log("listings in card", listings);
        setListings(listings.filter(listing => listing.id !== item.id));
      })
      .catch(err => console.log(err));
  };

  const editListing = () => {
    console.log("cardedit", item);
    setEditCard({
      ...item
    });
  };

  const openCard = () => {
    setOpen(!open);
  };

  const renderSwitch = value => {
    switch (value) {
      case "Mitte":
        return <div className="imgContainer mitten"></div>;
      case "Friedrichshain_Kreuzberg":
        return <div className="imgContainer krauzberg"></div>;
      case "Lichtenberg":
        return <div className="imgContainer lichtenberg"></div>;
      case "Neukölln":
        return <div className="imgContainer neukoln"></div>;
      case "Pankow":
        return <div className="imgContainer pankow"></div>;
      case "Spandau":
        return <div className="imgContainer spandau"></div>;
      case "Charlottenburg_Wilm":
        return <div className="imgContainer berlin"></div>;
      case "Tempelhof_Schöneberg":
        return <div className="imgContainer garden"></div>;
      case "Treptow_Köpenick":
        return <div className="imgContainer kopenik"></div>;
      case "Reinickendorf":
        return <div className="imgContainer reinick"></div>;
      case "Marzahn_Hellersdorf":
        return <div className="imgContainer hellers"></div>;
      case "Steglitz_Zehlendorf":
        return <div className="imgContainer zehlen"></div>;
      default:
        return <div className="imgContainer default"></div>;
    }
  };
  return (
    <div className="card">
      <div className="panel-wrapper">
        <div className="controlpanel">
          <div onClick={editListing}>
            <FontAwesomeIcon icon={faEdit} size="lg" />
          </div>
          <div onClick={deleteListing}>
            <FontAwesomeIcon icon={faTrashAlt} size="lg" />
          </div>
        </div>
      </div>
      {/* <div className="imgContainer"></div> */}
      {renderSwitch(item.Neighbourhood_group_cleansed)}
      <div className="cardHeader">
        <div className="hometype">
          {item.name ? <h2>{item.name}</h2> : <h2>Name Not Specified</h2>}
        </div>

        <h1>${item.optimal_price}/day</h1>
      </div>
      <div className="content">
        {item.Neighbourhood_group_cleansed ? (
          <h2>
            {getBaseOptionValue(
              "Neighbourhood_group_cleansed",
              item.Neighbourhood_group_cleansed
            )}
          </h2>
        ) : (
          <h2>No Neighborhood Specified</h2>
        )}
        <div className="attributes">
          <div>
            <FontAwesomeIcon icon={faBed} size="2x" />
            <h3>{item.bedrooms} Bedrooms</h3>
          </div>
          <div>
            <FontAwesomeIcon icon={faBath} size="2x" />
            <h3>{item.bathrooms} Baths</h3>
          </div>
          <div>
            <FontAwesomeIcon icon={faHome} size="2x" />
            <h3>{getBaseOptionValue("property_type", item.property_type)}</h3>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faDoorClosed}
              size="2x"
              alt={item.room_type}
            />
            <h3>Rooms - {getBaseOptionValue("room_type", item.room_type)}</h3>
          </div>
        </div>
        <div className="arrow">
          {" "}
          {!open ? (
            <FontAwesomeIcon icon={faAngleDown} size="lg" onClick={openCard} />
          ) : (
            <FontAwesomeIcon
              icon={faAngleUp}
              size="lg"
              onClick={openCard}
              className="upArrow"
            />
          )}
        </div>
      </div>
      {open ? (
        <div className="details">
          <h3>Details:</h3>
          <p>Bed Type: {getBaseOptionValue("bed_type", item.bed_type)}</p>
          <p>Accommodates: {item.accommodates}</p>
          <p>
            Number of Nights:{" "}
            {item.minimum_nights >= item.maximum_nights
              ? `${item.minimum_nights}`
              : `${item.minimum_nights} - ${item.maximum_nights}`}
          </p>
          <p>Extra people: {item.extra_people}</p>
          <p>
            Cancellation Policy:{" "}
            {getBaseOptionValue(
              "cancellation_policy",
              item.cancellation_policy
            )}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default ListingCard;
