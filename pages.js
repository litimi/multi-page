const fs = require('fs');

let pages = {};

const _configPages = async () => {
    await fs.readdirSync('./src/pages/').forEach((val) => {
        console.log(val, "val")
        pages[val] = {
            entry: `src/pages/${val}/index.js`,
            template: `src/pages/${val}/index.html`,
            // title: `${val}`,
            filename: `${val}.html`
        }
    })
}

_configPages('./src/pages/');

module.exports = { pages }
