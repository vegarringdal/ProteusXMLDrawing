// eslint-disable-next-line @typescript-eslint/no-var-requires
const { TypeChecker } = require("esbuild-helpers");

const frontend = TypeChecker({
    basePath: "./",
    name: "typechecker",
    tsConfig: "./tsconfig.json",
    throwOnSemantic: true,
    throwOnSyntactic: true
});

frontend.printSettings();
frontend.inspectAndPrint();
