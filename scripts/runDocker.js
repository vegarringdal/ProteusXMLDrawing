/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { readFile, spawner, logInfo, logError } = require("./utils");

const buildDocker = async () => {
    let filePath = path.resolve(process.cwd(), `./package.json`);
    const packageJson = await readFile(filePath);
    const json = JSON.parse(packageJson);
    const imageName = "vegarringdal/dexpi";
    logInfo(`About to run: ${imageName}:${json.version}`, "green");

    const err = await spawner(
        "docker.exe",
        ["run", "--env-file", ".env", "-p", "80:80", "-d", `${imageName}:${json.version}`],
        process.cwd(),
        true
    );

    if (err) {
        logError(`\nNode app failed: ${err}\n`, "green");
    } else {
        logInfo(`Run done : ${imageName}:${json.version}`, "green");
    }
};
buildDocker();
