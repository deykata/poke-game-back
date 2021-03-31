import { Column, Entity, OneToMany } from "typeorm";
import { BaseCustomEntity } from "./base.entity";
import { BattlesEntity } from "./battles.entity";

@Entity('users', { schema: 'pokemon' })
export abstract class UsersEntity extends BaseCustomEntity {
    @Column('text', { name: 'user', nullable: false })
    user: string;

    @Column('integer', { name: 'all_points', nullable: true })
    allPoints: number;

    @OneToMany(
        () => BattlesEntity,
        battles => battles.userId
    )
    battles: BattlesEntity[];
}