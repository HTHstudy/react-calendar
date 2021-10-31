import moment from "moment";
import React, { useState } from "react";
import Calendar from "./Calendar";
import "./App.css";

function App() {
  const [month, setMonth] = useState(moment());
  return (
    <div className="App">
      <Calendar month={month} onMonthChange={(d) => setMonth(d.clone())} />
    </div>
  );
}

export default App;
