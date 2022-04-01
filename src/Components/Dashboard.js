import React from "react";
import OverviewSVG from "./../Assets/Vectoroverview.svg";
import StatsSVG from "./../Assets/VectorStats.svg";
import ProjectSVG from "./../Assets/Vectorprojects.svg";
import ChatSVG from "./../Assets/GroupChat.svg";
import CalendarSVG from "./../Assets/GroupCalendar.svg";
import SettingSVG from "./../Assets/GroupSetting.svg";
import LogoutSVG from "./../Assets/GroupLogout.svg";
import Project from "./Project";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard__left">
        <div className="dashboard__left--top">Task Manager</div>
        <div className="dashboard__left--middle">
          <div className="dashboard__left--middle--option">
            <img src={OverviewSVG} />
            Overview
          </div>
          <div className="dashboard__left--middle--option">
            <img src={StatsSVG} />
            Stats
          </div>
          <div className="dashboard__left--middle--option active">
            <img src={ProjectSVG} />
            Project
          </div>
          <div className="dashboard__left--middle--option">
            <img src={ChatSVG} />
            Chat
          </div>
          <div className="dashboard__left--middle--option">
            <img src={CalendarSVG} />
            Calendar
          </div>
        </div>
        <div className="dashboard__left--bottom">
          <div className="dashboard__left--bottom--option">
            <img src={SettingSVG} />
            Settings
          </div>
          <div className="dashboard__left--bottom--option">
            <img src={LogoutSVG} />
            Log Out
          </div>
        </div>
      </div>
      <div className="dashboard__right">
        <Project />
      </div>
    </div>
  );
}

export default Dashboard;
