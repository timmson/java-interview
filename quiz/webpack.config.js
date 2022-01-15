const path = require("path");
//require("babel-polyfill");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
	entry:  "./src/index.js",
	output: {
		path: path.resolve(__dirname, "./"),
		filename: "index.js"
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
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
	resolve: {
		alias: {
			"vue$": "vue/dist/vue.esm.js"
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "index.css"
		})

	],
	devServer: {
		static: {
			directory: path.join(__dirname, "."),
		},
		compress: true,
		port: 3000
	}
};