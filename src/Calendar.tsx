import React from "react";
import moment, { Moment } from "moment";

type CalendarProps = {
  month: Moment;
  onMonthChange: (date: Moment) => void;
};

const Calendar = ({ month, onMonthChange }: CalendarProps) => {
  const s = month.clone().startOf("month").startOf("week");
  const e = month.clone().endOf("month").endOf("week").add(1, "day");
  const d = s.clone();

  const cells = [];
  while (d.format("Y/M/D") !== e.format("Y/M/D")) {
    cells.push(d.clone());
    d.add(1, "day");
  }
  const rows = [];
  for (let i = 0; i < cells.length / 7; i++) {
    rows.push(cells.slice(i * 7, (i + 1) * 7));
  }

  return (
    <div
      style={{
        display: "inline-block",
        border: "1px solid black",
        padding: 20,
        borderRadius: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <button onClick={() => onMonthChange(month.subtract(1, "month"))}>
          prev
        </button>
        <div>{month.format("YYYY[년] M[월]")}</div>

        <button onClick={() => onMonthChange(month.add(1, "month"))}>
          next
        </button>
      </div>
      <div>
        {["일", "월", "화", "수", "목", "금", "토"].map((s) => (
          <Cell key={s} type="text" date={s} />
        ))}
        {rows.map((r, i) => (
          <div key={i}>
            {r.map((d) => (
              <Cell key={d.format()} thisMonth={month} date={d} type="date" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

type CellProps = {
  thisMonth?: Moment;
  date: Moment | string;
  type: "date" | "text";
};
const Cell = ({ thisMonth, date, type }: CellProps) => {
  const today = moment().format("Y/M/D");
  let isToday = false;

  if (type === "date") {
    let dMoment = date as Moment;
    if (today === dMoment.format("Y/M/D")) {
      isToday = true;
    }
  }

  const getTextColor = (type: string, thisMonth?: Moment) => {
    if (type !== "date") return "black";
    const color =
      thisMonth?.format("M") === (date as Moment).format("M")
        ? "black"
        : "rgba(60, 60, 67, 0.3)";
    return color;
  };

  return (
    <div
      style={{
        display: "inline-block",
        width: 30,
        height: 30,
        border: isToday ? "1px solid #00CEFF" : "",
        borderRadius: 30,
        margin: 1,
        color: getTextColor(type, thisMonth),
        textAlign: "center",
        lineHeight: "30px",
        background: isToday ? "#70DBFE" : "",
      }}
    >
      {type === "text" ? date : (date as Moment).date()}
    </div>
  );
};

export default Calendar;
