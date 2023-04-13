import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GenreEntity } from './genre.entity';

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

  @JoinTable()
  @ManyToMany((type) => GenreEntity, (genre) => genre.movies, {
    cascade: true,
  })
  genre: GenreEntity[];
}
