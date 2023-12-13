import { Users } from 'src/front-office/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { string } from 'zod';

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column({ length: 20 })
  postal_code: string;

  @Column()
  sub_district: string;

  @Column()
  district: string;

  @Column({ length: 50 })
  country: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at?: Date;

  // define your relation
  @OneToOne(() => Users, (user) => user.address, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @Column({ type: 'uuid' })
  user_id: string;
}
