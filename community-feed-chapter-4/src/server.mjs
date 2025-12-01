import fs from "node:fs";
import path from "node:path";
import express from "express";
import { fileURLToPath } from "node:url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createServer() {
    const app = express();

    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "custom",
    });

    app.use(vite.middlewares);

    app.use("*", async (req, res, next) => {
        const url = req.originalUrl;

        try {
            let template = fs.readFileSync(
                path.resolve(__dirname, "index.html"),
                "utf-8"
            );

            template = await vite.transformIndexHtml(url, template);

            const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");
            const { appHtml, helmetTitle, helmetMeta } = await render(url);

            let html = template.replace(`<!--ssr-outlet-->`, appHtml);
            html = html.replace("<!--helmet-title-->", helmetTitle || "");
            html = html.replace("<!--helmet-meta-->", helmetMeta || "");

            res.status(200).set({ "Content-Type": "text/html" }).end(html);
        } catch (e) {
            vite.ssrFixStacktrace(e);
            next(e);
        }
    });

    app.listen(3000, () => {
        console.log("SSR server running at http://localhost:3000");
    });
}

createServer();
