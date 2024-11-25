import axios from 'axios'

export async function getOrdersDataApi() {
  try {
    const resp = await axios.get(`${import.meta.env.VITE_API_URL}/orders`)
    return resp.data
  } catch (error) {
    console.error(error.message)
  }
}
