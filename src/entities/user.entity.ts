import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Books } from "./books.entity";

@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
        type: "varchar",
        length: 64
    })
    firstName: string

    @Column({
        nullable: false,
        type: "varchar",
        length: 64
    })
    lastName: string

    @Column({
        nullable: false,
        type: "bigint"
    })
    age: number

    @Column({
        type: "boolean",
        default: true
    })
    isFree: boolean

    @Column({ type: "date", default: () => "CURRENT_TIMESTAMP" })
    createdAt: string;

    @Column({
        default: null,
        type: "date"
    })
    updatedAt: string

    @ManyToMany(() => Books)
    @JoinTable()
    books: Books[]
}