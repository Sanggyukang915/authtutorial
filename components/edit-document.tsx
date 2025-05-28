import Link from "next/link";
import {
    SidebarMenuButton,
    SidebarMenuSubItem,
} from "./ui/sidebar";
import { useState, useRef, useEffect } from "react";
import {
    Pencil,
    Trash,
} from "lucide-react";

interface Props {
    id: string;
    name: string;
    onRename: (id: string, newName: string) => void;
    onDelete: (id: string) => void;
}

export function EditDocument({ id, name, onRename, onDelete }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(name);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, value.length);
        }
    }, [isEditing]);

    const handleSubmit = () => {
        const trimmed = value.trim();
        if (trimmed && trimmed !== name) {
            onRename(id, trimmed);
        }
        setIsEditing(false);
    };

    return (
        <>
            {isEditing ? (
                <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleSubmit}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSubmit();
                        if (e.key === "Escape") {
                            setValue(name);
                            setIsEditing(false);
                        }
                    }}
                    className="w-full px-1 py-0.5 text-sm border border-gray-300 rounded"
                />
            ) : (
                <SidebarMenuSubItem key={id} className="flex justify-between items-center">
                    <SidebarMenuButton asChild>
                        <Link href={`/${id}`}>
                            <span>{name}</span>
                        </Link>
                    </SidebarMenuButton>
                    <div className="flex gap-1 ml-2">
                        <button onClick={() => setIsEditing(true)}>
                            <Pencil className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                        </button>
                        <button onClick={() => onDelete(id)}>
                            <Trash className="w-4 h-4 text-gray-400 hover:text-red-600" />
                        </button>
                    </div>
                </SidebarMenuSubItem>
            )}
        </>
    );
}
