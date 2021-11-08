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

// TalkUtils: return TalkUser instance
// Change this to your actual AppId which can be
// found in the TalkJS dashboard.
export const appId = 'tpo5lj4E';
export async function createTalkUser(user) {
    await Talk.ready;
    return new Talk.User({
            id: user._id,
            name: user.name
         });
}
// Session Initialize
const sessionDeferred = new Deferred();
export async function talkSessionInitialize(user) {
    await Talk.ready;
    sessionDeferred.resolve(new Talk.Session({
        appId: appId,
        me: await createTalkUser(user)
    }));
}
export function talkSessionGet(){
    return sessionDeferred.promise;
}

/*
Session Initialization:
  Two scenarios where session initialization is needed:
    1. successful user log in 
    2. Application load
        => save session data in userInfo in localStorage
*/
