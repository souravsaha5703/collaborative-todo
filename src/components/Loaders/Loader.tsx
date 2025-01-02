import React from 'react';

interface LoaderProps {
    color?: string
}

const Loader: React.FC<LoaderProps> = ({ color = 'text-orange-600' }) => {
    return (
        <div className={`animate-spin inline-block size-6 border-[3px] border-current border-t-transparent ${color} rounded-full`} role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default Loader;