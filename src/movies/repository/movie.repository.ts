import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateMovieDto } from '../dto/create-movie.dto';
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
    });
  }

  async getFullRecord() {
    return await this.movieEntity.find();
  }

  async getOneRecord(id: string) {
    return await this.movieEntity.findOne({
      where: { id },
    });
  }

  async getOneRecordByTitle(title: string) {
    return await this.movieEntity.findOne({
      where: { title },
    });
  }

  createOneData(dto: CreateMovieDto) {
    return this.movieEntity.create(dto);
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
