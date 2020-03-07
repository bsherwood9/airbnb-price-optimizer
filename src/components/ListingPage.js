import React, { useState, useEffect, useContext } from "react";
import { LegitContext } from "../contexts/LegitContext";
import ListingCard from "./ListingCard";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import "../styles/ListingPage.scss";
import ListingForm from "./ListingForm";

const ListingPage = () => {
  const { id, setId } = useContext(LegitContext);
  const [editCard, setEditCard] = useState(null);
  const [listings, setListings] = useState([]);
  const [message, setMessage] = useState("");

  const getUsers = () => {
    axiosWithAuth()
      .get(`/host/${id}/properties`)
      .then(res => {
        console.log("initial get", res);
        setListings(res.data.user_properties || []);
        setMessage(res.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const setValuesToListings = (newValue, id) => {
    console.log("svtl", id, newValue);
    setEditCard(null);
    setMessage("");
    if (id) {
      setListings(
        listings.map(item => {
          return item.id === id ? newValue : item;
        })
      );
    } else {
      setListings([...listings, newValue]);
    }
    return newValue;
  };

  return (
    <div className="listingPage">
      <div className="form-wrapper">
        <div className="form-square">
          {editCard ? <h1> Edit a Property</h1> : <h1> Add A Property</h1>}
          <ListingForm
            hostId={id}
            setValuesToListings={setValuesToListings}
            editCard={editCard}
          />
        </div>
      </div>
      <div className="grid-wrapper">
        <div className="grid">
          {message ? (
            <h1>{message}</h1>
          ) : listings.length ? (
            listings.map(item => (
              <ListingCard
                key={item.id}
                hostId={id}
                item={item}
                setListings={setListings}
                listings={listings}
                setEditCard={setEditCard}
                editCard={editCard}
              />
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
