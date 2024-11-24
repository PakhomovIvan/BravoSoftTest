import axios from 'axios'

export async function patchDocsDataApi(index, data) {
  try {
    await axios.patch(`http://localhost:3000/docs${index}`, data)
  } catch (error) {
    console.error(error.message)
  }
}
