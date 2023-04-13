import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';

@ApiTags('Movies API')
@Controller('api/v1/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({
    summary: '영화 Record를 DB에 생성한다.',
    description:
      '영화를 DB에 생성합니다. 영화 컬럼에서 id는 uuid로 자동 배정되며 고유값으로 제목(title)은 중복될수 없습니다.',
  })
  @ApiCreatedResponse({
    description: '정상적으로 영화 Record를 생성시',
    schema: {
      example: {
        movie_id: '5df0017b-7d75-43c5-a167-27e3d041bacd',
        message: '저장완료',
      },
      type: `{
        movie_id : uuid,
        message : string
      }`,
    },
  })
  @ApiConflictResponse({
    description:
      '생성할려는 영화 Record에서 Title이 이미 존재할 경우 에러 반환',
    schema: {
      example: {
        statusCode: 409,
        message: '이미 존재하는 타이틀(title)입니다.',
      },
      type: `{
        statusCode: number,
        message : string,
      }`,
    },
  })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get('')
  @ApiOperation({
    summary: '모든 영화를 찾는다.',
    description:
      'skip, take을 이용하여 영화를 조회합니다. skip, take이 생략시 DB안에 모든 영화를 불러옵니다.',
  })
  @ApiQuery({
    required: false,
    name: 'skip',
    type: Number,
    description: '생략할 갯수',
    example: 0,
  })
  @ApiQuery({
    required: false,
    name: 'take',
    type: Number,
    description: '보여줄 갯수',
    example: 10,
  })
  @ApiOkResponse({
    description: '정상적으로 영화 Record를 여러개 조회시',
    schema: {
      example: {
        records: [
          {
            id: '5e516d27-fc10-41db-8f73-0d28adb77b66',
            title: '화양연화',
            original_title: '花樣年華',
            director: 'Wong Kar-wai',
            runnint_time: 99,
            actors: ['Tony Leung Chiu-wai', 'Maggie Cheung'],
            synopsis:
              '홍콩의 지역 매일 신문 편집장인 초 모완(양조위 분), 수출회사의 비서로 근무하는 수 리첸(장만옥 분). 둘은 상하이 지역의 한 건물로 같은 날 이사하게 된다. 이사 날부터 의도치 않게 오가며 자주 부딪히게 되는 두 사람. 둘 다 가정이 있지만 어쩐지 배우자들은 자리를 비우는 날이 더 많고 두 사람의 외로움은 서로에게 낯설지 않게 다가와 둘을 가깝게 한다. 두 사람은 점점 감정이 깊어질수록 겉으로는 더욱 조심스러워지고 예견되어 있는 이별 앞에 마음이 혼란스럽고... 서로의 자리에서 마음으로 바라는 그들의 사랑은 애절하기만 하다.',
            rating: 88,
          },
        ],
        message: '조회완료',
      },
      type: `{
        records : MovieEntity[],
        message : string
      }`,
    },
  })
  findAll(@Query('skip') skip: number, @Query('take') take: number) {
    return this.moviesService.findAll(skip, take);
  }

  @Get(':movie_id')
  @ApiOperation({
    summary: 'movie_id를 이용하여 하나의 영화 조회',
    description: 'movie_id를 이용하여 DB에서 하나의 영화를 조회합니다.',
  })
  @ApiOkResponse({
    description: '정상적으로 영화 Record를 하나만 조회시',
    schema: {
      example: {
        records: {
          id: '5e516d27-fc10-41db-8f73-0d28adb77b66',
          title: '화양연화',
          original_title: '花樣年華',
          director: 'Wong Kar-wai',
          runnint_time: 99,
          actors: ['Tony Leung Chiu-wai', 'Maggie Cheung'],
          synopsis:
            '홍콩의 지역 매일 신문 편집장인 초 모완(양조위 분), 수출회사의 비서로 근무하는 수 리첸(장만옥 분). 둘은 상하이 지역의 한 건물로 같은 날 이사하게 된다. 이사 날부터 의도치 않게 오가며 자주 부딪히게 되는 두 사람. 둘 다 가정이 있지만 어쩐지 배우자들은 자리를 비우는 날이 더 많고 두 사람의 외로움은 서로에게 낯설지 않게 다가와 둘을 가깝게 한다. 두 사람은 점점 감정이 깊어질수록 겉으로는 더욱 조심스러워지고 예견되어 있는 이별 앞에 마음이 혼란스럽고... 서로의 자리에서 마음으로 바라는 그들의 사랑은 애절하기만 하다.',
          rating: 88,
        },

        message: '조회완료',
      },
      type: `{
        records : MovieEntity,
        message : string
      }`,
    },
  })
  @ApiNotFoundResponse({
    description: 'movie_id로 찾으려는 Record가 존재하지 않는 경우',
    schema: {
      example: {
        statusCode: 404,
        message: '존재하지않는 movie_id입니다.',
      },
      type: `{
        statusCode: number,
        message : string,
      }`,
    },
  })
  findOne(@Param('movie_id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Put(':movie_id')
  @ApiOperation({
    summary: 'movie_id를 이용하여 하나의 영화 업데이트',
    description:
      'movie_id를 이용하여 존재하는 Record를 수정합니다. 수정한 것을 포함하여 모든 데이터를 Body에 넣고 요청해야 합니다.',
  })
  @ApiOkResponse({
    description: '정상적으로 영화 Record를 업데이트시',
    schema: {
      example: {
        message: '업데이트 완료',
      },
      type: `{
        message : string
      }`,
    },
  })
  @ApiConflictResponse({
    description:
      '업데이트 할려는 영화 Record에서 Title이 이미 존재할 경우 에러 반환',
    schema: {
      example: {
        statusCode: 409,
        message: '이미 존재하는 타이틀(title)입니다.',
      },
      type: `{
        statusCode: number,
        message : string,
      }`,
    },
  })
  @ApiNotFoundResponse({
    description: 'movie_id로 찾으려는 Record가 존재하지 않는 경우',
    schema: {
      example: {
        statusCode: 404,
        message: '존재하지않는 movie_id입니다.',
      },
      type: `{
        statusCode: number,
        message : string,
      }`,
    },
  })
  update(
    @Param('movie_id') id: string,
    @Body() updateMovieDto: CreateMovieDto,
  ) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':movie_id')
  @ApiOperation({
    summary: 'movie_id를 이용하여 하나의 영화 삭제',
    description: 'movie_id를 이용하여 DB에서 하나의 영화를 삭제합니다.',
  })
  @ApiOkResponse({
    description: '정상적으로 영화 Record를 삭제시',
    schema: {
      example: {
        message: '삭제완료',
      },
      type: `{
        message : string
      }`,
    },
  })
  @ApiNotFoundResponse({
    description: 'movie_id로 삭제하려는 Record가 존재하지 않는 경우',
    schema: {
      example: {
        statusCode: 404,
        message: '존재하지않는 movie_id입니다.',
      },
      type: `{
        statusCode: number,
        message : string,
      }`,
    },
  })
  remove(@Param('movie_id') id: string) {
    return this.moviesService.remove(id);
  }
}
