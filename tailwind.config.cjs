/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    theme: {
        colors: {
            'bg-color': {
                dark: '#272744',
            },
            'highlight-color': {
                dark: '#f2d3ab',
            },
            'text-color': {
                dark: '#fbf5ef',
            },
            'undertone-color': {
                dark: '#494d7e',
            },
        },
        fontFamily: {
            ubuntu: ['Ubuntu', 'sans-serif'],
        },
    },
    plugins: [],
};
