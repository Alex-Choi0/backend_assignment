import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { GenreEntity } from '../entities/genre.entity';
import { MovieEntity } from '../entities/movie.entity';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieEntity: Repository<MovieEntity>,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  // 조회
  async getAllRecord(skip: number, take: number) {
    return await this.movieEntity.find({
      skip,
      take,
      relations: ['genre'],
    });
  }

  async getFullRecord() {
    return await this.movieEntity.find({ relations: ['genre'] });
  }

  async getOneRecord(id: string) {
    return await this.movieEntity.findOne({
      where: { id },
      relations: ['genre'],
    });
  }

  async getOneRecordByTitle(title: string) {
    return await this.movieEntity.findOne({
      where: { title },
    });
  }

  createOneData(dto: CreateMovieDto, genre?: GenreEntity[]) {
    return this.movieEntity.create({ ...dto, genre });
  }

  async createOneRecord(entity: MovieEntity) {
    return await this.movieEntity.save(entity);
  }

  async deleteOneRecord(id: string) {
    return await this.movieEntity.delete(id);
  }

  async rawSql(sql: string) {
    return await this.dataSource.query(sql);
  }
}
