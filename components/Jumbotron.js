import {useState} from 'react'

export default function Jumbotron({createNewWallet}) {
    const [loading, setLoading] = useState(false)

    const handleCreateNewWallet = async () => {
        try {
            setLoading(true)
            await createNewWallet()
        } catch (error) {
            console.error('Error in Jumbotron:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className='pt-20 bg-darkmain-800 dark:bg-gray-900 '>
            <div className='py-8 px-4 mx-auto max-w-screen-xl text-left lg:py-16 relative'>
                <a
                    href='#'
                    className='w-full inline-flex font-roboto justify-between items-center py-2 px-2 pe-4 mb-7 text-sm text-white bgGradient rounded-lg dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800'>
                    <span className='text-6md bg-greendark rounded-lg text-white px-4 py-1.5 me-3'>
                        New
                    </span>{' '}
                    <span className='text-6md font-medium font-roboto'>
                        Create your own multisignature with the recently launched VaultHarmony
                        dapps!
                    </span>
                    <svg
                        className='w-2.5 h-2.5 ms-2 rtl:rotate-180'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 6 10'>
                        <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='m1 9 4-4-4-4'
                        />
                    </svg>
                </a>
                <h1 className='text-left mb-4 text-4xl font-extrabold font-roboto tracking-tight leading-none text-greenmain md:text-5xl lg:text-6xl dark:text-white'>
                    Multisig Factory Explorer
                </h1>
                <p className='mb-8 text-left text-lg font-normal font-roboto text-white lg:text-xl sm:px-16 lg:px-0 dark:text-gray-200'>
                    Discover your multisignature wallet contract here.
                </p>
                <button
                    onClick={handleCreateNewWallet}
                    disabled={loading}
                    type='button'
                    className='text-dark bg-white hover:bg-dark font-roboto hover:text-greenmain  font-medium rounded-lg text-lg px-10 py-3 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2 transition duration-300 delay-80'>
                    {loading ? (
                        <div className='flex items-center'>
                            <svg
                                aria-hidden='true'
                                role='status'
                                className='w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600'
                                viewBox='0 0 100 101'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                    fill='currentColor'
                                />
                                <path
                                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                    fill='#1C64F2'
                                />
                            </svg>
                            Processing...
                        </div>
                    ) : (
                        <div className='flex items-center'>
                            <svg
                                className='w-4 h-4 me-2 -ms-1 text-[#626890]'
                                aria-hidden='true'
                                focusable='false'
                                data-prefix='fab'
                                data-icon='ethereum'
                                role='img'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 320 512'>
                                <path
                                    fill='currentColor'
                                    d='M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z'></path>
                            </svg>
                            Create New Wallet
                        </div>
                    )}
                </button>
            </div>
        </section>
    )
}
