// import {MigrationInterface, QueryRunner} from "typeorm";

// export class battles1616785067860 implements MigrationInterface {
//     name = 'battles1616785067860'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`CREATE TABLE "pokemon"."battles" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "points" integer NOT NULL, "user_id" integer, "type_id" integer, CONSTRAINT "PK_a477f6b7e687b77ead2fbe19cd0" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`CREATE TABLE "pokemon"."battle-types" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" text NOT NULL, "pts_x_battle" integer NOT NULL, CONSTRAINT "PK_a51b2a00f1e89c9409e322d7021" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`ALTER TABLE "pokemon"."battles" ADD CONSTRAINT "FK_9e98661d14afa58f85882cf831f" FOREIGN KEY ("user_id") REFERENCES "pokemon"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "pokemon"."battles" ADD CONSTRAINT "FK_ee6319a8dbf6a3827de4c51dfa2" FOREIGN KEY ("type_id") REFERENCES "pokemon"."battle-types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "pokemon"."battles" DROP CONSTRAINT "FK_ee6319a8dbf6a3827de4c51dfa2"`);
//         await queryRunner.query(`ALTER TABLE "pokemon"."battles" DROP CONSTRAINT "FK_9e98661d14afa58f85882cf831f"`);
//         await queryRunner.query(`DROP TABLE "pokemon"."battle-types"`);
//         await queryRunner.query(`DROP TABLE "pokemon"."battles"`);
//     }

// }
