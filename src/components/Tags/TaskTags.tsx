import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useAppDispatch } from '@/hooks/redux-hooks';
import { addTag, removeTag as removeT } from '@/features/Tags/tagSlice';

const TaskTags: React.FC = () => {
    const [value, setValue] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    const addTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && value.trim() !== "") {
            if (tags.length > 3) {
                alert("You can only add 4 tags");
            } else {
                if (!tags.includes(value.trim())) {
                    setTags([...tags, value.trim()]);
                    setValue("")
                    dispatch(addTag(value.trim()));
                } else {
                    alert("Tag is already added by you");
                }
            }
        }
    }

    const removeTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
        dispatch(removeT(tag));
    }

    return (
        <div className='space-y-4'>
            <Input
                placeholder='Add Tags related to Task'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={addTags}
                className="font-noto font-normal max-[425px]:text-sm"
            />
            <div className='flex flex-wrap gap-2'>
                {tags.map((tag, index) => {
                    return (
                        <div
                            key={index}
                            className='flex items-center font-noto font-medium text-sm bg-gray-900 dark:bg-gray-100 text-gray-50 dark:text-gray-900 px-3 rounded-xl'
                        >
                            <span>{tag}</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTag(tag)}
                                className="ml-2 p-1 hover:bg-transparent"
                            >
                                <X className='text-red-500' />
                            </Button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TaskTags;