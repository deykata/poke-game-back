import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseCustomEntity } from "./base.entity";
import { BattleTypesEntity } from "./battle-types.entity";
import { UsersEntity } from "./users.entity";

@Entity('battles', { schema: 'pokemon' })
export abstract class BattlesEntity extends BaseCustomEntity {
    
    @ManyToOne(
        () => UsersEntity,
        users => users.battles
    )
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    userId: UsersEntity;

    @Column('integer', { name: 'points', nullable: false })
    points: number;

    @ManyToOne(
        () => BattleTypesEntity,
        users => users.id
    )
    @JoinColumn([{ name: 'type_id', referencedColumnName: 'id' }])
    typeId: BattleTypesEntity;
}