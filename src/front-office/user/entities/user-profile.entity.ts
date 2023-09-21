import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./user.entity";

@Entity()
export class UserProfiles{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string

    @Column()
    gender:string

    @Column({length:50})
    place_of_birth:string

    @Column({type:'timestamp'})
    date_of_birth:Date

    @Column({length:50})
    religion:string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at?: Date;

    //define your relations
    @OneToOne(() => Users, (user) => user.profile)
    @JoinColumn({name:'user_id'})
    user: Users

    @Column('uuid')
    user_id:string
}