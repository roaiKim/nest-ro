import {Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, CreateDateColumn} from 'typeorm';

@Entity({ name: 'ro_user' })
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    password: string;

    @CreateDateColumn({ type: "datetime", name: "create_time"})
    createtime: Date;

    @UpdateDateColumn({ type: "datetime", name: "update_time"})
    updatetime: Date;

    @DeleteDateColumn({type: "datetime", name: "delete_time"})
    softDeleteTime: Date;
}
