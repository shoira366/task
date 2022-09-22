import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./user.entity";

@Entity()
export class Books {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
        type: "varchar",
        length: 120
    })
    title: string

    @Column({
        nullable: false,
        type: "varchar",
        length: 120
    })
    author: string

    @Column({ type: "date", default: () => "CURRENT_TIMESTAMP" })
    createdAt: string;

    @ManyToMany(() => Users, {
        cascade: true
    })
    @JoinTable()
    users: Users[]
}