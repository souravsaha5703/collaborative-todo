import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/NavigationBars/Navbar';
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import ShimmerButton from "@/components/ui/shimmer-button";
import { TextAnimate } from "@/components/ui/text-animate";
import FeatureCards from '@/components/FeatureCards/FeatureCards';
import { features } from '@/utils/featureCardsContent';

const Page: React.FC = () => {
    return (
        <>
            <Navbar />
            <div className="relative flex h-screen w-full items-center justify-center overflow-hidden rounded-lg border bg-background px-10 py-20 md:shadow-xl max-[375px]:px-5">
                <div className="max-w-4xl mx-auto text-center flex flex-col gap-6">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-7xl font-noto font-bold text-slate-900 dark:text-slate-100 z-10 max-sm:text-5xl max-[375px]:text-4xl"
                    >
                        Organize Your Life With SyncTasks
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-2xl font-noto font-medium text-slate-600 dark:text-slate-300 z-10 max-[375px]:text-lg"
                    >
                        The simple, powerful todo app that helps you get things done.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Button size="lg" className='w-48 h-12 rounded-xl text-xl font-noto font-normal text-center max-[375px]:w-40 max-[375px]:text-lg'>Get Started</Button>
                    </motion.div>
                </div>
                <AnimatedGridPattern
                    numSquares={30}
                    maxOpacity={0.1}
                    duration={3}
                    repeatDelay={1}
                    className={cn(
                        "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                        "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                    )}
                />
            </div>
            <div className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-background px-5 py-20 md:shadow-xl">
                <div className="flex flex-col gap-16">
                    <TextAnimate animation="slideUp" by="word" className='text-4xl font-noto font-semibold text-center'>
                        Why Choose SyncTasks ?
                    </TextAnimate>
                    <div className="w-full flex flex-wrap items-center justify-center gap-5 p-2">
                        {features.map((feature, index) => {
                            return (
                                <FeatureCards
                                    key={index}
                                    icon={<feature.icon className="w-12 h-12 text-slate-900 dark:text-slate-100 max-[375px]:size-10" />}
                                    title={feature.title}
                                    description={feature.description}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="relative flex h-[350px] w-full items-center justify-center overflow-hidden bg-background">
                <div className="w-full flex flex-col items-center justify-center gap-4">
                    <TextAnimate animation="slideUp" by="word" className='text-4xl font-noto font-semibold text-center text-slate-900 dark:text-slate-50 max-[375px]:text-3xl'>
                        Ready to boost your productivity?
                    </TextAnimate>
                    <TextAnimate animation="slideUp" by="word" className='text-xl font-noto font-normal text-center text-slate-700 dark:text-slate-300 max-[375px]:text-base'>
                        Join us write now to transform your daily routines with SyncTasks.
                    </TextAnimate>
                    <ShimmerButton className="shadow-2xl">
                        <span className="whitespace-pre-wrap font-noto text-center text-sm font-medium text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                            Start Your Routine
                        </span>
                    </ShimmerButton>
                </div>
            </div>
        </>
    )
}

export default Page;