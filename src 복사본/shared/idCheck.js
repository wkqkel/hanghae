export default function IdCheck(id) {
  let idRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

  return idRegex.test(id) // 형식에 맞는 경우 true 리턴
}
