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
      .get("http://localhost:4000/api/v1/logout", { withCredentials: true })
      .then(function (response) {
        navigate("/");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    // var myHeaders = new Headers();

    // var requestOptions = {
    //   method: "GET",
    //   headers: myHeaders,
    //   redirect: "follow",
    // };

    // fetch("http://localhost:4000/api/v1/logout", requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => {
    //     console.log(result);
    //     navigate("/");
    //   })
    //   .catch((error) => console.log("error", error));
  };

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
          <div
            className="dashboard__left--bottom--option"
            onClick={() => {
              setLogOutModal(true);
            }}
            style={{ cursor: "pointer" }}
          >
            <img src={LogoutSVG} />
            Log Out
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
