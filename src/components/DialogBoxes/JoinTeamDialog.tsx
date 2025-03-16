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
import { useAppSelector } from '@/hooks/redux-hooks';
import { database } from '@/Appwrite/appwriteConfig';
import { ID, Query } from 'appwrite';

interface DialogProps {
    isDialogOpen: boolean,
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const JoinTeamDialog: React.FC<DialogProps> = ({ isDialogOpen, setIsDialogOpen }) => {
    const [code, setCode] = useState<string>('');
    const [errorOccur, setErrorOccur] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const user = useAppSelector((state) => state.user.currentUser);

    const handleJoiningFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (code == '') {
            setErrorOccur(true);
            setError("Please enter a valid team name");
            setLoading(false);
        } else {
            try {
                const verifyCode = await database.listDocuments(
                    import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                    import.meta.env.VITE_APPWRITE_TEAMS_COLLECTION_ID,
                    [Query.equal('invite_code', code)]
                );

                if (verifyCode.documents.length === 0) {
                    setErrorOccur(true);
                    setError("Invalid Code");
                    setLoading(false);
                    return;
                }

                const result = verifyCode.documents[0];

                if(user?.id && result.team_id){
                    const checkExistingUser = await database.listDocuments(
                        import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                        import.meta.env.VITE_APPWRITE_MEMBERS_COLLECTION_ID,
                        [
                            Query.equal('team_id', result.team_id),
                            Query.equal('user_id', user.id)
                        ]
                    );
    
                    if (checkExistingUser.documents.length) {
                        console.log("hehe");
                        setErrorOccur(true);
                        setError("You are already a member of this team");
                        setLoading(false);
                        return;
                    }
    
                    await database.createDocument(
                        import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                        import.meta.env.VITE_APPWRITE_MEMBERS_COLLECTION_ID,
                        ID.unique(), {
                        team_id: result.team_id,
                        user_id: user?.id,
                        role: 'member',
                        joined_at: new Date()
                    });
                }

                setLoading(false);
                setIsDialogOpen(false);

            } catch (error) {
                console.error(error);
                setErrorOccur(true);
                setError("Something Went Wrong, Please try again");
                setLoading(false);
            }
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='font-noto text-2xl font-medium text-start'>Join an existing team</DialogTitle>
                    <DialogDescription className='font-noto text-base font-normal text-start'>Enter the invite code provided by the team admin.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleJoiningFormSubmit}>
                    <div className="mb-4 flex flex-col gap-2">
                        <Label className="font-noto font-medium text-base" htmlFor='inviteCode'>Invite Code</Label>
                        <Input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder='Enter invite code'
                            className='font-noto text-base font-normal max-[425px]:w-full max-[425px]:text-sm'
                            required
                            maxLength={6}
                        />
                        <p className="font-noto font-normal text-sm text-gray-600 dark:text-gray-400">Ask your team admin for the invite code.</p>
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full font-noto text-base font-medium disabled:bg-orange-300" size="lg"
                    >
                        {loading ? <Loader /> : 'Join Team'}
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

export default JoinTeamDialog;