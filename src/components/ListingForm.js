import React, { useState, useContext, useEffect } from "react";
import { mapBaseOption } from "../utils/baseOptions";
import {
  withFormik,
  Form,
  Field,
  ErrorMessage,
  yupToFormErrors,
  Formik,
  useFormikContext
} from "formik";
import * as Yup from "yup";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";
import "../styles/ListingForm.scss";

const initialValues = {
  name: "New Property",
  bedrooms: 1,
  bathrooms: 1,
  bed_type: "Sofa_Other",
  room_type: "Entire_home/apt",
  maximum_nights: 1,
  minimum_nights: 1,
  extra_people: 0,
  accommodates: 2,
  Neighbourhood_group_cleansed: "Lichtenberg",
  property_type: "Apartment",
  cancellation_policy: "flexible",
  guests_included: 0
};

function FormikListingForm({
  hostId,
  setValuesToListings,
  editCard,
  setEditCard, 

}) {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={editCard || initialValues}
      validationSchema={Yup.object().shape({
        bedrooms: Yup.number().min(1, 'must have at least 1 bedroom').required("How many bedrooms?"),
        bathrooms: Yup.number().min(1, 'must have at least 1 bathroom').required("How many bathrooms?"),
      })}
      onSubmit={(values, formikBag) => {
        let url = values.id
          ? `host/${hostId}/properties/${values.id}`
          : `host/${hostId}/properties/`;
        let method = values.id ? "put" : "post";

        const params = new URLSearchParams();
        params.append("accomodates", values.accommodates);
        params.append("bedrooms", values.bedrooms);
        params.append("cleaning_fee", 20);
        params.append("extra_people", values.extra_people);
        params.append("guests_included", values.guests_included);
        params.append("minimum_nights", values.minimum_nights);
        params.append(
          "neighbourhood",
          `neighbourhood_group_cleansed_${values.Neighbourhood_group_cleansed}`
        );
        params.append("property_type", `property_type_${values.property_type}`);
        params.append("room_type", `room_type_${values.room_type}`);
        params.append("bed_type", `bed_type_${values.bed_type}`);
        params.append("instant_bookable", "instant_bookable_t");
        params.append(
          "cancellation_policy",
          `cancellation_policy_${values.cancellation_policy}`
        );
        axios
          .post(`https://easy-proxy-yo.herokuapp.com/price`, params)
          .then(response => {
            values.optimal_price = response.data.price;
            console.log("proxy response", response);
            axiosWithAuth()
              [method](url, values)
              .then(response => {
                console.log("onsubmit", response);
                setValuesToListings(response.data.hostProperty, values.id);
                console.log("values id", values.id);
                formikBag.resetForm();
              })
              .catch(error => console.log(error.response));
          })
          .catch(error => console.log(error.response));
      }}
    >
      {(touched, errors) => {
        return (
          <Form>
            <div>
              Name: <Field type="text" name="name" />
            </div>
            <div>
              Bedrooms: <Field type="number" name="bedrooms" />
              <ErrorMessage name="bedrooms" component="div" className="red" />
            </div>
            <div>
              Bathrooms: <Field type="number" name="bathrooms" />
              <ErrorMessage name="bathrooms" component="div" className="red" />
            </div>
            <div>
              Bed Type:
              <Field as="select" name="bed_type">
                {mapBaseOption("bed_type", ({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Field>
            </div>
            <div>
              Neighborhood:
              <Field as="select" name="Neighbourhood_group_cleansed">
                {mapBaseOption(
                  "Neighbourhood_group_cleansed",
                  ({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  )
                )}
              </Field>
            </div>
            <div>
              Room Type:
              <Field as="select" name="room_type">
                {mapBaseOption("room_type", ({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Field>
            </div>
            <div>
              Maximum Nights:
              <Field type="number" name="maximum_nights" />
            </div>
            <div>
              Minimum Nights:
              <Field type="number" name="minimum_nights" />
            </div>
            <div>
              Extra People:
              <Field type="number" name="extra_people" />
            </div>
            <div>
              Accomodates:
              <Field type="number" name="accommodates" />
            </div>
            <div>
              Property Type:
              <Field as="select" name="property_type">
                {mapBaseOption("property_type", ({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Field>
            </div>
            <div>
              Cancellation Policy:
              <Field as="select" name="cancellation_policy">
                {mapBaseOption("cancellation_policy", ({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Field>
            </div>
            <div>
              Guests Included:
              <Field type="number" name="guests_included" />
            </div>
            {editCard ? (
              <button type="submit">Edit</button>
            ) : (
              <button type="submit">Add</button>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormikListingForm;
