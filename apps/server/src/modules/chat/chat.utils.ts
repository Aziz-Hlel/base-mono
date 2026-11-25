// Sorted so both people get the same key whoever starts the chat
export const toDirectKey = (profileIdA: string, profileIdB: string) =>
  [profileIdA, profileIdB].sort().join('_');
