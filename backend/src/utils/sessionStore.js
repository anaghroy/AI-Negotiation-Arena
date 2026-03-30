const sessions = {};

export function createNewSession(sessionId, data) {
  sessions[sessionId] = data;
}

export function getSession(sessionId) {
  return sessions[sessionId];
}