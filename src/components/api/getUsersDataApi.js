import axios from 'axios'

export async function getUsersDataApi() {
  try {
    const resp = await axios.get(`http://localhost:3000/users`)
    return resp.data
  } catch (error) {
    console.error(error.message)
  }
}
