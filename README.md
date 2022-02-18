# velogClone

//설치 해야하는 것들
yarn create react-app "프로젝트명"
ㄴ (프로젝트 생성할 때 다시 한번 체크하기)
yarn add redux react-redux
yarn add react-router-dom@5.2.1
yarn add styled-components
yarn add history@4.10.1
yarn add redux-actions

//미들웨어를 사용하기 위해서 설치해야함
yarn add redux-thunk
yarn add connected-react-router@6.8.0

yarn add immer redux-actions
yarn add redux-logger

//설치 완료되면 폴더구조 셋팅
- components 폴더 생성 (기본구성,ex : 카드,헤더 등등) 
- elements 폴더 생성 (최소단위 컴포넌트,ex : 버튼, input,text,Grid 등등)
- pages 폴더생성 (url 생성되는 페이지)
- redux 풀더 생성 ( 폴더 : modules,파일: configureStore 만드는 곳)
- shared 폴더 생성 (App, api,Cookie 등등 )

/이 외 기본 템플릿 Template에서 확인! 