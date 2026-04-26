import { getUser } from "@/lib/api/clientApi";
import css from "./GreetingBlock.module.css";

export default async function GreetingBlock() {
  const { name } = await getUser();

  return <h1 className={css.greetingTitle}>Вітаю, {name}!</h1>;
}
