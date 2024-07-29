import { BackgroundBeams } from "@/components/ui/background-beams";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const listData = [
  "Straightforward signup with College Roll No",
  "Face Recognised Login",
  "Class Management",
  "Easy access to class after login",
  "Attendance Taking with Face-ID",
];
const listVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};
const itemVairant = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const ProjectOverview = () => {
  return (
    <div className="h-[40rem] w-full rounded-md bg-transparent dark:bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full mb-4"
        >
          <motion.h2
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto mb-8"
          >
            Project Overview
          </motion.h2>
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={listVariant}
            className="list-disc pl-5"
          >
            {listData.map((item, index) => (
              <motion.li
                key={index}
                variants={itemVairant}
                className="mb-2 text-xl"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

const GetStarted = () => {
  return (
    <div className="h-[30rem] w-full rounded-md bg-neutral-200 dark:bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Join now to get started
        </h1>
      </div>
      <Link to="/auth/register">
        <button className="mt-8 p-[3px] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Signup
          </div>
        </button>
      </Link>
    </div>
  );
};

const Admin = () => {
  return (
    <div className="h-[20rem] w-full flex flex-col gap-4 justify-center items-center">
      <Link to="/auth/admin">
        <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          Admin Login
        </button>
      </Link>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-neutral-200/60 dark:bg-neutral-800 p-4 text-center flex gap-4 justify-around items-center">
      <div>&copy; 2024 VC Project. All rights reserved.</div>
      <Link to="https://github.com/theonlysroy" target="_blank">
        <Github size={24} absoluteStrokeWidth />
      </Link>
    </footer>
  );
};
export default function Landing() {
  return (
    <div>
      <ProjectOverview />
      <GetStarted />
      <Admin />
      <Footer />
    </div>
  );
}
