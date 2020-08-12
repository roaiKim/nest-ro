module.exports = {
    parser: "@typescript-eslint/parser",
    extends: ['airbnb-typescript', "airbnb/hooks", "plugin:@typescript-eslint/recommended"],
    plugins: ["@typescript-eslint"],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        },
        project: './tsconfig.json',
    },
    rules: {
        "import/no-cycle": "off",
        "no-console": ["error", { "allow": ["warn", "error"] }],
        "import/prefer-default-export": "off",
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/ban-types": "off",
        "max-len": ["error", {"code": 160}],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "class-methods-use-this": "off",
        "react/destructuring-assignment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "no-shadow": "off",
        "react/jsx-fragments": [2, "element"],
        "object-curly-newline": ["error", {
            "ImportDeclaration": "never",
            "ExportDeclaration": { "multiline": true, "minProperties": 3 }
        }],
        "max-classes-per-file": "off"
    }
};