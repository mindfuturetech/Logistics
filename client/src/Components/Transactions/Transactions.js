import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Transactions.css";

const getTransactionsDataUrl = "http://localhost:5000/logistics/list-transactions";

const Transactions = () => {


    useEffect(() => {
        document.title = "Transactions";
        // fetchData();
    }, []);


    return (
        <div id="transactions">
            <h1>Acknowledged Trucks</h1>
            <div class="form-group">
                <label for="start-date">Start Date:</label>
                <input type="date" id="start-date" name="start-date" />
                <label for="end-date">End Date:</label>
                <input type="date" id="end-date" name="end-date" />
                <button type="button" class="search-button" onclick="searchDate()">Search</button>
            </div>
            <div id="monthsContainer">
                {/* <!-- Data will be populated here --> */}
            </div>

            <div id="error-message" class="error-message"></div>
            <div class="table-wrapper">
                <table id="resultsTable">
                    <thead>
                        <tr>
                            <th>Truck Number</th>
                            <th>Time</th>
                            <th>Date</th>
                            <th>Weight (tons)</th>
                            <th>Actual Weight</th>
                            <th>Differebce In Weight</th>
                            <th>Freight</th>
                            {/* <th>Diesel (liters)</th> */}
                            <th>Diesel </th>
                            <th>Advance</th>
                            <th>Toll</th>
                            <th>TDS</th>
                            <th>Short</th>
                            <th>O.Chg</th>
                            {/* <th>Driver Name</th> */}
                            {/* <th>Destination From</th> */}
                            <th>Destination To</th>
                            {/* <th>DO Number</th> */}
                            <th>Vendor</th>
                            {/* <th>Truck Type</th> */}
                            <th>Transaction Status</th>
                            <th>Amount</th>
                            {/* <th>Diesel Slip Number</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- Results will be inserted here --> */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Transactions;