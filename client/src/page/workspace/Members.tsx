import { Separator } from "@/components/ui/separator";
import InviteMember from "@/components/workspace/member/invite-member";
import AllMembers from "@/components/workspace/member/all-members";
import WorkspaceHeader from "@/components/workspace/common/workspace-header";
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

export default function Members() {
  return (
    <motion.div
      className="w-full h-auto pt-2"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <WorkspaceHeader />
      <Separator className="my-4 " />
      
      <main>
        <motion.div
          className="w-full max-w-3xl mx-auto pt-3 flex flex-col gap-4"
          variants={itemVariants}
        >
        

          <Separator className="my-4" />

          {/* Invite Member */}
          <motion.div variants={itemVariants}>
            <AllMembers />
          </motion.div>

          <Separator className="my-4 !h-[0.5px]" />


  {/* Header */}
          <motion.div variants={itemVariants}>
            <h2 className="text-lg leading-[30px] font-semibold mb-1">
              Workspace members
            </h2>
            <p className="text-sm text-muted-foreground">
              Workspace members can view and join all Workspace project, tasks
              and create new task in the Workspace.
            </p>
          </motion.div>

          <hr />
          {/* All Members */}
          <motion.div variants={itemVariants}>
            <InviteMember />
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
}
