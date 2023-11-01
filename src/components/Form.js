import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import FormLabel from "react-bootstrap/esm/FormLabel";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";

const Formlar = ({ veriler }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    mail: "",
    active: false,
  });

  const [formlarErrors, setFormlarErrors] = useState({
    fullName: "",
    password: "",
    mail: "",
    active: "",
  });
  const [formValid, setFormValid] = useState(true);
  const [alinanVeri, setAlinanVeri] = useState([]);

  const jsonString = JSON.stringify(alinanVeri);
  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit oldu mu ?", formData);
    for (let key in formData) {
      //   console.log(
      //     "checkValidationFor(key, formData[key]) > ",
      //     key,
      //     formData[key]
      //   );
      checkValidationFor(key, formData[key]);
    }
    if (formValid) {
      axios
        .post("https://reqres.in/api/users", formData)
        .then((response) => {
          // İşlem başarılı olduğunda yapılacak işlemler
          console.log("Veri başarıyla gönderildi:", response.data);

          const gidenVeri = response.data;
          console.log("Post yapilan veri : ", gidenVeri);
          axios.get("https://reqres.in/api/users").then((responseGet) => {
            setAlinanVeri(responseGet.data);
            console.log("alinan veri", alinanVeri);
          });
        })
        .catch((error) => {
          // İşlem sırasında bir hata olursa yapılacak işlemler
          console.error("Veri gönderilirken hata oluştu:", error);
        });
    }
    // veriler(formData);
  };

  const formDataSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("This section can not be empty.")
      .min(3, "Can not be less than 3 characters."),
    password: Yup.string()
      .required("Password is necessary.")
      .min(8, "Minumum 8 character."),
    mail: Yup.string()
      .required("This section can not be empty.")
      .email("Please enter valid mail address."),
    active: Yup.boolean().oneOf([true], "Terms of Services must be accepted."),
  });

  useEffect(() => {
    // console.error("form error > ", formlarErrors);
  }, [formlarErrors]);

  useEffect(() => {
    formData && setFormData(formData);
  }, [formData]);

  useEffect(() => {
    // console.log("product > ", formData);
    formDataSchema.isValid(formData).then((valid) => setFormValid(valid));
  }, [formData]);

  const checkValidationFor = (field, value) => {
    Yup.reach(formDataSchema, field)
      .validate(value)
      .then((valid) => {
        setFormlarErrors({ ...formlarErrors, [field]: "" });
      })
      .catch((err) => {
        console.log("HATA! ", field, err.errors[0]);

        setFormlarErrors((prevFormErrors) => ({
          ...prevFormErrors,
          [field]: err.errors[0],
        }));
      });

    /*
    setFormErrors({ name: "", decription: "", img: "", price: "", name: "hata mesajı"});
    setFormErrors({ name: "", decription: "", img: "", price: "", decription: "hata mesajı"});
    setFormErrors({ name: "", decription: "", img: "", price: "", img: "hata mesajı"});
    setFormErrors({ name: "", decription: "", img: "", price: "", price: "hata mesajı"});
    */
  };

  return (
    <div>
      <h2>Membership Form:</h2>
      <Form onSubmit={(e) => submitHandler(e)}>
        <FormGroup className="mb-2">
          <FormLabel>Full Name :</FormLabel>
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={changeHandler}
            isInvalid={!!formlarErrors.fullName}
          />
          <Form.Control.Feedback className="fs-2" type="invalid">
            {formlarErrors.fullName}
          </Form.Control.Feedback>
        </FormGroup>
        <br />
        <FormGroup className="mb-2">
          <Form.Label>Password :</Form.Label>

          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            isInvalid={!!formlarErrors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formlarErrors.password}
          </Form.Control.Feedback>
        </FormGroup>
        <br />
        <FormGroup className="mb-2">
          <Form.Label>E-mail :</Form.Label>

          <Form.Control
            type="email"
            name="mail"
            value={formData.mail}
            onChange={changeHandler}
            isInvalid={!!formlarErrors.mail}
          />
          <Form.Control.Feedback type="invalid">
            {formlarErrors.mail}
          </Form.Control.Feedback>
        </FormGroup>
        <br />
        <FormGroup className="mb-2">
          <Form.Label>
            I have read and agreed to the terms of services.
          </Form.Label>

          <Form.Control
            id="active"
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={changeHandler}
            isInvalid={!!formlarErrors.active}
          />
          <Form.Control.Feedback type="invalid">
            {formlarErrors.active}
          </Form.Control.Feedback>
        </FormGroup>

        {/* id="active" type="checkbox" label="Aktif mi?" onChange=
        {inputChangeHandler}
        checked={product.active}
        name="active" */}
        <br />
        <button>Submit ! </button>
      </Form>
      <div>
        <pre>{jsonString}</pre>
      </div>
    </div>
  );
};

export default Formlar;
