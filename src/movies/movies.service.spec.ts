import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MovieEntity } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { GenreRepository } from './repository/genre.repository';
import { MovieRepository } from './repository/movie.repository';
import {
  mockCreateDto,
  mockDataBase,
  mockFindOneRecord,
  mockGenreRepository,
  mockMovieRepository,
} from './test/movies.mock';

describe('MoviesService', () => {
  let service: MoviesService;
  let movieRepository: MovieRepository;
  let genreRepository: GenreRepository;
  let mockDB = JSON.parse(JSON.stringify(mockDataBase));
  let mockCreateDto1 = JSON.parse(JSON.stringify(mockCreateDto));
  let mockFindOneRecord1 = JSON.parse(JSON.stringify(mockFindOneRecord));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: MovieRepository,
          useValue: mockMovieRepository,
        },
        {
          provide: GenreRepository,
          useValue: mockGenreRepository,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    movieRepository = module.get<MovieRepository>(MovieRepository);
    genreRepository = module.get<GenreRepository>(GenreRepository);
  });

  afterEach(() => {
    mockDB = JSON.parse(JSON.stringify(mockDataBase));
    mockCreateDto1 = JSON.parse(JSON.stringify(mockCreateDto));
    mockFindOneRecord1 = JSON.parse(JSON.stringify(mockFindOneRecord));

    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Movie Record를 하나 생성해야 합니다.', async () => {
      jest
        .spyOn(movieRepository, 'getOneRecordByTitle')
        .mockResolvedValueOnce(null);
      jest
        .spyOn(movieRepository, 'createOneData')
        .mockReturnValueOnce(mockFindOneRecord1);

      const result = await service.create(mockCreateDto1);
      expect(result).toEqual({
        movie_id: mockFindOneRecord1.id,
        message: '저장완료',
      });
      expect(movieRepository.createOneData).toBeCalled();
      expect(movieRepository.getOneRecordByTitle).toBeCalled();
    });

    it('중복된 타이틀이기 때문에 생성 불가', async () => {
      jest
        .spyOn(movieRepository, 'getOneRecordByTitle')
        .mockResolvedValueOnce(true as any);
      jest.spyOn(movieRepository, 'createOneData');

      await expect(service.create(mockCreateDto1)).rejects.toThrowError(
        new ConflictException('이미 존재하는 타이틀(title)입니다.'),
      );
      expect(movieRepository.createOneData).not.toBeCalled();
      expect(movieRepository.getOneRecordByTitle).toBeCalled();
    });
  });

  describe('findAll', () => {
    it('skip과 take값이 null인 상태에서 DB상 모든 레코드를 조회합니다.', async () => {
      jest
        .spyOn(movieRepository, 'getFullRecord')
        .mockResolvedValueOnce(mockDB);
      jest.spyOn(movieRepository, 'getAllRecord');

      const result = await service.findAll(null, null);
      expect(result).toEqual({ records: mockDB, message: '조회완료' });
      expect(movieRepository.getFullRecord).toBeCalled();
      expect(movieRepository.getAllRecord).not.toBeCalled();
    });

    it('skip값이 null인 상태에서 DB상 모든 레코드를 조회합니다.', async () => {
      jest
        .spyOn(movieRepository, 'getFullRecord')
        .mockResolvedValueOnce(mockDB);
      jest.spyOn(movieRepository, 'getAllRecord');

      const result = await service.findAll(null, 2);
      expect(result).toEqual({ records: mockDB, message: '조회완료' });
      expect(movieRepository.getFullRecord).toBeCalled();
      expect(movieRepository.getAllRecord).not.toBeCalled();
    });

    it('take값이 null인 상태에서 DB상 모든 레코드를 조회합니다.', async () => {
      jest
        .spyOn(movieRepository, 'getFullRecord')
        .mockResolvedValueOnce(mockDB);
      jest.spyOn(movieRepository, 'getAllRecord');

      const result = await service.findAll(0, null);
      expect(result).toEqual({ records: mockDB, message: '조회완료' });
      expect(movieRepository.getFullRecord).toBeCalled();
      expect(movieRepository.getAllRecord).not.toBeCalled();
    });

    it('skip과 take값이 null이 아닌 상태에서 DB상 모든 레코드를 조회합니다.', async () => {
      jest.spyOn(movieRepository, 'getFullRecord');
      jest.spyOn(movieRepository, 'getAllRecord').mockResolvedValueOnce(mockDB);

      const result = await service.findAll(0, 10);
      expect(result).toEqual({ records: mockDB, message: '조회완료' });
      expect(movieRepository.getFullRecord).not.toBeCalled();
      expect(movieRepository.getAllRecord).toBeCalled();
    });
  });

  describe('findOne', () => {
    it('하나의 record를 id(movie_id)를 이용하여 조회한다.', async () => {
      mockDB.push(mockFindOneRecord1);
      const findRecord: MovieEntity = mockDB.find((ele) => {
        return ele['id'] === mockFindOneRecord1.id;
      });
      jest.spyOn(movieRepository, 'getOneRecord').mockResolvedValue(findRecord);
      const result = await service.findOne(mockFindOneRecord1.id);

      expect(result).toEqual({
        record: mockFindOneRecord1,
        message: '조회완료',
      });
      expect(movieRepository.getOneRecord).toBeCalled();
    });

    it('존재하지 않는 id(movie_id)를 조회한다.', async () => {
      const findRecord = mockDB.find((ele) => {
        return ele['id'] === mockFindOneRecord1.id;
      });
      jest.spyOn(movieRepository, 'getOneRecord').mockResolvedValue(findRecord);

      await expect(service.findOne(mockFindOneRecord1.id)).rejects.toThrowError(
        new NotFoundException('존재하지않는 movie_id입니다.'),
      );
      expect(movieRepository.getOneRecord).toBeCalled();
    });
  });

  describe('update', () => {
    it('해당 movie record를 업데이트 합니다.', async () => {
      jest
        .spyOn(movieRepository, 'getOneRecordByTitle')
        .mockResolvedValueOnce(null);
      jest
        .spyOn(movieRepository, 'getOneRecord')
        .mockResolvedValueOnce(mockFindOneRecord1);
      jest
        .spyOn(movieRepository, 'createOneRecord')
        .mockResolvedValueOnce(true as any);

      const result = await service.update(
        mockFindOneRecord1.id,
        mockCreateDto1,
      );

      expect(result).toEqual({ message: '업데이트 완료' });
      expect(mockMovieRepository.getOneRecordByTitle).toBeCalled();
      expect(mockMovieRepository.getOneRecord).toBeCalled();
      expect(mockMovieRepository.createOneRecord).toBeCalled();
    });

    it('title이 중복이 됩니다.', async () => {
      jest
        .spyOn(movieRepository, 'getOneRecordByTitle')
        .mockResolvedValueOnce({ id: 'testId' } as any);
      jest
        .spyOn(movieRepository, 'getOneRecord')
        .mockResolvedValueOnce(mockFindOneRecord1);
      jest.spyOn(movieRepository, 'createOneRecord');

      await expect(
        service.update(mockFindOneRecord1.id, mockCreateDto1),
      ).rejects.toThrowError(
        new ConflictException('이미 존재하는 타이틀(title)입니다.'),
      );
      expect(mockMovieRepository.getOneRecordByTitle).toBeCalled();
      expect(mockMovieRepository.getOneRecord).toBeCalled();
      expect(mockMovieRepository.createOneRecord).not.toBeCalled();
    });

    it('존재하지 않는 movie_id입니다.', async () => {
      jest
        .spyOn(movieRepository, 'getOneRecordByTitle')
        .mockResolvedValueOnce(null);
      jest.spyOn(movieRepository, 'getOneRecord').mockResolvedValueOnce(null);
      jest.spyOn(movieRepository, 'createOneRecord');

      await expect(
        service.update(mockFindOneRecord1.id, mockCreateDto1),
      ).rejects.toThrowError(
        new NotFoundException('존재하지 않는 movie_id 입니다.'),
      );
      expect(mockMovieRepository.getOneRecordByTitle).toBeCalled();
      expect(mockMovieRepository.getOneRecord).toBeCalled();
      expect(mockMovieRepository.createOneRecord).not.toBeCalled();
    });
  });

  describe('remove', () => {
    it('해당 movie record를 삭제 합니다.', async () => {
      jest
        .spyOn(movieRepository, 'getOneRecord')
        .mockResolvedValueOnce(mockFindOneRecord1);
      jest
        .spyOn(movieRepository, 'deleteOneRecord')
        .mockResolvedValueOnce(true as any);

      const result = await service.remove(mockFindOneRecord1.id);

      expect(result).toEqual({ message: '삭제완료' });
      expect(mockMovieRepository.getOneRecord).toBeCalled();
      expect(mockMovieRepository.deleteOneRecord).toBeCalled();
    });

    it('존재하지 않는 movie_id입니다.', async () => {
      jest.spyOn(movieRepository, 'getOneRecord').mockResolvedValueOnce(null);
      jest.spyOn(movieRepository, 'deleteOneRecord');

      await expect(service.remove(mockFindOneRecord1.id)).rejects.toThrowError(
        new NotFoundException('존재하지 않는 movie_id 입니다.'),
      );
      expect(mockMovieRepository.getOneRecord).toBeCalled();
      expect(mockMovieRepository.deleteOneRecord).not.toBeCalled();
    });
  });
});
