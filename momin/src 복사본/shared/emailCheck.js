export default function IdCheck(pwd) {
  let regExp =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/

  return regExp.test(pwd) // 형식에 맞는 경우 true 리턴
}
