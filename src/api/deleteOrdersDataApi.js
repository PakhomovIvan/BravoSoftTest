import axios from 'axios'

export async function deleteOrdersDataApi(id) {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/orders/${id}`)
  } catch (error) {
    console.error(error.message)
  }
}
