export default function Content({id, ariaLabelledby, title, children}) {
    return (
        <div
            className='hidden p-10 rounded-lg border-b bg-darkmain-300 dark:bg-gray-800 font-roboto '
            id={id}
            role='tabpanel'
            aria-labelledby={ariaLabelledby}>
            <h1 className='text-left mb-8  text-3xl font-medium font-roboto tracking-tight leading-none text-white dark:text-white'>
                {title} Menu
            </h1>
            {children}
        </div>
    )
}
