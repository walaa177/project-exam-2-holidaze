import React from "react";
import AOS from "aos";
import { Helmet } from "react-helmet";
import ButtonLink from "../components/ui/Button";

function NoPage() {
  AOS.init();
  return (
    <div className="noPage" data-aos="fade-right" data-aos-duration="1500">
      {/*title page*/}
      <Helmet>
        <title>Holidaze|| 404</title>
      </Helmet>

      <div className="noPage-404">
        <h1>Oops!</h1>
      </div>

      <h2>404 - Page Not Found</h2>
      <p>
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
      </p>
      <div className="text-center mt-5">
        <ButtonLink
          theme="primary"
          type="button"
          classes="nopage-button"
          link="/"
          Children="Go to home page >>>"
        />
      </div>
    </div>
  );
}

export default NoPage;
