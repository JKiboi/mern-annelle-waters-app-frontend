const config = {
    development: {
      backendUrl: 'http://localhost:5000'
    },
    production: {
      backendUrl: 'https://mern-annelle-app-api.onrender.com'
    }
  };
  
  export default config[process.env.NODE_ENV || 'development'];