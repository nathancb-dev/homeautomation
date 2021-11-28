HAS - Home Automation system - REST API
=============================

### Observation

> All database models have the `_id`, `createdAt` and `__v` fields on their return, with only the `_id` field being informed in the request

#### Example FooStructure / BooStructure

Request

```javascript
/**/ FooStructure /**/
{
    "field_1": "value",
    "field_2": "value",
    "field_3": "value"
}

/**/ FooStructure /* represents on request */
{
    "_id": "objectId"
    "field_1": "value",
    "field_2": "value",
    "field_3": "value"
}

/**/ [FooStructure] /* represents on request */
[
  {
    "_id": "objectId"
    "field_1": "value",
    "field_2": "value",
    "field_3": "value"
  },
  ...
]

//
// With other structures inner structure
//

/**/ BooStructure /**/
{
    "_id": "objectId"
    "field_1": "value",
    "foo": FooStructure
}

/**/ BooStructure /* represents on request */
{
    "_id": "objectId"
    "field_1": "value",
    "foo": "<Foo._id>"
}

/**/ [BooStructure] /* represents on request */
[
  {
    "_id": "objectId"
    "field_1": "value",
    "foo": "<Foo._id>"
  },
  ...
]
```

Response

```javascript
/**/ FooStructure /**/
{
    "field_1": "value",
    "field_2": "value",
    "field_3": "value"
}

/**/ FooStructure /* represents on response */
{
    "_id": "objectId"
    "field_1": "value",
    "field_2": "value",
    "field_3": "value",
    "createdAt", "date",
    "__v": 0
}

/**/ [FooStructure] /* represents on response */
[
  {
    "_id": "objectId"
    "field_1": "value",
    "field_2": "value",
    "field_3": "value",
    "createdAt", "date",
    "__v": 0
  },
  ...
]

//
// With other structures inner structure
//

/**/ BooStructure /**/
{
    "_id": "objectId"
    "field_1": "value",
    "foo": FooStructure
}

/**/ BooStructure /* represents on response */
{
    "_id": "objectId"
    "field_1": "value",
    "foo": {
      "_id": "objectId"
      "field_1": "value",
      "field_2": "value",
      "field_3": "value",
      "createdAt", "date",
      "__v": 0
    },
    "createdAt", "date",
    "__v": 0
}

/**/ [BooStructure] /* represents on response */
[
  {
    "_id": "objectId"
    "field_1": "value",
    "foo": {
      "_id": "objectId"
      "field_1": "value",
      "field_2": "value",
      "field_3": "value",
      "createdAt", "date",
      "__v": 0
    },
    "createdAt", "date",
    "__v": 0
  },
  ...
]
```

# Structures

### MongoDBFilter

```javascript
{
  "filter": { // just {} empty for search all
     // mongoDB parameters for search (see mongodb Model.find docs (https://mongoosejs.com/docs/api/model.html#model_Model.find))
  }
}
```

### RoomStructure

```javascript
{
  "roomName": "Room name",
  "icon": "iconid",
  "things": [ThingStructure],
  "roles": [RoleStructure]
}
```

### LogStructure

```javascript
{
  ...
}
```

### ThingStructure

```javascript
{
  "thingInfoId", "Id on mqtt/socket for thing", // not passable on resquest
  "thingName": "Thing name",
  "icon": "iconid",
  "valueType": "enum ['string', 'int', 'double']",
  "roles": [RoleStructure]
  "device", DeviceStructure, // not passable on resquest
}
```

### DeviceStructure

```javascript
{
  "deviceInfoId": "Id on mqtt/socket for device", // not passable on resquest
  "deviceName": "Device name"
}
```

### HouseStructure

```javascript
{
  "houseName": "House teste"
}
```

### RoleStructure

```javascript
{
  "roleName": "Role name",
  "permissionLevel": 1
}
```

### UserStructure

```javascript
{
  "username": "test",
  "password": "testepass", // not received on response
  "name": "Test user",
  "roles": [RoleStructure]
}
```

# REST API

## Status

### /api/status/connected_mqtt

#### `GET`

Request

```
None
```

Response

```javascript
[
  {
    "id": "<MqttId>"
  }
]
```

### /api/status/connected_ws

#### `GET`

Request

```
None
```

Response

```javascript
[
  {
    "id": "<SocketId>"
  }
]
```

## System

### /system/reboot

#### `POST`

Request

```
None
```

Response

```javascript
{
  "msg": "restarting"
}
```

## Rooms

### /api/rooms/

#### `POST`

Request

```javascript
RoomStructure
```

Response

```javascript
{
  "room": RoomStructure
}
```

#### `GET`

Request

```javascript
MongoDBFilter
```

Response

```javascript
{
  "rooms": [RoomStructure]
}
```

#### `PUT`

Request

```javascript
RoomStructure
```

Response

```javascript
{
  "room": RoomStructure
}
```

#### `DEL`

Request

```javascript
{
  "_id": "<Room._id>"
}
```

Response

```javascript
{
  "room": RoomStructure
}
```

### /api/rooms/add_things

#### `PUT`

Request

```javascript
{
  "_id": "<Room._id>",
  "things": ["<Thing._id>"]
}
```

Response

```javascript
{
  "room": RoomStructure
}
```

### /api/rooms/remove_things

#### `PUT`

Request

```javascript
{
  "_id": "<Room._id>",
  "things": ["<Thing._id>"]
}
```

Response

```javascript
{
  "room": RoomStructure
}
```

## Logs

### /api/logs/

#### `GET`

Request

```javascript
MongoDBFilter
```

Response

```javascript
{
  "logs": [LogStructure]
}
```

## Things

### /api/things/

#### `GET`

Request

```javascript
MongoDBFilter
```

Response

```javascript
{
  "things": [ThingStructure]
}
```

#### `PUT`

Request

```javascript
ThingStructure
```

Response

```javascript
{
  "thing": ThingStructure
}
```

#### `DEL`

Request

```javascript
{
  "_id": "<Thing._id>"
}
```

Response

```javascript
{
  "thing": ThingStructure
}
```

## Devices

### /api/devices/

#### `GET`

Request

```javascript
MongoDBFilter
```

Response

```javascript
{
  "devices": [DeviceStructure]
}
```

#### `PUT`

Request

```javascript
DeviceStructure
```

Response

```javascript
{
  "device": DeviceStructure
}
```

#### `DEL`

Request

```javascript
{
  "_id": "<Device._id>"
}
```

Response

```javascript
{
  "device": DeviceStructure
}
```

## House

### /api/house/

#### `GET`

Request

```javascript
None
```

Response

```javascript
{
  "house": HouseStructure
}
```

#### `PUT`

Request

```javascript
HouseStructure // not need _id
```

Response

```javascript
{
  "house": HouseStructure
}
```

## Roles

### /api/roles/

#### `POST`

Request

```javascript
RoleStructure
```

Response

```javascript
{
  "role": RoleStructure, // role informed in request
  "updatedRoles": [RoleStructure] // additional updated roles because the permissionLevel field
}
```

#### `GET`

Request

```javascript
MongoDBFilter
```

Response

```javascript
{
  "roles": [RoleStructure]
}
```

#### `PUT`

Request

```javascript
RoleStructure
```

Response

```javascript
{
  "role": RoleStructure
}
```

#### `DEL`

Request

```javascript
{
  "_id": "<Role._id>"
}
```

Response

```javascript
{
  "role": RoleStructure
}
```

## Auth

### /api/auth/register

#### `POST`

Request

```javascript
UserStructure
```

Response

```javascript
{
  "user": UserStructure
}
```

### /api/auth/user

#### `GET`

Request

```javascript
MongoDBFilter
```

Response

```javascript
{
  "users": [UserStructure]
}
```

#### `PUT`

Request

```javascript
UserStructure // does not need the password field (will not be updated)
```

Response

```javascript
{
  "user": UserStructure
}
```

#### `DEL`

Request

```javascript
{
  "_id": "<User._id>"
}
```

Response

```javascript
{
  "user": UserStructure
}
```

### /api/auth/authenticate

#### `POST`

Request

```javascript
{
  "username": "test",
  "password": "teste"
}
```

Response

```javascript
{ 
  "user": UserStructure,
  "token": "<JWT_Token>"
}
```

### /api/auth/change_password

#### `POST`

Request

```javascript
{
  "username": "test",
  "password": "teste",
  "new_password": "teste2"
}
```

Response

```javascript
{ 
  "user": UserStructure
}
```
