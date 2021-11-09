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

// Session Initialize
export async function talkSessionInitialize(user) {
  await Talk.ready;
  const me = new Talk.User({
    id: user._id,
    name: user.name
  });
  const session = new Talk.Session({
    appId: 'tpo5lj4E',
    me: me,
  });
  return session;
}
/*
Session Initialization:
  Two scenarios where session initialization is needed:
    1. successful user log in
    2. Application load
        => save session data in userInfo in localStorage
*/

// create a conversationBuilder for a given session
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
