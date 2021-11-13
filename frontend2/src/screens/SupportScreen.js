import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { useSelector } from 'react-redux';
import MessageBox from '../components/MessageBox';

let allUsers = []; 
    // allUsers gets updated when listUsers event happens
    // setUsers(allUsers)
let allMessages = []; // setMessages(allMessages)
let allSelectedUser = {}; // setSelectedUser(allSelectedUser)
const ENDPOINT =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:5000'
    : window.location.host;
export default function SupportScreen() {
  const [selectedUser, setSelectedUser] = useState({});
  const [socket, setSocket] = useState(null);
  // a mutable ref object whose .current property is initialized to the passed argument (initialValue)
  // uiMessagesRef: a <ul> of messages <li>s
  // use (map, index) to fix the missing key issue
  const uiMessagesRef = useRef(null); // uiMessagesRef.current = null;
  const [messageBody, setMessageBody] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (uiMessagesRef.current) {
        // set scrollwindow margins by x, y coordinate
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,// clientHeight: window height
        left: 0,
        behavior: 'smooth',
      });
    }

    // set up socket when there's no socket yet
    // 3 situations
        // 1. the Admin first sends out a message by clicking the submit button 
            // -> submit handler
        // 2. socket gets initialized
        // 3. users get changed when admin selects a user, which sets user.unread to false.
    if (!socket) {
      const sk = socketIOClient(ENDPOINT); 
      setSocket(sk);
      // emit event 'onLogin' to server.
      // and then listens to a series of events
      sk.emit('onLogin', { // emit Admin's login
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      console.log("onLogin emitted for user", userInfo.name);
      sk.on('message', (data) => {
        if (allSelectedUser._id === data._id) {
          allMessages = [...allMessages, data];
        } else {
          const existUser = allUsers.find((user) => user._id === data._id);
          if (existUser) {
            allUsers = allUsers.map((user) =>
              user._id === existUser._id ? { ...user, unread: true } : user
            );
            setUsers(allUsers);
          }
        }
        setMessages(allMessages);
      });
      // listens to regular users login
      sk.on('updateUser', (updatedUser) => {
        const existUser = allUsers.find((user) => user._id === updatedUser._id);
        if (existUser) {
          allUsers = allUsers.map((user) =>
            user._id === existUser._id ? updatedUser : user
          );
          setUsers(allUsers);
        } else {
          allUsers = [...allUsers, updatedUser];
          setUsers(allUsers);
        }
      });
      sk.on('listUsers', (updatedUsers) => {
        allUsers = updatedUsers;
        setUsers(allUsers);
      });
      sk.on('selectUser', (user) => {
        allMessages = user.messages;
        setMessages(allMessages);
      });
    }
  }, [messages, socket, users]);

  // selectUser function handler
  // user parameter is input by admin clicking the button
  const selectUser = (user) => {
    allSelectedUser = user;
    setSelectedUser(allSelectedUser); // selectedUser = allSelectedUser = user
    const existUser = allUsers.find((x) => x._id === user._id);
    if (existUser) { // select a user implies reading the user's message
        // update the allUsers array with unread attribute updated
        allUsers = allUsers.map((x) =>
        x._id === existUser._id ? { ...x, unread: false } : x
      );
      setUsers(allUsers);
    }
    socket.emit('onUserSelected', user);
  };

  // setMessages(allMessages);
  // setMessageBody
  // socket.emit message ("onMessage")
  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert('Error. Please type message.');
    } else {
      allMessages = [
        ...allMessages,
        { body: messageBody, name: userInfo.name },
      ];
      setMessages(allMessages);
      setMessageBody('');
      setTimeout(() => {
        socket.emit('onMessage', {
          body: messageBody,
          name: userInfo.name,
          isAdmin: userInfo.isAdmin,
          _id: selectedUser._id,
        });
      }, 1000);
    }
  };
  // users.filter((x) => x._id !== userInfo._id
  // userInfo refers to admin
  return (
    <div className="row top full-container">
      <div className="col-2 support-users">
        {users.filter((x) => x._id !== userInfo._id).length === 0 && (
          <MessageBox>No buyer has contacted you yet.</MessageBox>
        )}
        <ul>
          {users
            .filter((x) => x._id !== userInfo._id)
            .map((user) => (
              <li
                key={user._id}
                className={user._id === selectedUser._id ? '  selected' : '  '}
              >
                <button
                  className="block"
                  type="button"
                  onClick={() => selectUser(user)}
                >
                  {user.name}
                </button>
                <span
                  className={
                    user.unread ? 'unread' : user.online ? 'online' : 'offline'
                  }
                />
              </li>
            ))}
        </ul>
      </div>
      <div className="col-3 support-messages">
        {!selectedUser._id ? (
          <MessageBox>Select a user to start chat</MessageBox>
        ) : (
          <div>
            <div className="row">
              <strong>Chat with {selectedUser.name} </strong>
            </div>
            <ul ref={uiMessagesRef}>
              {messages.length === 0 && <li>No message.</li>}
              {messages.map((msg, index) => (
                <li key={index}>
                  <strong>{`${msg.name}: `}</strong> {msg.body}
                </li>
              ))}
            </ul>
            <div>
              <form onSubmit={submitHandler} className="row">
                <input
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  type="text"
                  placeholder="type message"
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}