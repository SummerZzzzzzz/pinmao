module.exports = {
	devServer: {
		port: "8000",
		host: "127.0.0.1",
		open: true,
		proxy: {
			"/pinmaoserver": {
				target: "http://127.0.0.1:8849/pinmaozx",
				changeOrigin: true,
				pathRewrite: {
					"^/pinmaoserver": ""
				}
			},
			"/video": {
				target: "http://127.0.0.1:8849/pinmaovideo",
				changeOrigin: true,
				pathRewrite: {
					"^/video": ""
				}
			},
			"/order": {
				target: "http://127.0.0.1:8080/",
				changeOrigin: true,
				pathRewrite: {
					"^/order": ""
				}
			}
		}
	}
}
