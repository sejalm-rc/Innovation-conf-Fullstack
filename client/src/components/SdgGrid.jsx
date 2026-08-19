import { sdgs } from "../data/sdgs";
import { motion } from "framer-motion";

export default function SdgGrid({ compact = false }) {
  return (
    <div className={`grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2 ${compact ? "max-w-xl" : ""}`}>
      {sdgs.map((goal, i) => (
        <motion.div
          key={goal.id}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.02 }}
          whileHover={{ y: -3 }}
          className="aspect-square rounded-md flex flex-col items-center justify-center text-white text-center p-1.5 cursor-default"
          style={{ backgroundColor: goal.color }}
          title={`SDG ${goal.id}: ${goal.title}`}
        >
          <span className="text-sm sm:text-base font-extrabold leading-none">{goal.id}</span>
          <span className="text-[6.5px] sm:text-[7px] font-semibold leading-tight mt-1 hidden sm:block">
            {goal.title}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
