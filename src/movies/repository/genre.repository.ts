import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { GenreEntity } from '../entities/genre.entity';

@Injectable()
export class GenreRepository {
  constructor(
    @InjectRepository(GenreEntity)
    private readonly genreEntity: Repository<GenreEntity>,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  // 조회
  async getAllRecord(skip: number, take: number) {
    return await this.genreEntity.find({
      skip,
      take,
    });
  }

  async getFullRecord() {
    return await this.genreEntity.find();
  }

  async getOneRecord(name: string) {
    return await this.genreEntity.findOne({
      where: { name },
    });
  }

  createOneData(name: string) {
    return this.genreEntity.create({ name });
  }

  async createOneRecord(entity: GenreEntity) {
    return await this.genreEntity.save(entity);
  }

  async deleteOneRecord(name: string) {
    return await this.genreEntity.delete(name);
  }

  async rawSql(sql: string) {
    return await this.dataSource.query(sql);
  }
}
