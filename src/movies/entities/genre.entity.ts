import { Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { MovieEntity } from './movie.entity';

@Entity()
export class GenreEntity {
  @PrimaryColumn()
  name: string;

  @ManyToMany((type) => MovieEntity, (movies) => movies.genre)
  movies: MovieEntity[];
}
