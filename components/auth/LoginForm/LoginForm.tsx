import { loginUser, registerUser, UserLogCreds } from "@/lib/api/clientApi";
import css from "./LoginForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/authStore";

const initialValues: UserLogCreds = {
  email: "",
  password: "",
};

const formSchema = Yup.object().shape({
  email: Yup.string()
    .email("Некоректний формат електронної пошти")
    .max(64, "Пошта не може перевищувати 64 символи")
    .required("Обов'язково поле"),
  password: Yup.string()
    .min(8, "Пароль має містити мінімум 8 символів")
    .max(128, "Пароль не може перевищувати 128 символів")
    .required("Обов'язково поле"),
});

const LoginForm = () => {
  const fieldId = useId();
  const setUser = useAuthStore((state) => state.setUser);

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data);

      console.log("має бути переадресація на анбордінг");
    },
    onError: () => {
      console.log("має бути пуш повідомлення з помилкою");
    },
  });

  const handleSubmit = (values: UserLogCreds): void => {
    loginMutation.mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={formSchema}
    >
      <Form>
        <div>
          <label htmlFor={`${fieldId}-email`}></label>
          <Field
            type="email"
            name="email"
            id={`${fieldId}-email`}
            placeholder={"Пошта"}
          />
          <ErrorMessage name="email" component="span" />
        </div>
        <div>
          <label htmlFor={`${fieldId}-password`}></label>
          <Field
            type="password"
            name="password"
            id={`${fieldId}-password`}
            placeholder={"Пароль"}
          />
          <ErrorMessage name="password" component="span" />
        </div>
        <button type="submit">Увійти</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
