const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const homeStartingContent="Born into an aristocratic Bengali Kayastha family of Calcutta, Vivekananda was inclined towards spirituality. He was influenced by his guru, Ramakrishna, from whom he learnt that all living beings were an embodiment of the divine self; therefore, service to God could be rendered by service to humankind. After Ramakrishna's death, Vivekananda toured the Indian subcontinent extensively and acquired first-hand knowledge of the conditions prevailing in British India. He later travelled to the United States, representing India at the 1893 Parliament of the World's Religions. Vivekananda conducted hundreds of public and private lectures and classes, disseminating tenets of Hindu philosophy in the United States, England and Europe. In India, Vivekananda is regarded as a patriotic saint, and his birthday is celebrated as National Youth Day."
const contactStartingContent="Developer Contact";
const aboutStartingContent="Welcome";
const weatherstartingcontent="updating soon"

const app=express();
app.set('view engine', 'ejs');//starting ejs enjine
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));//all emages and css files has to be stored inside static folder
let posts=[];
app.get("/" ,function(req ,res){
  res.render("home", {homestartingcontent:homeStartingContent,
    posts:posts
  });//passing key value pair{key:value}
});
app.get("/about" ,function(req ,res){
  res.render("about", {aboutstartingcontent:aboutStartingContent});
});

app.get("/contact" ,function(req ,res){
  res.render("contact", {contactStartingContent:contactStartingContent});//passing key value pair{key:value}
});
app.get("/weather" ,function(req ,res){
  res.render("weather", {weatherstartingcontent:weatherstartingcontent});//passing key value pair{key:value}
});
app.get("/compose" ,function(req ,res){
  res.render("compose");
});
app.post("/compose" ,function(req ,res){

  const post={
    title:req.body.postTitle,
    content:req.body.postBody
  };
  posts.push(post);
  res.redirect("/")
});
app.get("/posts/:postName", function(req, res)
{
  const requestedTitle=req.params.postName;
  posts.forEach(function(post)
{
  const storedTitle=post.title;

  if(storedTitle===requestedTitle)
  {

      res.render("post",
       {title:post.title,
        content:post.content

    });
  }
});
});

app.listen(process.env.PORT || 3000 ,function()   // creating and strating server
{
  console.log("server is running");
})
