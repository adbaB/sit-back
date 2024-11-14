import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationsUsersPermissions1731595915927 implements MigrationInterface {
  name = 'AddRelationsUsersPermissions1731595915927';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "rel_users_permissions" ("userId" integer NOT NULL, "permissionsId" integer NOT NULL, CONSTRAINT "PK_ced00a7a7efb5beab2c41a2e0fe" PRIMARY KEY ("userId", "permissionsId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_b2a2635374f605cba0a78694ca" ON "rel_users_permissions" ("userId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_8410ab71feb7933b2d3dc89c53" ON "rel_users_permissions" ("permissionsId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "rel_users_permissions" ADD CONSTRAINT "FK_b2a2635374f605cba0a78694ca5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT',
    );
    await queryRunner.query(
      'ALTER TABLE "rel_users_permissions" ADD CONSTRAINT "FK_8410ab71feb7933b2d3dc89c53a" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "rel_users_permissions" DROP CONSTRAINT "FK_8410ab71feb7933b2d3dc89c53a"',
    );
    await queryRunner.query(
      'ALTER TABLE "rel_users_permissions" DROP CONSTRAINT "FK_b2a2635374f605cba0a78694ca5"',
    );
    await queryRunner.query('DROP INDEX "public"."IDX_8410ab71feb7933b2d3dc89c53"');
    await queryRunner.query('DROP INDEX "public"."IDX_b2a2635374f605cba0a78694ca"');
    await queryRunner.query('DROP TABLE "rel_users_permissions"');
  }
}
