import "dotenv/config";
import { syncBase44Content } from "../src/lib/base44-sync";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is required to sync Base44 content.");
    process.exit(1);
  }

  const result = await syncBase44Content();

  console.log("Base44 sync completed:");
  console.log(
    `  Cupons: ${result.coupons.created} created, ${result.coupons.updated} updated (${result.coupons.total} from Base44)`,
  );
  console.log(
    `  Estudos: ${result.studies.created} created, ${result.studies.updated} updated (${result.studies.total} from Base44)`,
  );
  console.log(
    `  Ruach (via estudos com video_url): ${result.ruachVideos.created} created, ${result.ruachVideos.updated} updated`,
  );

  if (result.skippedRuachFromStudies > 0) {
    console.log(
      `  Nota: ${result.skippedRuachFromStudies} estudo(s) sem video_url — Ruach no Base44 é conteúdo estático, não entidade.`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
