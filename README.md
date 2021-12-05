![preview](https://github.com/HappyYYT/restful-api-example/blob/yyt/img/preview.png)

# How to start the server

`cd server`

`npm install`

`npm run dev`

Being started correctly information are:

- [nodemon] starting `node server.js`

- Server running on port 5000

Here are my custom api:

# Gets Books api

Gets books or some book.

### URL

`GET localhost:5000/api/books` or `GET localhost:5000/api/books/:id`

### Optional Query String Parameters

| Name |  Type  |                                          Description                                          |
| :--: | :----: | :-------------------------------------------------------------------------------------------: |
| `id` | String | gets the book by book's id ,eg: when the id is 1 the url will be `localhost:5000/api/books/1` |

### Result

| HTTP Status Code |                                       data                                       |
| :--------------: | :------------------------------------------------------------------------------: |
|       200        | `[ { "id": "1", "name": "Plot Versus Character", "author": "Jeff Gerke" }, ...]` |
|       400        |                         `{"message": "Book Not Found"}`                          |

# Adds Book api

Adds a book by giving it's information.

### URL

`POST localhost:5000/api/books`

### Optional Query String Parameters

|   Name   |  Type  |         Description          |
| :------: | :----: | :--------------------------: |
|  `name`  | String |  adds a book with it's name  |
| `author` | String | adds a book with it's author |

### Result

| HTTP Status Code |                                   data                                   |
| :--------------: | :----------------------------------------------------------------------: |
|       201        | `{ "id": "1", "name": "Plot Versus Character", "author": "Jeff Gerke" }` |

# Updates Book api

Updates a book by giving it's information.

### URL

`PUT localhost:5000/api/books/:id`

### Optional Query String Parameters

|   Name   |  Type  |           Description           |
| :------: | :----: | :-----------------------------: |
|  `name`  | String |  updates a book with it's name  |
| `author` | String | updates a book with it's author |

### Result

| HTTP Status Code |                                   data                                   |
| :--------------: | :----------------------------------------------------------------------: |
|       200        | `{ "id": "1", "name": "Plot Versus Character", "author": "Jeff Gerke" }` |
|       404        |                     `{ message: "Book Not Found" }`                      |

# Deletes Book api

### URL

`Delete localhost:5000/api/books/:id`

| Name |  Type  |                                           Description                                            |
| :--: | :----: | :----------------------------------------------------------------------------------------------: |
| `id` | String | deletes the book by book's id ,eg: when the id is 1 the url will be `localhost:5000/api/books/1` |

### Result

| HTTP Status Code |               data                |
| :--------------: | :-------------------------------: |
|       200        | `{ message: Book ${id} removed }` |
|       400        |  `{ message: "Book Not Found" }`  |

## Common response codes are:

| HTTP Status Code | Explanation |
| :--------------: | :---------: |
|       200        |             |
|       201        |             |
|       400        |             |
|       403        |             |
|       404        |             |
