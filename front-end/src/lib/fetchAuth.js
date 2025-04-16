class HttpError extends Error {
    constructor(status, message) {
      super(message)
      this.name = 'HttpError'
      this.status = Number(status)
    }
  }
  
  const fetchAuth = {}   // Objeto vazio
  
  const baseUrl = import.meta.env.VITE_API_BASE
  
  function getOptions(method = 'GET', body = null) {
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      // credentials: 'include' 
    }
  
    if(body) options.body = JSON.stringify(body)
  
    // Verifica se existe um token gravado no localStorage
    // e o inclui nos headers, se for o caso
    const token = window.localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_NAME)
  
    if(token) options.headers.authorization = `Bearer ${token}`
  
    return options
  }
  
  function getErrorMessage(status) {
    switch(status) {
      case 401:
        return 'ERRO: usuário ou senha incorretos.'
      case 403:
        return 'ERRO: acesso não autorizado.'
      case 500:
        return 'ERRO: mau funcionamento do servidor remoto.'
      default:
        return `ERRO HTTP ${response.status}: ${response.statusText}.`
    }
  }
  
  function processResponse(response) {
    if(response.ok) {
      const isJson = response.headers.get('content-type')?.includes('application/json')
      if(isJson) return response.json()
      else return true
    }
    else throw new HttpError(
      response.status, 
      getErrorMessage(Number(response.status))
    )
  }
  
  fetchAuth.post = async function(route, body) {
    const response = await fetch(baseUrl + route, getOptions('POST', body))
    return processResponse(response)
  }
  
  fetchAuth.get = async function(route) {
    const response = await fetch(baseUrl + route, getOptions())
    return processResponse(response)
  }
  
  fetchAuth.put = async function(route) {
    const response = await fetch(baseUrl + route, getOptions('PUT'))
    return processResponse(response)
  }
  
  fetchAuth.delete = async function(route) {
    const response = await fetch(baseUrl + route, getOptions('DELETE'))
    return processResponse(response)
  }
  
  export default fetchAuth