import * as Yup from "yup";
export const FORTY_WEEKS = 40 * 7 * 24 * 60 * 60 * 1000;

export const profileSchema = Yup.object({
  name: Yup.string().max(32, "Імʼя не може перевищувати 32 символи"),
  email: Yup.string()
    .email("Некоректний формат електронної пошти")
    .max(64, "Пошта не може перевищувати 64 символи"),
  gender: Yup.string().oneOf(
    ["boy", "girl", "unknown", ""],
    "Невідоме значення",
  ),
  dueDate: Yup.date()
    .min(new Date(), "Дата не може бути в минулому")
    .max(
      new Date(Date.now() + FORTY_WEEKS),
      "Дата не може перевищувати 40 тижнів",
    ),
});
