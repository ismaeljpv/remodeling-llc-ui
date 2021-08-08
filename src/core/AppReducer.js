export const reducer = (state, action) => {
  switch (action.type) {
    case "set_company":
      return {
        ...state,
        company: action.data
      };

    case "set_goals":
      return {
        ...state,
        goals: action.data
      }

    case "set_features":
      return {
        ...state,
        features: action.data
      }

    case "set_services":
      return {
        ...state,
        services: action.data
      }

    case "set_team":
      return {
        ...state,
        team: action.data
      }

    case "set_trustReasons":
      return {
        ...state,
        trustReasons: action.data
      }

    default:
      return state;
  }
}

export const initialState = {
  company: null,
  goals: [],
  features: [],
  services: [],
  team: [],
  trustReasons:[]
}