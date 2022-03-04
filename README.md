# react-setting

react project setting
매번 프로젝트를 진행할 때,
기본적인 폴더구조나 셋팅을 하는데 꽤 시간이 걸린다.
default로 사용할 수 있는 프로젝트 세팅 및 추가로 적용할만한 것들을 정리.

클론 받은 후 터미널에서
yarn install
yarn start

해당폴더 생성과정

<br>0.  깃헙에 repository를 만들고 git-desktop에서 클론
<br>1.  현재폴더에 CRA를 이용하여 기본 리액트 개발환경 구성
<br>    터미널에 yarn create react-app .
<br>2.  폴더구조
<br>    src > components / elements / pages / redux / shared
<br>   redux > modules 폴더와 configureStore.js
<br>   shared > App.js / App.css / Request.js(axios통신)

<br>    설명:
<br>    components 폴더 생성 (컴포넌트 단위 ex: 카드,헤더 등)
<br>    elements 폴더 생성 (최소단위 컴포넌트 ex : 버튼, input,text,Grid 등)
<br>    pages 폴더생성 (페이지 단위 ex: main, detail 등)
<br>   redux 풀더 생성 (redux )
<br>   shared 폴더 생성 (페이지에서 전범위에 적용될 것들 ex: App, api,Cookie 등등 )

<br>3.  패키지 설치 및 설명
<br>    필수패키지 한번에 설치
<br>    yarn add styled-components react-router-dom@5.2.1 history@4.10.1 connected-react-router@6.8.0 redux react-redux redux-actions redux-thunk immer redux-logger axios

<br>    보통 필수적으로 설치하는 라이브러리
<br>    css관련
<br>    yarn add styled-components // js에서 css를 작성할 수 있음.
<br>    페이지이동관련
<br>    yarn add react-router-dom@5.2.1 // 주소창의 url에 따라 페이지를 보여줌
<br>    yarn add history@4.10.1 // 새로고침없이 페이지이동 가능
<br>    yarn add connected-react-router@6.8.0 // 히스토리를 전역에서 사용가능하게 해줌
<br>    상태관리관련
<br>    yarn add redux react-redux //상태관리 라이브러리인 리덕스 설치
<br>   yarn add redux-actions // 리덕스 액션 관리를 용이하게 해줌.
<br>   yarn add redux-thunk // 비동기 작업을 처리할 때 많이 사용되는 thunk라이브러리 설치
<br>   yarn add immer // 불변성관리를 위한 immer
<br>    yarn add redux-logger // 리덕스 실행 전과 후를 콘솔 창에서 볼 수 있게해줌.
<br>    서버통신
<br>   yarn add axios // 서버와의 통신을 위한 axios설치

<br>   그외 사용하면 좋을 라이브러리
<br>    아이콘 관련
<br>    yarn add react-icons // 참고 : https://react-icons.github.io/react-icons/icons?name=fc
<br>    yarn add @fortawesome/fontawesome-svg-core // 폰트어썸 사용법참고: https://velog.io/@asroq1/리액트-리액트에서-FontAwesome-쉽게-쓰는-방법
<br>   yarn add @fortawesome/free-solid-svg-icons
<br>  yarn add @fortawesome/react-fontawesome
