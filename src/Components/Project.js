import { Close } from "@mui/icons-material";
import { Drawer } from "@mui/material";
import { Modal } from "@mui/material";
import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import SearchSVG from "./../Assets/VectorSearchIcon.svg";
import { v4 } from "uuid";
import _ from "lodash";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";

function Project() {
  const [newTask, setNewTask] = React.useState("");
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
  const [username, setUsername] = React.useState("");
  const [addNew, setAddNew] = React.useState("");
  const [taskDetailsDrawer, setTaskDetailsDrawer] = React.useState(false);
  const [memberModal, setMemberModal] = React.useState(false);
  const [newtaskTitle, setNewtaskTitle] = React.useState("");
  const [newtaskDescription, setNewtaskDescription] = React.useState("");
  const [selectedTask, setSelectedTask] = React.useState({});
  const [state, setState] = React.useState({
    todo: {
      title: "Todo",
      items: [],
    },
    inProgress: {
      title: "In-progress",
      items: [],
    },
    done: {
      title: "Done",
      items: [],
    },
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUsername(() => {
      return location.state.name ? location.state.name : "";
    });

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/getAllTask`, {
        withCredentials: true,
      })
      .then((res) => {
        setState(res.data);
        console.log("ssss", res);
      })
      .catch((err) => {});
  }, []);

  const onDragEnd = ({ destination, source }) => {
    if (!destination) {
      console.log("destination is null");
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      console.log("destination is same as source");
      return;
    }

    const itemCopy = { ...state[source.droppableId].items[source.index] };

    setState((prev) => {
      prev = { ...prev };
      prev[source.droppableId].items.splice(source.index, 1);
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );
      return prev;
    });

    const idList = [];
    for (let i = 0; i < state[destination.droppableId].items.length; i++) {
      idList.push(state[destination.droppableId].items[i]._id);
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/v1/updateAllTask`,
        {
          task_idList: idList,
          task_type: destination.droppableId,
        },
        { withCredentials: true }
      )
      .then((res) => {})
      .catch((err) => {});
  };

  const addItem = async (keyvalue, title) => {
    if (newtaskTitle === "" || newtaskDescription === "") {
      alert("Please fill all the fields");
      return;
    }
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/addTask`,
      {
        task_createdBy: username,
        task_creater_imgURL: "https://picsum.photos/300",
        task_name: newtaskTitle,
        task_description: newtaskDescription,
        task_type: keyvalue,
      },
      { withCredentials: true }
    );
    keyvalue == "inProgress"
      ? setState((prev) => {
          console.log("prev", prev);
          return {
            ...prev,
            inProgress: {
              title: title,
              items: [
                {
                  _id: result.data._id,
                  task_name: newtaskTitle,
                  task_createdBy: username,
                  task_creater_imgURL: "https://picsum.photos/300",
                  task_description: newtaskDescription,
                },
                ...prev.inProgress.items,
              ],
            },
          };
        })
      : keyvalue == "done"
      ? setState((prev) => {
          console.log("prev", prev);
          return {
            ...prev,
            done: {
              title: title,
              items: [
                {
                  _id: result.data._id,
                  task_name: newtaskTitle,
                  task_createdBy: username,
                  task_creater_imgURL: "https://picsum.photos/300",
                  task_description: newtaskDescription,
                },
                ...prev.done.items,
              ],
            },
          };
        })
      : setState((prev) => {
          console.log("prev", prev);
          return {
            ...prev,
            todo: {
              title: title,
              items: [
                {
                  _id: result.data._id,
                  task_name: newtaskTitle,
                  task_createdBy: username,
                  task_creater_imgURL: "https://picsum.photos/300",
                  task_description: newtaskDescription,
                },
                ...prev.todo.items,
              ],
            },
          };
        });

    setNewTask("");
    setNewtaskDescription("");
    setNewtaskTitle("");
    setAddNew("");
  };

  const handleTaskSelection = (task) => {
    setSelectedTask(task);
    setTaskDetailsDrawer(true);
  };

  const handleTaskDelete = (e, task, i) => {
    e.stopPropagation();
    // "http://localhost:4000/api/v1/deleteTask",

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/v1/deleteTask`,
        {
          task_id: task._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setState((prev) => {
          prev = { ...prev };
          prev[task.task_type].items.splice(i, 1);
          return prev;
        });
      })
      .catch((err) => {});
  };

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
          {memberList.map((member, i) => (
            <span key={i} className="avatar">
              <img src={member.imgURL} />
            </span>
          ))}
        </div>
        <div className="project__top--profile">
          <span>Hi {username}</span>
          <Avatar />
        </div>
      </div>
      <div className="project__middle">
        <span>Projects</span>
      </div>
      <div className="project__bottom">
        <DragDropContext onDragEnd={onDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <div key={key} className="project__bottom--col">
                <div className="project__bottom--col--header">
                  <span>{data.title}</span>
                  <div>{data.items.length}</div>
                </div>
                <button
                  onClick={() =>
                    addNew == ""
                      ? setAddNew(key)
                      : addNew == key
                      ? setAddNew("")
                      : setAddNew(key)
                  }
                >
                  +
                </button>
                {addNew == key ? (
                  <div className="project__bottom--add">
                    <input
                      type="text"
                      value={newtaskTitle}
                      onChange={(e) => setNewtaskTitle(e.target.value)}
                      placeholder="Give your task a title "
                    />
                    <input
                      type="text"
                      value={newtaskDescription}
                      onChange={(e) => setNewtaskDescription(e.target.value)}
                      placeholder="Description.. "
                    />
                    <button onClick={() => addItem(key, data.title)}>
                      Add
                    </button>
                  </div>
                ) : null}
                <Droppable droppableId={key}>
                  {(provided, snapshot) => {
                    // console.log("area ", snapshot);
                    return (
                      <div
                        ref={provided.innerRef}
                        className={`project__bottom--col--body ${
                          snapshot.isDraggingOver && "dragging-over"
                        }`}
                        {...provided.droppableProps}
                      >
                        {data.items.map((el, i) => {
                          return (
                            <Draggable
                              key={el._id}
                              index={i}
                              draggableId={el._id}
                            >
                              {(provided, snapshot) => {
                                // console.log("snapshot ", snapshot);
                                return (
                                  <div
                                    onClick={() => handleTaskSelection(el)}
                                    className={`project__bottom--col--body--item  ${
                                      snapshot.isDragging ? "dragging" : ""
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <span> {el.task_name}</span>
                                    <p>{el.task_description} </p>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignContent: "center",
                                      }}
                                    >
                                      <Avatar src={el.task_creater_imgURL} />
                                      <Delete
                                        style={{ zIndex: "100" }}
                                        onClick={(e) =>
                                          handleTaskDelete(e, el, i)
                                        }
                                        color="disabled"
                                      />
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>

      <Drawer
        anchor={"right"}
        open={taskDetailsDrawer}
        onClose={() => setTaskDetailsDrawer(false)}
      >
        <div className="taskDetailDrawer">
          <div className="taskDetailDrawer__header">
            <span>{selectedTask.task_name}</span>
            <hr />
          </div>
          <div className="taskDetailDrawer__body">
            <div className="taskDetailDrawer__body--item">
              <span>Created By</span>
              <span>
                <Avatar src={selectedTask.task_creater_imgURL} />
                <span>{selectedTask.task_createdBy}</span>
              </span>
            </div>
            <div className="taskDetailDrawer__body--item">
              <span>Description</span>
              <span>{selectedTask.task_description}</span>
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
                <div key={i} className="memberModal__content--body--item">
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
