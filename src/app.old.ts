import fs from "fs";
import { yarg } from "./config/plugins/args.plugin";

(async () => {
  await main();
})();

async function main() {
  const args = yarg;
  const base = args.base as number;
  const limit = args.limit as number;
  const show = args.show as boolean;

  let outputMessage = "";
  const headerMessage = `
=========================
      Tabla del ${base}
=========================\n
`;

  outputMessage += headerMessage;
  for (let i = 1; i <= limit; i++) {
    outputMessage += `${base} x ${i} = ${base * i}\n`;
  }

  if (show) {
    console.log(outputMessage);
  }

  const outputPath = `outputs`;

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }

  fs.writeFileSync(`./${outputPath}/table-del-${base}.txt`, outputMessage);

  console.log('Tabla generada exitosamente!');
}
