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

```json
[]
```

## /connected_ws

### `GET`

#### Request

```
None
```

#### Response

```json
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

```json
{
  "msg": "restarting"
}
```

# Rooms (/api/rooms)

## /

### `POST`

#### Request

```json
{
    "roomName": "Room name",
    "icon": "iconid",
    "things": ["<Thing._id>"],
    "roles": ["<Role._id>"]
}
```

#### Response

```json
{
  "room": {
    "things": [<ThingStructure />],
    "roles": [<RoleStructure />],
    "_id": "60e4d2d80b8f470218664a0d",
    "roomName": "Room name",
    "icon": "iconid",
    "createdAt": "2021-07-06T22:02:00.436Z",
    "__v": 0
  }
}
```