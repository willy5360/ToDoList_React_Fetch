import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Task = props => {
	const done = props.taskDictionarie.done ? "deleted" : "";

	return (
		<Fragment>
			<li>
				<div className="itemList">
					<label className={done} htmlFor="task">
						{props.taskDictionarie.label.toUpperCase()}
					</label>
				</div>
				<div className="buttons_container">
					<input
						type="checkbox"
						id="task"
						name="task"
						onClick={() => {
							props.taskdone(props.taskDictionarie.label);
						}}
					/>
					<button
						className="custom-btn btn-7"
						type="button"
						onClick={() => {
							props.delete(props.id);
						}}>
						<span>
							<i className="far fa-times-circle"></i>
						</span>
					</button>
				</div>
			</li>
		</Fragment>
	);
};
Task.propTypes = {
	taskDictionarie: PropTypes.object,
	delete: PropTypes.func,
	taskdone: PropTypes.func,
	id: PropTypes.string
};

export default Task;
