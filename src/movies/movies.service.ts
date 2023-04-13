import {
  ConflictException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieEntity } from './entities/movie.entity';
import { MovieRepository } from './repository/movie.repository';

@Injectable()
export class MoviesService {
  constructor(
    @Inject(MovieRepository)
    private readonly movieRepository: MovieRepository,
  ) {}

  async create(dto: CreateMovieDto) {
    try {
      const checkTitle: MovieEntity =
        await this.movieRepository.getOneRecordByTitle(dto.title);
      if (checkTitle) {
        throw new ConflictException('이미 존재하는 타이틀(title)입니다.');
      }

      const createData: MovieEntity = this.movieRepository.createOneData(dto);
      await this.movieRepository.createOneRecord(createData);

      return {
        movie_id: createData.id,
        message: '저장완료',
      };
    } catch (err) {
      throw new HttpException(err.message, err.status ? err.status : 500);
    }
  }

  async findAll(skip?: number, take?: number) {
    try {
      if ((!skip && skip != 0) || (!take && take != 0)) {
        return {
          records: await this.movieRepository.getFullRecord(),
          message: '조회완료',
        };
      } else {
        return {
          records: await this.movieRepository.getAllRecord(skip, take),
          message: '조회완료',
        };
      }
    } catch (err) {
      throw new HttpException(err.message, err.status ? err.status : 500);
    }
  }

  async findOne(id: string) {
    try {
      const findOne: MovieEntity = await this.movieRepository.getOneRecord(id);

      if (!findOne) {
        throw new NotFoundException('존재하지않는 movie_id입니다.');
      }

      return {
        record: findOne,
        message: '조회완료',
      };
    } catch (err) {
      throw new HttpException(err.message, err.status ? err.status : 500);
    }
  }

  async update(id: string, dto: CreateMovieDto) {
    try {
      const checkTitle: MovieEntity =
        await this.movieRepository.getOneRecordByTitle(dto.title);
      const existId: MovieEntity = await this.movieRepository.getOneRecord(id);

      if (checkTitle && checkTitle.id != id) {
        throw new ConflictException('이미 존재하는 타이틀(title)입니다.');
      } else if (!existId) {
        throw new NotFoundException('존재하지 않는 movie_id 입니다.');
      }

      const createData: MovieEntity = {
        id,
        ...dto,
      };

      await this.movieRepository.createOneRecord(createData);

      return {
        message: '업데이트 완료',
      };
    } catch (err) {
      throw new HttpException(err.message, err.status ? err.status : 500);
    }
  }

  async remove(id: string) {
    try {
      const findOne: MovieEntity = await this.movieRepository.getOneRecord(id);

      if (!findOne) {
        throw new NotFoundException('존재하지 않는 movie_id 입니다.');
      }

      await this.movieRepository.deleteOneRecord(id);

      return {
        message: '삭제완료',
      };
    } catch (err) {
      throw new HttpException(err.message, err.status ? err.status : 500);
    }
  }
}
