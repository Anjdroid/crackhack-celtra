CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "kudos" (
  "id" uuid DEFAULT uuid_generate_v4(),
  "beneficiary" VARCHAR(100) NOT NULL,
  "endorser" VARCHAR(100) NOT NULL,
  "message" TEXT NOT NULL,
  PRIMARY KEY (id)
);
