import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateTaskForm from "./create-task-form";

const CreateTaskDialog = (props: { projectId?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  return (
    <div>
      <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <Button className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white shadow-md">
            <Plus className="w-4 h-4" />
            New Task
          </Button> 
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg w-full max-h-[90vh] my-6 p-6 bg-white rounded-xl shadow-lg overflow-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Create New Task
          </h2>
          <CreateTaskForm projectId={props.projectId} onClose={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTaskDialog;
