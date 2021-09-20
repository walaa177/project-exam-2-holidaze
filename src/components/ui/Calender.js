import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

export function Calender({
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  itemPrice,
}) {
  const handleCheckInDate = (date) => {
    setCheckInDate(date);
    setCheckOutDate(null);
  };

  const handleCheckOutDate = (date) => {
    setCheckOutDate(date);
  };
  const days = Math.abs((checkInDate - checkOutDate) / (1000 * 60 * 60 * 24));

  return (
    <div className="App">
      <div className="input-container">
        <div>
          <DatePicker
            placeholderText="Check-in"
            selected={checkInDate}
            minDate={new Date()}
            onChange={handleCheckInDate}
            className="input-container-input"
          />
        </div>
        <div>
          <DatePicker
            placeholderText="Check-out"
            selected={checkOutDate}
            minDate={checkInDate}
            onChange={handleCheckOutDate}
            className="input-container-input"
          />
        </div>
      </div>
      {checkInDate && checkOutDate && (
        <div className="summary">
          <p className="summary-days">
            You book a hotel{" "}
            {Math.abs((checkInDate - checkOutDate) / (1000 * 60 * 60 * 24)) /
              1 +
              " days from " +
              moment(checkInDate).format("LL") +
              " to " +
              moment(checkOutDate).format("LL") +
              "."}
          </p>
          <p className="summary-price">Total Price :{days * itemPrice}$</p>
        </div>
      )}
    </div>
  );
}
export default Calender;
