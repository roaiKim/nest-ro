import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({ name: 'ro_user' })
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    password: string;

    @Column({ type: "datetime", name: "create_time",  default: () => "CURRENT_TIMESTAMP"})
    createtime: Date;
}