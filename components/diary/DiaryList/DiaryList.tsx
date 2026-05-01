'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AddDiaryEntryModal from '@/components/diary/AddDiaryEntryModal/AddDiaryEntryModal';
import css from './DiaryList.module.css';

// import Modal from '@/components/common/Modal/Modal';
// import AddDiaryEntryForm from '@/components/diary/AddDiaryEntryForm/AddDiaryEntryForm';
////тимчасово
const options = [
  { value: 'Апатія', label: 'Апатія' },
  { value: 'Апетит', label: 'Апетит' },
  { value: 'Бадьорість', label: 'Бадьорість' },
];
////тимчасово

const fetchDiary = async () => {
  const res = await fetch('/api/diary');

  if (!res.ok) {
    throw new Error('Помилка отримання записів');
  }

  return res.json();
};

export default function DiaryList() {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['diary'],
    queryFn: fetchDiary,
  });
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <button className={css.addBtn} onClick={() => setIsOpen(true)}>
        Новий запис
      </button>

      <AddDiaryEntryModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        options={options}
      />

      {isLoading && <p>Завантаження...</p>}
      {isError && <p>Помилка завантаження</p>}
      <div>
        {data?.length === 0 && <p>Немає записів</p>}

        {data?.map((item: any) => (
          <div key={item._id}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>

            <div>
              {item.categories?.map((cat: string) => (
                <span key={cat}>{cat} </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
