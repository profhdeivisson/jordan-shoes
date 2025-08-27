module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#7CA2F4',
        'brand-2': '#F3F7FF',
        'dark': {
          '10': '#121214',
          '20': '#F3F7FF',
          '30': '#FFFFFF',
        }
      },
      fontFamily: {
        'sans': ['Archivo', 'sans-serif'],
      },
    },
  },
}