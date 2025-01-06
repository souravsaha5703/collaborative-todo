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
import { account } from '@/Appwrite/appwriteConfig';
import { useNavigate } from 'react-router-dom';

interface DrawerProps {
    isDrawerOpen: boolean,
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
    id: string
}

const OTPDrawer: React.FC<DrawerProps> = ({ isDrawerOpen, setIsDrawerOpen, id }) => {
    const [otp, setOtp] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorOccur, setErrorOccur] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleVerifyBtn = async () => {
        setLoading(true);

        try {
            await account.createSession(
                id,
                otp
            ).then(() => {
                setLoading(false);
                setErrorOccur(false);
                navigate('/user/todos');

            }).catch(error => {
                setLoading(false);
                setErrorOccur(true);
                console.error(error);
            })
        } catch (error) {
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
                    {errorOccur && <p className='text-center text-red-500 font-noto font-normal text-sm'>Invalid OTP</p>}
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