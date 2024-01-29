import {useRouter} from 'next/router'

export default function Jumbotron() {
    const router = useRouter()

    const goBackToHome = () => {
        router.push('/')
    }
    return (
        <section className='pt-20 bg-darkmain-800 dark:bg-gray-900 '>
            <div className='py-8 px-4 mx-auto max-w-screen-xl text-left lg:py-16 relative'>
                <button
                    onClick={goBackToHome}
                    type='button'
                    className='text-greenmain bg-darkmain-300 hover:bg-greenmain hover:text-dark font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-7  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition duration-300 delay-80'>
                    <i className='fa-solid fa-arrow-left-long me-3'></i>Back to Factory
                </button>
                <h1 className='text-left mb-4 text-4xl font-extrabold font-roboto tracking-tight leading-none text-greenmain md:text-5xl lg:text-6xl dark:text-white'>
                    Multisig Wallet Dashboard
                </h1>
                <p className='mb-8 text-left text-lg font-normal font-roboto text-white lg:text-xl sm:px-16 lg:px-0 dark:text-gray-200'>
                    Discover your multisignature wallet contract here.
                </p>
            </div>
        </section>
    )
}
