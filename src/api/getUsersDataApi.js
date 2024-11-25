import axios from 'axios'

export async function getUsersDataApi() {
  try {
    const resp = await axios.get(`${import.meta.env.VITE_API_URL}/users`)
    return resp.data
  } catch (error) {
    console.error(error.message)
  }
}
