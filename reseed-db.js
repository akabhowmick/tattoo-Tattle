// import * as _ from "lodash-es";
// import { writeFileSync } from "fs";
// import { faker } from "@faker-js/faker";
// // const { capitalize, range, sample } = _;
// const capitalize = _.capitalize;
// const range = _.range;
// const sample = _.sample;

// const dogAmount = 20;
// const images = [
//   "/src/assets/blue-heeler.png",
//   "/src/assets/chihuahua.avif",
//   "/src/assets/boxer.png",
//   "/src/assets/corgi.png",
//   "/src/assets/cowardly.png",
//   "/src/assets/dalmation.png",
// ];
// const db = {
//   dogs: range(dogAmount).map((_, id) => ({
//     name: `${capitalize(faker.name.firstName())}`,
//     image: sample(images),
//     description: faker.random.words(sample([8, 5, 7])),
//     isFavorite: sample([true, false]),
//     id,
//   })),
// };

// writeFileSync("db.json", JSON.stringify(db), { encoding: "utf-8" });

// {
//   "clients": [
//     {
//       "id": 1,
//       "name": "Ben Beans",
//       "email": "benben@myspace.com",
//       "password": "password123",
//       "phoneNumber": "1234567890",
//       "dob": "01/01/1990"
//     },
//     {
//       "firstName": "Dave",
//       "lastName": "Clint",
//       "email": "1@2.com",
//       "password": "client.password",
//       "phoneNumber": "1234567890",
//       "id": 2
//     },
//     {
//       "firstName": "Davey",
//       "lastName": "Clinty",
//       "email": "1@2.com",
//       "password": "client.password",
//       "phoneNumber": "1234567890",
//       "id": 3
//     },
//     {
//       "firstName": "Wayne",
//       "lastName": "Durgan",
//       "email": "your.email+fakedata85363@gmail.com",
//       "password": "LI6JLflAP3m19ox",
//       "phoneNumber": "+1 868 094 8096",
//       "id": 4
//     },
//     {
//       "firstName": "Skyla",
//       "lastName": "Gerhold",
//       "email": "your.email+fakedata79009@gmail.com",
//       "password": "1AG7bB_2QkkziyQ",
//       "phoneNumber": "+1 0917577179",
//       "id": 5
//     },
//     {
//       "firstName": "Myah",
//       "lastName": "Sporer",
//       "email": "your.email+fakedata34287@gmail.com",
//       "password": "1xfpfZzsMVhMAlj",
//       "phoneNumber": "+1 254 189 6633",
//       "id": 6
//     }
//   ],
//   "artists": [
//     {
//       "id": 1,
//       "name": "Ben Benjamin",
//       "email": "benben@myspace.com",
//       "password": "password123",
//       "phoneNumber": "1234567890",
//       "dob": "01/01/1990",
//       "workState": "NY",
//       "tattooStyle": ["floral", "tribal"]
//     },
//     {
//       "firstName": "Waynet",
//       "lastName": "Durgantwwe",
//       "email": "your.email+fakedata85363@gmail.com",
//       "password": "LI6JLflAP3m1wer",
//       "phoneNumber": "+1 868 094 8096",
//       "tattooStyles": ["Old School", "Fine Line"],
//       "id": 2
//     },
//     {
//       "firstName": "Patsy",
//       "lastName": "Toy",
//       "email": "your.email+fakedata15400@gmail.com",
//       "password": "_4Y6yvr6OVMe3eI",
//       "phoneNumber": "+1 517 668 3875",
//       "tattooStyles": ["Watercolor"],
//       "id": 3
//     },
//     {
//       "firstName": "Clarissa",
//       "lastName": "Treutel",
//       "email": "your.email+fakedata11921@gmail.com",
//       "password": "vel5qY4epiMstyG",
//       "phoneNumber": "+1 479 971 6557",
//       "statesLocation": ["AR", "AS", "AZ"],
//       "tattooStyles": ["Old School", "Fine Line", "Patchwork"],
//       "id": 4
//     },
//     {
//       "firstName": "Gregg",
//       "lastName": "Emmerich",
//       "email": "your.email+fakedata20057@gmail.com",
//       "password": "BMuTM3DpXEqBymn",
//       "phoneNumber": "+1 664 828 5374",
//       "statesLocation": ["TX"],
//       "tattooStyles": ["3D"],
//       "id": 5
//     }
//   ],
//   "tattoos": [
//     {
//       "id": 1,
//       "artistId": 1,
//       "title": "First Tattoo",
//       "image": "/src/assets/tattoo1.jpg",
//       "dateCreated": "",
//       "artist": "Ben Benjamin",
//       "description": "Dummy Text 1"
//     },
//     {
//       "id": 2,
//       "artistId": 2,
//       "title": "Second Tattoo",
//       "image": "/src/assets/tattoo2.jpg",
//       "dateCreated": "",
//       "artist": "Ben Benjamin",
//       "description": "Dummy Text 2"
//     },
//     {
//       "id": 3,
//       "artistId": 1,
//       "title": "Third Tattoo",
//       "image": "/src/assets/tattoo3.jpg",
//       "dateCreated": "",
//       "artist": "Davy Benjamin",
//       "description": "Dummy Text 3"
//     },
//     {
//       "id": 4,
//       "artistId": 2,
//       "title": "Fourth Tattoo",
//       "image": "/src/assets/tattoo4.jpg",
//       "dateCreated": "",
//       "artist": "Jones Benjamin",
//       "description": "Dummy Text 4"
//     }
//   ],
//   "requests": [
//     {
//       "id": 1,
//       "tattooId": 1,
//       "artistId": 1,
//       "clientID": 1,
//       "clientName": "Ben Beans",
//       "artistName": "Ben Benjamin",
//       "messageBody": "Write something for the artist",
//       "referenceImages": "image.png",
//       "approvalStatus": "false"
//     }
//   ]
// }
