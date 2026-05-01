import '@/styles/base.css';

import css from './TaskItem.module.css';
import { GetAllTasks } from '@/types/task';
import CustomCheckbox from '@/components/common/CustomCheckbox/CustomCheckbox';

type Props = {
  data: GetAllTasks[];
  handleCheckTask: (isDone: boolean, _id: string) => void;
};

export default function TaskItem({ data, handleCheckTask }: Props) {
  return (
    <>
      {data.map((task) => (
        <li key={task._id} className={css.taskItem}>
          <p className={css.taskItemTime}>
            {String(task.date).slice(5).split('-').reverse().join('.')}
          </p>
          <CustomCheckbox
            id={task._id}
            checked={task.isDone}
            text={task.name}
            handleCheck={() => {
              handleCheckTask(!task.isDone, task._id);
            }}
          />
        </li>
      ))}
    </>
  );
}
