/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    //overrideing theme is overriding everyhting in tailwind as if i insert colors here there will be these colors only
    //so if we want to add addional things to tailwind so we can add it into extend and also override it
    fontFamily: {
      sans: ['Roboto mono', 'monospace'],
    },
    extend: {
      colors: {
        // this is to add color to the tailwind color palette
        //use it as bg-primary or text-primary

        primary: '#F0F0F0',
      },
      height: {
        //dynamic view port to solve problems in mobiles
        screen: '100dvh',
      },
      // fontSize: {
      //   //override huge or any value
      //   huge: ['15rem',{lineHeight: '2'}],
      // }
    },
  },
  plugins: [],
};
