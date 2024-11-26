import axios from 'axios'

export async function getDocsDataApi() {
  try {
    const resp = await axios.get(`${import.meta.env.VITE_API_URL}/docs`)
    return resp.data
  } catch (error) {
    console.error(error.message)
  }
}
