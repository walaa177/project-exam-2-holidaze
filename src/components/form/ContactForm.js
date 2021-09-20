import ValidationError from "../ui/ValidationError";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import * as yup from "yup";
import axios from "axios";
import { BASE_URL_CONTACT } from "../../constants/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "react-bootstrap";

//yup validation//
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your first name")
    .min(3, "must be minimum 3 characters"),
  subject: yup
    .string()
    .required("Please enter your  last name")
    .min(5, "must be minimum 5 characters"),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  message: yup.string().required("Please write the message"),
});

function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [show, setShow] = useState(false);
  const formRef = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const url = BASE_URL_CONTACT;

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(url, data);
      handleShow();
      formRef.current.reset();
    } catch (error) {
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className=" booking-form mt-5">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="contact-info"
        ref={formRef}
      >
        {/*success submit*/}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className="contact-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title className="contact-modal-header">
              Thank you
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Your message has been successfully sent. We will contact you very
            soon!
          </Modal.Body>
        </Modal>

        {/*fall name*/}
        <div>
          <Form.Group>
            <Form.Control
              placeholder="Fall Name"
              {...register("name")}
              className="contact-inbut"
            />
            {errors.name && (
              <ValidationError>{errors.name.message}</ValidationError>
            )}
          </Form.Group>
        </div>

        {/*email */}
        <div>
          <Form.Group>
            <Form.Control
              placeholder="email"
              {...register("email")}
              className="contact-inbut"
            />
            {errors.email && (
              <ValidationError>{errors.email.message}</ValidationError>
            )}
          </Form.Group>
        </div>

        {/*subject*/}
        <div>
          <Form.Group>
            <Form.Control
              placeholder="subject"
              {...register("subject")}
              className="contact-inbut"
            />
            {errors.subject && (
              <ValidationError>{errors.subject.message}</ValidationError>
            )}
          </Form.Group>
        </div>

        {/*message*/}
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="message"
            {...register("message")}
            className="contact-inbut"
          />
          {errors.message && (
            <ValidationError>{errors.message.message}</ValidationError>
          )}
        </Form.Group>

        <div className="contact-button">
          <Button variant="info" type="submit" className="contact-button">
            Send Message
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ContactForm;
