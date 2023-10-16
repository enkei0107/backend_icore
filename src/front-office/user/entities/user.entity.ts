import { UserAddress } from "src/front-office/user-address/entities/user-address.entity";
import { UserContacts } from "src/front-office/user-contact/entities/user-contact.entity";
import { UserProfiles } from "src/front-office/user-profile/entities/user-profile.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50, unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ type: 'timestamp' })
    login_at: Date;

    @Column({ nullable: true })
    remember_token?: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at?: Date;


    // define your relations
    @OneToOne(() => UserProfiles, (profile) => profile.user, { onUpdate: 'RESTRICT', onDelete: 'CASCADE' })
    profile?: UserProfiles

    @OneToOne(() => UserAddress, (address) => address.user, { onUpdate: 'RESTRICT', onDelete: 'CASCADE' })
    address?: UserAddress

    @OneToMany(type => UserContacts, (contact) => contact.user, { onUpdate: 'RESTRICT', onDelete: 'CASCADE' })
    contacts: UserContacts[]
}
