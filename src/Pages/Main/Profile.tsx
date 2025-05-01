import React, { useEffect, useState } from "react";
import { BadgeCheck, Mail, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector, useAppDispatch } from "@/hooks/redux-hooks";
import { ID } from 'appwrite';
import { database, storage, account } from "@/Appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/features/Auth/authSlice";
import Sidebar from "@/components/NavigationBars/Sidebar";

const Profile: React.FC = () => {
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const user = useAppSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                if (user?.id) {
                    const userData = await database.getDocument(
                        import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                        import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
                        user.id
                    );

                    if (userData.profileImage) {
                        const imageUrl = storage.getFileView(import.meta.env.VITE_APPWRITE_PROFILE_IMAGE_BUCKET_ID, userData.profileImage);
                        setImageUrl(imageUrl);
                    }
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setError('Failed to load user profile');
            }
        }

        fetchProfileImage();
    }, [])

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const fileUrl = URL.createObjectURL(file);
        setImageUrl(fileUrl);

        setIsUploading(true);
        setError(null);

        try {
            const uploadedFile = await storage.createFile(import.meta.env.VITE_APPWRITE_PROFILE_IMAGE_BUCKET_ID, ID.unique(), file);

            if (user?.id) {
                await database.updateDocument(
                    import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                    import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
                    user.id, {
                    profileImage: uploadedFile.$id,
                });
            }

            const fileUrl = storage.getFilePreview(import.meta.env.VITE_APPWRITE_PROFILE_IMAGE_BUCKET_ID, uploadedFile.$id);
            setImageUrl(fileUrl);

            setIsUploading(false);
        } catch (error) {
            console.error('Error uploading profile image:', error);
            setError('Failed to upload profile image. Please try again.');
            setIsUploading(false);
        };
    }

    const handleLogoutBtn = async () => {
        try {
            await account.deleteSession('current');
            dispatch(deleteUser());
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Sidebar />
            <div className='md:ml-20 p-5 bg-background'>
                <Card className="w-full max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-noto">Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="relative group">
                                <Avatar className="w-24 h-24">
                                    {imageUrl ? <AvatarImage src={imageUrl} alt="Profile Picture" /> : null}
                                    <AvatarFallback>{user?.fullname.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <label htmlFor="avatar-upload" className="cursor-pointer">
                                        <div className="flex flex-col items-center justify-center text-white p-2">
                                            <Upload className="h-5 w-5" />
                                            <span className="text-xs mt-1">Upload</span>
                                        </div>
                                        <input
                                            id="avatar-upload"
                                            type="file"
                                            accept="image/*"
                                            className="sr-only"
                                            onChange={handleFileChange}
                                            disabled={isUploading}
                                        />
                                    </label>
                                </div>

                                {isUploading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full">
                                        <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1 text-center sm:text-left">
                                <h2 className="text-2xl font-semibold font-noto">{user?.fullname}</h2>
                                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-muted-foreground max-[480px]:flex-col">
                                    <Mail className="h-5 w-5 max-[480px]:hidden" />
                                    <span className="font-noto font-normal text-xl max-[375px]:text-base">{user?.email}</span>
                                    {user?.emailVerification ? (
                                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 hover:bg-green-50 border-green-200 font-noto">
                                            <BadgeCheck className="h-3.5 w-3.5 mr-1" />
                                            Verified
                                        </Badge>
                                    ) : <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200 font-noto">
                                        Not Verified
                                    </Badge>}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <Button onClick={handleLogoutBtn} variant="destructive" className='font-noto text-base'>Logout</Button>
                        </div>
                        {error && <p className='font-noto text-start font-normal text-base text-red-500'>{error}</p>}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Profile;