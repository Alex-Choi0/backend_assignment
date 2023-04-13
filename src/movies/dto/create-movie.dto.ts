import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '영화의 제목(Title). 고유값',
    example: '화양연화',
    type: String,
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: '영화의 고유 제목(original title).',
    example: '花樣年華',
    type: String,
  })
  original_title?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '영화감독',
    example: 'Wong Kar-wai',
    type: String,
  })
  director: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '상영시간(분 : min)',
    example: 99,
    type: Number,
  })
  runnint_time: number;

  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({
    required: false,
    description: '출연진',
    example: ['Tony Leung Chiu-wai', 'Maggie Cheung'],
    type: Array<String>,
  })
  actors?: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '영화 설명(시놉시스)',
    example:
      '홍콩의 지역 매일 신문 편집장인 초 모완(양조위 분), 수출회사의 비서로 근무하는 수 리첸(장만옥 분). 둘은 상하이 지역의 한 건물로 같은 날 이사하게 된다. 이사 날부터 의도치 않게 오가며 자주 부딪히게 되는 두 사람. 둘 다 가정이 있지만 어쩐지 배우자들은 자리를 비우는 날이 더 많고 두 사람의 외로움은 서로에게 낯설지 않게 다가와 둘을 가깝게 한다. 두 사람은 점점 감정이 깊어질수록 겉으로는 더욱 조심스러워지고 예견되어 있는 이별 앞에 마음이 혼란스럽고... 서로의 자리에서 마음으로 바라는 그들의 사랑은 애절하기만 하다.',
    type: String,
  })
  synopsis: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '평점 %',
    example: 88,
    type: Number,
  })
  rating: number;

  @IsString({ each: true })
  @ApiProperty({
    required: true,
    description: '영화 장르, 장르가 없을시 빈배열로 입력',
    example: ['공상과학', '액션', '스피드'],
  })
  readonly genre: string[];
}
