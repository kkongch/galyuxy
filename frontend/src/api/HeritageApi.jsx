import axios from 'axios'
export async function getHeritage() {
  try {
    const response = await axios.get('localhost:8080/heritage')
    return response
  } catch (e) {
    console.log(e)
  }
}
