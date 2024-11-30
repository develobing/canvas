// tokens of colors/effects/visual properties

export const colors = {
  teal: '#70dbd4',
  blue: '#5297ff',
  'teal-blue': 'linear-gradient(270deg, #70dbd4, #5297ff)',
  'red-pink': 'linear-gradient(270deg, #ff4a4a, #fc5cff)',
};

const theme = {
  colors: {
    dark: {
      ...colors,
      'gray-1': '#7a7a7a',
      'gray-2': '#fdf9f3',
      foreground: '#fdf9f3',
      background: '#242424',
    },

    light: {
      ...colors,
      'gray-1': '#e2e2e2',
      'gray-2': '#7a7a7a',
      foreground: '#000000',
      background: '#fdf9f3',
    },
  },
};

export default theme;
