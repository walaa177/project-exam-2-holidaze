import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Carousel } from "react-bootstrap";
import StarRating from "../ui/StarRating";
import AOS from "aos";
import Calender from "../ui/Calender";
import Booking from "../form/Booking";
import ServicesIcon from "../ui/ServicesIcon";
import { BASE_URL_ITEMS } from "../../constants/api";

function ItemDetails() {
  AOS.init();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [message, setMessage] = useState("");

  const { id } = useParams();
  let history = useHistory();

  if (!id) {
    history.push("/");
  }

  const url = BASE_URL_ITEMS + "/" + id;

  useEffect(function () {
    async function getItemDetails() {
      await axios
        .get(url)
        .then((res) => {
          setItem(res.data);
        })
        .catch((err) => {
          setError(error.toString());
        })
        .finally(() => {
          setLoading(false);
        });
    }
    getItemDetails();
  }, []);

  return (
    <div
      className="details container-fluid"
      data-aos="fade-right"
      data-aos-duration="1500"
    >
      <Helmet>
        <title>Holidaze||details</title>
      </Helmet>
      <div className=" details-header">
        <div className="details-header-mien">
          <h1>{item.type} APPARTMENT</h1>
          <p> Avaliable From {item.price}$ Per Night</p>
        </div>
      </div>
      <div className="  details-content">
        <div className="details-carousel">
          <Carousel>
            {item.image && item.image.length
              ? item.image.map(function (image) {
                  return (
                    <Carousel.Item className="carousel">
                      <img
                        className="d-block details-carousel-image"
                        src={"http://walaazaghloula.com:1337" + image.url}
                        alt={image.name}
                      />
                    </Carousel.Item>
                  );
                })
              : ""}
          </Carousel>
        </div>
        <div className="row mr-0 ml-0">
          <div className="details-content-info col-md-8 col-xs-12 ">
            <div className="">
              <div className="details-content-info-name">
                <div className="details-content-info-name-head">
                  <h2>{item.name}</h2>
                  <div className="details-content-info-name-head-star">
                    <StarRating value={item.star} />
                  </div>
                </div>

                <div className="details-content-info-name-info">
                  <p>Price :{item.price}$</p>
                  <p> rooms : {item.room}</p>
                </div>
              </div>
              <div className="details-content-info-services">
                <h3>Room aminities</h3>
                <div>
                  <ServicesIcon />
                </div>
              </div>
              <div className="details-content-info-description ">
                <h3>Room overview</h3>
                <div>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="booking-content col-md-4 col-xs-12 text-center">
            <div className="booking-content-price">
              <h3>Price Per Night </h3>
              <span> {item.price}$</span>
            </div>
            <Calender
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              itemPrice={item.price}
            />
            <Booking
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              setMessage={setMessage}
              item={item}
            />
            {
              <div className={"alert " + message !== "" ? "alert-success" : ""}>
                {message}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
