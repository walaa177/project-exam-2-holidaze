import React from "react";
import { Image } from "react-bootstrap";
import StarRating from "../ui/StarRating";
import ButtonLink from "../ui/Button";

function ItemList({ item }) {
  {
    /*split the text description*/
  }
  const text = item.description;
  function shorten(text, max) {
    return text && text.length > max
      ? text.slice(0, max).split(" ").slice(0, -1).join(" ") + ".."
      : text;
  }

  let imageUrl =
    item.hasOwnProperty("image") && item.image.length
      ? "http://walaazaghloula.com:1337" + item.image[0].url
      : "https://www.pulsewednesbury.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg";
  return (
    <div className="establishments">
      <div className="card mb-3 establishments-card">
        <div className="row card-item">
          <div className="col-md-5 ">
            <span className="card-item-type">{item.type}</span>
            <div className="card-item-content-img">
              <Image
                src={imageUrl}
                className="card-item-image"
                alt={item.name}
              />
            </div>
          </div>
          <div className="col-md-7">
            <div className="card-item-body">
              <h3 className="card-title ">{item.name}</h3>
              <p className="card-text star">
                {<StarRating value={item.star} />}
              </p>
              <div className="card-info">
                <p className="card-text card-info-price">
                  Price from: {item.price}$
                </p>
                <p className="card-info-room">rooms : {item.room}</p>
              </div>
              <p className="card-text card-info-text">
                {shorten(item.description, 150)}
              </p>
              <div className="button-details">
                <ButtonLink
                  theme="primary"
                  type="button"
                  classes="button-details-button"
                  link={`detail/${item.id}`}
                  Children="More Details"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemList;
