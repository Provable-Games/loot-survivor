const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			'terminal-green': 'rgba(74, 246, 38, 1)',
  			'terminal-green-75': 'rgba(74, 246, 38, 0.75)',
  			'terminal-green-50': 'rgba(74, 246, 38, 0.5)',
  			'terminal-green-25': 'rgba(74, 246, 38, 0.25)',
  			'terminal-yellow': 'rgba(255, 176, 0, 1)',
  			'terminal-yellow-75': 'rgba(255, 176, 0, 0.75)',
  			'terminal-yellow-50': 'rgba(255, 176, 0, 0.5)',
  			'terminal-yellow-25': 'rgba(255, 176, 0, 0.25)',
  			'terminal-black': 'rgba(21, 21, 21, 1)',
			'terminal-gold': 'rgba(211, 175, 55, 1)',
			'terminal-silver': 'rgba(170, 169, 173, 1)',
			'terminal-bronze': 'rgba(169, 113, 66, 1)',
  		},
  		backgroundImage: {
  			conic: 'conic-gradient(var(--tw-gradient-stops))',
  			'conic-to-t': 'conic-gradient(at top, var(--tw-gradient-stops))',
  			'conic-to-b': 'conic-gradient(at bottom, var(--tw-gradient-stops))',
  			'conic-to-l': 'conic-gradient(at left, var(--tw-gradient-stops))',
  			'conic-to-r': 'conic-gradient(at right, var(--tw-gradient-stops))',
  			'conic-to-tl': 'conic-gradient(at top left, var(--tw-gradient-stops))',
  			'conic-to-tr': 'conic-gradient(at top right, var(--tw-gradient-stops))',
  			'conic-to-bl': 'conic-gradient(at bottom left, var(--tw-gradient-stops))',
  			'conic-to-br': 'conic-gradient(at bottom right, var(--tw-gradient-stops))',
  			radial: 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
  			'radial-at-t': 'radial-gradient(ellipse at top, var(--tw-gradient-stops))',
  			'radial-at-b': 'radial-gradient(ellipse at bottom, var(--tw-gradient-stops))',
  			'radial-at-l': 'radial-gradient(ellipse at left, var(--tw-gradient-stops))',
  			'radial-at-r': 'radial-gradient(ellipse at right, var(--tw-gradient-stops))',
  			'radial-at-tl': 'radial-gradient(ellipse at top left, var(--tw-gradient-stops))',
  			'radial-at-tr': 'radial-gradient(ellipse at top right, var(--tw-gradient-stops))',
  			'radial-at-bl': 'radial-gradient(ellipse at bottom left, var(--tw-gradient-stops))',
  			'radial-at-br': 'radial-gradient(ellipse at bottom right, var(--tw-gradient-stops))'
  		},
  		fontFamily: {
  			mono: [
  				'var(--font-vt323)',
                    ...fontFamily.mono
                ]
  		},
  		fontSize: {
  			xxs: '0.5rem'
  		},
  		inset: {
  			'1/8': '12.5%',
  			'3/8': '37.5%',
  			'1/16': '6.25%'
  		},
  		textShadow: {
  			none: 'none'
  		},
  		animation: {
  			pulseFast: 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  		},
  		boxShadow: {
  			md: '0px 0px 20px -2px rgb(51 255 51 / 1)',
  			lg: '0px 5px 20px -5px rgb(51 255 51 / 1)',
  			xl: '0px 10px 40px 10px rgb(51 255 51 / 0.5)'
  		},
  		height: {
  			'1/8': '12.5%',
  			'7/8': '87.5%'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		perspective: {
		'1000': '1000px',
		},
  	}
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        ".custom-range-input": {
          "&::-webkit-slider-thumb": {
            "-webkit-appearance": "none",
            appearance: "none",
            width: "20px",
            height: "20px",
            "background-color": "rgba(74, 246, 38, 1)",
            cursor: "pointer",
          },
          "&::-moz-range-thumb": {
            width: "20px",
            height: "20px",
            "background-color": "rgba(74, 246, 38, 1)",
            cursor: "pointer",
          },
          "&::-webkit-slider-runnable-track": {
            "background-color": "rgba(0, 0, 0, 1)",
            "border-radius": "0px",
          },
          ".no-scrollbar": {
            /* IE and Edge */
            "-ms-overflow-style": "none",

            /* Firefox */
            "scrollbar-width": "none",

            /* Safari and Chrome */
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
        },
      };
      addUtilities(newUtilities);
    },
      require("tailwindcss-animate")
],
};
