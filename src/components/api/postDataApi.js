import axios from 'axios'

export async function postDataApi(data) {
  try {
    axios.post(`http://localhost:3000/orders`, data)
    return true
  } catch (error) {
    console.error(error.message)
  }
}
