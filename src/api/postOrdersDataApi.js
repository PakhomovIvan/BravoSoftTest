import axios from 'axios'

export async function postOrdersDataApi(data) {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/orders`, data)
  } catch (error) {
    console.error(error.message)
  }
}
