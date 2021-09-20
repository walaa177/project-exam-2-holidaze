import { useState, useEffect } from "react";
import { BASE_URL_ITEMS } from "../constants/api";
import { Helmet } from "react-helmet";
import { FormControl } from "react-bootstrap";
import AOS from "aos";
import axios from "axios";
import ItemList from "../components/establishmentsPage/ItemList";

function Establishments() {
  AOS.init();
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState();
  const [type, setType] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let filteredItems = [];
  // function filter for search input
  function getSearchValue(event) {
    setFilter(event.target.value);
  }

  // function filter for select type
  function getDropdownValue(event) {
    setType(event.target.value);
  }

  useEffect(function () {
    async function getItems() {
      try {
        const response = await axios.get(BASE_URL_ITEMS);
        setItems(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);

        const queryString = window.location.search; // getting current url
        const urlParams = new URLSearchParams(queryString); // initiating URLSearchParams object
        const establishmentType = urlParams.get("type"); // calling get() method and pass type value

        if (establishmentType) {
          setType(establishmentType);
        }
      }
    }
    getItems();
  }, []);

  filteredItems = items;

  // first for type filter
  if (type) {
    let result = [];
    items.map((item) => {
      if (item.type === type) {
        result.push(item);
      }
    });
    if (result.length) {
      filteredItems = result;
    }
  }

  // seconds for search filter
  if (filter) {
    let result = [];
    filteredItems.map((item) => {
      let words = item.name.toLowerCase().split(" ");
      if (words.length) {
        words.map((word) => {
          if (word.indexOf(filter) == 0) {
            result.push(item);
            return;
          }
        });
      } else {
        if (words.indexOf(filter) == 0) {
          result.push(item);
        }
      }
    });
    if (!result.length) {
      console.log("no item");
    }
    filteredItems = result;
  }

  return (
    <section
      data-aos="fade-right"
      data-aos-duration="1500"
      className="container-fluid pr-0 pl-0"
    >
      {/*title page*/}
      <Helmet>
        <title>Holidaze|| Establishments</title>
        <meta name="description" content="establishments in Bergen" />
      </Helmet>

      <div className="eastablishments-header">
        <div className="eastablishments-header-mien">
          <h1>ROOMS & SUITES</h1>
        </div>
      </div>

      <div className="eastablishments-content row">
        <div className="search ">
          <div className="pr-0 search-1">
            <select onChange={getDropdownValue} className="search-select">
              <option value="0">Select category</option>
              <option value="hotels">Hotel</option>
              <option value="guesthouses">Guesthouses</option>
              <option value="Bed and Breakfast">Bed & Breakfast</option>
            </select>
          </div>
          <div className="pl-0 search-2">
            <FormControl
              onChange={getSearchValue}
              type="text"
              placeholder="Search"
              className="mr-sm-2 search-item"
            />
          </div>
        </div>
        <div className="eastablishments-content-mien mt-3 ">
          <div className="row justify-content-center">
            {filteredItems.length ? (
              filteredItems.map(function (item) {
                return <ItemList item={item} />;
              })
            ) : (
              <p>no result</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Establishments;
