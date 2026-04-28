"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import MultiSelect from "./MultiSelect"; // підключити MultiSelect
import css from "./AddDiaryEntryForm.module.css";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Занадто короткий заголовок")
    .required("Заголовок обов'язковий"),
  categories: Yup.array()
    .min(1, "Оберіть хоча б одну категорію")
    .required("Категорії обов'язкові"),
  text: Yup.string()
    .min(10, "Запис має бути інформативнішим")
    .required("Поле запису не може бути порожнім"),
});

interface FormValues {
  title: string;
  categories: string[];
  text: string;
}

interface Props {
  onSuccess: () => void;
  initialValues?: FormValues;
}

export const AddDiaryEntryForm = ({ onSuccess, initialValues }: Props) => {
  const queryClient = useQueryClient();

  // Емуляція запиту на бекенд через React Query
  const mutation = useMutation({
    mutationFn: async (newData: FormValues) => {
      // Тут має бути ваш axios.post або fetch
      // const response = await axios.post('/api/diary', { ...newData, date: new Date() });
      // return response.data;
      console.log("Відправка даних:", newData);
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      toast.success("Запис успішно збережено!");
      queryClient.invalidateQueries({ queryKey: ["diary-entries"] });
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Помилка при збереженні");
    },
  });

  const defaultValues: FormValues = initialValues || {
    title: "",
    categories: [],
    text: "",
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={(values) => mutation.mutate(values)}>
      {({ setFieldValue, values, isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.fieldWrapper}>
            <label htmlFor="title" className={css.label}>
              Заголовок
            </label>
            <Field
              name="title"
              placeholder="Введіть заголовок запису"
              className={css.input}
            />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.fieldWrapper}>
            <label className={css.label}>Категорії</label>
            <MultiSelect
              name="categories"
              value={values.categories}
              onChange={(selected) => setFieldValue("categories", selected)}
            />
            <ErrorMessage
              name="categories"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.fieldWrapper}>
            <label htmlFor="text" className={css.label}>
              Запис
            </label>
            <Field
              as="textarea"
              name="text"
              placeholder="Запишіть, як ви себе відчуваєте"
              className={css.textarea}
            />
            <ErrorMessage name="text" component="span" className={css.error} />
          </div>

          <button
            type="submit"
            className={css.submitBtn}
            disabled={mutation.isPending}>
            {mutation.isPending ? "Збереження..." : "Зберегти"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
