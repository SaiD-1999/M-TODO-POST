import express from 'express';
import path from 'path';

const host = '0.0.0.0';
const porta = 3000;

let lista = [];

const app = express();

//Configurando o express para manipular corretamente os dados, quando forem submetidos via método POST.
app.use(express.urlencoded({extended: true})); //habilita a biblioteca QueryString

app.use(express.static(path.join(process.cwd(),'publico')));

function cadastrar(requisicao, resposta){
    const nome = requisicao.body.nome;
    const cnpj = requisicao.body.cnpj;
    const telefone = requisicao.body.telefone;
    const produto = requisicao.body.produto;

    if(nome && cnpj && telefone && produto){
        lista.push({
            nome: nome,
            cnpj: cnpj,
            telefone: telefone,
            produto: produto
        });
        resposta.redirect('/listar');
    }
    else{
        resposta.write(`<!DOCTYPE html>
                        <html lang="pt-br">
                        
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Cadastro</title>
                            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
                                integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                            </head>
                        
                        <body>
                            <h1 class="text-center mt-3">Cadastro De Fornecedores</h1><br><br>
                            <div class="container">
                                <form method="POST" action='/cadastrar' class=" border row g-2">
                                    <div class="mb-3">
                                        <label for="nome" class="form-label">Nome da Empresa:</label><br>
                                        <input type="text" class="form-control" id="nome" name="nome" value="${nome}" placeholder="Nome da empresa">`);
        if (nome == ''){
            resposta.write(`<div class="alert alert-danger" role="alert">
                                Por favor, informe o nome da empresa!
                                </div>`);
        } 
        resposta.write(`</div>
                            <div class="mb-3">
                                <label for="cnpj" class="form-label">CNPJ:</label><br>
                                <input type="text" class="form-control" id="cnpj" name="cnpj" value="${cnpj}" 
                                    placeholder="CNPJ">`);
        if (cnpj == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                            Por favor, informe o cnpj da empresa!
                            </div>`);
        }
        resposta.write(`</div>
                            <div class="mb-3">
                                <label for="telefone" class="form-label">Telefone:</label><br>
                                <input type="text" class="form-control" id="telefone" name="telefone" value="${telefone}" 
                                    placeholder="Telefone">`);
        if (telefone == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                            Por favor, informe o telefone da empresa!
                            </div>`);
        }  
        resposta.write(`</div>
                            <div class="mb-3">
                                <label for="produto" class="form-label">Produto:</label><br>
                                <input type="text" class="form-control" id="Produto" name="produto" value="${produto}" 
                                    placeholder="Produto">`);
        if (produto == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                            Por favor, informe o produto da empresa!
                            </div>`);
        } 
        resposta.write(`</div>
                            <div class="text-center">
                            <div class="col-12 mb-3">
                                <button class="btn btn-primary" type="submit">Cadastrar</button>
                                <a class="btn btn-secondary" href="/">Voltar</a>
                            </div>
                            </div>  
                        </form>
                    </div>
                    </body>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
                    crossorigin="anonymous"></script>

                    </html>`);    
        resposta.end();                                                                                                  
    }
}

app.post('/cadastrar', cadastrar);

app.get('/listar',(requisicao,resp)=>{
    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<meta charset="utf-8">');
    resp.write('<title>Listar</title>');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">');
    resp.write('</head>');
    resp.write('<body>');
    resp.write("<h1 class='text-center mt-3'>Lista de Fornecedores</h1>");
    resp.write('<br>');
    resp.write('<br>');
    resp.write('<div class="container">');
    resp.write('<table class="table table-dark table-striped-columns">');
    resp.write('<tr>');
    resp.write('<th class="text-center">Nome da Empresa</th>');
    resp.write('<th class="text-center">CNPJ</th>');
    resp.write('<th class="text-center">Telefone</th>');
    resp.write('<th class="text-center">Produto</th>');
    resp.write('</tr>');
    for(let i=0; i<lista.length; i++){
        resp.write('<tr>');
        resp.write(`<td>${lista[i].nome}`);
        resp.write(`<td>${lista[i].cnpj}`);
        resp.write(`<td>${lista[i].telefone}`);
        resp.write(`<td>${lista[i].produto}`);
        resp.write('</tr>');
    }
    resp.write('</table>');
    resp.write('<a href="/">Inicio</a>');
    resp.write('</div>');
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>');
    resp.write('</html>');
    resp.end();
});

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
})