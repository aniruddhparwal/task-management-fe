import React from "react";
function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard__left">
        <div className="dashboard__left--top">Task Manager</div>
        <div className="dashboard__left--middle">
          <div className="dashboard__left--middle--option">Overview</div>
          <div className="dashboard__left--middle--option">Stats</div>
          <div className="dashboard__left--middle--option">Project</div>
          <div className="dashboard__left--middle--option">Chat</div>
          <div className="dashboard__left--middle--option">Calendar</div>
        </div>
        <div className="dashboard__left--bottom">
          <div className="dashboard__left--bottom--option">Settings</div>
          <div className="dashboard__left--bottom--option">Log Out</div>
        </div>
      </div>
      <div className="dashboard__right"></div>
    </div>
  );
}

export default Dashboard;
