import React from "react";
import { callApi } from "./main";
import "./viewcounsellor.css"; // Import CSS file for styling

class ViewCounsellor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counsellors: [],
            searchQuery: ""
        };
    }

    componentDidMount() {
        this.fetchCounsellors();
    }

    fetchCounsellors() {
        const url = "http://localhost:5000/viewcounsellor/details";
        callApi("GET", url, null, this.handleSuccess, this.handleError);
    }

    handleSuccess = (response) => {
        const data = JSON.parse(response);
        this.setState({ counsellors: data });
    };

    handleError = (error) => {
        console.error("Error fetching student details:", error);
    };

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    render() {
        const { counsellors, searchQuery } = this.state;
        const filteredCounsellors = counsellors.filter(counsellor =>
            counsellor.counselorId.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div className='full-height'>
                <div className="vccontent">
                    <h2>View Counsellors</h2>
                    <input
                        type="text"
                        placeholder="Search by Faculty ID"
                        value={searchQuery}
                        onChange={this.handleSearchChange}
                        className="search-input"
                    />
                    <table className="counsellor-table">
                        <thead>
                            <tr>
                                <th>Faculty ID</th>
                                <th>Full Name</th>
                                <th>Gender</th>
                                <th>Contact No.</th>
                                <th>KL Email</th>
                                <th>Department</th>
                                <th>Designation</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCounsellors.map((counsellor, index) => (
                                <tr key={index}>
                                    <td>{counsellor.counselorId}</td>
                                    <td>{counsellor.firstName} {counsellor.lastName}</td>
                                    <td>{counsellor.gender}</td>
                                    <td>{counsellor.contactNumber}</td>
                                    <td>{counsellor.cklMailId}</td>
                                    <td>{counsellor.department}</td>
                                    <td>{counsellor.designation}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ViewCounsellor;
