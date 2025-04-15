import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { UserX } from 'lucide-react';
import Loader from '../Loaders/Loader';
import { database } from '@/Appwrite/appwriteConfig';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { updateTeam } from '@/features/Teams/teamSlice';

interface DialogProps {
    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string | undefined;
    avatarImg: string | undefined;
    memberName: string | undefined;
    memberEmail: string | undefined;
    role: string | undefined;
}

const MemberDetailsDialog: React.FC<DialogProps> = ({ isDialogOpen, setIsDialogOpen, id, avatarImg, memberName, memberEmail, role }) => {
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const currentMember = useAppSelector(state => state.member.currentMember);
    const dispatch = useAppDispatch();
    const handleRemoveMember = async () => {
        if (id) {
            setDeleteLoading(true);
            try {
                await database.deleteDocument(
                    import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                    import.meta.env.VITE_APPWRITE_MEMBERS_COLLECTION_ID,
                    id
                );
                dispatch(updateTeam(id));
                setError("");
                setDeleteLoading(false);
                setIsDialogOpen(false);
            } catch (error) {
                setDeleteLoading(false);
                setError("Error in Removing Member");
                console.error(error);
            }
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className={`sm:max-w-[700px] max-[528px]:w-[400px] max-[375px]:w-[300px] max-[375px]:px-2`}>
                <div className="space-y-4 mt-5">
                    <div className="flex items-center justify-between gap-4 max-[425px]:flex-col-reverse max-[425px]:items-start">
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={avatarImg} alt={memberName} />
                                <AvatarFallback>
                                    {memberName ?? ""
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium font-noto max-[487px]:text-sm">{memberName}</p>
                                <p className="text-sm text-muted-foreground font-noto">{memberEmail}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant={role === "admin" ? "default" : "outline"} className='font-noto'>{role}</Badge>
                        </div>
                    </div>
                </div>
                <div className='flex items-end justify-end mt-4'>
                    {currentMember?.role == 'admin' ? (
                        <Button onClick={handleRemoveMember} variant="destructive" size={"sm"} className='font-noto text-base font-normal py-5 max-[425px]:text-sm'>
                            {deleteLoading ? (
                                <Loader />
                            ) : (
                                <div className='flex items-center gap-2'>
                                    <UserX /> {currentMember?.id == id ? "Leave" : "Remove"}
                                </div>
                            )}
                        </Button>
                    ) : (
                        <Button onClick={handleRemoveMember} variant="destructive" size={"sm"} className='font-noto text-base font-normal py-5 max-[425px]:text-sm'>
                            {deleteLoading ? (
                                <Loader />
                            ) : (
                                <div className='flex items-center gap-2'>
                                    <UserX /> Leave
                                </div>
                            )}
                        </Button>
                    )}
                </div>
                {error && <p className='font-noto text-start font-normal text-base text-red-500 my-4'>{error}</p>}
            </DialogContent>
        </Dialog>
    )
}

export default MemberDetailsDialog;