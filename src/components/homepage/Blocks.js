import React from "react";
import ButtonLink from "../ui/Button";

function Blocks() {
  return (
    <section className="blocks">
      <div className="blocks-header ">
        <div className="header-main">
          <h2>
            <span>Rooms</span> Accommodation
          </h2>
          <p>We select the best deals for you.</p>
        </div>
      </div>

      <div className="blocks-content ">
        {/*firtst block*/}
        <div className="row blocks-content-first">
          <div className="col-lg-6 blocks-content-img"></div>
          <div className="col-lg-6 blocks-content-text ">
            <h3>The best decision of our lives</h3>
            <p>
              This is a gorgeous place to stay, fantastic location, and views to
              die for! Great amenities and very clean
            </p>
            <ButtonLink
              theme="primary"
              type="button"
              classes="blocks-content-button"
              link="/establishments"
              Children="Explore more"
            />
          </div>
        </div>
        {/*second block*/}
        <div className="row blocks-content-second">
          <div className="col-lg-6 blocks-content-img2"></div>
          <div className="col-lg-6 blocks-content-text">
            <h3>Why should you book with us</h3>
            <p>
              Our holiday booking system provides the best accommodations at the
              best price.
            </p>
            <ButtonLink
              theme="primary"
              type="button"
              classes="blocks-content-button"
              link="/contact"
              Children="Contact us"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blocks;
