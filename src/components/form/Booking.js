import { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import * as yup from "yup";
import axios from "axios";
import { BASE_URL_BOOKING } from "../../constants/api";
import moment from "moment";
import { yupResolver } from "@hookform/resolvers/yup";
import ValidationError from "../ui/ValidationError";
import { useForm } from "react-hook-form";

const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const schema = yup.object().shape({
  firstname: yup
    .string()
    .required("Please enter your first name")
    .min(3, "must be minimum 3 characters"),
  lastname: yup
    .string()
    .required("Please enter your  last name")
    .min(3, "must be minimum 3 characters"),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  phonnumber: yup
    .string()
    .required()
    .matches(phoneRegExp, "Phone number is not valid(10 number)"),
  startdate: yup
    .date()
    .required()
    .typeError("Please enter the Start Date as 01/23/2020"),
  enddate: yup
    .date()
    .required()
    .typeError("Please enter the end Date as 01/23/2020"),
  message: yup.string(),
});

function Booking({ checkInDate, checkOutDate, setMessage, item }) {
  const [showModal, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const formRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const url = BASE_URL_BOOKING;

  async function onSubmit(data) {
    setSubmitting(true);
    setSubmittingError(null);

    try {
      const response = await axios.post(url, data);
      setMessage("your booking has been submited");
      reset();
      handleClose();
    } catch (error) {
      setSubmittingError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="booking-modal">
        <Button
          variant="primary"
          className="booking-modal-button m-2"
          onClick={handleShow}
        >
          Booking
        </Button>
      </div>
      <Modal show={showModal} onHide={handleClose} className="booking-form ">
        <Modal.Header closeButton>
          <Modal.Title className="booking-form-header">
            Book Your Stay At <span>{item.name}</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className=" booking-form mt-1">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="booking-form-info"
            >
              {/*first and last name*/}
              <div className="booking-form-group ">
                <Form.Group className="booking-form-group-input p-0">
                  <Form.Control
                    className="form-input"
                    placeholder="first Name"
                    {...register("firstname")}
                  />
                  {errors.firstname && (
                    <ValidationError>
                      {errors.firstname.message}
                    </ValidationError>
                  )}
                </Form.Group>

                <Form.Group className="booking-form-group-input p-0">
                  <Form.Control
                    className="form-input"
                    placeholder="last Name"
                    {...register("lastname")}
                  />
                  {errors.lastname && (
                    <ValidationError>{errors.lastname.message}</ValidationError>
                  )}
                </Form.Group>
              </div>

              {/*email and phone number*/}
              <div className="booking-form-group ">
                <Form.Group className="booking-form-group-input p-0">
                  <Form.Control
                    placeholder="email"
                    {...register("email")}
                    className="form-input"
                  />
                  {errors.email && (
                    <ValidationError>{errors.email.message}</ValidationError>
                  )}
                </Form.Group>

                <Form.Group className="booking-form-group-input p-0">
                  <Form.Control
                    className="form-input"
                    placeholder="phone Number"
                    {...register("phonnumber")}
                  />
                  {errors.phonnumber && (
                    <ValidationError>
                      {errors.phonnumber.message}
                    </ValidationError>
                  )}
                </Form.Group>
              </div>

              {/*start and end the date booking*/}
              <div className="booking-form-group ">
                <Form.Group className="booking-form-group-input p-0">
                  <Form.Control
                    className="form-input"
                    placeholder={
                      checkInDate
                        ? moment(checkInDate).add(10, "days").calendar()
                        : "Please chose the start date"
                    }
                    value={
                      checkInDate
                        ? moment(checkInDate).add(10, "days").calendar()
                        : ""
                    }
                    {...register("startdate")}
                  />
                  {errors.startdate && (
                    <ValidationError>
                      {errors.startdate.message}
                    </ValidationError>
                  )}
                </Form.Group>
                <Form.Group className="booking-form-group-input p-0">
                  <Form.Control
                    className="form-input"
                    placeholder={
                      checkOutDate
                        ? moment(checkOutDate).add(10, "days").calendar()
                        : "Please chose the end date"
                    }
                    value={
                      checkOutDate
                        ? moment(checkOutDate).add(10, "days").calendar()
                        : ""
                    }
                    {...register("enddate")}
                  />
                  {errors.enddate && (
                    <ValidationError>{errors.enddate.message}</ValidationError>
                  )}
                </Form.Group>
              </div>

              {/*message*/}
              <Form.Group>
                <Form.Control
                  className="form-input-textarea"
                  as="textarea"
                  placeholder="message"
                  {...register("message")}
                  rows={3}
                />
                {errors.message && (
                  <ValidationError>{errors.message.message}</ValidationError>
                )}
              </Form.Group>

              <Button
                variant="info"
                type="submit"
                className="booking-form-button"
              >
                Book Now
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Booking;
