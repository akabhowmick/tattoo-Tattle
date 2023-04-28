import { getArtistsFromDB, getClientsFromDB } from "../get-info-db";

export const loginClient = async ({
  email,
  password,
}) => {
  const clients = await getClientsFromDB();
  const user = clients.find(user=> user.email === email && user.password === password);
  return user;
};

export const loginArtist = async ({
  email,
  password,
}) => {
  const artists = await getArtistsFromDB();
  const user = artists.find(user=> user.email === email && user.password === password);
  return user;
};
