import { Close } from "@mui/icons-material";
import { Drawer } from "@mui/material";
import { Modal } from "@mui/material";
import { Avatar } from "@mui/material";
import React from "react";
import SearchSVG from "./../Assets/VectorSearchIcon.svg";
import { v4 } from "uuid";
import _ from "lodash";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";

const item = {
  id: v4(),
  name: "Clean the house",
  createdBy: "John Doe",
  imgURL: "https://picsum.photos/300",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
};

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
      items: [item],
    },
    done: {
      title: "Done",
      items: [],
    },
  });

  const onDragEnd = ({ destination, source }) => {
    console.log("from", source);
    console.log("to", destination);
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
  };

  const addItem = (keyvalue, title) => {
    console.log("keyvalue", keyvalue);

    keyvalue == "inProgress"
      ? setState((prev) => {
          console.log("prev", prev);
          return {
            ...prev,
            inProgress: {
              title: title,
              items: [
                {
                  id: v4(),
                  name: newtaskTitle,
                  createdBy: "John Doe",
                  imgURL: "https://picsum.photos/300",
                  description: newtaskDescription,
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
                  id: v4(),
                  name: newtaskTitle,
                  createdBy: "John Doe",
                  imgURL: "https://picsum.photos/300",
                  description: newtaskDescription,
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
                  id: v4(),
                  name: newtaskTitle,
                  createdBy: "John Doe",
                  imgURL: "https://picsum.photos/300",
                  description: newtaskDescription,
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
    console.log(task);
    setSelectedTask(task);
    setTaskDetailsDrawer(true);
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
          <span>Hi Saundarya</span>
          <Avatar />
        </div>
      </div>
      <div className="project__middle">
        <span>Projects</span>
      </div>
      <div className="project__bottom">
        <DragDropContext onDragEnd={onDragEnd}>
          {_.map(state, (data, key) => {
            console.log("èeee", key, data);
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
                    console.log("area ", snapshot);
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
                              key={el.id}
                              index={i}
                              draggableId={el.id}
                            >
                              {(provided, snapshot) => {
                                console.log("snapshot ", snapshot);
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
                                    <span> {el.name}</span>
                                    <p>{el.description} </p>
                                    <Avatar src={el.imgURL} />
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

        {/* <div className="project__bottom--col">
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
        </div> */}
      </div>

      <Drawer
        anchor={"right"}
        open={taskDetailsDrawer}
        onClose={() => setTaskDetailsDrawer(false)}
      >
        <div className="taskDetailDrawer">
          <div className="taskDetailDrawer__header">
            <span>{selectedTask.name}</span>
            <hr />
          </div>
          <div className="taskDetailDrawer__body">
            <div className="taskDetailDrawer__body--item">
              <span>Created By</span>
              <span>
                <Avatar src={selectedTask.imgURL} />
                <span>{selectedTask.createdBy}</span>
              </span>
            </div>
            <div className="taskDetailDrawer__body--item">
              <span>Description</span>
              <span>{selectedTask.description}</span>
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
