import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: 'http://84.201.180.84:3000/api',
	headers: {
		'Content-Type': 'application/json',
	},
})

// Перехват ответов
axiosInstance.interceptors.response.use(
	response => response,
	error => {
		if (error.response && error.response.status === 401) {
			// Очистка и редирект при истечении токена
			localStorage.removeItem('token')
			window.location.href = '/auth' // 👉 мгновенный переход без React Router
		}
		return Promise.reject(error)
	}
)

export default axiosInstance
