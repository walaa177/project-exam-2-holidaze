import React from "react";
import { FormControl, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StarRating from "../StarRating";
import { BASE_URL_ITEMS } from "../../../constants/api";

function SearchBar() {
  const [items, setItems] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // function filter for search input
  function onChangHandler(event) {
    let result = [];
    let value = event.target.value;
    if (value === "") {
      setSearchResult(result);
      return;
    }
    if (value) {
      items.map((item) => {
        if (item.name.toLowerCase().indexOf(value) === 0) {
          result.push(item);
          return;
        }
        let words = item.name.toLowerCase().split(" ");

        if (words.length) {
          let abort = false;
          words.map((word) => {
            if (abort === true) {
              return;
            }
            if (word.indexOf(value.toLowerCase()) === 0) {
              result.push(item);
              abort = true;
              return;
            }
          });
        }
      });
      if (!result.length) {
        console.log("no item");
      }
      setSearchResult(result);
    }
  }

  useEffect(function () {
    /* hidden the resulte outside the box*/
    window.addEventListener("click", function (e) {
      let autocompleteElement = document.getElementById("autocomplete");
      if (autocompleteElement && autocompleteElement.contains(e.target)) {
        return; /*inside the box*/
      } else {
        setSearchResult([]); /*outside the box*/
      }
    });

    async function getItems() {
      try {
        const response = await axios.get(BASE_URL_ITEMS);
        setItems(response.data);
      } catch {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getItems();
  }, []);

  //  for search filter

  return (
    <div className="formControl-search">
      <FormControl
        type="text"
        placeholder="Search establishments.."
        className="mr-sm-2 autocomplete"
        onChange={onChangHandler}
        id="autocomplete"
      />
      <div className="autocomplete-div" hidden={searchResult.length == 0}>
        {searchResult.length
          ? searchResult.map(function (item, i) {
              let imageUrl =
                item.hasOwnProperty("image") && item.image.length
                  ? "http://walaazaghloula.com:1337" + item.image[0].url
                  : "https://www.pulsewednesbury.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg";
              return (
                <Link to={`detail/${item.id}`} className="autocomplete-link">
                  <div key={i} className="autocomplete-item row">
                    <div className="col-5 autocomplete-item-img">
                      <Image src={imageUrl} className="item-image" />
                    </div>
                    <div className="col-7 autocomplete-item-box">
                      {" "}
                      <h5 className="mt-2">{item.name}</h5>
                      <h6>"{item.type}"</h6>
                      <div className="autocomplete-item-info">
                        {" "}
                        <p>Rooms: {item.room}</p>
                        <p>price: ${item.price}</p>
                      </div>
                      <p className="autocomplete-item-info-star">
                        {<StarRating value={item.star} />}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default SearchBar;
