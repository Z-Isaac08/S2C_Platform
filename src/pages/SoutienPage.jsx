import React from 'react'
import Hero from '../components/Hero'
import { Outlet, useLocation, useNavigate } from 'react-router'

const SoutienPage = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const isPonctuel = location.pathname.includes('ponctuel')
    const isRecurrent = location.pathname.includes('recurrent')

    const goToSoutienP = () => {
        navigate('/soutien/ponctuel');
    }

    const goToSoutienR = () => {
        navigate('/soutien/recurrent');
    }

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
                    Je donnne
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
            <Outlet />
        </section>
    )
}

export default SoutienPage