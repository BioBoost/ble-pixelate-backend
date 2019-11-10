# BLE PixelAte Backend

Backend for the PixelAte project. Communicates with frontend via web sockets and sends the data to the Meme Machine REST API.

## Starting the game

Before the actual game can start, the players and their associated controllers need to be registered.

Do this by emitting `start` via the websocket with an array of player objects as data:

```js
[
  { controller_id: 'id_pinky', name: 'marki', color: "#FF0000" },
  { controller_id: 'id_hulk', name: 'nico', color: "#00FF00" },
  { controller_id: 'id_mister_blue', name: 'dennis', color: "#0000FF" },
  { controller_id: 'id_god', name: 'ruggy', color: "#FFFFFF" }
]
```

## Sending updates

Regular updates can be send to the backend to draw on the display. Emit the `update` event with a payload package in the following format:

```js
[
  { id: 'id_hulk', actions: ['R', 'D', 'D', 'X', 'R', 'R'] },
  { id: 'id_pinky', actions: ['A', 'D', 'D', 'R', 'D'] }
]
```

## Extra

* [1px width canvas lines](https://stackoverflow.com/questions/13879322/drawing-a-1px-thick-line-in-canvas-creates-a-2px-thick-line)

