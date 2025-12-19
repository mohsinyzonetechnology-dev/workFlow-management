import { FC, useState } from "react";
import { getColumns } from "./table/columns";
import { DataTable } from "./table/table";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { DataTableFacetedFilter } from "./table/table-faceted-filter";
import { priorities, statuses } from "./table/data";
import useTaskTableFilter from "@/hooks/use-task-table-filter";
import { useQuery } from "@tanstack/react-query";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { getAllTasksQueryFn } from "@/lib/api";
import { TaskType } from "@/types/api.type";
import useGetProjectsInWorkspaceQuery from "@/hooks/api/use-get-projects";
import useGetWorkspaceMembers from "@/hooks/api/use-get-workspace-members";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

type Filters = ReturnType<typeof useTaskTableFilter>[0];
type SetFilters = ReturnType<typeof useTaskTableFilter>[1];

interface DataTableFilterToolbarProps {
  isLoading?: boolean;
  projectId?: string;
  filters: Filters;
  setFilters: SetFilters;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { staggerChildren: 0.15, duration: 0.5 }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const TaskTable = () => {
  const param = useParams();
  const projectId = param.projectId as string;

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filters, setFilters] = useTaskTableFilter();
  const workspaceId = useWorkspaceId();
  const columns = getColumns(projectId);

  const { data, isLoading } = useQuery({
    queryKey: [
      "all-tasks",
      workspaceId,
      pageSize,
      pageNumber,
      filters,
      projectId,
    ],
    queryFn: () =>
      getAllTasksQueryFn({
        workspaceId,
        keyword: filters.keyword,
        priority: filters.priority,
        status: filters.status,
        projectId: projectId || filters.projectId,
        assignedTo: filters.assigneeId,
        pageNumber,
        pageSize,
      }),
    staleTime: 0,
  });

  const tasks: TaskType[] = data?.tasks || [];
  const totalCount = data?.pagination.totalCount || 0;

  const handlePageChange = (page: number) => setPageNumber(page);
  const handlePageSizeChange = (size: number) => setPageSize(size);

  return (
    <motion.div
      className="w-full flex flex-col gap-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Filters Toolbar */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
        variants={itemVariants}
      >
        <DataTableFilterToolbar
          isLoading={isLoading}
          projectId={projectId}
          filters={filters}
          setFilters={setFilters}
        />
      </motion.div>

      {/* Data Table */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        variants={itemVariants}
      >
        <DataTable
          isLoading={isLoading}
          data={tasks}
          columns={columns}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pagination={{
            totalCount,
            pageNumber,
            pageSize,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const DataTableFilterToolbar: FC<DataTableFilterToolbarProps> = ({
  isLoading,
  projectId,
  filters,
  setFilters,
}) => {
  const workspaceId = useWorkspaceId();

  const { data } = useGetProjectsInWorkspaceQuery({ workspaceId });
  const { data: memberData } = useGetWorkspaceMembers(workspaceId);

  const projects = data?.projects || [];
  const members = memberData?.members || [];

  const projectOptions = projects.map((project) => ({
    label: (
      <div className="flex items-center gap-1">
        <span>{project.emoji}</span>
        <span>{project.name}</span>
      </div>
    ),
    value: project._id,
  }));

  const assigneesOptions = members.map((member) => {
    const name = member.userId?.name || "Unknown";
    const initials = getAvatarFallbackText(name);
    const avatarColor = getAvatarColor(name);
    return {
      label: (
        <div className="flex items-center space-x-2">
          <Avatar className="h-7 w-7">
            <AvatarImage src={member.userId?.profilePicture || ""} alt={name} />
            <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </div>
      ),
      value: member.userId._id,
    };
  });

  const handleFilterChange = (key: keyof Filters, values: string[]) => {
    setFilters({ ...filters, [key]: values.length > 0 ? values.join(",") : null });
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row items-start lg:items-center gap-3 flex-wrap"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
    

      <motion.div variants={itemVariants}>
        <DataTableFacetedFilter
          title="Status"
          multiSelect
          options={statuses}
          disabled={isLoading}
          selectedValues={filters.status?.split(",") || []}
          onFilterChange={(values) => handleFilterChange("status", values)}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <DataTableFacetedFilter
          title="Priority"
          multiSelect
          options={priorities}
          disabled={isLoading}
          selectedValues={filters.priority?.split(",") || []}
          onFilterChange={(values) => handleFilterChange("priority", values)}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <DataTableFacetedFilter
          title="Assigned To"
          multiSelect
          options={assigneesOptions}
          disabled={isLoading}
          selectedValues={filters.assigneeId?.split(",") || []}
          onFilterChange={(values) => handleFilterChange("assigneeId", values)}
        />
      </motion.div>
      
      

      {!projectId && (
        <motion.div variants={itemVariants}>
          <DataTableFacetedFilter
            title="Projects"
            multiSelect={false}
            options={projectOptions}
            disabled={isLoading}
            selectedValues={filters.projectId?.split(",") || []}
            onFilterChange={(values) => handleFilterChange("projectId", values)}
          />
        </motion.div>
      )}
    {/* input  */}
     <motion.div variants={itemVariants}>
        <Input
          placeholder="Search tasks..."
          value={filters.keyword || ""}
          onChange={(e) => setFilters({ keyword: e.target.value })}
          className="h-10 w-full lg:w-64"
        />
      </motion.div>


      {Object.values(filters).some((value) => value !== null && value !== "") && (
        <motion.div variants={itemVariants}>
          <Button
            disabled={isLoading}
            variant="ghost"
            className="h-10 px-3 flex items-center gap-1 text-gray-600 hover:text-gray-900"
            onClick={() =>
              setFilters({ keyword: null, status: null, priority: null, projectId: null, assigneeId: null })
            }
          >
            Reset <X className="w-4 h-4" />
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskTable;
