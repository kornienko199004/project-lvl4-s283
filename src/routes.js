const root = '/api/v1/';

export default {
  channelsUrl: () => `${root}channels/`,
  channelUrl: id => `${root}channels/${id}`,
  messageslUrl: id => `${root}channels/${id}/messages`,
};
