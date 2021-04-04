import { Column, Entity, OneToMany } from "typeorm";
import { BaseCustomEntity } from "./base.entity";
import { BattlesEntity } from "./battles.entity";

@Entity('battle-types', { schema: 'pokemon' })
export abstract class BattleTypesEntity extends BaseCustomEntity {
    
    @Column('text', { name: 'name', nullable: false })
    name: string;

    @Column('integer', { name: 'pts_x_battle', nullable: false })
    ptsXBattle: number;

    @Column('boolean', { name: 'active', nullable: false })
    active: boolean;

    @Column('text', { name: 'type', nullable: true })
    type: string;
    
    @OneToMany(
        () => BattlesEntity,
        battles => battles.typeId
    )
    battles: BattlesEntity[];
}