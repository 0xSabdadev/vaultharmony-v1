export default function Footer() {
    return (
        <footer className='bg-darkmain-800  dark:bg-gray-900 '>
            <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
                <div className='sm:flex sm:items-center sm:justify-between'>
                    <a
                        href='#'
                        className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'>
                        <img
                            src='https://res.cloudinary.com/kabupaten-sukoharjo/image/upload/v1705749248/logox_gevszy.png'
                            className='h-8'
                            alt=' Logo'
                        />
                    </a>
                    <ul className='flex flex-wrap items-center font-roboto mb-6 text-sm font-medium text-white sm:mb-0 dark:text-gray-400'>
                        <li>
                            <a href='#' className='hover:underline me-4 md:me-6'>
                                About
                            </a>
                        </li>
                        <li>
                            <a href='#' className='hover:underline me-4 md:me-6'>
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href='#' className='hover:underline me-4 md:me-6'>
                                Licensing
                            </a>
                        </li>
                        <li>
                            <a href='#' className='hover:underline'>
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
                <hr className='my-6 sm:mx-auto border-greenmain dark:border-gray-700 lg:my-8' />
                <span className='block text-sm text-greenmain sm:text-center dark:text-gray-400'>
                    © 2024{' '}
                    <a href='#' className='hover:underline'>
                        VaultHarmony
                    </a>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    )
}
