HAS - Home Automation system - API
=============================

# Status (/api/status)

## /connected_mqtt

### `GET`

#### Request

```sh
None
```

#### Response

```json
[]
```

## /connected_ws

### `GET`

#### Request

```sh
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

```sh
None
```

#### Response

```json
{
  "msg": "restarting"
}
```