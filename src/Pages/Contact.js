import React from "react";
import AOS from "aos";
import { Helmet } from "react-helmet";
import ContactForm from "../components/form/ContactForm";

function Contact() {
  AOS.init();
  return (
    <section className="contact" data-aos="fade-right" data-aos-duration="1500">
      {/*title page*/}
      <Helmet>
        <title>Holidaze|| Contact</title>
        <meta name="description" content="Contact Holidaze administrators" />
      </Helmet>

      <div className="contact-header">
        <div className="contact-header-mien">
          <h1>Contact US</h1>
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-content-mien">
          <div className="contact-content-mien-h">
            <h2>Send An Email</h2>
          </div>
          <div className="contact-content-mien-h">
            <p>
              Please use this form if you have any questions about our services
              and we'll get back with you very soon.
            </p>
          </div>
        </div>

        <div className="contact-form">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default Contact;
