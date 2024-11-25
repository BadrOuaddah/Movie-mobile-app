module.exports = {
	settings: {
		react: {
			version: "detect",
		},
	},
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended"],
	parser: "@babel/eslint-parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		requireConfigFile: false,
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ["react"],
	rules: {
		indent: ["error", "tab", { SwitchCase: 1 }],
		"linebreak-style": "off",
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"react/react-in-jsx-scope": "off",
		"no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
	},
};
