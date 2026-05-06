import '@/styles/base.css';

import css from './TaskItem.module.css';
import { GetAllTasks } from '@/types/task';
import CustomCheckbox from '@/components/common/CustomCheckbox/CustomCheckbox';
import { useState } from 'react';
import ConfirmationModal from '@/components/common/ConfirmationModal/ConfirmationModal';

type Props = {
  data: GetAllTasks[];
  handleCheckTask: (isDone: boolean, _id: string) => void;
  handleDeleteTask: (taskId: string) => void;
};

export default function TaskItem({
  data,
  handleCheckTask,
  handleDeleteTask,
}: Props) {
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const handleDeleteTaskClick = (taskId: string) => {
    setIsOpenDelete(false);
    handleDeleteTask(taskId);
  };

  return (
    <>
      {data.map((task) => (
        <li key={task._id} className={css.taskItem}>
          <div>
            <p className={css.taskItemTime}>
              {String(task.date).slice(5).split('-').reverse().join('.')}
            </p>
            <CustomCheckbox
              id={task?._id}
              checked={task.isDone}
              text={task.name}
              handleCheck={() => handleCheckTask(!task.isDone, task._id)}
            />
          </div>
          <div className={css.btnWrapper}>
            <button
              className={css.deleteBtn}
              onClick={() => handleDeleteTask(task._id)}
            >
              <svg width={18} height={18}>
                <use href="/sprite.svg#icon-delete_forever" />
              </svg>
            </button>
          </div>
          <ConfirmationModal
            isOpen={isOpenDelete}
            title="Ви впевнені що хочете видалити завдання?"
            confirmButtonText="Видалити завдання"
            cancelButtonText="Відмінити"
            onConfirm={() => handleDeleteTaskClick(task._id)}
            onCancel={() => setIsOpenDelete(false)}
            confirmButtonVariant="delete"
          />
        </li>
      ))}
    </>
  );
}
