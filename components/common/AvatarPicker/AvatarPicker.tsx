import { useRef, useState } from "react";
import css from './AvatarPicker.module.css'
import { toast } from "sonner";


interface AvatarPickerProps{
    onFileChange: (file: File) => void;
}

export default function AvatarPicker({ onFileChange }: AvatarPickerProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            toast.error('Файл повинен бути зображенням');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Файл повинен бути менше 2MB');
            return;
        }
        setPreview(URL.createObjectURL(file));
        onFileChange(file);
    };
    return (
        <>
            <input className={css.defaultInput} type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
                    {preview?<img src={preview}alt='avatar'/>:<div className={css.avatar}></div>}
                    <button className={css.loadPhotoBtn} type="button" onClick={()=>fileInputRef.current?.click()}>Завантажити фото</button>
        </>
    );
}