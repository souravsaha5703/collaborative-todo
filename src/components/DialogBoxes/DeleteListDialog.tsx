import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from '../ui/button';
import Loader from '../Loaders/Loader';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { deleteList } from '@/features/Teams/listSlice';
import { database } from '@/Appwrite/appwriteConfig';

interface DialogProps {
    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string | undefined;
}

const DeleteListDialog: React.FC<DialogProps> = ({ isDialogOpen, setIsDialogOpen, id }) => {
    const [errorOccur, setErrorOccur] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleListDeleteBtn = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await database.deleteDocument(
                    import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                    import.meta.env.VITE_APPWRITE_LISTS_COLLECTION_ID,
                    id
                );
                dispatch(deleteList(id));
                setLoading(false);
                setIsDialogOpen(false);
            }
        } catch (error) {
            console.error(error);
            setErrorOccur(true);
            setError("Failed to create list. Please try again.");
            setLoading(false);
        }

    }

    const handleCancelBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsDialogOpen(false);
    }
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className='max-[425px]:w-[300px]'>
                <DialogHeader>
                    <DialogTitle className='font-noto text-2xl font-medium text-start'>Delete list</DialogTitle>
                    <DialogDescription className='font-noto text-base font-normal text-start'>Are you sure you want to delete this list ?</DialogDescription>
                </DialogHeader>
                <div className='w-full flex items-center justify-center gap-4'>
                    <Button onClick={handleCancelBtn} variant={'outline'} size={'lg'} className="w-full font-noto text-base font-medium">Cancel</Button>
                    <Button
                        onClick={handleListDeleteBtn}
                        disabled={loading}
                        className="w-full font-noto text-base font-medium bg-red-600 hover:bg-red-700 disabled:bg-red-300" size="lg"
                    >
                        {loading ? <Loader /> : 'Delete List'}
                    </Button>
                </div>
                {errorOccur && <p className='font-noto text-start font-normal text-base text-red-500 my-4'>{error}</p>}
            </DialogContent>
        </Dialog>
    )
}

export default DeleteListDialog;