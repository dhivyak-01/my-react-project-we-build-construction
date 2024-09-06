const { Dropdown } = require('react-bootstrap');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navebg:'#040F28',
        customorange: '#fd5d14',
        Dropdownbg: '#d2d2d0',
        customGray: '#10B981',
        customblack: '#040f28',
        customwhite: '#777777',
        customgray: '#f4f6f8',
        registerbg:'background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        '19px': '19px',
        '16px': '16px',
        '40px': '40px',
        '56px': '56px',
        '64px': '64px',
        '72px': '72px',
        'custom-1': '32.24px',
        'custom-2': '33.725px',
        'custom-3': '33.075px',
        'custom-4': '44.336px',
        'custom-5': '56px',
      },
      spacing: {
        '12p': '12%', 
      },
    },
  },
  plugins: [],
}

