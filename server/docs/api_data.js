define({ "api": [
  {
    "type": "POST",
    "url": "/login",
    "title": "login",
    "group": "Authentication",
    "description": "<p>login</p>",
    "examples": [
      {
        "title": "Example",
        "content": "localhost:3000/login\nhttp://54.169.225.125:3000/login",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "username",
            "description": "<p>username required</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password required</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    {\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVChmEL_WRt-0P_weF8r41m0eEbryPQ-smyRi2iuMCJoCA\",\"user\":{\"username\":\"14020800\",\"role\":\"Member\"}}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/authentication.js",
    "groupTitle": "Authentication",
    "name": "PostLogin"
  },
  {
    "type": "POST",
    "url": "/register",
    "title": "register",
    "group": "Authentication",
    "description": "<p>register new user</p>",
    "examples": [
      {
        "title": "Example",
        "content": "localhost:3000/register\nhttp://54.169.225.125:3000/register",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "username",
            "description": "<p>username required</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password required</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "role",
            "defaultValue": "Member",
            "description": "<p>Admin/Member</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  {\"token\":\"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZDybQ\"}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/authentication.js",
    "groupTitle": "Authentication",
    "name": "PostRegister"
  },
  {
    "type": "DELETE",
    "url": "/api/notes/:noteId",
    "title": "delete note",
    "group": "Note",
    "description": "<p>delete an existing note</p>",
    "examples": [
      {
        "title": "Example",
        "content": "localhost:3000/api/note/58feaf6ab8884123142e8bb1\nhttp://54.169.225.125:3000/api/note/58feaf6ab8884123142e8bb1",
        "type": "json"
      }
    ],
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT + token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example:",
          "content": "{\n    Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "ObjectId",
            "description": "<p>objectId required</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"ok ok!!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/api.js",
    "groupTitle": "Note",
    "name": "DeleteApiNotesNoteid"
  },
  {
    "type": "GET",
    "url": "/api/notes",
    "title": "get notes",
    "group": "Note",
    "description": "<p>get notes</p>",
    "examples": [
      {
        "title": "Example",
        "content": "localhost:3000/api/note\nhttp://54.169.225.125:3000/api/note",
        "type": "json"
      }
    ],
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT + token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example:",
          "content": "{\n    Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "username",
            "defaultValue": "none",
            "description": "<p>Admin permission</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[ {\"_id\":\"58fea1fa7f255612309b6872\",\"type\":\"ugent\",\"priority\":3,\"end\":1,\"begin\":2,\"description\":\"buy milk if they have eggs, bring 6\",\"owner\":\"14020791\",\"__v\":0},\n  {\"_id\":\"58fea8cc5442e11c9821f9e6\",\"type\":\"ugent\",\"priority\":3,\"end\":1,\"begin\":2,\"description\":\"buy milk if they have eggs, bring 6\",\"owner\":\"14020791\",\"__v\":0}\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/api.js",
    "groupTitle": "Note",
    "name": "GetApiNotes"
  },
  {
    "type": "POST",
    "url": "/api/notes",
    "title": "create note",
    "group": "Note",
    "description": "<p>add a note</p>",
    "examples": [
      {
        "title": "Example",
        "content": "localhost:3000/api/note\nhttp://54.169.225.125:3000/api/note",
        "type": "json"
      }
    ],
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT + token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example:",
          "content": "{\n    Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "defaultValue": "empty",
            "description": "<p>description</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "begin",
            "defaultValue": "0",
            "description": "<p>start</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "end",
            "defaultValue": "0",
            "description": "<p>deadline</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "priority",
            "defaultValue": "0",
            "description": "<p>priority [OPTIONAL, default 0]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "type",
            "defaultValue": "empty",
            "description": "<p>type</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": true,
            "field": "other",
            "defaultValue": "{}",
            "description": "<p>other information</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"noteId\":\"58feaf6ab8884123142e8bb1\"}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/api.js",
    "groupTitle": "Note",
    "name": "PostApiNotes"
  },
  {
    "type": "PUT",
    "url": "/api/notes",
    "title": "modify note",
    "group": "Note",
    "description": "<p>modify an existing note</p>",
    "examples": [
      {
        "title": "Example",
        "content": "localhost:3000/api/note\nhttp://54.169.225.125:3000/api/note",
        "type": "json"
      }
    ],
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "JAuthorization",
            "description": "<p>WT + token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example:",
          "content": "{\n    Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "ObjectId",
            "description": "<p>objectId required</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>description [OPTIONAL, default empty]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "begin",
            "description": "<p>start [OPTIONAL, default 0]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "end",
            "description": "<p>deadline [OPTIONAL, default 0]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "priority",
            "description": "<p>priority [OPTIONAL, default 0]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "type",
            "description": "<p>type [OPTIONAL, default basic]</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": true,
            "field": "other",
            "description": "<p>[OPTIONAL]</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"ok ok!!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/api.js",
    "groupTitle": "Note",
    "name": "PutApiNotes"
  },
  {
    "type": "GET",
    "url": "/api/schedules",
    "title": "get schedules",
    "group": "Schedule",
    "description": "<p>get personal schedule</p>",
    "examples": [
      {
        "title": "Example",
        "content": "localhost:3000/api/schedule\nhttp://54.169.225.125:3000/api/schedule",
        "type": "json"
      }
    ],
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT + token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example:",
          "content": "{\n    Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "username",
            "description": "<p>Admin permission</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n  \"_id\":\"58fe3349c162224e9707865c\",\n  \"info\":{\n     \"Ghi chú\":\"ĐK lần đầu\",\n     \"Họ và tên\":\"Nguyễn Trọng Đông\",\n     \"Lớp khoá học\":\"QH-2014-I/CQ-C-A\",\n     \"Mã LMH\":\"PES1030 8\",\n     \"Mã SV\":\"14020791\",\n     \"Ngày sinh\":\"13/8/1996\",\n     \"Nhóm\":\"CL\",\n     \"STT\":\"81\",\n     \"Số TC\":\"1\",\n     \"Tên môn học\":\"Bóng bàn\"\n   },\n   \"__v\":1,\n   \"module\": {\n     \"__v\":0,\n     \"Mã học phần\":\"PES 1030\",\n     \"Học Phần\":\"Bóng bàn 1\",\n     \"TC\":1,\n     \"Mã LHP\":\"PES 1030 8\",\n     \"SS DK\":45,\n     \"Giảng viên\":\"TT GDTC\",\n     \"Buổi\":\"Chiều\",\n     \"Thứ\":3,\n     \"Tiết\":\"8-9\",\n     \"Giảng đường\":\"Sân bãi\",\n     \"Ghi chú\":\"\",\n     \"_id\":\"58fe378c3d91cf5327776c1c\"}\n   }\n }]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/api.js",
    "groupTitle": "Schedule",
    "name": "GetApiSchedules"
  },
  {
    "type": "GET",
    "url": "/api/users/:username",
    "title": "get users",
    "group": "User",
    "description": "<p>fetch users, ROLE required</p>",
    "examples": [
      {
        "title": "Example",
        "content": "localhost:3000/api/14020791\nhttp://54.169.225.125:3000/api/14020791",
        "type": "json"
      }
    ],
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT  + token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example:",
          "content": "{\n    Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lb2RvcmV3YW4iLCJwYXNz\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"_id\":\"58fb715925678e616f584e65\",\n   \"role\":\"Admin\",\n   \"password\":\"$2a$10$aWKevQChzMRW7f66FYSwauTXqGOo3iKywbhVm9X1f15Qe4XgPj1ia\",\n   \"username\":\"14020791\",\n   \"__v\":0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/api.js",
    "groupTitle": "User",
    "name": "GetApiUsersUsername"
  }
] });
