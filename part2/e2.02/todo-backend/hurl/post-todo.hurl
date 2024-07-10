POST http://localhost:8083/todos
Content-Type: application/json

{
    "content": "This is a new todo item"
}

HTTP/1.1 201
[Asserts]
jsonpath "$.todo" == "This is a new todo item"
