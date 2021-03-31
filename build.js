const { exec } = require('child_process');
const ncp = require('ncp').ncp;

ncp.limit = 16;

exec('nest build', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error building NEST app: ${error.message}`);
        process.exit(1);
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        process.exit(1);
    }
    console.error(`Nest build was fine!: ${stdout}`);
    copyNodeModules();
})

copyNodeModules = () => {
    copyFiles('./package.json', 'dist/package.json')
    console.log('Copying node_modules');
    copyFiles('node_modules', 'dist/node_modules')
        .then(() => {
            console.log('dist folder ready');
        })
        .catch(err => console.error(err));
}

copyFiles = () => {
    return new Promise((resolve, reject) => {
        ncp(source, destination, (err) => {
            if (err) {
                return reject(err);
            }
            console.log(`${source} copy success!`);
            resolve(`${source} copy success!`);
        })
    })
}