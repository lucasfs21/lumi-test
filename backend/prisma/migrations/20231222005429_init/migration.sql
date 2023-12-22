-- CreateTable
CREATE TABLE "Fatura" (
    "id" SERIAL NOT NULL,
    "numeroCliente" TEXT NOT NULL,
    "referenciaMes" TEXT NOT NULL,
    "referenciaAno" INTEGER NOT NULL,
    "energiaQuantidade" DOUBLE PRECISION NOT NULL,
    "energiaValor" DOUBLE PRECISION NOT NULL,
    "energiaCompensadaQuantidade" DOUBLE PRECISION NOT NULL,
    "energiaCompensadaValor" DOUBLE PRECISION NOT NULL,
    "energiaSceeIcmsQuantidade" DOUBLE PRECISION NOT NULL,
    "energiaSceeIcmsValor" DOUBLE PRECISION NOT NULL,
    "contribIlumPublicaMunicipal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Fatura_pkey" PRIMARY KEY ("id")
);
