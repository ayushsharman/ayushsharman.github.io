/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'montserrat': ['Montserrat'],
                'lato': ['Lato'],
                'garamond': ['Garamond']
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            }
        },
    },
    variants: {
        extend: {
            translate: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
            opacity: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
        },
    },
    plugins: [],
}