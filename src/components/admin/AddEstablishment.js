import React from "react";
import { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import ValidationError from "../ui/ValidationError";
import { BASE_URL_ITEMS } from "../../constants/api";

const allowedImageTypes = ["jpg", "jpeg", "png"];
//yup validation//
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your first name")
    .min(3, "must be minimum 3 characters"),
  description: yup.string().required("Please enter the description"),

  services: yup
    .string()
    .required("Please enter the services as--wifi,breakfast--"),
  type: yup
    .string()
    .oneOf(["Bed and Breakfast", "guesthouses", "hotels"])
    .required()
    .typeError("please select an option "),
  price: yup.number().required().typeError("Please enter aprice"),
  star: yup
    .number()
    .min(0)
    .max(5)
    .required()
    .typeError("Please enter a star number"),
  room: yup
    .number()
    .min(0)
    .max(5)
    .required()
    .typeError("Please enter a rome number"),
  image: yup
    .mixed()
    .required()
    .test(
      "file",
      "You need to upload at least one image..",
      (value) => value.length
    )
    .test(
      // .test("validator name", "error message", function return true for valid and false for invalid)
      "fileExtension",
      "Only images are allowed!",
      (value) => allowedImageTypes.indexOf(value) > -1
    ),
});

function AddEstablishment() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [message, setMessage] = useState("");
  const formRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);
    const formData = new FormData();

    if (data.image.length === 1) {
      formData.append("files.image", data.image[0], data.image[0].name);
    } else {
      for (let i = 0; i < data.image.length; i++) {
        formData.append("files.image", data.image[i], data.image[i].name);
      }
    }
    formData.append("data", JSON.stringify(data));

    try {
      const response = await axios.post(BASE_URL_ITEMS, formData);
      setMessage("The establishment er add");
      formRef.current.reset();
      setTimeout(function () {
        setMessage("");
      }, 2000);
    } catch (error) {
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="add">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="add-info"
        ref={formRef}
      >
        {/*sucsuss sumbit add----------*/}
        {
          <div className={"alert " + message !== "" ? "alert-success" : ""}>
            {message}
          </div>
        }
        <div className="add-info-part row">
          {/*name the hotel*/}
          <div className="add-info-part-name col-md-6 col-xs-12">
            <Form.Group>
              <Form.Label>Establishment Name</Form.Label>
              <Form.Control
                placeholder="Establishment Name"
                {...register("name")}
              />
              {errors.name && (
                <ValidationError>{errors.name.message}</ValidationError>
              )}
            </Form.Group>
          </div>

          {/*type the  hotel */}
          <div className="add-info-part-type col-md-6 col-xs-12">
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label className="add-info-part-type-select">
                Chose a Category
              </Form.Label>
              <select {...register("type")}>
                <option value=""></option>
                <option value="Bed and Breakfast">Bed and Breakfast</option>
                <option value="guesthouses">guesthouses</option>
                <option value="hotels">hotels</option>s
              </select>

              {errors.type && (
                <ValidationError>{errors.type.message}</ValidationError>
              )}
            </Form.Group>
          </div>
        </div>

        {/*information price rome star*/}
        {/*price*/}
        <div className="add-info-part row">
          <div className="col-md-4 col-xs-12">
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control placeholder="1300" {...register("price")} />
              {errors.price && (
                <ValidationError>{errors.price.message}</ValidationError>
              )}
            </Form.Group>
          </div>
          {/*star*/}
          <div className="col-md-4 col-xs-12">
            <Form.Group>
              <Form.Label>Stars</Form.Label>
              <Form.Control placeholder="4" {...register("star")} />
              {errors.star && (
                <ValidationError>{errors.star.message}</ValidationError>
              )}
            </Form.Group>
          </div>
          {/*Rooms*/}
          <div className="col-md-4 col-xs-12">
            <Form.Group>
              <Form.Label>Rooms</Form.Label>
              <Form.Control placeholder="3" {...register("room")} />
              {errors.room && (
                <ValidationError>{errors.room.message}</ValidationError>
              )}
            </Form.Group>
          </div>
        </div>

        {/*Services the  hotel */}
        <div>
          <Form.Group>
            <Form.Label>Establishment Services</Form.Label>
            <Form.Control placeholder="Services" {...register("services")} />
            {errors.services && (
              <ValidationError>{errors.services.message}</ValidationError>
            )}
          </Form.Group>
        </div>

        {/*Description*/}
        <div>
          <Form.Group>
            <Form.Label>Establishment Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              {...register("description")}
            />
            {errors.description && (
              <ValidationError>{errors.description.message}</ValidationError>
            )}
          </Form.Group>
        </div>

        {/* upload image*/}
        <Form.Group>
          <Form.Control
            type="file"
            {...register("image")}
            multiple="multiple"
          />
          {errors.image && (
            <ValidationError>{errors.image.message}</ValidationError>
          )}
        </Form.Group>

        <Button variant="info" type="submit" className="add-info-button">
          Sendt
        </Button>
      </Form>
    </div>
  );
}

export default AddEstablishment;
