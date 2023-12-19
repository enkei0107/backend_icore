import { EpochTimestamp } from 'src/config/casts/epoch-timestamp.type';
import { Users } from 'src/front-office/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserProfiles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column({ length: 50 })
  place_of_birth: string;

  @EpochTimestamp()
  date_of_birth: Date;

  @Column({ length: 50 })
  religion: string;

  @Column({type:'jsonb',default:{}})
  properties:JSON

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at?: Date;

  //define your relation
  @OneToOne(() => Users, (user) => user.profile, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @Column({ type: 'uuid' })
  user_id: string;
}
