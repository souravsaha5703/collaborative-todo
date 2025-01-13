import React from 'react';
import ShineBorder from "@/components/ui/shine-border";

interface FeatureCardsProps {
    icon: React.ReactNode,
    title: string,
    description: string,
}

const FeatureCards: React.FC<FeatureCardsProps> = ({ icon, title, description }) => {
    return (
        <ShineBorder
            className="relative w-[350px] h-[200px] flex px-2 py-4 flex-col overflow-hidden rounded-lg border bg-background md:shadow-xl gap-3 text-center max-[375px]:w-[300px]"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
            {icon}
            <h3 className="text-xl font-noto font-medium text-slate-900 dark:text-slate-100 max-[375px]:text-base">{title}</h3>
            <p className="text-base font-noto font-normal text-slate-800 dark:text-slate-400 max-[375px]:text-sm">{description}</p>
        </ShineBorder>
    )
}

export default FeatureCards;