import "@/styles/base.css";

import css from "./TaskItem.module.css";
import { GetAllTasks } from "@/types/task";

type Props = {
  data: GetAllTasks[];
  HandleCheckTask: (isDone: boolean, _id: string) => void;
};

export default function TaskItem({ data, HandleCheckTask }: Props) {
  return (
    <>
      {data.map((task) => (
        <li key={task._id} className={css.taskItem}>
          <p className={css.taskItemTime}>{task.date}</p>
          <div className={css.taskCustomCheckbox}>
            <input
              onChange={() => HandleCheckTask(!task.isDone, task._id)}
              className={`${css.defaultCheckbox} {visuallyHidden}`}
              type="checkbox"
              name="taskCheckbox"
              id={task._id}
              defaultChecked={task.isDone}
            />
            <label className={css.labelCheckbox} htmlFor={task._id}>
              <span className={css.customCheckbox}>
                <svg className={css.checkboxMark} width={14} height={11}>
                  <use href="/sprite.svg#icon-mark" />
                </svg>
              </span>
              <p className={css.taskItemText}>{task.name}</p>
            </label>
          </div>
        </li>
      ))}
    </>
  );
}
