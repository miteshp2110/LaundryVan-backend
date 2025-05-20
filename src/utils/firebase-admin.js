var admin = require("firebase-admin");

var serviceAccount = require("../../lanudry-van-firebase-adminsdk-fbsvc-75e250d5f3.json");
const { pool } = require("../config/db");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


async function sendNotificationToDevice(token, title, body, data = {}) {
  const message = {
    notification: {
      title,
      body,
    },
    data,
    token,
  };

  try {
    const response = await admin.messaging().send(message);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

const sendMassNotification = async (title, body) => {
  try {
    const [response] = await pool.query("SELECT fcmToken FROM users WHERE fcmToken IS NOT NULL");
    const tokens = response.map(row => row.fcmToken);

    if (tokens.length === 0) {
      console.log("No valid FCM tokens found.");
      return false;
    }

    const message = {
      notification: {
        title,
        body,
      },
      tokens: tokens, // valid only for sendMulticast
    };

    await admin.messaging().sendEachForMulticast(message);
    
    return true;
  } catch (error) {
    console.error('Error sending message:', error);
    return false;
  }
};

module.exports = {sendNotificationToDevice,sendMassNotification}