import {UserLocation, UserName, UserPicture, DateOfBirth} from './UserProps'

type UserType = {
  readonly "gender": string,
    // "gender": "male",
  readonly "name": UserName,
    // "name": { "title": "Mr", "first": "Marceau", "last": "Rolland" },
  readonly "location": UserLocation,
      // "location": {
      //   "street": { "number": 1404, "name": "Rue Paul-Duvivier" },
      //   "city": "Bordeaux",
      //   "state": "Pyrénées-Orientales",
      //   "country": "France",
      //   "postcode": 65675,
      //   "coordinates": { "latitude": "74.7399", "longitude": "144.0957" },
      //   "timezone": { "offset": "+6:00", "description": "Almaty, Dhaka, Colombo" }
      // },
  readonly "email": string,
      // "email": "marceau.rolland@example.com",
  readonly "dob": DateOfBirth,
      // "dob": { "date": "1977-07-06T09:40:40.832Z", "age": 44 },
  readonly "phone": string,
      // "phone": "03-87-01-86-24",
  readonly "picture": UserPicture
      // "picture": {
      //   "large": "https://randomuser.me/api/portraits/men/57.jpg",
      //   "medium": "https://randomuser.me/api/portraits/med/men/57.jpg",
      //   "thumbnail": "https://randomuser.me/api/portraits/thumb/men/57.jpg" }
}

export default UserType