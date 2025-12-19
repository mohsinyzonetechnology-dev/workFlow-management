import { Separator } from "@/components/ui/separator";
import WorkspaceHeader from "@/components/workspace/common/workspace-header";
import EditWorkspaceForm from "@/components/workspace/edit-workspace-form";
import DeleteWorkspaceCard from "@/components/workspace/settings/delete-workspace-card";
import { Permissions } from "@/constant";
import withPermission from "@/hoc/with-permission";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { staggerChildren: 0.2, duration: 0.5 } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Settings = () => {
  return (
    <motion.div
      className="w-full h-auto py-4 bg-gray-50 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <WorkspaceHeader />
      <Separator className="my-4" />

      <main>
        <div className="w-full max-w-3xl mx-auto py-3">
          <motion.h2
            className="text-2xl font-semibold mb-6 text-gray-900"
            variants={itemVariants}
          >
            Workspace Settings
          </motion.h2>

          <motion.div
            className="flex flex-col gap-4"
            variants={itemVariants}
          >
            {/* Edit Workspace Card */}
            <motion.div
              className="bg-white rounded-xl shadow-md p-6"
              variants={itemVariants}
            >
              <EditWorkspaceForm />
            </motion.div>

            {/* Delete Workspace Card */}
            <motion.div
              className="bg-white rounded-xl shadow-md p-6 border border-red-100"
              variants={itemVariants}
            >
              <DeleteWorkspaceCard />
            </motion.div>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

const SettingsWithPermission = withPermission(
  Settings,
  Permissions.MANAGE_WORKSPACE_SETTINGS
);

export default SettingsWithPermission;
