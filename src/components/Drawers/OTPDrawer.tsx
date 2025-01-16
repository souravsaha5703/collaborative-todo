import React, { useState } from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from '../Loaders/Loader';
import { account, database } from '@/Appwrite/appwriteConfig';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from "../../hooks/redux-hooks";
import { addUser, userStatus } from "@/features/Auth/authSlice";

interface DrawerProps {
    isDrawerOpen: boolean,
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
    id: string
}

const OTPDrawer: React.FC<DrawerProps> = ({ isDrawerOpen, setIsDrawerOpen, id }) => {
    const [otp, setOtp] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorOccur, setErrorOccur] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleVerifyBtn = async () => {
        setLoading(true);

        try {
            await account.createSession(
                id,
                otp
            ).then(async (res) => {
                const response = await database.getDocument(
                    import.meta.env.VITE_APPWRITE_TODO_DB_ID,
                    import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
                    res.userId
                );

                dispatch(addUser({
                    id: response.$id,
                    fullname: response.fullname,
                    status: response.status,
                    email: response.email,
                    emailVerification: response.emailVerification
                }));
                dispatch(userStatus(true));

                setLoading(false);
                setErrorOccur(false);
                setError('');
                navigate('/user/dashboard');

            }).catch((error: unknown) => {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError('Invalid OTP')
                }
                dispatch(addUser(null));
                dispatch(userStatus(false));
                setLoading(false);
                setErrorOccur(true);
                console.error(error);
            })
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('Invalid OTP')
            }
            dispatch(addUser(null));
            dispatch(userStatus(false));
            setLoading(false);
            setErrorOccur(true);
            console.error(error);
        }
    }

    return (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerContent className='flex flex-col items-center justify-center'>
                <DrawerHeader className='w-full flex flex-col items-center justify-center'>
                    <DrawerTitle className='text-3xl font-noto text-center font-bold max-[564px]:text-xl'>OTP Verification</DrawerTitle>
                    <DrawerDescription className='text-xl font-noto text-center font-medium max-[564px]:text-base'>Enter the otp sent to your registered mobile number</DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col space-y-1.5">
                    <Input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter otp here" className="h-12 font-noto font-medium text-base" maxLength={6} required />
                    {errorOccur && <p className='text-center text-red-500 font-noto font-normal text-sm'>{error}</p>}
                </div>
                <DrawerFooter>
                    {loading ? (
                        <div className='w-full flex items-center justify-center mt-2'>
                            <Loader />
                        </div>
                    ) : (
                        <Button onClick={handleVerifyBtn} className={`w-40 mt-2 font-noto font-medium text-base max-[375px]:text-base`} size="lg" >
                            Verify OTP
                        </Button>
                    )}
                    <Button variant="link" className='text-base font-noto'>Resend OTP</Button>

                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default OTPDrawer;