# 5기 미니 프로젝트 1조   
       
+ 팀명 : 모임의 민족 (momin)      
+ 주제 : 모임을 하고자 하는 사람들 모이는 
       
       
       
## GitHub Repogitory      
      
- FrontEnd => [ FrontEndRepo 바로가기 ](https://github.com/borobong2/FE_momin )

- BackEnd => [ BackEndRepo 바로가기 ](https://github.com/jaejeonglee/people_of_gathering-BE)    

      
      
## 프로젝트 타임 테이블      
      
- 09 : 00 체크인 / 공유 및 수정사항에 대한 회의
- 09 : 30 FrontEnd 작업현황과 오늘의 목표 공유, 전날 작업한 분량 Repo에 Push & Merge
- 12 : 00 점심 식사
- 13 : 00 FrontEnd 오전 진행상황 공유, Repo에 2차 Push & Merge
- 18 : 00 저녁 식사
- 19 : 00 FrontEnd 오후 진행상황 공유, Repo에 3차 Push & Merge
- 23 : 00 FrontEnd 저녁 진행상황 공유, Repo에 4차 Push & Merge
- 23 : 00 ~ 자유롭게 작업 및 휴식     

      
            
                  
## [API 설계](https://www.notion.so/b9b3652faef14f26937b8fd8c8725736)       
      
#### User API      

|기능|method|url|request|response|
|:--------:|:------------:|:--------------:|:---------------:|:---------------:|
|로그인|```POST```|/user/login|```{ userId: String,password: String }```|```{ token:token, user: { token : String, userId : string, userName: string }}```|
|회원가입|```POST```|/api/auth/register|```{ userId: String,userName:String, password: String, passwordConfirm: String }```|```없음```|
    
#### Main Page API       

|기능|method|url|request|response|
|:--------:|:------------:|:--------------:|:---------------:|:---------------:|
|메인페이지|```GET```|/post|```없음```|```[ { userId: String, title: String,userName: String, createDate: String, deadLine: String, category: String, curMembers: Array, maxMembers: Number,contents: String},...]```|
|카테고리별 검색|```GET```|/post?category=|```없음```|```[ { userId: String, title: String,userName: String, createDate: String, deadLine: String, category: String, curMembers: Array, maxMembers: Number,contents: String},...]```|

#### Post API       

|기능|method|url|request|response|
|:--------:|:------------:|:--------------:|:---------------:|:---------------:|
|게시글 작성|```POST```|/post|```{ userId: String, title: String,userName: String, createDate: String, deadLine: String, category: String, curMembers: Array, maxMembers: Number,contents: String}```|```없음```|
|게시글 수정|```PATCH```|/post/modify/:postId|```{ userId: String, title: String,userName: String, createDate: String, deadLine: String, category: String, curMembers: Array, maxMembers: Number,contents: String}```|```?```|
|게시글 삭제|```DELETE```|/post/delete/:postId|```없음```|```없음```|
|게시글 목록|```GET```|/post/:postId|```없음```|```{ userId: String, title: String,userName: String, createDate: String, deadLine: String, category: String, curMembers: Array, maxMembers: Number,contents: String}```|
        
#### Comment API       
         
|기능|method|url|request|response|
|:--------:|:------------:|:--------------:|:---------------:|:---------------:|
|댓글 작성|```POST```|/comment/:postId|```{ userId: String, userName: String, comment: String }```|```없음```|
|댓글 수정|```PATCH```|/comment/:commentId|```{ userId: String, userName: String, comment: String }```|```없음```|
|댓글 삭제|```DELETE```|/comment/modify/:commentId|```없음```|```없음```|
|댓글 조회|```GET```|/comment/:postId|```없음```|```[ { commentId: Number, postId: String, userId: String, userName: String, comment: String },]```|

#### Join API       

|기능|method|url|request|response|
|:--------:|:------------:|:--------------:|:---------------:|:---------------:|
|참여하기|```POST```|/post/join/:postId|```{ userName: String }```|```없음```|
|참여취소|```PATCH```|/post/join/:postId|```{ userName: String }```|```없음```|


