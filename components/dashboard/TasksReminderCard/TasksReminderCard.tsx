import Button from "@/components/common/Button/Button";
import css from "./TasksReminderCard.module.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { checkedTask, getAllTask } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { Task } from "@/types/task";

export default function TasksReminderCard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["task"],
    queryFn: getAllTask,
    refetchOnMount: false,
  });

  const queryClient = useQueryClient();

  const taskMutation = useMutation({
    mutationFn: checkedTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      console.log("task checked");
    },

    onError: () => {
      console.log("task checked error");
    },
  });

  const isDone = true;

  const handleCheckTask = (isDone: boolean) => {
    taskMutation.mutate(isDone);
  };

  if (!data) {
    return "Error";
  }

  const tasks = data.result;

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
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className={css.taskItem}>
              <p className={css.taskItemTime}>{task.data}</p>
              <div className={css.taskCustomCheckbox}>
                <input
                  onChange={() => handleCheckTask(isDone)}
                  className={css.defaultCheckbox}
                  type="checkbox"
                  name="taskCheckbox"
                  id={task._id}
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
        </ul>
      ) : (
        <div>
          <p className={css.emptyTaskSubTitle}>Наразі немає жодних завдань</p>
          <p className={css.emptyTaskText}>Створіть мершій нове завдання!</p>
          <Button className={css.emptyTaskBtn}>Створити завдання</Button>
        </div>
      )}
    </div>
  );
}
