import { registerUser, UserRegCreds } from "@/lib/api/clientApi";
import css from "./RegistrationForm.module.css";
import { Formik, Form, Field, FieldProps, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/authStore";
import Button from "@/components/common/Button/Button";
import clsx from "clsx";

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
      <Form className={css.form}>
        <div className={css["field-set"]}>
          <label htmlFor={`${fieldId}-title`}>Імʼя*</label>
          <Field name="name">
            {({ field, meta }: FieldProps) => {
              const hasError = meta.error;
              return (
                <>
                  <input
                    {...field}
                    type="text"
                    id={`${fieldId}-title`}
                    placeholder={"Ваше імʼя"}
                    className={`${css.input} ${hasError ? css["input-error"] : ""}`}
                  ></input>

                  {hasError && <span className={css.span}>{meta.error}</span>}
                </>
              );
            }}
          </Field>
        </div>
        <div className={css["field-set"]}>
          <label htmlFor={`${fieldId}-email`}>Пошта*</label>
          <Field
            type="email"
            name="email"
            id={`${fieldId}-email`}
            placeholder={"hello@leleka.com"}
            className={css.input}
          />
          <ErrorMessage name="email" component="span" />
        </div>
        <div className={css["field-set"]}>
          <label htmlFor={`${fieldId}-password`}>Пароль*</label>
          <Field
            type="password"
            name="password"
            id={`${fieldId}-password`}
            placeholder={"********"}
            className={css.input}
          />
          <ErrorMessage name="password" component="span" />
        </div>
        <Button type="submit">Зареєструватись</Button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
