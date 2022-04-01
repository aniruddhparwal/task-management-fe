import { Close } from "@mui/icons-material";
import { Drawer } from "@mui/material";
import { Modal } from "@mui/material";
import { Avatar } from "@mui/material";
import React from "react";
import SearchSVG from "./../Assets/VectorSearchIcon.svg";

function Project() {
  const memberList = [
    {
      name: "Rama",
      imgURL: "https://www.w3schools.com/howto/img_avatar.png",
      email: "example@exam.com",
    },
    {
      name: "Rama",
      imgURL: "https://www.w3schools.com/howto/img_avatar.png",
      email: "example@exam.com",
    },
    {
      name: "Rama",
      imgURL: "https://www.w3schools.com/howto/img_avatar.png",
      email: "example@exam.com",
    },
    {
      name: "Rama",
      imgURL: "https://www.w3schools.com/howto/img_avatar.png",
      email: "example@exam.com",
    },
    {
      name: "Rama",
      imgURL: "https://www.w3schools.com/howto/img_avatar.png",
      email: "example@exam.com",
    },
  ];
  const [taskDetailsDrawer, setTaskDetailsDrawer] = React.useState(false);
  const [memberModal, setMemberModal] = React.useState(false);
  return (
    <div className="project">
      <div className="project__top">
        <div className="project__top--search">
          <img src={SearchSVG} />
          <input type="text" placeholder="Search" />
        </div>
        <div
          className="project__top--members"
          onClick={() => setMemberModal(true)}
        >
          {memberList.map((member) => (
            <span className="avatar">
              <img src={member.imgURL} />
            </span>
          ))}
        </div>
        <div className="project__top--profile">
          <span>Hi Saundarya</span>
          <Avatar />
        </div>
      </div>
      <div className="project__middle">
        <span>Projects</span>
      </div>
      <div className="project__bottom">
        <div className="project__bottom--col">
          <div className="project__bottom--col--header">
            <span>To do</span>
            <div>2</div>
          </div>
          <button>+</button>
          <div className="project__bottom--col--body">
            <div className="project__bottom--col--body--item">
              <span> Task Name</span>
              <p>losdfsfs sfsf sfs fsf fs fs </p>
              <Avatar />
            </div>
            <div className="project__bottom--col--body--item">
              <span> Task Name</span>
              <p>losdfsfs sfsf sfs fsf fs fs </p>
              <Avatar />
            </div>
            <div className="project__bottom--col--body--item">
              <span> Task Name</span>
              <p>losdfsfs sfsf sfs fsf fs fs </p>
              <Avatar />
            </div>
            <div className="project__bottom--col--body--item">
              <span> Task Name</span>
              <p>losdfsfs sfsf sfs fsf fs fs </p>
              <Avatar />
            </div>
          </div>
        </div>
        <div className="project__bottom--col">
          <div className="project__bottom--col--header">
            <span>To do</span>
            <div>2</div>
          </div>
          <button>+</button>
          <div className="project__bottom--col--body">
            <div
              className="project__bottom--col--body--item"
              onClick={() => setTaskDetailsDrawer(true)}
            >
              <span> Task Name</span>
              <p>losdfsfs sfsf sfs fsf fs fs </p>
              <Avatar />
            </div>
            <div className="project__bottom--col--body--item">
              <span> Task Name</span>
              <p>losdfsfs sfsf sfs fsf fs fs </p>
              <Avatar />
            </div>
            <div className="project__bottom--col--body--item">
              <span> Task Name</span>
              <p>losdfsfs sfsf sfs fsf fs fs </p>
              <Avatar />
            </div>
            <div className="project__bottom--col--body--item">
              <span> Task Name</span>
              <p>losdfsfs sfsf sfs fsf fs fs </p>
              <Avatar />
            </div>
          </div>
        </div>
      </div>

      <Drawer
        anchor={"right"}
        open={taskDetailsDrawer}
        onClose={() => setTaskDetailsDrawer(false)}
      >
        <div className="taskDetailDrawer">
          <div className="taskDetailDrawer__header">
            <span>Task Name</span>
            <hr />
          </div>
          <div className="taskDetailDrawer__body">
            <div className="taskDetailDrawer__body--item">
              <span>Created By</span>
              <span>
                <Avatar />
                <span>Vaibhav</span>
              </span>
            </div>
            <div className="taskDetailDrawer__body--item">
              <span>Description</span>
              <span>
                Modifying Career, Scholarship and Entrance exam screen Acc to
                new design pattern
              </span>
            </div>
          </div>
        </div>
      </Drawer>

      <Modal
        open={memberModal}
        onClose={() => setMemberModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="memberModal">
          <div className="memberModal__content">
            <div className="memberModal__content--header">
              <span>
                Project Members{" "}
                <Close
                  color="disabled"
                  fontSize="small"
                  onClick={() => setMemberModal(false)}
                />
              </span>
              <hr />
            </div>
            <div className="memberModal__content--body">
              {memberList.map((member, i) => (
                <div className="memberModal__content--body--item">
                  <div className="memberModal__content--body--item--left">
                    <Avatar src={member.imgURL} />
                  </div>
                  <div className="memberModal__content--body--item--right">
                    <span>{member.name}</span>
                    <span>{member.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Project;
