import venom from 'venom-bot';

let client;

const initializeVenom = async () => {
  if (!client) {
    client = await venom.create({
      session: 'session-name', // You can change the session name
      multidevice: true // Use multi-device beta feature if needed
    });
  }
  return client;
};

export const verifyWhatsAppNumber = async (phoneNumber) => {
  try {
    const venomClient = await initializeVenom();
    const isValid = await venomClient.isRegisteredUser(phoneNumber);
    return isValid;
  } catch (error) {
    console.error('Error verifying WhatsApp number:', error);
    return false;
  }
};

export const sendMessage = async (phoneNumber, message) => {
  try {
    const venomClient = await initializeVenom();
    await venomClient.sendText(phoneNumber, message);
    console.log('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
  }
};
