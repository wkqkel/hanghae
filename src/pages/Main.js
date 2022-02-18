import React from "react";
import { Button, Grid, Input, Text } from "../elements";
const Main = () => {
  return (
    <React.Fragment>
      <Grid is_flex>
        <Grid>
          <Button text="버튼이다" width="100px"></Button>
          <Text color="red" margin="20px">
            justifyContent 이거 어떻게 쓰는거쥬..? 지금 보여지는 상태에서
            상단정렬을 하고 싶은디
          </Text>
          <Input placeholder="이것도 디폴드값 있는데 왜 디폴트로 설정된 텍스트가 안들어가지"></Input>
        </Grid>
        <Grid bg="yellow">
          <Button text="버튼이다" width="100px"></Button>
          <Text bold>저 테트 한판하고 올게요</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Main;
