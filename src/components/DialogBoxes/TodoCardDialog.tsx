import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from '../ui/button';

interface DialogProps {
    isDialogOpen: boolean,
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    task: string,
    color: string
}

const TodoCardDialog: React.FC<DialogProps> = ({ isDialogOpen, setIsDialogOpen, task, color }) => {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className={`${color}`}>
            <h3 className="text-2xl font-noto text-start font-medium mb-2 text-gray-950">{task}</h3>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default TodoCardDialog;