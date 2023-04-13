import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movies')
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  title: string;

  @Column({ nullable: true })
  original_title?: string;

  @Column({ nullable: true })
  director: string;

  @Column({ nullable: false })
  runnint_time: number;

  @Column({ type: 'simple-array', nullable: true })
  actors?: string[];

  @Column({ type: 'text', nullable: false })
  synopsis: string;

  @Column({ nullable: false, default: 0 })
  rating: number;
}
