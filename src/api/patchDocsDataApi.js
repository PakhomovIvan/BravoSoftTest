import axios from 'axios'

export async function patchDocsDataApi(index, data) {
  try {
    await axios.patch(`${import.meta.env.VITE_API_URL}/docs${index}`, data)
  } catch (error) {
    console.error(error.message)
  }
}
