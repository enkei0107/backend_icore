import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserProfiles } from "./user-profile.entity";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({length:50})
    username:string;

    @Column()
    password:string;

    @Column({type:'timestamp'})
    login_at: Date;

    @Column()
    remember_token: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at?: Date;


    // define your relations
    @OneToOne(()=>UserProfiles)
    profile:UserProfiles
}
