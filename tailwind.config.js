/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navebg: '#040F28',
        customorange: '#fd5d14',
        customGray: '#10B981',
        customblack: '#040f28',
        customwhite: '#777777',
        customgray: '#f4f6f8',
        adnavcolour:'#fe9160',
        green:'#33ff33',
        back:'#cacfd2 ',
        white:'#ffffff',
      },
      backgroundImage: {
        registerbg: 'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        '19px': '19px',
        '16px': '16px',
        '25px': '25px',
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
      fontWeight: {
        'semi-bold': 600,
      },
      padding: {
        '6': '90px',
        
      },
      margin: {
        'n5': '-3rem',
      },
      width: {
        'building_2': '42px',
        'home': '54px',
        'paintplate': '48px',
        'tool': '48px',
        'brush': '48px',
        'compass': '48px',
        '56': '224px',
        '72': '279px',
        '64': '329px',
        '80': '266px',
        '96': '249.05px',
        '112': '312.66px',
        '144': '561.55px',
      },
      height: {
        'building_2': '48px',
        'home': '48px',
        'paintplate': '48px',
        'tool': '48px',
        'brush': '48px',
        'compass': '48px',
      },
      minHeight: {
        'custom-screen': '100vh', 
      },
    },
  },
  plugins: [],
}

