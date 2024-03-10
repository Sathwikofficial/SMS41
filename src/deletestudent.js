import React from "react";
import { callApi } from "./main";

class DeleteStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            regNo: props.regNo,
            message: ""
        };
    }

    handleDelete = () => {
        const { regNo } = this.state;
        const url = `http://localhost:5000/deletestudent/${regNo}`;
        callApi("DELETE", url, null, this.handleSuccess, this.handleError);
    };

    handleSuccess = (response) => {
        this.setState({ message: response });
        // Optionally, you can perform additional actions after successful deletion
    };

    handleError = (error) => {
        console.error("Error deleting student:", error);
        this.setState({ message: "An error occurred while deleting student" });
    };

    render() {
        return (
            <div>
                <button onClick={this.handleDelete}>Delete Student</button>
                {this.state.message && <p>{this.state.message}</p>}
            </div>
        );
    }
}

export default DeleteStudent;
