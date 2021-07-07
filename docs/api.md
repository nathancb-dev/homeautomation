HAS - Home Automation system - API
=============================

# Status (/api/status)

## /connected_mqtt

### `GET`

#### Request

```
None
```

#### Response

```javascript
[]
```

## /connected_ws

### `GET`

#### Request

```
None
```

#### Response

```javascript
[
  {
    "id": "XCrVE41cgIna6QB9AAAB"
  }
]
```

# System (/system)

## /reboot

### `POST`

#### Request

```
None
```

#### Response

```javascript
{
  "msg": "restarting"
}
```

# Rooms (/api/rooms)

## /

### `POST`

#### Request

```javascript
{
    "roomName": "Room name",
    "icon": "iconid",
    "things": ["<Thing._id>"],
    "roles": ["<Role._id>"]
}
```

#### Response (RoomStructure)

```javascript
{
  "room": {
    "things": [ThingStructure],
    "roles": [RoleStructure],
    "_id": "60e4d2d80b8f470218664a0d",
    "roomName": "Room name",
    "icon": "iconid",
    "createdAt": "2021-07-06T22:02:00.436Z",
    "__v": 0
  }
}
```

### `GET`

#### Request

```javascript
{
	"filter": {
        MongoDBFilter
    }
}
```

#### Response

```javascript
{
  "rooms": [RoomStructure]
}
```

### `PUT`

#### Request

```javascript
{
	"_id": "<Room._id>",
	"roomName": "Room name",
	"icon": "iconid",
	"things": ["<Thing._id>"],
	"roles": ["<Role._id>"]
}
```

#### Response

```javascript
{
  "room": [RoomStructure]
}
```

### `DEL`

#### Request

```javascript
{
	"_id": "<Room._id>"
}
```

#### Response

```javascript
{
  "room": RoomStructure
}
```

## /add_things

### `PUT`

#### Request

```javascript
{
	"_id": "<Room._id>",
	"things": ["<Thing._id>"]
}
```

#### Response

```javascript
{
  "room": [RoomStructure]
}
```

## /remove_things

### `PUT`

#### Request

```javascript
{
	"_id": "<Room._id>",
	"things": ["<Thing._id>"]
}
```

#### Response

```javascript
{
  "room": [RoomStructure]
}
```

# Logs (/api/logs)

## /

### `GET`

#### Request

```javascript
{
	"filter": {
        MongoDBFilter
    }
}
```

#### Response

```javascript
{
  "logs": [LogStructure]
}
```

# Things (/api/things)

## /

### `GET`

#### Request

```javascript
{
	"filter": {
        MongoDBFilter
    }
}
```

#### Response

```javascript
{
  "things": [ThingStructure]
}
```

### `PUT`

#### Request

```javascript
{
	"_id": "<Thing._id>",
	"thingName": "Thing name",
	"icon": "iconid",
	"valueType": "enum ['string', 'int', 'double']",
	"roles": ["<Role._id>"]
}
```

#### Response

```javascript
{
  "thing": ThingStructure
}
```

### `DEL`

#### Request

```javascript
{
	"_id": "<Thing._id>"
}
```

#### Response

```javascript
{
  "thing": ThingStructure
}
```

# Devices (/api/devices)

## /

### `GET`

#### Request

```javascript
{
	"filter": {
        MongoDBFilter
    }
}
```

#### Response

```javascript
{
  "devices": [
    {
      "_id": "60c2ace2ee4ea708b583ab3a",
      "deviceInfoId": "Device name",
      "createdAt": "2021-06-11T00:22:58.548Z",
      "__v": 0
    }
  ]
}
```

### `PUT`

#### Request

```javascript
{
	"_id": "<Device._id>",
	"deviceName": "Device name"
}
```

#### Response

```javascript
{
  "device": DeviceStructure
}
```

### `DEL`

#### Request

```javascript
{
	"_id": "<Device._id>"
}
```

#### Response

```javascript
{
  "device": DeviceStructure
}
```

# House (/api/house)

## /

### `GET`

#### Request

```javascript
None
```

#### Response

```javascript
{
  "house": {
    "createdAt": "2021-06-01T23:30:48.150Z",
    "updatedAt": "2021-06-01T23:30:52.777Z",
    "_id": "60b6c32caaee5a036ac8c851",
    "houseName": "Casa teste",
    "__v": 0
  }
}
```

### `PUT`

#### Request

```javascript
{
	"houseName": "Casa teste"
}
```

#### Response

```javascript
{
  "house": HouseStructure
}
```

# Roles (/api/roles)

## /

### `POST`

#### Request

```javascript
{
	"roleName": "usuario comum",
	"permissionLevel": 1
}
```

#### Response

```javascript
{
  "role": {
    "_id": "60c7870c92531001c2be09a6",
    "roleName": "usuario comumd",
    "permissionLevel": 1,
    "createdAt": "2021-06-14T16:42:52.908Z",
    "__v": 0
  },
  "updatedRoles": [RoleStructure]
}
```

### `GET`

#### Request

```javascript
{
	"filter": {
        MongoDBFilter
    }
}
```

#### Response

```javascript
{
  "roles": [RoleStructure]
}
```

### `PUT`

#### Request

```javascript
{
	"_id": "<Role._id>",
	"roleName": "Usuario comum",
	"permissionLevel": 1
}
```

#### Response

```javascript
{
  "role": RoleStructure
}
```

### `DEL`

#### Request

```javascript
{
	"_id": "<Role._id>"
}
```

#### Response

```javascript
{
  "role": RoleStructure
}
```

# Auth (/api/auth)

## /register

### `POST`

#### Request

```javascript
{
	"username": "test",
	"password": "testepass",
	"name": "Test user",
	"roles": ["<Role._id>"]
}
```

#### Response

```javascript
{
  "user": {
    "roles": [RoleStructure],
    "createdAt": "2021-06-01T16:50:23.714Z",
    "updatedAt": "2021-06-01T16:51:17.140Z",
    "_id": "60b665854a5dce05057979eb",
    "username": "test",
    "name": "Test user",
    "__v": 0
  }
}
```

## /user

### `GET`

#### Request

```javascript
{
	"filter": {
        MongoDBFilter
    }
}
```

#### Response

```javascript
{
  "users": [UserStructure]
}
```

### `PUT`

#### Request

```javascript
{
	"_id_": "<User._id>",
	"username": "test",
	"name": "Test user",
	"roles": ["<Role._id>"]
}
```

#### Response

```javascript
{
  "user": UserStructure
}
```

### `DEL`

#### Request

```javascript
{
	"_id": "<User._id>"
}
```

#### Response

```javascript
{
  "user": UserStructure
}
```

## /authenticate

### `POST`

#### Request

```javascript
{
	"username": "test",
	"password": "teste"
}
```

#### Response

```javascript
{ 
  "user": UserStructure,
  "token": "<JWT_Token>"
}
```

## /change_password

### `POST`

#### Request

```javascript
{
	"username": "test",
	"password": "teste",
	"new_password": "teste2"
}
```

#### Response

```javascript
{ 
  "user": UserStructure
}
```
