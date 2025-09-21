
mongoose.connect('mongodb://127.0.0.1:27017/testDB')
  .then(() => {
    console.log("server connected..")
  }).catch((err) => {
    console.log("erro: ", err);

  })