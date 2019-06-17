const fetch = require('node-fetch');

module.exports = {
  listOpenMergeRequests: async ({ PROJECT_ID, token }) => {
    const req = await fetch(
      `https://git.manomano.tech/api/v4/projects/${PROJECT_ID}/merge_requests?state=opened`,
      {
        headers: {
          'PRIVATE-TOKEN': token,
        },
      }
    );
    return req.json();
  },

  createComment: async ({ PROJECT_ID, MR_ID, body, token }) => {
    const cleanBody = encodeURIComponent(body);
    const req = await fetch(
      `https://git.manomano.tech/api/v4/projects/${PROJECT_ID}/merge_requests/${MR_ID}/notes?body=${cleanBody}`,
      {
        method: 'POST',
        headers: {
          'PRIVATE-TOKEN': token,
        },
      }
    );
    return req.json();
  },
};
