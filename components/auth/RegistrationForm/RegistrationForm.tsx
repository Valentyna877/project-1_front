import { registerUser, UserRegCreds } from "@/lib/api/clientApi";
import css from "./RegistrationForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/authStore";

const initialValues: UserRegCreds = {
  name: "",
  email: "",
  password: "",
};

const formSchema = Yup.object().shape({
  name: Yup.string()
    .max(32, "Імʼя не може перевищувати 32 символи")
    .required("Обов'язково поле"),
  email: Yup.string()
    .email("Некоректний формат електронної пошти")
    .max(64, "Пошта не може перевищувати 64 символи")
    .required("Обов'язково поле"),
  password: Yup.string()
    .min(8, "Пароль має містити мінімум 8 символів")
    .max(128, "Пароль не може перевищувати 128 символів")
    .required("Обов'язково поле"),
});

const RegistrationForm = () => {
  const fieldId = useId();
  const setUser = useAuthStore((state) => state.setUser);

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setUser(data);

      console.log("має бути переадресація на анбордінг");
    },
    onError: () => {
      console.log("має бути пуш повідомлення з помилкою");
    },
  });

  const handleSubmit = (values: UserRegCreds): void => {
    registerMutation.mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={formSchema}
    >
      <Form>
        <div>
          <label htmlFor={`${fieldId}-title`}>Імʼя*</label>
          <Field
            type="text"
            name="name"
            id={`${fieldId}-title`}
            placeholder={"Ваше імʼя"}
          />
          <ErrorMessage name="name" component="span" />
        </div>
        <div>
          <label htmlFor={`${fieldId}-email`}>Пошта*</label>
          <Field
            type="email"
            name="email"
            id={`${fieldId}-email`}
            placeholder={"hello@leleka.com"}
          />
          <ErrorMessage name="email" component="span" />
        </div>
        <div>
          <label htmlFor={`${fieldId}-password`}>Пароль*</label>
          <Field
            type="password"
            name="password"
            id={`${fieldId}-password`}
            placeholder={"********"}
          />
          <ErrorMessage name="password" component="span" />
        </div>
        <button type="submit">Зареєструватись</button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
