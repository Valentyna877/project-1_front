'use client';

import Button from '@/components/common/Button/Button';
import css from './TasksReminderCard.module.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { checkedTask, deleteTask, getAllTask } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { redirect } from 'next/navigation';
import AddTaskModal from '@/components/tasks/AddTaskModal/AddTaskModal';
import { useState } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import { ToastProvider } from '@/components/common/Toast/ToastProvider';
import Loader from '@/components/common/Loader/Loader';
import { useTheme } from '@/hooks/useTheme';

export default function TasksReminderCard() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { theme, themeClass } = useTheme();

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: getAllTask,
    refetchOnMount: false,
    enabled: isAuthenticated,
  });

  const taskCheckMutation = useMutation({
    mutationKey: ['taskCheck'],
    mutationFn: checkedTask,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: () => {
      ToastProvider.error('Помилка при зміні статусу завдання.');
    },
  });

  const taskDeleteMutation = useMutation({
    mutationKey: ['taskDelete'],
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      ToastProvider.success('Завдання успішно видалено.');
    },
    onError: () => {
      ToastProvider.error('Помилка при видаленні завдання.');
    },
  });

  const handleDeleteTask = (taskId: string) => {
    taskDeleteMutation.mutate(taskId);
  };

  const handleCheckTask = (isDone: boolean, taskId: string) => {
    taskCheckMutation.mutate({ isDone, taskId });
  };

  const handleOpenModal = () => {
    if (isAuthenticated) {
      setIsOpen(true);
    } else {
      redirect('/auth/login');
    }
  };

  if (isLoading) {
    <Loader />;
  }

  if (isError) {
    ToastProvider.error('Помилка при завантаженні завдань.');
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  if (!data) {
    return (
      <div className={`${css.taskCardBox} ${css[themeClass]}`}>
        <div className={css.taskTitleBox}>
          <h2>Важливі завдання</h2>
          <button className={css.addTaskBtn} onClick={handleOpenModal}>
            <svg width={24} height={24}>
              <use href="/sprite.svg#icon-add_circle" />
            </svg>
          </button>
        </div>
        <p className={css.emptyTaskSubTitle}>Наразі немає жодних завдань</p>
        <p className={css.emptyTaskText}>Створіть мершій нове завдання!</p>
        <Button className={css.emptyTaskBtn} onClick={handleOpenModal}>
          Створити завдання
        </Button>
      </div>
    );
  }

  const todayTasks = data.filter((task) => {
    if (!task.isDone) {
      return (
        Number(new Date(task.date)) <
          Number(new Date()) + 24 * 60 * 60 * 1000 &&
        Number(new Date(task.date)) > Number(new Date())
      );
    }
  });

  const weekTasks = data.filter((task) => {
    if (!task.isDone) {
      return (
        Number(new Date(task.date)) <
          Number(new Date()) + 7 * 24 * 60 * 60 * 1000 &&
        Number(new Date(task.date)) > Number(new Date()) + 24 * 60 * 60 * 1000
      );
    }
  });

  const doneWeekTasks = data.filter((task) => {
    if (task.isDone) {
      return (
        Number(new Date(task.date)) <
          Number(new Date()) + 7 * 24 * 60 * 60 * 1000 &&
        Number(new Date(task.date)) > Number(new Date())
      );
    }
  });

  const tasks = data.filter((task) => {
    if (!task.isDone) {
      return (
        Number(new Date(task.date)) < Number(new Date()) ||
        Number(new Date(task.date)) >
          Number(new Date()) + 7 * 24 * 60 * 60 * 1000
      );
    }
  });

  const isDoneTasks = data.filter((task) => {
    if (task.isDone) {
      return (
        Number(new Date(task.date)) < Number(new Date()) ||
        Number(new Date(task.date)) >
          Number(new Date()) + 7 * 24 * 60 * 60 * 1000
      );
    }
  });

  return (
    <div className={`${css.taskCardBox} ${css[themeClass]}`}>
      <div className={css.taskTitleBox}>
        <h2>Важливі завдання</h2>
        <button className={css.addTaskBtn} onClick={handleOpenModal}>
          <svg width={24} height={24}>
            <use href="/sprite.svg#icon-add_circle" />
          </svg>
        </button>
      </div>

      {data.length > 0 ? (
        <>
          <p className={css.taskSection}>Сьогодні:</p>
          {todayTasks.length === 0 ? (
            <p>Завдань на сьогодні немає</p>
          ) : (
            <ul>
              <TaskItem
                data={todayTasks}
                handleCheckTask={handleCheckTask}
                handleDeleteTask={handleDeleteTask}
              />
            </ul>
          )}
          <p className={css.taskSection}>Найближчий тиждень:</p>
          {weekTasks.length === 0 ? (
            <p>Завдань на тиждень немає</p>
          ) : (
            <ul>
              <TaskItem
                data={weekTasks}
                handleCheckTask={handleCheckTask}
                handleDeleteTask={handleDeleteTask}
              />
            </ul>
          )}
          <p className={css.taskSection}>Виконані завдання за тиждень:</p>
          {doneWeekTasks.length === 0 ? (
            <p>Всі завдання за тиждень виконані</p>
          ) : (
            <ul>
              <TaskItem
                data={doneWeekTasks}
                handleCheckTask={handleCheckTask}
                handleDeleteTask={handleDeleteTask}
              />
            </ul>
          )}
          <p className={css.taskSection}>Інші не виконані завдвння:</p>
          {tasks.length === 0 ? (
            <p>Завдання виконані</p>
          ) : (
            <ul>
              <TaskItem
                data={tasks}
                handleCheckTask={handleCheckTask}
                handleDeleteTask={handleDeleteTask}
              />
            </ul>
          )}
          <p className={css.taskSection}>Інші виконані завдвння:</p>
          {isDoneTasks.length === 0 ? (
            <p>Виконаних завдавнь немає</p>
          ) : (
            <ul>
              <TaskItem
                data={isDoneTasks}
                handleCheckTask={handleCheckTask}
                handleDeleteTask={handleDeleteTask}
              />
            </ul>
          )}
        </>
      ) : (
        <div>
          <p className={css.emptyTaskSubTitle}>Наразі немає жодних завдань</p>
          <p className={css.emptyTaskText}>Створіть мерщій нове завдання!</p>
          <Button className={css.emptyTaskBtn} onClick={handleOpenModal}>
            Створити завдання
          </Button>
        </div>
      )}
      <AddTaskModal isOpen={isOpen} onClose={handleCloseModal}></AddTaskModal>
    </div>
  );
}
