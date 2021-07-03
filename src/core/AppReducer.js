export const reducer = (state, action) => {
  switch (action.type) {
    case "set_company":
      return {
        ...state,
        company: action.data
      };
    
    case "set_users":
      return {
        ...state,
        users: action.data
      }
      
    case "set_services":
        return {
          ...state,
          services: action.data
        } 
      
    default:
      return state;
  }
}

export const initialState = {
  company: null,
  services: [],
  works: [],
  users: []
}