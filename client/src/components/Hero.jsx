import React from 'react'

const Hero = ({ title, subtitle }) => {
    return (
        <section
            className='bg-normal-purple flex flex-col justify-center items-center text-center text-white py-6 px-6 sm:px-12 space-y-4'
        >
            <h2 className='font-bold font-montserrat text-normal-yellow text-3xl sm:text-4xl'>{title}</h2>
            <h4 className='font-medium font-josefin text-xl sm:text-2xl'>{subtitle}</h4>
        </section>
    )
}

export default Hero;
