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
import { Textarea } from "@/components/ui/textarea";
import { Label } from '../ui/label';
import Loader from '../Loaders/Loader';
import inviteCodeGenerator from '@/utils/inviteCodeGenerator';
import { useAppSelector } from '@/hooks/redux-hooks';
import { database } from '@/Appwrite/appwriteConfig';
import { ID } from 'appwrite';

interface DialogProps {
    isDialogOpen: boolean,
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const CreateTeamDialog: React.FC<DialogProps> = ({ isDialogOpen, setIsDialogOpen }) => {
    const [teamName, setTeamName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [errorOccur, setErrorOccur] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const user = useAppSelector((state) => state.user.currentUser);

    const handleCreateTeam = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (teamName == '') {
            setErrorOccur(true);
            setError("Please enter a valid team name");
            setLoading(false);
        } else {
            try {
                const createTeam = await database.createDocument(
                    import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                    import.meta.env.VITE_APPWRITE_TEAMS_COLLECTION_ID,
                    ID.unique(), {
                    team_name: teamName,
                    team_description: description,
                    createdBy: user?.id,
                    invite_code: inviteCodeGenerator()
                }
                );
                await database.createDocument(
                    import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                    import.meta.env.VITE_APPWRITE_MEMBERS_COLLECTION_ID,
                    ID.unique(), {
                    team_id: createTeam.$id,
                    user_id: user?.id,
                    role: 'admin',
                    joined_at: new Date()
                }
                );
                setLoading(false);
                setIsDialogOpen(false);
            } catch (error) {
                console.error(error);
                setErrorOccur(true);
                setError("Failed to create team. Please try again.");
                setLoading(false);
            }
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='font-noto text-2xl font-medium text-start'>Create a new team</DialogTitle>
                    <DialogDescription className='font-noto text-base font-normal text-start'>Create a team to collaborate on tasks with others.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateTeam}>
                    <div className="mb-4 flex flex-col gap-2">
                        <Label className="font-noto font-normal text-base" htmlFor='teamName'>Team Name</Label>
                        <Input
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            placeholder='Enter a team name'
                            className='font-noto text-base font-normal max-[425px]:w-full max-[425px]:text-sm'
                            required
                        />
                    </div>

                    <div className="mb-4 flex flex-col gap-2">
                        <Label className="font-noto font-normal text-base" htmlFor='teamDescription'>Team Description</Label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Enter a team description'
                            className='font-noto text-base font-normal max-[425px]:w-full max-[425px]:text-sm'
                            rows={3}
                        />

                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full font-noto text-base font-medium disabled:bg-orange-300" size="lg"
                    >
                        {loading ? <Loader /> : 'Create Team'}
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

export default CreateTeamDialog;