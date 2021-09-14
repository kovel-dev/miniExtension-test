export default function setupAxios(axios: any) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_AIRTABLE_API_BASE_URL,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor for API calls
  axiosInstance.interceptors.request.use(
    (config: any) => {
      if (process.env.REACT_APP_AIRTABLE_API_KEY) {
        config.headers = {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        };
      }

      return config;
    },
    (err: any) => Promise.reject(err),
  );
}
