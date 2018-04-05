const initialState = {};

export function authentication(state = initialState, action){
	console.log(action);
	switch(action.type){
		case "SIGNUP_SUCCESS":
			return {
				...state,
				signingup: true,
				username: action.username
			}
			break;
		case "SIGNUP_FAILURE":
			return {
				...state,
				signingup: false
			}
			break;
		case "LOGIN_SUCCESS": 
			return {
				...state,
				loggedIn: true,
				username: action.username
			}
			break;
		case "LOGIN_FAILURE":
			return {
				...state,
				loggedIn: false
			}
			break;
		case "CHECK_SUCCESS": 
			return {
				...state,
				loggedIn: true,
				username: action.username
			}
			break;
		case "CHECK_FAILURE":
			return {
				...state,
				loggedIn: false
			}
			break;
		case "LOGOUT_SUCCESS":
			return {
				...state,
				loggedIn: false
			}
			break;
        case "LOGOUT_FAILURE":
            return{
                ...state,
                loggedIn: true
            }
            break;
		case "PROCESSING_AUTH":
			return {
				...state,
				processing: true
			}
		case "PROCESSING_DONE":
			return {
				...state,
				processing: false
			}
		default:
			return state;
	}
}