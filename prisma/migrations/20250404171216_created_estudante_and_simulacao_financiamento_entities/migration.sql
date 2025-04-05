-- CreateTable
CREATE TABLE "estudantes" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "sobrenome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "estudantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulacoes_financiamento" (
    "id" TEXT NOT NULL,
    "id_estudante" TEXT NOT NULL,
    "valor_total" DECIMAL(65,30) NOT NULL,
    "quantidade_parcelas" INTEGER NOT NULL,
    "juros_ao_mes" DECIMAL(65,30) NOT NULL,
    "valor_parcela_mensal" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "simulacoes_financiamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "estudantes_email_key" ON "estudantes"("email");

-- AddForeignKey
ALTER TABLE "simulacoes_financiamento" ADD CONSTRAINT "simulacoes_financiamento_id_estudante_fkey" FOREIGN KEY ("id_estudante") REFERENCES "estudantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
