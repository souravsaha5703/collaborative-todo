import React from 'react';
import { ModeToggle } from '../Theme/Mode-toggle';
import websiteLogo from '../../assets/images/website logo.png';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-background shadow w-full px-10 py-2 md:px-auto fixed z-50">
            <div className='w-full flex items-center justify-between'>
                <img src={websiteLogo} className='size-12' alt="Website Logo" />
                <ModeToggle />
            </div>
        </nav>
    )
}

export default Navbar;