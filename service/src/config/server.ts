import {join} from "path"

const config = {
    development: {
        host: "localhost",
        picturePath: "/source/picture",
        prefix: "picture"
    },
    production: {
        host: "http://119.29.53.45",
        picturePath: "/github/picture",
        prefix: "picture"
    }
}

export default config[process.env.NODE_ENV] || config["development"];