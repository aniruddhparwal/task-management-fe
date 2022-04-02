import React from "react";
import OverviewSVG from "./../Assets/Vectoroverview.svg";
import StatsSVG from "./../Assets/VectorStats.svg";
import ProjectSVG from "./../Assets/Vectorprojects.svg";
import ChatSVG from "./../Assets/GroupChat.svg";
import CalendarSVG from "./../Assets/GroupCalendar.svg";
import SettingSVG from "./../Assets/GroupSetting.svg";
import LogoutSVG from "./../Assets/GroupLogout.svg";
import Project from "./Project";
import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [logOutModal, setLogOutModal] = React.useState(false);
  const navigate = useNavigate();
  const handleLogOut = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/logout`, {
        withCredentials: true,
      })
      .then(function (response) {
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="dashboard">
      <div className="dashboard__left">
        <div className="dashboard__left--top">Task Manager</div>
        <div className="dashboard__left--middle">
          <div className="dashboard__left--middle--option">
            <img src={OverviewSVG} />
            <div className="dashboard__left--middle--option--text">
              Overview
            </div>
          </div>
          <div className="dashboard__left--middle--option">
            <img src={StatsSVG} />
            <div className="dashboard__left--middle--option--text"> Stats</div>
          </div>
          <div className="dashboard__left--middle--option active">
            <img src={ProjectSVG} />
            <div className="dashboard__left--middle--option--text">
              {" "}
              Project
            </div>
          </div>
          <div className="dashboard__left--middle--option">
            <img src={ChatSVG} />
            <div className="dashboard__left--middle--option--text"> Chat</div>
          </div>
          <div className="dashboard__left--middle--option">
            <img src={CalendarSVG} />
            <div className="dashboard__left--middle--option--text">
              Calendar
            </div>
          </div>
        </div>
        <div className="dashboard__left--bottom">
          <div className="dashboard__left--bottom--option">
            <img src={SettingSVG} />
            <div className="dashboard__left--middle--option--text">
              Settings
            </div>
          </div>
          <div
            className="dashboard__left--bottom--option"
            onClick={() => {
              setLogOutModal(true);
            }}
            style={{ cursor: "pointer" }}
          >
            <img src={LogoutSVG} />
            <div className="dashboard__left--middle--option--text">Log Out</div>
          </div>
        </div>
      </div>
      <div className="dashboard__right">
        <Project />
      </div>
      <Modal
        open={logOutModal}
        onClose={() => setLogOutModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="logoutModal">
          <div className="logoutModal__content">
            <div className="logoutModal__content--header">
              <span> Are you sure you want to log out?</span>
              <hr />
            </div>
            <div className="logoutModal__content--body">
              <button onClick={() => handleLogOut()}>Yes</button>
              <button onClick={() => setLogOutModal(false)}>No</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Dashboard;
