import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

function Categray() {
  return (
    <section className="categray">
      <div className="categray-inner container-fluid">
        <div className="categray-inner-header"></div>
        <div className="categray-inner-content ">
          <div className=" row categray-inner-info">
            <div className="col-sm-12 col-lg-4 col-md-4  categray-inner-info-block">
              <Card
                as={Link}
                to="/establishments?type=hotels"
                className="categray-inner-content-card"
              >
                <Card.Img
                  variant="top"
                  src="/images/home/hotels.jpg"
                  className="categray-inner-content-img"
                  alt="image girl etaing breakfast"
                />
                <Card.Body>
                  <div className="categray-inner-content-logo">
                    <Image src="/images/logo1.png" roundedCircle />
                  </div>
                  <Card.Text className="categray-inner-content-text">
                    Hotels
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-sm-12 col-lg-4 col-md-4 categray-inner-info-block">
              <Card
                as={Link}
                to="/establishments?type=Bed and Breakfast"
                className="categray-inner-content-card"
              >
                <Card.Img
                  variant="top"
                  src="/images/home/B&Bs.jpg"
                  className="categray-inner-content-img"
                  alt="image breakfast like bread and fruits "
                />
                <Card.Body>
                  <div className="categray-inner-content-logo">
                    <Image src="/images/logo1.png" roundedCircle />
                  </div>
                  <Card.Text className="categray-inner-content-text">
                    B&Bs
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-sm-12 col-lg-4 col-md-4 categray-inner-info-block">
              <Card
                as={Link}
                to="/establishments?type=guesthouses"
                className="categray-inner-content-card"
              >
                <Card.Img
                  variant="top"
                  src="/images/home/guesthouses.webp"
                  className="categray-inner-content-img"
                  alt="image for hotel"
                />
                <Card.Body>
                  <div className="categray-inner-content-logo">
                    <Image src="/images/logo1.png" roundedCircle />
                  </div>
                  <Card.Text className="categray-inner-content-text">
                    Guesthouses
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categray;
