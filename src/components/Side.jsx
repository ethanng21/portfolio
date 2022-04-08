import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiInstagram, FiCodepen } from "react-icons/fi";

const Side = () => {
    const list = {
        visible: {
            opacity: 1,
            transition: {
                delay: 0.6,
                when: "beforeChildren",
                staggerChildren: 0.05,
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                when: "afterChildren",
            },
        },
    };

    const item = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
        },
    };

    const itemY = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <motion.div initial="hidden" animate="visible" variants={list}>
            <ul className="hidden icon:flex flex-col fixed top-[58%] right-[2%] justify-center">
                <motion.li className="group mb-[25px] pb-[5px]" variants={itemY}>
                    <a href="https://github.com/intuitiveen" target="_blank" rel="noreferrer">
                        <FiGithub
                            className="text-gray-200 duration-300 group-hover:text-red-500 group-hover:translate-y-[-5px]"
                            size={25}
                        />
                    </a>
                </motion.li>
                <motion.li className="group mb-[25px] pb-[5px]" variants={itemY}>
                    <a href="https://www.linkedin.com/in/ethan-ng-007312235/" target="_blank" rel="noreferrer">
                        <FiLinkedin
                            className="text-gray-200 duration-300 group-hover:text-red-500 group-hover:translate-y-[-5px]"
                            size={25}
                        />
                    </a>
                </motion.li>
                <motion.li className="group mb-[25px] pb-[5px]" variants={itemY}>
                    <a href="https://www.instagram.com/ethan.ng6/" target="_blank" rel="noreferrer">
                        <FiInstagram
                            className="text-gray-200 duration-300 group-hover:text-red-500 group-hover:translate-y-[-5px]"
                            size={25}
                        />
                    </a>
                </motion.li>
                <motion.li className="group mb-[25px] pb-[5px]" variants={itemY}>
                    <a href="https://codepen.io/intuitiveen/" target="_blank" rel="noreferrer">
                        <FiCodepen
                            className="text-gray-200 duration-300 group-hover:text-red-500 group-hover:translate-y-[-5px]"
                            size={25}
                        />
                    </a>
                </motion.li>

                <motion.div className="after:vertical-line after:w-[1px] after:left-[47%]" variants={item}></motion.div>
            </ul>
        </motion.div>
    );
};

export default Side;
