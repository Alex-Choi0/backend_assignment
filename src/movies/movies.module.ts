import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieRepository } from './repository/movie.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MoviesController],
  providers: [MoviesService, MovieRepository],
})
export class MoviesModule {}
