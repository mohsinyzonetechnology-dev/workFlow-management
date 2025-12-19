import CreateTaskDialog from "@/components/workspace/task/create-task-dialog";
import TaskTable from "@/components/workspace/task/task-table";

export default function Tasks() {
  return (
    <div className="w-full h-full flex flex-col gap-8 pt-6 px-4 md:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            <i>All Tasks</i>
          </h2>
          <p className="text-gray-500 mt-1">
            Here&apos;s the list of tasks for this workspace!
          </p>
        </div>

      
      </div>

      {/* Task Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <CreateTaskDialog />
        <div className="mb-3" ></div>
        <TaskTable />
      </div>
    </div>
  );
}
