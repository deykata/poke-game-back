// import {MigrationInterface, QueryRunner} from "typeorm";

// export class users1616716048799 implements MigrationInterface {
//     name = 'users1616716048799'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`CREATE TABLE "pokemon"."users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user" text NOT NULL, CONSTRAINT "PK_8668a3d7dfcfbde9ae12844adbd" PRIMARY KEY ("id"))`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`DROP TABLE "pokemon"."users"`);
//     }

// }
