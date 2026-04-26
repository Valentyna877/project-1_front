import css from "./TasksReminderCard.module.css";
import { useId } from "react";

export default function TasksReminderCard() {
  const checkboxId = useId();

  return (
    <div className={css.taskCardBox}>
      <div className={css.taskTitleBox}>
        <h2>Важливі завдання</h2>
        <button className={css.addTaskBtn}>
          <svg width={24} height={24}>
            <use href="/sprite.svg#icon-add_circle" />
          </svg>
        </button>
      </div>
      <ul>
        <li className={css.taskItem}>
          <p className={css.taskItemTime}>22.07</p>
          <div className={css.taskCustomCheckbox}>
            <input
              className={css.defaultCheckbox}
              type="checkbox"
              name="taskCheckbox"
              id={`${checkboxId}-1`}
            />
            <label className={css.labelCheckbox} htmlFor={`${checkboxId}-1`}>
              <span className={css.customCheckbox}>
                <svg className={css.checkboxMark} width={14} height={11}>
                  <use href="/sprite.svg#icon-mark" />
                </svg>
              </span>
              <p className={css.taskItemText}>
                Записатися на другий плановий скринінг за 3 дні
              </p>
            </label>
          </div>
        </li>
        <li className={css.taskItem}>
          <p className={css.taskItemTime}>22.07</p>
          <div className={css.taskCustomCheckbox}>
            <input
              className={css.defaultCheckbox}
              type="checkbox"
              name="taskCheckbox"
              id={`${checkboxId}-2`}
            />
            <label className={css.labelCheckbox} htmlFor={`${checkboxId}-2`}>
              <span className={css.customCheckbox}>
                <svg className={css.checkboxMark} width={14} height={11}>
                  <use href="/sprite.svg#icon-mark" />
                </svg>
              </span>
              <p className={css.taskItemText}>Прийняти вітаміни для вагітних</p>
            </label>
          </div>
        </li>
        <li className={css.taskItem}>
          <p className={css.taskItemTime}>22.07</p>
          <div className={css.taskCustomCheckbox}>
            <input
              className={css.defaultCheckbox}
              type="checkbox"
              name="taskCheckbox"
              id={`${checkboxId}-3`}
            />
            <label className={css.labelCheckbox} htmlFor={`${checkboxId}-3`}>
              <span className={css.customCheckbox}>
                <svg className={css.checkboxMark} width={14} height={11}>
                  <use href="/sprite.svg#icon-mark" />
                </svg>
              </span>
              <p className={css.taskItemText}>Відвідати плановий скринінг</p>
            </label>
          </div>
        </li>
        <li className={css.taskItem}>
          <p className={css.taskItemTime}>22.07</p>
          <div className={css.taskCustomCheckbox}>
            <input
              className={css.defaultCheckbox}
              type="checkbox"
              name="taskCheckbox"
              id={`${checkboxId}-4`}
            />
            <label className={css.labelCheckbox} htmlFor={`${checkboxId}-4`}>
              <span className={css.customCheckbox}>
                <svg className={css.checkboxMark} width={14} height={11}>
                  <use href="/sprite.svg#icon-mark" />
                </svg>
              </span>
              <p className={css.taskItemText}>30-хвилинна прогулянка в парку</p>
            </label>
          </div>
        </li>
        <li className={css.taskItem}>
          <p className={css.taskItemTime}>22.07</p>
          <div className={css.taskCustomCheckbox}>
            <input
              className={css.defaultCheckbox}
              type="checkbox"
              name="taskCheckbox"
              id={`${checkboxId}-5`}
            />
            <label className={css.labelCheckbox} htmlFor={`${checkboxId}-5`}>
              <span className={css.customCheckbox}>
                <svg className={css.checkboxMark} width={14} height={11}>
                  <use href="/sprite.svg#icon-mark" />
                </svg>
              </span>
              <p className={css.taskItemText}>
                Записати в щоденник перші відчутні рухи
              </p>
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
}
