import axios from 'axios'

export async function getDocsDataApi() {
  try {
    const resp = await axios.get(`http://localhost:3000/docs`)
    return resp.data
  } catch (error) {
    console.error(error.message)
  }
}
