import React from "react";
import { Accordion, Card } from "react-bootstrap";
import ContactMessage from "./ContactMessage";
import BookingMessage from "./BookingMessage";
import AddEstablishment from "./AddEstablishment";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { FaAngleDown } from "react-icons/fa";
import { Helmet } from "react-helmet";
import AOS from "aos";

export default function Dashboard() {
  AOS.init();
  /* back to admin login if is no registration----------*/
  const [auth, setAuth] = useContext(AuthContext);

  if (!auth) {
    window.location = "/admin";
    return;
  }
  return (
    <div
      className="dashboard container-fluid "
      data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="1500"
    >
      {/*title page*/}
      <Helmet>
        <title>Holidaze||Admin Dashboard</title>
      </Helmet>
      <div className="row justify-content-center m-2">
        <h1> Admin dashboard</h1>
      </div>
      <div className="row">
        <Accordion className="dashboard-message">
          <Card>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="0"
              className="dashboard-message-content"
            >
              <div> Contact Message</div>
              <div>
                <FaAngleDown />
              </div>
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {/*meassge contact */}
                <ContactMessage />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
      <div className="row">
        <Accordion className="dashboard-message">
          <Card>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="0"
              className="dashboard-message-content"
            >
              <div>Booking Enquiries</div>
              <div>
                <FaAngleDown />
              </div>
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {/*meassge Booking */}
                <BookingMessage />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>

      <div className="dashboard-add row">
        <Accordion defaultActiveKey="0" className="dashboard-message">
          <Card>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="0"
              className="dashboard-message-content"
            >
              Add New Establishment
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {/*Add an new Establishment  */}
                <AddEstablishment />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </div>
  );
}
