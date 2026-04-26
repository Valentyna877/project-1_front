````markdown
# TEAM_RULES

Правила командної роботи над проєктом
.

---

## 1. Git / GitHub Flow

### 1.1. Головна гілка

- Головна гілка: `main`.
- У `main` лежить тільки стабільний і перевірений код.
- Прямі коміти в `main` заборонені – всі зміни йдуть через Pull Request (PR).

### 1.2. Робочі гілки

- Для кожної задачі/секції створюється окрема гілка від `main`.

Формат назви гілки:

```text
Viktor/header
Valentyna/sidebar
Vlad/GoogleAuthButton
```
````

Одна таска = одна гілка (включно з адаптивом).

Створення гілки:

```bash
git switch -c Anna/header --> створює нову гілку і переходить відразу на неї
 або
git branch Anna/header --> створює нову гілку
git checkout Anna/header --> перейти на цю гілку
```

### 1.3. Оновлення гілки перед пушем

Перед тим як пушити або створювати PR, онови свою гілку від актуального `main`:

```bash
git checkout main
git pull origin main
git checkout Vasilisa/header
git merge main
```

Якщо є конфлікти – вирішуємо локально, перевіряємо проєкт, комітимо й пушимо.

### 1.4. Pull Request

- Назва PR:

  ```text
  Назва гілки: секція about (mobile, tablet, desktop)
  ```

- В описі PR вказати:
  - що зроблено;
  - стан адаптиву (що покрито: mobile / tablet / desktop);
  - що залишилося доробити (якщо є);

- PR **мерджиться тільки після рев’ю** від колеги.

- Не мерджимо самі себе без погодження (мінімум 1 approve).

---

## 2. CSS

- Загальні стилі – тільки в `base.css`:
  - reset / normalize;
  - шрифти;
  - кольори;
  - CSS-змінні (`:root { --color-primary: ... }`)
    Не використовуйте випадкові кольори напряму в секційних файлах. Беремо тільки з змінних у `base.css`.
  - спільні утиліти (`.container`, базові кнопки тощо).

- Повторювані стилі **не дублюємо** в секційних файлах – вже винесені в `base.css`.

---

## 3. HTML-правила

### 3.2. Класи та іменування (BEM-підхід)

- Класи давайте зрозумілі й однозначні.

- Для кожної секції – **свій блок**:

  ```html
  <section class="about">
    <div class="container">
      <h2 class="about-title">Про нас</h2>
      <p class="about-text">...</p>
    </div>
  </section>
  ```

- Префікс класу завжди починається з назви секції:

  ```text
  about-title
  about-text
  header-nav
  header-logo
  footer-link
  ```

- Модифікатори:

  ```text
  about-title-accent
  header-btn-primary
  ```

- Клас `.container`:
  - використовується тільки для **вирівнювання та обмеження ширини**;
  - має один спільний стиль у `base.css`.

### 3.3. Атрибути

Рекомендований порядок атрибутів:

```html
<img
  class="about-image"
  id="team-photo"
  src="img/team.webp"
  alt="Командне фото"
  title="Наша команда"
/>
```

- Використовуємо тільки **подвійні лапки** `" "`.

### 3.4. Доступність (Accessibility = a11y)

- У всіх `img` має бути змістовний `alt`, пустим його не залишаємо --> (`alt=""`).
- Не видаляємо `outline` у фокусних елементів (`button`, `a`, `input`) без заміни на власний фокус-стиль.
- Текст у кнопках та лінках має бути зрозумілим.

---

## 4. CSS-правила

- Спочатку позиціонування/бокс-модель (`display`, `position`, `margin`, `padding`, `width`, `height`),
- потім типографіка (`font`, `line-height`, `color`),
- потім декоративні (`background`, `border`, `box-shadow`).

### 4.1. Іменування класів

- Імена класів починаємо з назви секції: `header-`, тощо.
- Не використовуємо “універсальні” класи типу `.title`, `.btn`, `.text` без префікса блоку.
- Для повторюваних елементів (типу кнопок) – або:
  - окремий утилітарний клас у `base.css`,
  - або спільний патерн + модифікатори.

### 4.2. Mobile-first

Пишемо стилі в mobile-first підході:

```css
/* мобілка */
.about {
  /* базові стилі */
}

@media (min-width: 768px) {
  /* планшет */
  .about {
    /* адаптація */
  }
}

@media (min-width: 1440px) {
  /* десктоп */
  .about {
    /* десктоп-адаптація */
  }
}
```

Точки перелому (за замовчуванням):

- `min-width: 768px` – планшет;
- `min-width: 1440px` – десктоп.

(Мобільна версія – базова, без медіа-запитів.)

### 4.3. Сітка, одиниці, вкладеність

- Одиниці вимірювання: `px`, `%`.
- Селектори для стилізації – **тільки класи** (без прив’язки до тегів і `id`).
- Максимальна вкладеність селекторів: **2 рівні**:

  ```css
  .about-list {
    ...
  }

  .about-list-item {
    ...
  }

  /* допустимо: */
  .about-list-item .about-icon {
    ...
  }
  ```

### 4.4. `!important`

- **Не використовуємо `!important`**, окрім крайніх випадків.
- Якщо без нього ніяк – додаємо коментар із поясненням:

  ```css
  .about-title {
    margin-bottom: 24px !important; /* тимчасово: перекриваємо сторонні стилі */
  }
  ```

### 4.5. `base.css` та змінні

У `base.css` зберігаємо:

```css
:root {
  --color-primary: #000000;
  --color-accent: #ff6b08;
  --color-bg: #ffffff;
  --font-main: "Roboto", system-ui, sans-serif;
}

body {
  font-family: var(--font-main);
  color: var(--color-primary);
  background-color: var(--color-bg);
}
```

- У секційних CSS **не прописуємо довільні кольори напряму** – беремо тільки зі змінних в `:root`.

---

## 5. Зображення та ресурси

- Фото: `.webp`, `.jpg`.
- Іконки, логотипи: `.svg`.
- Не заливаємо в репозиторій зображення по 5–20 МБ.
- Розмір картинки повинен відповідати реальному використанню (не 4000px шириною для блоку 300px).
- Всі картинки в /public

---

## 6. Коміти

### 6.1. Формат повідомлень

Формат:

```text
feat(header): added HTML and styles for mobile
style(header): adaptive for tablet
fix(header): fixed paddings for mobile
refactor(header): simplified markup structure
docs: updated TEAM_RULES.md
```

- Коміт має бути **коротким і змістовним**.
- Одна логічна зміна – один коміт.

### 6.2. Мова комітів

- Одна мова для всієї команди: **англійська**.
- Команда домовляється один раз і дотримується вибору.

---

## 7. Робота з репозиторієм (для новачків)

### 7.1. Як завантажити проєкт

1. Встановити Node.js (версія LTS).

2. Клонувати репозиторій:

   ```bash
   git clone https://github.com/....
   ```

3. Перейти в папку проєкту:

   ```bash
   cd project-1_front
   ```

4. Встановити залежності:

   ```bash
   npm install
   ```

### 7.2. Запуск проєкту локально

```bash
npm run dev
```

.ENV
NEXT_PUBLIC_API_URL= ваш localhost

````продакшен
npm run build
npm run start

---

## 8. Робота з чужими змінами

### 8.1. Оновлення `main`

Якщо хтось оновив `main`, підтягнути зміни:

```bash
git checkout main
git pull origin main
````

### 8.2. Оновлення своєї гілки

```bash
git checkout Viktor/header
git merge main
```

Якщо виникли конфлікти:

- вирішуємо їх у редакторі;
- запускаємо проєкт, перевіряємо, що все працює;
- робимо коміт:

  ```bash
  git add .
  git commit -m "fix(header): resolve merge conflicts"
  git push origin Viktor/header
  ```

---

## 9. Що не пушимо в репозиторій

- Папки `node_modules/`, `dist/` – мають бути в `.gitignore`.
- Локальні файли IDE/редактора (якщо не домовлено навпаки).
- Тимчасові файли, особисті чернетки, тестові картинки.

---

## 10. Комунікація в команді

- Якщо щось ламається – **пишемо в командний чат**, не пушимо в `main` «як є».
- Якщо сумніваєтесь у назві класу або рішенні – запитуємо у команди.
- Не змінюємо чужу секцію без попередження:
  - пишемо автору в чат;
  - описуємо зміни в PR з позначкою автора (mention).

---

## 11. Checklists ✅

### 11.1. Перед пушем

- [ ] HTML/CSS без помилок (мінімум – немає червоного/жовтого підкреслення в редакторі).
- [ ] Адаптивність перевірена: мобілка / планшет / десктоп.
- [ ] Оптимізовані зображення, немає зайвих/тестових картинок.
- [ ] Видалений закоментований код і тимчасові класи.
- [ ] Немає помилок у консолі браузера.

### 11.2. Перед створенням PR перевірити:

- [ ] Локальна гілка оновлена від `main` (`git pull origin main` + `git merge main`).
- [ ] Всі зміни закомічені.
- [ ] Коротка і зрозуміла назва PR.
- [ ] В описі PR:
  - що зроблено;
  - стан адаптиву;
  - чи є відомі баги;

- [ ] Проєкт збирається / запускається без помилок.

### 11.3. Рев’юери

- Створили Pull Request у GitHub і додали на рев’ю: `Viktor-Yashchuk`, `Valentyna877`, `TeaRediT`.
- В пункті Asign yourself обираємо себе, для того, щоб Ваш коміт не загубився.

---

Якщо виникають питання або нові ситуації – обговорюємо в чаті та за потреби оновлюємо цей файл.

```

```

## BUTTON

-
- Використання:
- - За замовчуванням (md + normal):
- <Button>Зберегти</Button>
-
- - На всю ширину (форми):
- <Button className={css.fullWidth}>Продовжити</Button>
-
- - Маленькі (модалки «Так/Ні», «Зберегти/Відмінити»):
- <Button size="sm">Так</Button>
-
- - Вторинні / нейтральні (сірі):
- <Button variant="cancel">Відмінити</Button>
-
- - Небезпечна дія - видалення:
- <Button variant="delete">Видалити</Button>
-
- - Кнопка з іконкою зліва (Google 24×24):
- <Button variant="cancel" leftIcon={<GoogleIcon />}>Увійти через Google</Button>
-
- \*\*\*\* - Стан завантаження (кнопка тимчасово disabled + спінер):
- <Button
-     isLoading={isCreating}
-     loadingText="Створення…"
- >
-     Створити
- </Button>

---

\*

---

## Приклад використання:

- - import Button from '@/components/common/Button/Button';
- - <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Надсилаємо…' : 'Надіслати лист'}
    </Button>

\*

## Date Picker

- - <Field
    id={`${fieldId}-date`}
    name="date"
    component={CalendarDatePicker}
    onDateChange={handleDateChange}
    className="date-picker"
    wrapperClassName="date-picker-wrapper"
    />

\*

## clsx

- - <!-- import clsx from 'clsx';

function Button({ isPrimary, isDisabled }: { isPrimary: boolean; isDisabled: boolean }) {
return (
<button
className={clsx(
'base-btn',
isPrimary && 'btn-primary',
isDisabled && 'btn-disabled'
)} >
Натисни мене
</button>
);
} -->

- - Замість
  <div className={`${css.modal} ${extraClass}`}></div>
- - Буде
  <div className={clsx(css.modal, extraClass)}></div>

- - <div className={clsx(css.modal, {
      [css.active]: isOpen,
      [css.error]: hasError,
    })}></div>

\*
