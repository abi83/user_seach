export type DateOfBirth = {
  "date": Date,
  "age": number
}

export type UserName = {
  "title": string,
  "first": string,
  "last": string
}

export type UserTimezone = {
    "street": Object,
    "city": string,
    "state": string,
    "country": string,
    "postcode": number,
    "coordinates": Object,
    "timezone": Object
}

export type UserLocation = {
     "street": Object, //{ "number": 1404, "name": "Rue Paul-Duvivier" }
     "city": string,
     "state": string,
     "country": string,
     "postcode": number,
     "coordinates": Object, //{ "latitude": "74.7399", "longitude": "144.0957" }
     "timezone": UserTimezone
}

export type UserPicture = {
    "large": string,
    "medium": string,
    "thumbnail": string
}