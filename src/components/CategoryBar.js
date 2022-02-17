import React from "react"
import styled from "styled-components"
import { actionCreators as postActions } from "../redux/modules/post"
import { useDispatch, useSelector } from "react-redux"

const CategoryBar = () => {
  const dispatch = useDispatch()
  //#f4f4f4
  const [clickedCategory, changeClicked] = React.useState(0)
  const checkLoadAll = useSelector((state) => state.post.checkLoadAll)

  const categoryList = [
    "전체",
    "스터디",
    "투어",
    "스포츠",
    "반려동물",
    "게임/오락",
    "영화/예술",
    "봉사활동",
  ]
  // 메인헤더 클릭시에도 디폴트값으로 인덱스0번째인 "전체"가 색칠돼어있어야함
  // post.js에서 전체를 불러왔을때 state.post.checkLoadAll=true를 줘서 useEffect와 조건문을 사용하여 만듬
  React.useEffect(() => {
    if (checkLoadAll) {
      changeClicked(0)
    }
  }, [checkLoadAll])

  return (
    <CategoryBox>
      {categoryList.map((e, i) => (
        <CategoryCircle
          key={i}
          onClick={() => {
            changeClicked(i)

            i === 0
              ? dispatch(postActions.getPostDB())
              : dispatch(postActions.getPostDB(e))
          }}
          style={{
            backgroundColor: i === clickedCategory ? "#fef28a" : "#e6d86a4f",
          }}
        >
          {e}
        </CategoryCircle>
      ))}
    </CategoryBox>
  )
}

const CategoryBox = styled.div`
  height: 10vh;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: -10px;

  @media only screen and (max-width: 768px) {
    margin-bottom: 35px;
    padding-bottom: 0px;
  }
`
const CategoryCircle = styled.p`
  margin: 10px;
  font-size: 17px;
  padding: 5px 15px;
  color: #000;
  background-color: none;
  border-radius: 30px;
  @media only screen and (max-width: 768px) {
    padding: 9px 9px;
    font-size: 14px;
  }
`
export default CategoryBar
