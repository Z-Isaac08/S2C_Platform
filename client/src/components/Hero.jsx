import React from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion';

const slideUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
};

const Hero = ({ title, subtitle }) => {
    return (
        <motion.section
            className='bg-normal-purple flex flex-col justify-center items-center text-center text-white py-6 px-6 sm:px-12 space-y-4'
            variants={slideUp}
            initial="initial"
            whileInView="whileInView"
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
            <h2 className='font-bold font-montserrat text-3xl sm:text-4xl'>{title}</h2>
            <h4 className='font-medium font-josefin text-xl sm:text-2xl'>{subtitle}</h4>
        </motion.section>
    )
}

export default Hero;
