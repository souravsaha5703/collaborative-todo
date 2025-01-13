import { CheckCircle, Clock, Cloud } from 'lucide-react';
import React from 'react';
import { LucideProps } from 'lucide-react';

interface FeatureCards {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    title: string,
    description: string,
}

export const features: FeatureCards[] = [
    {
        icon: CheckCircle,
        title: 'Easy Task Management',
        description: 'Create, organize, and complete tasks with just a few clicks.',
    },
    {
        icon: Clock,
        title: 'Smart Reminders',
        description: 'Never miss a deadline with our intelligent reminder system.',
    },
    {
        icon: Cloud,
        title: 'Cloud Sync',
        description: 'Access your tasks from anywhere, on any device.',
    },
];