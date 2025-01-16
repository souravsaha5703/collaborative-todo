import React from 'react';
import { ModeToggle } from '../Theme/Mode-toggle';
import websiteLogo from '../../assets/images/website logo.png';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-background shadow w-full px-10 py-2 fixed z-40 max-[425px]:px-5">
            <div className='w-full flex items-center justify-between'>
                <img src={websiteLogo} className='size-12' alt="Website Logo" />
                <div className='flex items-center justify-center gap-5'>
                    <Link to={'/login'} className='text-base font-noto font-normal text-slate-900 dark:text-slate-50 hover:text-orange-500 dark:hover:text-orange-400 transition-all ease-in'>
                        Log in
                    </Link>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;