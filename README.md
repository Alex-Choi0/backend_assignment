<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">해당 프로젝트는 <a href="http://nodejs.org" target="_blank">Node.js</a> 18.15.0을 사용하고 있습니다.</p>
    <p align="center">
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 설명

[Nest](https://github.com/nestjs/nest) 프레임 워크를 실행하는 방법.

## npm 설치(해당 디렉토리)

```bash
## npm 모듈을 설치합니다
$ npm install
```

## 필요 파일

<p>1. .development.env</p>
<p>- 루트 경로에 '.development.env'파일을 생성해 줍니다. NESTJS_PORT를 설정하시면 설정한 포트로 서버가 열립니다. (디폴트는 3000입니다)</p>

## 앱 실행방법

<p>현재 프로젝트에는 'npm run start:dev'으로만 사용하셔도 됩니다.</p>
<p><a href="https://youtu.be/UJ_bLxlPBAo">참고링크</a></p>

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 테스트 방법

<p>현재 프로젝트에는 유닛테스트를 진행할수 있습니다.</p>
<p><a href="https://youtu.be/iu7qJm7Grdc">참고링크</a></p>

```bash
# 전체 테스트
$ npm run test

# 일부 테스트
$ npm run test [spec 파일명]

# 테스트 커버리지가 있는 테스트
$ npm run test:cov
```

## Docker-Compose로 구동하기

<p>Docker 버전</p>
<p>- Client 버전 : 20.10.7</p>
<p>- Engine 버전 : 20.10.7</p>
<p><br /></p>
<p>Docker-Compose 버전</p>
<p>1.27.4, build 40524192</p>
<p><br /></p>
<p>루트 디렉토리 터미널에서 실행</p>
<p><a href="https://youtu.be/59u8A_Ug8mA">참고링크</a></p>

```bash
# docker compose으로 build하면서 동시에 배포하기
$ docker-compose up --build -d

# docker compose 끄기
$ docker-compose down
```

<p>해당 프로젝트를 도커러 구동시 컨테이너의 3000포트를 외부의 3000포트로 노출되도록 docker-compose.yaml파일이 작성되어 있습니다.</p>
<p>도커 컨테이너 내부 시간 기준은 KST(한국시간)으로 설정 되어 있습니다.</p>
<p><br /></p>

## API문서 확인 방법

<p>서버가 구동이 되면 자동으로 Swagger 페이지가 생성이 됩니다.</p>
<p><a href="http://127.0.0.1:3000/api-docs">http://127.0.0.1:[설정한 포트(기본 3000)]/api-docs</a> 으로 접속하면 API문서를 확인할수 있습니다.</p>
## Stay in touch

- 개발자 - [최재호 (Alex Choi)](https://engineeringshw.blogspot.com/)
- gitHub - [https://github.com/Alex-Choi0](https://github.com/Alex-Choi0)
- StackOverFlow - [https://stackoverflow.com/users/15889317/alex-choi](https://stackoverflow.com/users/15889317/alex-choi)
<p><br /></p>
