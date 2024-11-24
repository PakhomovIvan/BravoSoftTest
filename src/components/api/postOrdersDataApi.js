import axios from 'axios'

export async function postOrdersDataApi(data) {
  try {
    await axios.post(`http://localhost:3000/orders`, data)
  } catch (error) {
    console.error(error.message)
  }
}
