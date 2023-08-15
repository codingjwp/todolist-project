# ToDo List Project
<div align="right">2023.07.21 ~ 2023.08.09</div>

## 목적

<div align="center">  

[팀프로젝트 링크](https://github.com/wanted-pre-onboarding-11th-14team/pre-onboarding-11th-1-14) 

</div>

개발의 빠른 편의성을 위한 Vite로 변경
- [개발 스택 변경](#기술-스택)

팀 프로젝트로 만들었던 TodoList를 사용성 편의성을 좀더 좋게 수정해볼려고 작성   
- [편의성 개선 부분](#편의성-개선-부분)   

<br>

아이콘 부분 라이브러리 삭제   
- src/assets/btnicon.svg 로 생성 

<br>

## 실행 방법
- 프로그램 실행 방법
```bash
npm install && npm run dev
```

<br>

## 데모 영상
- vercel로 배포된 링크 [TodoList Project Link](https://todolist-project-gamma.vercel.app/)
<br>

## 차이점
### 기술 스택
<br>

| 구분 | 이전 | 현재 |   
|:---:|---|---|   
|사용 라이브러리|![CRA](https://img.shields.io/badge/Create--React--App-5.0.1-20232A?logo=react&logoColor=%2309D3AC)<br>![react-router](https://img.shields.io/badge/react--router-6.14.1-CA4245?logo=reactRouter)<br>![typescript](https://img.shields.io/badge/typescript-4.9.5-007ACC?logo=typescript)<br>![styled-components](https://img.shields.io/badge/styled--components-6.0.1-28A745)<br>![axios](https://img.shields.io/badge/axios-1.4.0-%23671DDF?logo=axios&logoColor=%23671DDF)|![React](https://img.shields.io/badge/react-18.2.0-20232A?logo=react)<br>![vite](https://img.shields.io/badge/vite-4.4.0-B73BFE?logo=vite)<br>![react-router](https://img.shields.io/badge/react--router-6.14.2-CA4245?logo=reactRouter)<br>![typescript](https://img.shields.io/badge/typescript-5.0.2-007ACC?logo=typescript)<br>![styled-components](https://img.shields.io/badge/styled--components-6.0.4-28A745?logo=styled-components&logoColor=28A745)<br>![axios](https://img.shields.io/badge/axios-1.4.0-%23671DDF?logo=axios&logoColor=%23671DDF)|

<br>

## 편의성 개선 부분
### Sign Up, Sign In 페이지에 버튼을 눌러야만 이동할 수 있었던 방식
- **link**을 넣어 `Sign In`, `Sign Up` 이동 할 수 있도록 수정

|Sign Up After|Sign In After|
|:---:|:---:|
|![스크린샷 2023-08-07 205753](https://github.com/codingjwp/mindpalace/assets/113403155/c4e5f187-3323-4d41-a126-6f742f78d4d5)|![스크린샷 2023-08-07 205911](https://github.com/codingjwp/mindpalace/assets/113403155/1fc7f9ae-7cff-435b-832d-585973a6aca8)|

### 글자 수가 많으면 레이아웃 넘어서 표시 되던 영역
- **Css**에 밑에 부분을 추가해서 크기가 넘어가면 ...으로 표시
  ```CSS
  overflow: hidden;
  text-overflow: ellipsis;
  ```
|Before|After|
|:---:|:---:|
|![스크린샷 2023-08-07 210102](https://github.com/codingjwp/mindpalace/assets/113403155/c1b08523-46de-47b4-90bf-14a70fbaad07)|![스크린샷 2023-08-07 210112](https://github.com/codingjwp/mindpalace/assets/113403155/a600d9c2-98db-419f-ba9d-2fe91cdc0238)|

### 또한 전체 내용을 보기 위해 내용 클릭시 모달 창 띄우기
|After|
|:---:|
|![스크린샷 2023-08-07 210500](https://github.com/codingjwp/mindpalace/assets/113403155/ccb72062-d2b0-4171-b313-84352420a609)|

### Todo 입력 시 내용이 마지막에 붙는걸 최신 순으로 앞에 붙도록 변경
- `todoData.sort((a, b) => {return +b.id - +a.id})` 이용하여 최신 순서 앞으로 오도록 함

|Before|After|
|:---:|:---:|
|![스크린샷 2023-08-07 211019](https://github.com/codingjwp/mindpalace/assets/113403155/31f372d6-b3d0-4252-8da5-b6176ef691ac)<br>![스크린샷 2023-08-07 211028](https://github.com/codingjwp/mindpalace/assets/113403155/cb2a4345-7453-4649-9daa-b6a4c3a710c1)|![스크린샷 2023-08-07 210658](https://github.com/codingjwp/mindpalace/assets/113403155/981c12d1-34c2-4ffc-abd8-97a313ee1e7f)<br>![스크린샷 2023-08-07 210708](https://github.com/codingjwp/mindpalace/assets/113403155/3f7315d3-5c61-4dba-bffd-422af1959848)|


### Todo 내용이 많을 경우 페이지로 넘기도록 수정
- `css hover`을 사용해 근처에 갔을때만 보이도록 하고
- 갯수는 9개로 정해 페이지를 넘기면 다음 껄 볼 수 있도록 수정

|Before|After 1|After 2|
|:---:|:---:|:---:|
|![스크린샷 2023-08-07 212049](https://github.com/codingjwp/mindpalace/assets/113403155/f8d68904-18d1-48fa-ae7d-8d46e6be82da)|![스크린샷 2023-08-07 212103](https://github.com/codingjwp/mindpalace/assets/113403155/626ae292-58d9-428f-9aa9-486c0c5d3d9b)|![스크린샷 2023-08-07 212115](https://github.com/codingjwp/mindpalace/assets/113403155/bdba603c-e766-47db-ae45-5403ad7dc90b)|


