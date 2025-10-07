import { yarg } from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server-app";


(async () => {
    await main();
})();

async function main() {

    const { b:base, l:limit, s:showTable, d:destination, f:fileName } = await yarg();

    ServerApp.run({ base, limit, showTable, destination, fileName });

}




