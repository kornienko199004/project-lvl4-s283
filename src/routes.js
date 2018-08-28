/*
const host = '';

export default {
  channelsUrl: () => [host, 'channels'].join('/'),
  channelUrl: id => [host, 'channels', `:${id}`].join('/'),
  messageslUrl: id => [host, `:${id}`, 'messages'].join('/'),
};
*/
const root = '/api/v1/';
/*
export const channelsUrl = () => `${root}channels/`;
export const channelUrl = id => `${root}channels/${id}`;
export const messageslUrl = channelId => `${root}channels/${channelId}/messages`;
*/
export default {
  channelsUrl: () => `${root}channels/`,
  channelUrl: id => `${root}channels/${id}`,
  messageslUrl: id => `${root}channels/${id}/messages`,
};
