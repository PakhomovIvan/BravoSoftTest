import axios from 'axios'

export async function deleteDocsDataApi(id) {
  try {
    await axios.delete(`http://localhost:3000/docs/${id}`)
  } catch (error) {
    console.error(error.message)
  }
}
