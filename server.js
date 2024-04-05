import fs from "fs"
import path from "path"
import express from "express"
import fetch from "node-fetch"

const createServer = async () => {
  const app = express()
  let vite

  console.log('env', process.env.NODE_ENV)

  if (process.env.NODE_ENV === "development") {
    vite = await (
      await import("vite")
    ).createServer({
      server: { middlewareMode: true },
      appType: "custom",
    })
    app.use(vite.middlewares)
  } else {
    app.use((await import("compression")).default())
    app.use(
      (await import("serve-static")).default(path.resolve("dist/client"), {
        index: false,
      }),
    )
  }

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl
    let template, render

    try {
      if (process.env.NODE_ENV === "development") {
        template = fs.readFileSync(path.resolve("./index.html"), "utf-8")

        template = await vite.transformIndexHtml(url, template)

        render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render
      } else {
        template = fs.readFileSync(
          path.resolve("dist/client/index.html"),
          "utf-8"
        )
        render = (await import("./dist/server/entry-server.js")).render
      }

      const [usersResponse, postsResponse, albumsResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/posts'),
        fetch('https://jsonplaceholder.typicode.com/albums')
      ]);

      const [users, posts, albums] = await Promise.all([
        usersResponse.json(),
        postsResponse.json(),
        albumsResponse.json()
      ]);
      const result = {
        users,
        posts,
        albums
      };
      // const response = await fetch(`https://rickandmortyapi.com/api/character`)
      // const result = await response.json()

      const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

      const {html, helmet} = await render({path: url, data: result, fullUrl})
      const data = `<script>window.__SSR_DATA__=${JSON.stringify(
        {
          data: result,
          fullUrl
        }
      )}</script>`

      const helmetData = `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      `;

      const htmlResponse = template
        .replace(`<!--ssr-outlet-->`, html)
        .replace(`<!--ssr-data-->`, data)
        .replace(`<!--helmet-data-->`, helmetData);

      res.status(200).set({"Content-Type": "text/html"}).end(htmlResponse)
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        vite.ssrFixStacktrace(error)
      }
      next(error)
    }
  })

  app.listen(5174)
}

createServer().then(() => {
  console.log("http://localhost:5174")
})