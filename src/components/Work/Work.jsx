import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import WorkInfo from "./WorkInfo";
import Delayed from "../Delayed";

const Work = () => {
    const [work, setWork] = useState("tcs");

    const [inViewFinal, setInViewFinal] = useState(false);
    const controls = useAnimation();
    const [ref, inView] = useInView();
    useEffect(() => {
        if (inView) {
            setInViewFinal(true);
            controls.start("visible");
        }
    }, [controls, inView]);

    const list = {
        visible: {
            opacity: 1,
            transition: {
                delay: 0.09,
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

    const itemX = {
        hidden: { x: -10, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
        },
    };

    const itemY = {
        hidden: { y: -10, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleClick = (e) => {
        setWork(e.target.dataset.work);

        if (window.innerWidth < 768) {
            let prevActive = document.getElementsByClassName("active-work")[1];
            prevActive?.classList.add("inactive-work");
            prevActive?.classList.remove("active-work");
            e.target.classList.add("active-work");
            e.target.classList.remove("inactive-work");
            if (e.target.dataset.work === "tcs")
                sleep(100).then(() => (document.getElementById("selected-indicator-md").style.marginLeft = "-480px"));
            if (e.target.dataset.work === "mpr")
                sleep(100).then(() => (document.getElementById("selected-indicator-md").style.marginLeft = "-320px"));
            else if (e.target.dataset.work === "nydeo")
                sleep(100).then(() => (document.getElementById("selected-indicator-md").style.marginLeft = "-160px"));
        } else {
            let prevActive = document.getElementsByClassName("active-work")[0];
            prevActive?.classList.add("inactive-work");
            prevActive?.classList.remove("active-work");
            e.target.classList.add("active-work");
            e.target.classList.remove("inactive-work");
            if (e.target.dataset.work === "tcs")
                sleep(100).then(() => (document.getElementById("selected-indicator").style.marginTop = "-126px"));
            if (e.target.dataset.work === "mpr")
                sleep(100).then(() => (document.getElementById("selected-indicator").style.marginTop = "-84px"));
            else if (e.target.dataset.work === "nydeo")
                sleep(100).then(() => (document.getElementById("selected-indicator").style.marginTop = "-42px"));
        }
    };

    return (
        <motion.div
            id="work"
            className="py-[100px] bg-gray-800 text-gray-200 w-full h-[500px] max-w-[1075px] mx-auto px-4 flex flex-col"
            initial="hidden"
            animate={controls}
            variants={list}
            ref={ref}
        >
            <motion.div className="name flex text-[0px] text-gray-100 text-7xl sm:text-8xl font-bold " variants={itemY}>
                {["M", "y", "\xa0", "w", "o", "r", "k"].map((letter) => {
                    return (
                        <h1 className="text-4xl mb-[40px] duration-300 inline-block align-top hover:text-red-500">
                            {letter}
                        </h1>
                    );
                })}
            </motion.div>

            <div className="hidden md:flex">
                <motion.ul
                    className="flex flex-col justify-left items-left w-[160px] text-[13px] font-code float-left"
                    variants={itemX}
                >
                    <li
                        id="tcs"
                        className="flex items-center text-left w-[160px] h-[42px] duration-300 border-l-[2px] border-gray-600 py-4 active-work"
                        data-work="tcs"
                        onClick={handleClick}
                    >
                        theCoderSchool
                    </li>
                    <li
                        id="mpr"
                        className="flex items-center text-left w-[160px] h-[42px] duration-300 border-l-[2px] border-gray-600 py-4 inactive-work"
                        data-work="mpr"
                        onClick={handleClick}
                    >
                        Muddy Paws Rescue
                    </li>
                    <li
                        id="nydeo"
                        className="flex items-center text-left w-[160px] h-[42px] duration-300 border-l-[2px] border-gray-600 py-4 inactive-work"
                        data-work="nydeo"
                        onClick={handleClick}
                    >
                        NYDEO
                    </li>
                    <div
                        id="selected-indicator"
                        className="mt-[-126px] w-[2px] h-[42px] border-l-[2px] border-red-500 duration-300"
                    ></div>
                </motion.ul>

                {inViewFinal ? (
                    <Delayed delay={500}>
                        <WorkInfo work={work} />
                    </Delayed>
                ) : null}
            </div>

            <div className="flex flex-col md:hidden">
                <motion.ul className="flex flex-row h-[42px] text-[13px] font-code mb-[5px]" variants={itemY}>
                    <li
                        id="tcs-md"
                        className="flex items-center justify-center w-[160px] duration-300 border-b-[2px] border-gray-600 py-4 active-work"
                        data-work="tcs"
                        onClick={handleClick}
                    >
                        theCoderSchool
                    </li>
                    <li
                        id="mpr-md"
                        className="flex items-center justify-center duration-300 border-b-[2px] border-gray-600 py-4 inactive-work"
                        data-work="mpr"
                        onClick={handleClick}
                    >
                        Muddy Paws Rescue
                    </li>
                    <li
                        id="nydeo-md"
                        className="flex items-center justify-center duration-300 border-b-[2px] border-gray-600 py-4 inactive-work"
                        data-work="nydeo"
                        onClick={handleClick}
                    >
                        NYDEO
                    </li>
                    <div
                        id="selected-indicator-md"
                        className="ml-[-480px] mt-[40px] h-[2px] border-b-[2px] border-red-500 duration-300"
                    ></div>
                </motion.ul>
                {inViewFinal ? (
                    <Delayed delay={500}>
                        <WorkInfo work={work} md={true} />
                    </Delayed>
                ) : null}
            </div>
        </motion.div>
    );
};

export default Work;