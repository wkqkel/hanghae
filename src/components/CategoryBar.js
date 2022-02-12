import React from "react"
import { Button, Text, Grid, Input } from "../elements"
import styled from "styled-components"

const CategoryBar = () => {
  //#f4f4f4
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
  return (
    <CategoryBox>
      {categoryList.map((e, i) => (
        <categoryCircle>{e}</categoryCircle>
      ))}
    </CategoryBox>
  )
}

const CategoryBox = styled.div`
  height: 10vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  * {
    margin: 20px;
    font-size: 18px;
    padding: 5px 15px;
    color: #000;
    border-radius: 30px;
    background-color: #fef28a;
  }
  margin-bottom: 30px;
`
const categoryCircle = styled.div``
export default CategoryBar
