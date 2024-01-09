const path = require("path");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "./"),
		filename: "index.js"
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/i,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			}
		]
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "."),
		},
		compress: true,
		port: 3000
	}
};
