import axios from 'axios'

export async function postDocsDataApi(data) {
  try {
    await axios.post(`http://localhost:3000/docs`, data)
  } catch (error) {
    console.error(error.message)
  }
}
