import React, { useState, useEffect } from "react";
import { Spin as Hamburger } from "hamburger-react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav);

    const [top, setTop] = useState(true);

    let prevPos = window.pageYOffset;

    const onScroll = () => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return setTop(true);
        const currPos = window.pageYOffset;
        if (currPos === 0) setTop(true);
        else setTop(false);
        if (prevPos > currPos) document.getElementById("navbar").style.top = "0";
        else document.getElementById("navbar").style.top = "-80px";
        prevPos = currPos;
    };

    useEffect(() => {
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    });

    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.3 });
    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const list = {
        visible: {
            opacity: 1,
            transition: {
                delay: 0.1,
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
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
    };

    const handleViewSection = (e) => {
        document.getElementById(e.target.dataset.section).scrollIntoView();
    };

    return (
        <motion.div
            id="navbar"
            className={
                top
                    ? "duration-300 fixed w-full h-[50px] flex justify-between items-center px-[50px] py-[40px] bg-gray-800 text-gray-100"
                    : "duration-300 fixed w-full h-[50px] flex justify-between items-center px-[50px] py-[40px] bg-gray-800 text-gray-100"
            }
            initial="hidden"
            animate={controls}
            variants={list}
            ref={ref}
        >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} variants={item}>
                <h1 className="text-5xl text-red-500 font-bold">EN</h1>
            </motion.div>

            <ul className="hidden md:flex font-code text-lg items-center">
                <motion.li variants={item}>
                    <h1
                        className="duration-300 hover-animation-dark hover:text-red-400"
                        data-section="home"
                        onClick={handleViewSection}
                    >
                        Home
                    </h1>
                </motion.li>
                <motion.li variants={item}>
                    <h1
                        className="duration-300 hover-animation-dark hover:text-red-400"
                        data-section="about"
                        onClick={handleViewSection}
                    >
                        About
                    </h1>
                </motion.li>
                <motion.li variants={item}>
                    <h1
                        className="duration-300 hover-animation-dark hover:text-red-400"
                        data-section="skills"
                        onClick={handleViewSection}
                    >
                        Skills
                    </h1>
                </motion.li>
                <motion.li variants={item}>
                    <h1
                        className="duration-300 hover-animation-dark hover:text-red-400"
                        data-section="work"
                        onClick={handleViewSection}
                    >
                        Work
                    </h1>
                </motion.li>
                <motion.li variants={item}>
                    <button
                        className="text-red-400 border-red-400 font-code text-lg border-2 rounded-lg px-4 py-1 my-1 flex items-center duration-300 hover:bg-red-300/[.3]"
                        data-section="contact"
                        onClick={handleViewSection}
                    >
                        Contact
                    </button>
                </motion.li>
            </ul>

            <div className="md:hidden z-10" onClick={handleClick}>
                <Hamburger toggled={nav} toggle={setNav} size={25} />
            </div>

            <motion.ul
                className={
                    !nav
                        ? "hidden"
                        : "fixed top-0 left-0 w-full h-full overflow-y-hidden bg-gray-800 flex flex-col justify-center items-center font-code text-lg"
                }
                variants={variants}
            >
                <li>
                    <p className="py-6 text-4xl duration-300 hover-animation-dark hover:text-red-400">About</p>
                </li>
                <li>
                    <p className="py-6 text-4xl duration-300 hover-animation-dark hover:text-red-400">Skills</p>
                </li>
                <li>
                    <p className="py-6 text-4xl duration-300 hover-animation-dark hover:text-red-400">Work</p>
                </li>
                <li>
                    <p className="py-6 text-4xl duration-300 hover-animation-dark hover:text-red-400">Contact</p>
                </li>
            </motion.ul>
        </motion.div>
    );
};

export default Navbar;
