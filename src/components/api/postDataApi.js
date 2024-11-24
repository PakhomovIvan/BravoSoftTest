import axios from 'axios'

export async function postDataApi(data) {
  try {
    await axios.post(`http://localhost:3000/orders`, data)
  } catch (error) {
    console.error(error.message)
  }
}
