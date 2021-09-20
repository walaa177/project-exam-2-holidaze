import React from "react";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  FaDribbble,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="footer" hidden={window.location.pathname === "/admin"}>
      <div className="container">
        <div className="row justify-content-center">
          <ul class="social-icons mt-4">
            <li>
              <a class="facebook" href="#">
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a class="twitter" href="#">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a class="linkedin" href="#">
                <FaLinkedinIn />
              </a>
            </li>
            <li>
              <a class="dribbble" href="#">
                <FaDribbble />
              </a>
            </li>
          </ul>
        </div>
        <hr />
        <div className="row justify-content-center">
          <p className="copyright-text">
            Copyright &copy; 2021 All Rights Reserved by
            <a
              href="http://walaazaghloula.com/walaazaghloula-portfolio/"
              className="copyright-name"
            >
              {" "}
              walaa zaghloula
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
