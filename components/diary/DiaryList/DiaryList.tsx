"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Modal from "@/components/common/Modal/Modal";
import AddDiaryEntryForm from "../AddDiaryEntryForm/AddDiaryEntryForm";

const fetchDiary = async () => {
  const res = await fetch("/api/diary");

  if (!res.ok) {
    throw new Error("Помилка отримання записів");
  }

  return res.json();
};

export default function DiaryList() {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["diary"],
    queryFn: fetchDiary,
  });

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Новий запис</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AddDiaryEntryForm onClose={() => setIsOpen(false)} />
      </Modal>

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
