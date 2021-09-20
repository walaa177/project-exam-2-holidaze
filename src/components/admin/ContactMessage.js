import React from "react";
import { useState, useEffect } from "react";
import { BASE_URL_CONTACT } from "../../constants/api";
import axios from "axios";
import { Table } from "react-bootstrap";
import DeleteItem from "./DeleteItem";

function ContactMessage() {
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getItems() {
    try {
      const response = await axios.get(BASE_URL_CONTACT);
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
            <th>Fall Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {message.map(function (item) {
            return (
              <tr className="table-body">
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.subject}</td>
                <td>{item.message}</td>

                <td>
                  <DeleteItem
                    id={item.id}
                    refreshContacts={refreshContacts}
                    url={BASE_URL_CONTACT}
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
