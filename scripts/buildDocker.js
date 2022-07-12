/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { readFile, spawner, logInfo, logError } = require("./utils");

const buildDocker = async () => {
    let filePath = path.resolve(process.cwd(), `./package.json`);
    const packageJson = await readFile(filePath);
    const json = JSON.parse(packageJson);
    const imageName = "vegarringdal/dexpi";
    logInfo(`About to build: ${imageName}:${json.version}`, "green");

    const err = await spawner(
        "docker.exe",
        ["build", ".", "-t", `${imageName}:${json.version}`],
        process.cwd(),
        true
    );

    if (err) {
        logError(`\nNode app failed: ${err}\n`, "green");
    } else {
        logInfo(`Build done : ${imageName}:${json.version}`, "green");
    }
};
buildDocker();
