import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        NESTJS_PORT: Joi.number().default(3000),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite', // 사용하는 DBMS종료
      database: `${__dirname.split('/dist')[0]}/test.db`, // DB의 위치. 실제 root경로/test.db
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 엔티티 위치
      synchronize: true, // 프로그램이 DB구조 변경 허용(true)
    }),
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
