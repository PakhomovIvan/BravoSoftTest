import axios from 'axios'

export async function getDataApi(query) {
  try {
    const resp = await axios.get(`http://localhost:3000/${query}`)
    return resp.data
  } catch (error) {
    console.error(error.message)
  }
}
