
// Files Imports
import Express from "express";
import * as API_000 from "./../src/api/message.ts";
import * as configure from "@api/configure";

// API_000|default |use     |/message            |100_message_010
// API_000|AUTH    |use     |/message            |100_message_011
// API_000|CRUD    |use     |/message            |100_message_012
// API_000|USE     |use     |/message            |100_message_020
// API_000|PING    |get     |/message            |100_message_021
// API_000|GET     |get     |/message            |100_message_030
// API_000|POST    |post    |/message            |100_message_040
// API_000|ACTION  |post    |/message            |100_message_041
// API_000|PATCH   |patch   |/message            |100_message_050
// API_000|PUT     |put     |/message            |100_message_060
// API_000|DELETE  |delete  |/message            |100_message_070
// API_000|ERROR   |use     |/message            |100_message_120

export const handler = Express();
configure.handlerBefore?.(handler);
API_000.default && handler.use("/message", API_000.default);
API_000.AUTH && handler.use("/message", API_000.AUTH);
API_000.CRUD && handler.use("/message", API_000.CRUD);
API_000.USE && handler.use("/message", API_000.USE);
API_000.PING && handler.get("/message", API_000.PING);
API_000.GET && handler.get("/message", API_000.GET);
API_000.POST && handler.post("/message", API_000.POST);
API_000.ACTION && handler.post("/message", API_000.ACTION);
API_000.PATCH && handler.patch("/message", API_000.PATCH);
API_000.PUT && handler.put("/message", API_000.PUT);
API_000.DELETE && handler.delete("/message", API_000.DELETE);
API_000.ERROR && handler.use("/message", API_000.ERROR);
configure.handlerAfter?.(handler);
