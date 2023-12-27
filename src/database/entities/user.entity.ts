
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserAddress } from './user-address.entity';
import { UserProfiles } from './user-profile.entity';
import { UserContacts } from './user-contact.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  username: string;

  @Column()
  password: string;

  @Column({length:50})
  account_type:string

  @Column({ type: 'timestamp' })
  login_at: Date;

  @Column({ nullable: true })
  remember_token?: string;

  @Column({ nullable: true, type: 'text' })
  avatar?: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at?: Date;

  // define your relations
  @OneToOne(() => UserProfiles, (profile) => profile.user, {
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE',
  })
  profile?: UserProfiles;

  @OneToOne(() => UserAddress, (address) => address.user, {
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE',
  })
  address?: UserAddress;

  @OneToMany(() => UserContacts, (contact) => contact.user, {
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE',
  })
  contacts: UserContacts[];
}
