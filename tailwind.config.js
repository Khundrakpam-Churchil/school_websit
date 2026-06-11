export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        schoolBlue: '#3b82f6',
        schoolOrange: '#fb923c',
        schoolLight: '#f8fafc',
        schoolGreen: '#10b981',
        schoolGray: '#64748b',
      },
      boxShadow: {
        soft: '0 30px 80px rgba(15, 23, 42, 0.08)',
      },
      backgroundImage: {
        'hero-pattern': 'radial-gradient(circle at top, rgba(59,130,246,0.08), transparent 30%)',
      },
    },
  },
  plugins: [],
};
