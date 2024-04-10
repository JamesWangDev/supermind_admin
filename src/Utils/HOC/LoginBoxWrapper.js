import React from "react";
import { motion } from "framer-motion";

const LoginBoxWrapper = (props) => {
  return (
    <motion.div className="log-in-box" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 1 }}>
      {props.children}
    </motion.div>
  );
};

export default LoginBoxWrapper;
