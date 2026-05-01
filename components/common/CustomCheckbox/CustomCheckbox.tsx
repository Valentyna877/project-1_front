import css from './CustomCheckbox.module.css';

type Props = {
  id: string;
  checked?: boolean;
  handleCheck?: () => void;
  text: string;
};

export default function CustomCheckbox({
  id,
  checked,
  handleCheck,
  text,
}: Props) {
  return (
    <div className={css.taskCustomCheckbox}>
      <input
        onChange={handleCheck}
        className={`${css.defaultCheckbox} {visuallyHidden}`}
        type="checkbox"
        name="taskCheckbox"
        id={id}
        defaultChecked={checked}
      />
      <label className={css.labelCheckbox} htmlFor={id}>
        <span className={css.customCheckbox}>
          <svg className={css.checkboxMark} width={14} height={11}>
            <use href="/sprite.svg#icon-mark" />
          </svg>
        </span>
        <p className={css.itemText}>{text}</p>
      </label>
    </div>
  );
}
