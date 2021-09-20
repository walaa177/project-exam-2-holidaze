import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import DeleteItem from "./DeleteItem";
import { BASE_URL_BOOKING } from "../../constants/api";

function ContactMessage() {
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getItems() {
    try {
      const response = await axios.get(BASE_URL_BOOKING);
      setMessage(response.data);
    } catch {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }

  function refreshContacts() {
    getItems();
  }

  useEffect(function () {
    getItems();
  }, []);
  return (
    <div>
      <Table bordered hover responsive className="table">
        {message.length === 0 && <p className="booking-message">no message</p>}
        <thead>
          <tr className="table-head">
            <th>Fitst Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {message.map(function (item) {
            return (
              <tr className="table-body">
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
                <td>{item.startdate}</td>
                <td>{item.enddate}</td>
                <td>{item.message}</td>
                <td>
                  <DeleteItem
                    id={item.id}
                    refreshContacts={refreshContacts}
                    url={BASE_URL_BOOKING}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ContactMessage;
