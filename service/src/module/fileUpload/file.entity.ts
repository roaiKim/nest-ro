import {Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, CreateDateColumn} from 'typeorm';

@Entity({ name: 'ro_img_file' })
export class FileEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar', name: "relative_path", unique: true})
    relativePath: string;

    @Column({type: 'varchar', name: "absolute_path", unique: true})
    absolutePath: string;

    @CreateDateColumn({ type: "datetime", name: "create_time", select: false})
    createtime: Date;

    @UpdateDateColumn({ type: "datetime", name: "update_time", select: false})
    updatetime: Date;

    @DeleteDateColumn({type: "datetime", name: "delete_time", select: false})
    softDeleteTime: Date;
}
