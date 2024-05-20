const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const mongoose = require("mongoose");
//mongoose.set('strictQuery', false);
const app = express();
const port = process.env.PORT || 5000;
const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/';

app.use(bodyParser.json());
app.use(cors());
app.use("/api", routes);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

mongoose.connect(mongoURL, {
	dbName: "bookery-ecommerce-db",
	//useCreateIndex: true, // Thêm cài đặt này để sử dụng index
	//useNewUrlParser: true,
	useUnifiedTopology: true,
	//strictQuery: true // Đảm bảo cài đặt này được sử dụng trong phiên bản Mongoose hiện tại
})

	.then(() => {
		app.listen(port, () => {
			console.log(`Listening on port ${port}...`);
			console.log("Connected to database successfully!");
		});
	})
	.catch((error) => {
		console.log("Connection Failed!", error);
	});
