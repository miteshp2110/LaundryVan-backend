# API Usage

---

## 1. Send OTP (Mobile Verification)

**Endpoint**

```
POST /api/auth/default/otp/send
```

**Content-Type**

```
application/json
```

**Request Body**

| Field | Type   | Required | Description                              |
|-------|--------|----------|------------------------------------------|
| phone | string | Yes      | User's mobile number to receive the OTP. |

**Success Response**

- **Status**: `200 OK`  
- **Body**:
  ```json
  { "message": "Sent OTP on <phone> valid for 5 mins" }
  ```

**Error Responses**

| Status | Body                                 |
|--------|--------------------------------------|
| 400    | `{ "error": "Invalid Body" }`    |
| 500    | `{ "error": "Internal Server Error" }` |

---

## 2. Validate OTP

**Endpoint**

```
POST /api/auth/default/otp/validate
```

**Content-Type**

```
application/json
```

**Request Body**

| Field | Type   | Required | Description                 |
|-------|--------|----------|-----------------------------|
| phone | string | Yes      | Mobile number that received the OTP. |
| otp   | string | Yes      | One-time password to validate.      |

**Success Response**

- **Status**: `200 OK`  
- **Body**:
  ```json
  { "message": "success" }
  ```

**Error Responses**

| Status | Body                              |
|--------|-----------------------------------|
| 400    | `{ "error": "Invalid Body" }` |
| 401    | `{ "error": "Wrong OTP" }`   |
| 500    | `{ "error": "Internal Server Error" }` |

---

## 3. Sign Up (Email & Password)

**Endpoint**

```
POST /api/auth/default/signup
```

**Content-Type**

```
multipart/form-data
```

**Form Data Fields**

| Field      | Type   | Required | Description                                 |
|------------|--------|----------|---------------------------------------------|
| fullName   | string | Yes      | User's full name (e.g., “Mitesh Paliwal”)  |
| email      | string | Yes      | User's email address                        |
| password   | string | Yes      | User's password                             |
| phone      | string | Yes      | User's phone number                         |
| image      | file   | No       | Profile image (JPEG/PNG). Defaults to a placeholder avatar if omitted. |

**Success Response**

- **Status**: `201 Created`  
- **Body**:
  ```json
  {
    "message": "User Created",
    "jwt": "<access_token>",
    "refreshToken": "<refresh_token>"
  }
  ```

**Error Responses**

| Status | Body                                             |
|--------|--------------------------------------------------|
| 400    | `{ "error": "Invalid Body" }`                 |
| 409    | `{ "error": "Email Already Exist" }`          |
| 400    | `{ "error": "Phone Number already exists." }` |
| 500    | `{ "error": "Internal Server Error" }`        |

---

## 4. Login (Email & Password)

**Endpoint**

```
POST /api/auth/default/login
```

**Content-Type**

```
application/json
```

**JSON Body Fields**

| Field    | Type   | Required | Description                   |
|----------|--------|----------|-------------------------------|
| email    | string | Yes      | Registered email address      |
| password | string | Yes      | User's password               |

**Success Response**

- **Status**: `200 OK`  
- **Body**:
  ```json
  {
    "message": "Success",
    "jwt": "<access_token>",
    "refreshToken": "<refresh_token>"
  }
  ```

**Error Responses**

| Status | Body                                  |
|--------|---------------------------------------|
| 400    | `{ "error": "Invalid Body" }`      |
| 400    | `{ "error": "Email Does not Exist" }` |
| 401    | `{ "error": "Wrong Password" }`    |
| 500    | `{ "error": "Internal Server Error" }` |

---

---

## 5. Check Service Area

**Endpoint**

```
POST /api/address/checkService
```

**Content-Type**

```
application/json
```

**Request Body**
```json
{
    "lat":"13.046399",
    "lon":"77.627513"
}

  ```

| Field | Type   | Required | Description                                       |
|-------|--------|----------|---------------------------------------------------|
| lat   | string | Yes      | Latitude of the location to verify service area   |
| lon   | string | Yes      | Longitude of the location to verify service area  |

**Success Response**

- **Status**: `200 OK`  
- **Body**:
  ```json
  {
    "message": "Region Available",
    "regionId": <region_id>
  }
  ```

**Error Responses**

| Status | Body                                                  |
|--------|-------------------------------------------------------|
| 400    | `{ "error": "Invalid Body" }`                      |
| 400    | `{ "error": "Region not yet under service" }`     |
| 500    | `{ "error": "Internal Server Error" }`            |

---

---

## 6. Add Address

**Endpoint**

```
POST /api/address/add
```

**Headers**

| Header        | Value                   |
|---------------|-------------------------|
| Authorization | Bearer `<access_token>` |

**Content-Type**

```
application/json
```

**Request Body**
```json
{
  "addressType": "Work",
  "region_id": 1,
  "addressName": "Home 2",
  "area": "Mall Area",
  "buildingNumber": "12",
  "landmark": "Opposite To Mall",
  "latitude": "13.046399",
  "longitude": "77.627513"
}
```


| Field          | Type   | Required | Description                                        |
|----------------|--------|----------|----------------------------------------------------|
| addressType    | string | Yes      | Type of address (e.g., "Home", "Work")         |
| region_id      | number | Yes      | Identifier of the region                           |
| addressName    | string | Yes      | Display name for the address (e.g., "Home 2")    |
| area           | string | Yes      | Area or locality name                              |
| buildingNumber | string | Yes      | Building or house number                           |
| landmark       | string | Yes      | Nearby landmark                                    |
| latitude       | string | Yes      | GPS latitude coordinate                            |
| longitude      | string | Yes      | GPS longitude coordinate                           |

**Success Response**

- **Status**: `201 Created`  
- **Body**:
  ```json
  { "message": "Address Added" }
  ```

**Error Responses**

| Status | Body                                 |
|--------|--------------------------------------|
| 400    | `{ "error": "Invalid Body" }`     |
| 401    | `{ "error": "Unauthorized" }`     |
| 500    | `{ "error": "Internal Server Error" }` |

---

---

## 7. Get All Addresses

**Endpoint**

```
GET /api/address/all
```

**Headers**

| Header        | Value                   |
|---------------|-------------------------|
| Authorization | Bearer `<access_token>` |

**Content-Type**

```
application/json
```

**Request Body**

_None_

**Success Response**

- **Status**: `200 OK`  
- **Body**: JSON array of address objects
  ```json
  [
    {
      "id": 1,
      "addressType": "Home",
      "user_id": 1,
      "region_id": 1,
      "addressName": "Home 1",
      "area": "City Area",
      "buildingNumber": "12",
      "landmark": "Opposite To Park"
    }
  ]
  ```

**Error Responses**

| Status | Body                                 |
|--------|--------------------------------------|
| 401    | `{ "error": "Unauthorized" }`     |
| 500    | `{ "error": "Internal Server Error" }` |

---

---

## 8. Get Address Detail

**Endpoint**

```
GET /api/address/detail/:id
```

**Headers**

| Header        | Value                   |
|---------------|-------------------------|
| Authorization | Bearer `<access_token>` |

**Content-Type**

```
application/json
```

**Path Parameters**

| Parameter | Type   | Required | Description                     |
|-----------|--------|----------|---------------------------------|
| id        | number | Yes      | Identifier of the address to fetch |

**Success Response**

- **Status**: `200 OK`  
- **Body**:
  ```json
  {
    "id": 1,
    "addressType": "Work",
    "user_id": 1,
    "region_id": 1,
    "addressName": "Home 2",
    "area": "Mall Area",
    "buildingNumber": "12",
    "landmark": "Opposite To Mall",
    "latitude": "13.046399",
    "longitude": "77.627513"
  }
  ```

**Error Responses**

| Status | Body                                 |
|--------|--------------------------------------|
| 401    | `{ "error": "Unauthorized" }`     |
| 500    | `{ "error": "Internal Server Error" }` |

---


---

## 9. Delete Address

**Endpoint**

```
DELETE /api/address/delete/:id
```

**Headers**

| Header        | Value                   |
|---------------|-------------------------|
| Authorization | Bearer `<access_token>` |

**Content-Type**

```
application/json
```

**Path Parameters**

| Parameter | Type   | Required | Description                         |
|-----------|--------|----------|-------------------------------------|
| id        | number | Yes      | Identifier of the address to delete |

**Success Response**

- **Status**: `200 OK`  
- **Body**:
  ```json
  { "message": "Address Deleted" }
  ```

**Error Responses**

| Status | Body                                 |
|--------|--------------------------------------|
| 401    | `{ "error": "Unauthorized" }`     |
| 500    | `{ "error": "Internal Server Error" }` |

---

## 10. Update Address

**Endpoint**

```
PUT /api/address/update/:id
```

**Headers**

| Header        | Value                   |
|---------------|-------------------------|
| Authorization | Bearer `<access_token>` |

**Content-Type**

```
application/json
```

**Path Parameters**

| Parameter | Type   | Required | Description                         |
|-----------|--------|----------|-------------------------------------|
| id        | number | Yes      | Identifier of the address to update |

**Request Body**

```json
{
  "addressType": "Work",
  "region_id": 1,
  "addressName": "Home 2",
  "area": "Mall Area",
  "buildingNumber": "12",
  "landmark": "Opposite To Mall",
  "latitude": "13.046399",
  "longitude": "77.627513"
}
```

| Field          | Type   | Required | Description                                        |
|----------------|--------|----------|----------------------------------------------------|
| addressType    | string | Yes      | Type of address (e.g., "Home", "Work")          |
| region_id      | number | Yes      | Identifier of the region                           |
| addressName    | string | Yes      | Display name for the address (e.g., "Home 2")     |
| area           | string | Yes      | Area or locality name                              |
| buildingNumber | string | Yes      | Building or house number                           |
| landmark       | string | Yes      | Nearby landmark                                    |
| latitude       | string | Yes      | GPS latitude coordinate                            |
| longitude      | string | Yes      | GPS longitude coordinate                           |

**Success Response**

- **Status**: `201 Created`  
- **Body**:
  ```json
  { "message": "Address Updated" }
  ```

**Error Responses**

| Status | Body                                 |
|--------|--------------------------------------|
| 400    | `{ "error": "Invalid Body" }`     |
| 401    | `{ "error": "Unauthorized" }`     |
| 500    | `{ "error": "Internal Server Error" }` |

*Last updated: April 19, 2025*

