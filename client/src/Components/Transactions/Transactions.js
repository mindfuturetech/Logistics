import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Transactions.css";

const listTransactionsUrl = "http://localhost:5000/logistics/list-all-transactions";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [noDataMessage, setNoDataMessage] = useState("");

  const fetchTransactions = async (start = "", end = "") => {
    setErrorMessage("");
    setNoDataMessage("");
    setTransactions([]); // Clear out old data before fetching new data
    // const response = "";
    try {
      const response = await axios.post(listTransactionsUrl, { startDate: start, endDate: end });
      console.log("response::>>", response.data)
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setNoDataMessage("No data found for this date range.");
    }
  };

  const handleSearch = (e) => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      alert("End date should be greater than start date.");
      return;
    } else {
      fetchTransactions(startDate, endDate);
    }
  };

  const groupByDate = (transactions) => {
    return transactions.reduce((groups, transaction) => {
      const date = new Date(transaction.date).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    }, {});
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  };

  const groupedTransactions = groupByDate(transactions);

  useEffect(() => {
    document.title = "Transactions";
    fetchTransactions();
  }, []);

  return (
    <div id="transactions">
      <h1>Acknowledged Trucks</h1>

      <div className="form-group">
        <label htmlFor="start-date">Start Date:</label>
        <input
          type="date"
          id="start-date"
          name="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <label htmlFor="end-date">End Date:</label>
        <input
          type="date"
          id="end-date"
          name="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <button type="button" className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {errorMessage && <div id="error-message" className="error-message">{errorMessage}</div>}
      {noDataMessage && <div className="no-data-message">{noDataMessage}</div>}

      {Object.keys(groupedTransactions).length > 0 && !noDataMessage && (
        <div className="table-wrapper">
          {Object.entries(groupedTransactions).map(([date, trucks], index) => (
            <div key={index} className="date-section">
              <div className="date-header">{`${formatDate(date)}`}</div>
              <table id="resultsTable">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Vendor</th>
                    <th>Truck No.</th>
                    <th>Dest: To</th>
                    <th>Bags</th>
                    <th>Weight</th>
                    <th>Actual Wt.</th>
                    <th>Freight</th>
                    <th>Rate</th>
                    <th>Diesel</th>
                    <th>Advance</th>
                    <th>Toll</th>
                    <th>TDS</th>
                    <th>Short</th>
                    <th>O.Chg</th>
                    <th>T. Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {trucks.map((transaction, idx) => (
                    <tr key={idx}>
                      <td>{new Date(transaction.time).toLocaleTimeString()}</td>
                      <td>{transaction.vendor}</td>
                      <td>{transaction.truck_no}</td>
                      <td>{transaction.destination_to}</td>
                      <td>{transaction.bags}</td>
                      <td>{transaction.weight}</td>
                      <td>{transaction.actual_weight}</td>
                      <td>{transaction.freight}</td>
                      <td>{transaction.rate}</td>
                      <td>{transaction.diesel}</td>
                      <td>{transaction.advance}</td>
                      <td>{transaction.toll}</td>
                      <td>{transaction.tds}</td>
                      <td>{transaction.short}</td>
                      <td>{transaction.other_charges}</td>
                      <td>{transaction.transaction_status}</td>
                      <td>{transaction.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;
