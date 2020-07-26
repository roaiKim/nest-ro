import {Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn} from 'typeorm';

@Entity({ name: 'ro_user' })
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    password: string;

    @Column({ type: "datetime", name: "create_time", default: () => "CURRENT_TIMESTAMP"})
    createtime: Date;

    @UpdateDateColumn({ type: "datetime", name: "update_time"})
    updatetime: Date;

    @DeleteDateColumn({name: "delete_time"})
    softDeleteTime: Date;
}
