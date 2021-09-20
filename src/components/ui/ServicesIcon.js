import React from "react";
import { Figure } from "react-bootstrap";
import { FaWifi } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { CgSmartHomeWashMachine, CgSmartphoneRam } from "react-icons/cg";
import { VscVm } from "react-icons/vsc";

function ServicesIcon() {
  return (
    <div className="services">
      <div className="services-content">
        <Figure>
          <FaWifi />
          <Figure.Caption className="services-content-name">
            Internet
          </Figure.Caption>
        </Figure>
      </div>
      <div className="services-content">
        <Figure>
          <CgSmartHomeWashMachine />
          <Figure.Caption>Washer</Figure.Caption>
        </Figure>
      </div>
      <div className="services-content">
        <Figure>
          <CgSmartphoneRam />
          <Figure.Caption>Airconditi..</Figure.Caption>
        </Figure>
      </div>
      <div className="services-content">
        <Figure>
          <VscVm />
          <Figure.Caption>TV</Figure.Caption>
        </Figure>
      </div>
      <div className="services-content">
        <Figure>
          <IoFastFoodOutline />
          <Figure.Caption>food</Figure.Caption>
        </Figure>
      </div>
    </div>
  );
}

export default ServicesIcon;
