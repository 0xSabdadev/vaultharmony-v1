/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // './node_modules/flowbite-react/lib/**/*.js',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './public/**/*.html',
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        fontFamily: {
            roboto: ['Roboto Mono', 'monospace'],
        },
        extend: {
            colors: {
                greenmain: '#16FF80',
                greendark: '#1b5c60',
                greenwood: '#16ff7f99',
                dark: '#121312',
                darkmain: {
                    300: '#1B1F1E;',
                    500: '#1B1F1E;',
                    800: '#121615;',
                },
            },
        },
    },
    plugins: [require('flowbite/plugin')],
}
