const initialState = {};

export function user(state = initialState, action){
	switch(action.type){
		case "GET_USER_SUCCESS":
			return {
				...state,
				user: action.res.data
			}
			break;
		case "GET_PROJECTS_SUCCESS":
			return {
				...state,
				projects: action.res.data
			}
		case "GET_PROJECT_SUCCESS":
			return {
				...state,
				project: action.res.data.project
			}
		case "GET_BID_SUCCESS":
			return {
				...state,
				bids: action.res.data.resp
			}
		case "GET_BIDUSER_SUCCESS":
			return {
				...state,
				bids: action.res.data.resp
			}
		case "GET_PROJECTSPUBLISHED_SUCCESS":
			return {
				...state,
				projects: action.res.data.project
			}
		case "POST_PROJECT_SUCCESS":
			console.log("POST_PROJECT_SUCCESS reducer");
			return {
				...state
			}
			break;
		case "GET_PROJECTSHIRED_SUCCESS":
			return {
				...state,
				project: action.res.data.project
			}
		default:
			return state;
	}
}