import axios from 'axios'

export async function deleteDocsDataApi(id) {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/docs/${id}`)
  } catch (error) {
    console.error(error.message)
  }
}
