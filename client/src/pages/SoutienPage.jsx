import React from 'react'
import Hero from '../components/Hero'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'

const SoutienPage = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const isPonctuel = location.pathname.includes('ponctuel')
    const isRecurrent = location.pathname.includes('recurrent')
    const showDescriptif = !isPonctuel && !isRecurrent

    const goToSoutienP = () => navigate('/soutien/ponctuel')
    const goToSoutienR = () => navigate('/soutien/recurrent')
    const goToSign = () => navigate('/s') 

    return (
        <section className='bg-white text-[#222] font-montserrat mt-[72px]'>
            <Hero title={"Soutenir le S2C #3"} subtitle={"Cet événement est gratuit parce que tu donnes. Merciiiiiiii !"} />
            
            <div className='flex mt-6 flex-col px-6 sm:flex-row justify-center items-center gap-4'>
                <button
                    onClick={goToSoutienP}
                    className={`border px-6 py-3 rounded w-full sm:w-auto transition
                        ${isPonctuel
                            ? 'bg-normal-purple text-white border-normal-purple'
                            : 'border-normal-purple text-normal-purple hover:bg-normal-purple hover:text-white'
                        }`}
                >
                    Je donne
                </button>
                <button
                    onClick={goToSoutienR}
                    className={`border px-6 py-3 rounded w-full sm:w-auto transition
                        ${isRecurrent
                            ? 'bg-normal-yellow text-[#222] border-normal-yellow'
                            : 'border-normal-yellow text-normal-yellow hover:bg-normal-yellow hover:text-[#222]'
                        }`}
                >
                    Je m'engage
                </button>
            </div>

            <AnimatePresence>
                {showDescriptif && (
                    <motion.div
                        key="descriptif"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="my-10 px-6 text-center max-w-4xl mx-auto"
                    >
                        <h2 className="text-xl font-semibold mb-4">Comment veux-tu soutenir ?</h2>
                        <p className="mb-4"><span className='font-bold text-lg text-normal-purple'>Je donne</span> : un don unique, pour encourager ponctuellement le projet.</p>
                        <p><span className='font-bold text-lg text-normal-yellow'>Je m'engage</span> : un engagement sur une période définie pour soutenir le projet dans la durée.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {(isPonctuel || isRecurrent) && (
                <motion.div
                    key="outlet"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 px-6"
                >
                    <Outlet />
                </motion.div>
            )}
        </section>
    )
}

export default SoutienPage
