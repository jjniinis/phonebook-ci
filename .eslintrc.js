module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true,
		"browser": true,
    },
    "extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
    "overrides": [
    ],
	"settings": {
		"react": {
		  "version": "detect"
		}
	},
    "parserOptions": {
		"ecmaFeatures": {
		  "jsx": true
		},
		"sourceType": "module",
        "ecmaVersion": "latest"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error", "always"
        ],
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "no-console": 0,
		"react/prop-types": 0
    }
}
