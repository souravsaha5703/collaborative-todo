import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Loader from '../Loaders/Loader';
import { database } from '@/Appwrite/appwriteConfig';
import { ID } from 'appwrite';

interface DialogProps {
    isDialogOpen: boolean,
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    createdBy: string | undefined,
    teamId: string | undefined
}

const CreateListDialog: React.FC<DialogProps> = ({ isDialogOpen, setIsDialogOpen, createdBy, teamId }) => {
    const [listName, setListName] = useState<string>('');
    const [errorOccur, setErrorOccur] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleCreateList = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (listName == '') {
            setErrorOccur(true);
            setError("Please enter a valid list name");
            setLoading(false);
        } else {
            try {
                await database.createDocument(
                    import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                    import.meta.env.VITE_APPWRITE_LISTS_COLLECTION_ID,
                    ID.unique(), {
                    list_name: listName,
                    createdBy: createdBy,
                    team_id: teamId
                }
                );
                setLoading(false);
                setIsDialogOpen(false);
            } catch (error) {
                console.error(error);
                setErrorOccur(true);
                setError("Failed to create list. Please try again.");
                setLoading(false);
            }
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='font-noto text-2xl font-medium text-start'>Create a new list</DialogTitle>
                    <DialogDescription className='font-noto text-base font-normal text-start'>Create a list of related tasks.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateList}>
                    <div className="mb-4 flex flex-col gap-2">
                        <Label className="font-noto font-normal text-base" htmlFor='teamName'>List Name</Label>
                        <Input
                            type="text"
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                            placeholder='Enter a list name'
                            className='font-noto text-base font-normal max-[425px]:w-full max-[425px]:text-sm'
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full font-noto text-base font-medium disabled:bg-orange-300" size="lg"
                    >
                        {loading ? <Loader /> : 'Create List'}
                    </Button>
                    {errorOccur && <p className='font-noto text-start font-normal text-base text-red-500 my-4'>{error}</p>}
                </form>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateListDialog;