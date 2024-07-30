import { serveDir } from "jsr:@std/http@0.224.5/file-server";

Deno.serve((req) => {
  return serveDir(req, {
    fsRoot: "build/",
  });
});