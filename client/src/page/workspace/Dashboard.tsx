import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCreateProjectDialog from "@/hooks/use-create-project-dialog";
import WorkspaceAnalytics from "@/components/workspace/workspace-analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import RecentProjects from "@/components/workspace/project/recent-projects";
import RecentTasks from "@/components/workspace/task/recent-tasks";
import RecentMembers from "@/components/workspace/member/recent-members";
import { motion } from "framer-motion";

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

const WorkspaceDashboard = () => {
  const { onOpen } = useCreateProjectDialog();

  return (
    <motion.main
      className="flex flex-1 flex-col py-6 md:pt-4 px-4 md:px-8 bg-gray-50 font-sans" // Font family changed
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >

      {/* Header (moved to second) */}
      <motion.div
        className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Activity Summary
          </h1>
          <p className="text-gray-500 mt-1">
            Here&apos;s what&apos;s happening in your workspace
          </p>
        </div>
        <Button
          onClick={onOpen}
          className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white shadow-md"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
        variants={itemVariants}
      >
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="w-full justify-start border-b-2 border-gray-200 mb-4">
            <TabsTrigger
              className="py-2 px-4 text-gray-700 hover:text-gray-900 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black"
              value="projects"
            >
              Recent Projects
            </TabsTrigger>
            <TabsTrigger
              className="py-2 px-4 text-gray-700 hover:text-gray-900 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black"
              value="tasks"
            >
              Recent Tasks
            </TabsTrigger>
            <TabsTrigger
              className="py-2 px-4 text-gray-700 hover:text-gray-900 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black"
              value="members"
            >
              Recent Members
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <motion.div variants={itemVariants} className="space-y-4">
              <RecentProjects />
            </motion.div>
          </TabsContent>

          <TabsContent value="tasks">
            <motion.div variants={itemVariants} className="space-y-4">
              <RecentTasks />
            </motion.div>
          </TabsContent>

          <TabsContent value="members">
            <motion.div variants={itemVariants} className="space-y-4">
              <RecentMembers />
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
            {/* Analytics (moved to first) */}
      <motion.div className="mt-6" variants={itemVariants}>
        <WorkspaceAnalytics />
      </motion.div>

    </motion.main>
  );
};

export default WorkspaceDashboard;
