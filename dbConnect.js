
mongoose.connect(DB_URL)
  .then(() => {
    console.log("server connected..")
  }).catch((err) => {
    console.log("erro: ", err);


  })
