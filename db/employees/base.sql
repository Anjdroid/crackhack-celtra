CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "employees" (
  "id" uuid DEFAULT uuid_generate_v4(),
  "firstName" VARCHAR(100) NOT NULL,
  "lastName" VARCHAR(100) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "avatarUrl" VARCHAR(255) NOT NULL,
  "department" VARCHAR(255) DEFAULT NULL,
  "jobTitle" VARCHAR(255) NOT NULL,
  "managerId" uuid REFERENCES employees (id),
  PRIMARY KEY (id),
  UNIQUE ("email")
);
