import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreEntity } from './entities/genre.entity';
import { MovieEntity } from './entities/movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { GenreRepository } from './repository/genre.repository';
import { MovieRepository } from './repository/movie.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, GenreEntity])],
  controllers: [MoviesController],
  providers: [MoviesService, MovieRepository, GenreRepository],
})
export class MoviesModule {}
