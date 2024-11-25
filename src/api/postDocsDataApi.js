import axios from 'axios'

export async function postDocsDataApi(data) {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/docs`, data)
  } catch (error) {
    console.error(error.message)
  }
}
