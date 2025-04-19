# API Usage

---

## 1. Send OTP (Mobile Verification)

**Endpoint**

```
POST /api/auth/sendOTP
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
POST /api/auth/validateOtp
```

**Content-Type**

```
application/json
```

**NOTE**
For Testing Use 1111 as OTP for successfull response.

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

*Last updated: April 19, 2025*

