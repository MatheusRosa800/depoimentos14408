var server = require('./config/server')
var bancodedados = require('./config/bancodedados')

var app = server.app
var porta = server.porta

var conexao = bancodedados.conexao
var documentos = bancodedados.documentos

app.set('view engine', "ejs")

app.get('/',(req,res)=>{
    conexao()
    documentos.find()
    .then((documentos)=>{
    console.log(documentos)
    res.render("form",{documentos})
    })
    
})

app.post('/gravar',(req,res)=>{
    var dados = req.body
    conexao()

    new documentos({ 
        mensagem:dados.mensagem,
        nome:dados.nome,
        cargo:dados.cargo
        }
        ).save()
    
   
   // res.send('informações enviadas!')
   res.redirect('/')
})


app.listen(porta)