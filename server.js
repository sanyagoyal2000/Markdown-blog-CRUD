const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const articleRouter=require('./routes/articles')
const Article=require('./models/article')
const dbUrl ="mongodb://localhost:27017/markdown-blog";
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("CONNECTED TO DATABASE");
	})
	.catch((e) => {
		console.log(e);
		console.log("CONNECTION FAILED");
	});
const app = express();
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method')) //method-override
app.set('view engine','ejs')
app.get('/', async (req, res) => {
    const articles=await Article.find().sort({createdAt:-1})
    res.render('articles/index',{articles:articles})
})
app.use('/articles',articleRouter)

app.listen(5000);