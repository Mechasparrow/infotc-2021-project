const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
    prefix: '',
    mode: 'jit',
    purge: {
      content: [
        './src/**/*.{html,ts,css,scss,sass,less,styl}',
      ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        fontFamily: {
          'sans': ['OpenSans', 'Helvetica', 'Arial', 'sans-serif']
        },
        colors: {
          mizzou: {  
            'gold': '#F1B82D',
            'warmgray':'#8F8884',
            'lightwarmgray':'#DBD5CD',
            'lightgray':'#D7D7D7',
            'lightblue':'#E4F1FA',
            'blue':'#1C5E90',
            'green': '#69901D',
            'red': '#900000',
            'gray': '#7D7D7D',
            'black': '#000000',
            'orange': "#BD5C2C"
          }
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms'),require('@tailwindcss/line-clamp'),require('@tailwindcss/typography')],
};
