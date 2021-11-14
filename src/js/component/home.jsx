import React, { Fragment, useEffect, useState } from "react";
import Task from "./task.jsx";

const URL = "https://assets.breatheco.de/apis/fake/todos/user/Willy";

const Home = () => {
	const INPUT = document.querySelector("input");
	const [list, setList] = useState([]);
	const [listOfComponents, setListOfComponents] = useState([]);
	const [failOnUpdating, setFailOnUpdating] = useState("");
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		fetch(URL) // cuando no se pone nada se sobreentiende que es un  GET
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Fail on load");
			})
			.then(responseAsJSON => {
				setUpdate(false);
				setList(responseAsJSON);
			})
			.catch(error => {
				setFailOnUpdating(error.message);
			});
	}, []);

	useEffect(() => {
		if (list.length != 0) {
			fetch(URL, {
				method: "PUT",
				body: JSON.stringify(list),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => {
					if (response.ok) {
						setUpdate(false);
					} else {
						throw new Error("Please enter a value, refresh page");
					}
				})
				.catch(error => setFailOnUpdating(error.message));
		}
	}, [update]);

	useEffect(() => {
		if (list.length != 0) {
			setListOfComponents(
				list.map((inputValue, index) => {
					return (
						<Task
							key={index.toString()}
							id={index.toString()}
							taskDictionarie={inputValue}
							delete={deleteTask}
							taskdone={taskDone}
						/>
					);
				})
			);
			// setUpdate(true);
		}
	}, [list]);

	const deleteTask = id => {
		setList(list.filter((_, index) => index != id));
		setUpdate(true);
	};

	const taskDone = probslabel => {
		let aux = list.map(taskDictionarie => {
			if (taskDictionarie.label == probslabel) {
				return {
					label: taskDictionarie.label,
					done: !taskDictionarie.done
				};
			} else {
				return taskDictionarie;
			}
		});
		setList(aux);
		setUpdate(true);
	};

	console.log("aqui esta list", list);
	console.log("aqui esta todolist", listOfComponents);

	return (
		<Fragment>
			<div className="mainContainer">
				<h1>My todo list</h1>
				{failOnUpdating && <h2>{failOnUpdating}</h2>}
				<form
					className="header_form"
					method="POST"
					onSubmit={event => {
						setUpdate(true);
						event.preventDefault();
						setList([...list, { label: INPUT.value, done: false }]); // sin los tres puntos aplastaria el valor
						INPUT.value = "";
					}}
					action="">
					<input
						type="text"
						placeholder="            Enter your task"
						className="inputTask"
					/>
					<button className="custom-btn btn-3" type="submit">
						<span>
							<i className="far fa-plus-square"></i>
						</span>
					</button>
				</form>
				<ul>{listOfComponents}</ul>
			</div>
		</Fragment>
	);
};

export default Home;
