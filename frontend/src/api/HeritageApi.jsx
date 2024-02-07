import axios from 'axios'
export async function getHeritage() {
  try {
    const response = await axios.get('http://i10c206.p.ssafy.io:8080/heritage')
    return response
  } catch (e) {
    console.log(e)
  }
}
