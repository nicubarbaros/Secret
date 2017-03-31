import dispatcher from "../dispatcher";

export function createTodo(text) {
	dispatcher.dispatch({
		type: "CREATE_TODO",
		text,
	});
}

export function deleteTodo(id) {
	dispatcher.dispatch({
		type: "DELETE_TODO",
		text,
	});
}

export function reloadTodos() {
	// axios ("http://someulr/somedataendpoint").then((data)=> 
	// 	console.log("got the data", data)
	// })
	dispatcher.dispatch({type: "FETCH_TODOS"});
	setTimeout(() => {
		dispatcher.dispatch({type: "RECEIVE_TODOS", todos: [
			{
				id: 2544542,
				text: 'Go Shopping Again',
				complete: true
			},
			{
				id: 2564252,
				text: 'GHug your wife',
				complete: true
			},
		]})
	}, 1000);
}