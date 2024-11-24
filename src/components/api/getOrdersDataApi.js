import axios from 'axios'

export async function getOrdersDataApi() {
  try {
    const resp = await axios.get(`http://localhost:3000/orders`)
    return resp.data
  } catch (error) {
    console.error(error.message)
  }
}
