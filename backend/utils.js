import jwt from 'jsonwebtoken';
import * as Talk from 'talkjs'; //npm install talkjs --save // install the TalkJS JavaScript SDK

// localStorage saves userInfo when browser is closed and reopened.
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};

// TalkJS guide:
// https://talkjs.com/resources/add-buyer-seller-chat-into-a-marketplace-with-react/


/*
// Session Initialize
export async function talkSessionInitialize(user) {
  // create a talkJS user
  // synchronize user data with TalkJS, so we can display it inside the chat UI
  await Talk.ready;
  const me = new Talk.User({
    id: user._id,
    name: user.name,
    email: user.email,
  });
  const session = new Talk.Session({
    appId: 'tpo5lj4E', //replace YOUR_APP_ID with the appId found in the TalkJS dashboard
    me: me,
  });
  return session;
}


// create another user which we'll create a conversation with. 
// For this example, we'll use a hardcoded dummy user

var other = new Talk.User({
  id: '654321',
  name: 'Sebastian',
  email: 'Sebastian@example.com',
});

// The getOrCreateConversation method attempts to get the conversation 
// between the two users if it previously exists or create a new one otherwise. 
var conversation = window.talkSession.getOrCreateConversation(
  Talk.oneOnOneId(me, other)
);
conversation.setParticipant(me);
conversation.setParticipant(other);


// Create and Mount the Inbox
// It shows a user's conversation history and it allows them to write messages.

// create the Inbox
var inbox = window.talkSession.createInbox({ selected: conversation });
// call the Inbox mount method after creating the Inbox to make it visible on your app.
const talkjsContainer = React.createRef();

/*
export async function getOrCreateConversation(session, currentUser, otherUser) {   
  const currentTalkUser = await new Talk.User({
    id: currentUser._id,
    name: currentUser.name
  });
  const otherTalkUser = await new Talk.User({
    id: otherUser._id,
    name: otherUser.name
  });
  
  const conversationBuilder = session.getOrCreateConversation(Talk.oneOnOneId(currentTalkUser, otherTalkUser));
  conversationBuilder.setParticipant(currentTalkUser);
  conversationBuilder.setParticipant(otherTalkUser);
  
  return conversationBuilder;
}
*/
