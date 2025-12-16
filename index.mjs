import fs from "fs";
import http from "http";

const handlereq = (req, res) => {
	switch(true) {

		case req.url.includes(".png"): {
            const filepath = (() => {
				let basicurl = "";
				if (req.url.includes("?")) {
					basicurl = req.url.split("?")[0];
					return `./${basicurl}`;

				} else {
					return `./${req.url}`
				}
            })();
            fs.readFile(filepath, (err, data) => {
                if (err && err.code === "ENOENT") {
                    console.log("\x1b[35m", "file not found\n", err.message, "\n", "\x1b[00m");
                    res.writeHead(404, "not found");
                    return res.end("not found");
                }

                const headers = { "Content-Type": "image/png" };

                res.writeHead(200, headers);
                res.end(data, "utf-8");
            });

		} break;
        case req.url === "/": {
            fs.readFile("./index.html", (err, data) => {
                if (err && err.code === "ENOENT") {
                    console.log("\x1b[35m", "file not found\n", err.message, "\n", "\x1b[00m");
                    res.writeHead(404, "not found");
                    return res.end("not found");
                }

                const headers = { "Content-Type": "text/html" };

                res.writeHead(200, headers);
                res.end(data, "utf-8");
            });
        } break;
        case req.url.includes(".mjs") || req.url.includes(".js"): {
            const filepath = (() => {
                if (req.url.includes("common")) {
                    return `./common.mjs`;
                } else {
                    let basicurl = "";
                    if (req.url.includes("?")) {
                        basicurl = req.url.split("?")[0];
                        return `./${basicurl}`;

                    } else {
                        return `./${req.url}`
                    }
                }
            })();
            fs.readFile(filepath, (err, data) => {
                if (err && err.code === "ENOENT") {
                    console.log("\x1b[35m", "file not found\n", err.message, "\n", "\x1b[00m");
                    res.writeHead(404, "not found");
                    return res.end("not found");
                }

                const headers = { "Content-Type": "text/javascript" };

                res.writeHead(200, headers);
                res.end(data, "utf-8");
            });

        } break;
		default: {
                res.writeHead(200, {});
                res.end("hello", "utf-8");
		} break;

	}

};


const server = http.createServer((req, res) => {
	console.log("yo", req.url);
	// res.end("hello", 200);
    handlereq(req, res);
});

function main () {
	server.listen(8080);
}

main();
