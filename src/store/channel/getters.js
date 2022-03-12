import { date } from 'quasar';

export function getConversation(state) {
  const conversation = [];

  state.messages.forEach((message, messageIndex) => {
    // Message juste avant
    const lastMessage = messageIndex > 0
      ? state.messages[messageIndex - 1]
      : false;
    const formatedDate = date.formatDate(message.date, 'YYYY-MM-DDTHH:mm:ss');

    if (lastMessage !== false
      && (message.date - lastMessage.date < 6000)
      && lastMessage.author.uuid === message.author.uuid) {
      // On complète le message d'avant
      conversation[conversation.length - 1].messages.push(message.text);
      conversation[conversation.length - 1].date = formatedDate;
    } else {
      conversation.push({
        ...message,
        messages: [message.text],
        date: formatedDate,
      });
    }
  });

  return conversation;
}
