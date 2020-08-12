const path = require("path");
const fs = require("fs");
const yargs = require("yargs");

const env = yargs.argv.env || null;
const profile = yargs.argv.profile || false;

function resolve(relativePath) {
    return path.resolve(__dirname, `../${relativePath}`);
}

function confPath() {
    if (env !== null) {
        const envSpecificPath = resolve(`conf/${env}`);
        if (fs.existsSync(envSpecificPath)) return envSpecificPath;
    }

    return resolve("src/conf");
}

module.exports = {
    dist: resolve("../public/client"),
    src: resolve("src"),
    static: resolve("static"),
    conf: confPath(),
    tsConfig: resolve("tsconfig.json"),
    eslintConfig: resolve(".eslintrc.js"),
    stylelintConfig: resolve(".stylelintrc.json"),
    profile: profile,
};
