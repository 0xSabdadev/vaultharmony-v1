export default function TabLayout({children}) {
    return (
        <section className='bg-darkmain-800 dark:bg-gray-900 '>
            <div className='pt-0 pb-8 px-4 mx-auto max-w-screen-xl text-left lg:pb-16  relative'>
                <div className='md:flex'>{children}</div>
            </div>
        </section>
    )
}
