/*
  Warnings:

  - You are about to alter the column `valor_total` on the `simulacoes_financiamento` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `juros_ao_mes` on the `simulacoes_financiamento` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,4)`.
  - You are about to alter the column `valor_parcela_mensal` on the `simulacoes_financiamento` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "simulacoes_financiamento" ALTER COLUMN "valor_total" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "juros_ao_mes" SET DATA TYPE DECIMAL(5,4),
ALTER COLUMN "valor_parcela_mensal" DROP DEFAULT,
ALTER COLUMN "valor_parcela_mensal" SET DATA TYPE DECIMAL(10,2);
