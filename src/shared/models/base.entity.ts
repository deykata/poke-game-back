import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseCustomEntity {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @CreateDateColumn({ type: "timestamp with time zone" })
    created_at: Date;
}