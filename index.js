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
    const endereco = requisicao.body.endereco;
    const razao = requisicao.body.razao;
    const cidade = requisicao.body.cidade;
    const estado = requisicao.body.estado;
    const cep = requisicao.body.cep;
    const email = requisicao.body.email;

    if(razao && nome && cnpj && endereco && cidade && estado && cep && email){
        lista.push({
            razao: razao,
            nome: nome,
            cnpj: cnpj,
            endereco : endereco,
            cidade: cidade,
            estado: estado,
            cep: cep,
            email: email 
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
                            <div class="container mb-5">
                                <form method="POST" action='/cadastrar' class=" border row g-2">
                                    <div class="mb-3">
                                        <label for="razao" class="form-label">Razão Social:</label><br>
                                        <input type="text" class="form-control" id="razao" name="razao" value="${razao}"
                                            placeholder="Razão social">`);
        if (razao == ''){
            resposta.write(`<div class="alert alert-danger" role="alert">
                                Por favor, informe a razão social da empresa!
                                </div>`);
        } 
        resposta.write(`</div>
                        <div class="mb-3">
                            <label for="nome" class="form-label">Nome Fantasia:</label><br>
                            <input type="text" class="form-control" id="nome" name="nome" value="${nome}"
                                placeholder="Nome Fantasia">`);
        if (nome == ""){
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
                            Por favor, informe o CNPJ!
                            </div>`);
        }  
        resposta.write(`</div>
                        <div class="mb-3">
                            <label for="endereco" class="form-label">Endereço:</label><br>
                            <input type="text" class="form-control" id="endereco" name="endereco" value="${endereco}"
                                placeholder="Rua,Nº,Bairro">`);
        if (endereco == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                            Por favor, informe o endereço!
                            </div>`);
        } 
        resposta.write(`</div>
                        <div class="col-md-5">
                            <label for="cidade" class="form-label">Cidade:</label><br>
                            <input type="text" class="form-control" id="cidade" name="cidade" value="${cidade}"
                                placeholder="Cidade">`);
        if (cidade == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                            Por favor, informe a cidade!
                            </div>`);
        }
        resposta.write(`</div>
                        <div class="col-md-3">
                            <label for="estado" class="form-label">UF</label><br>
                            <select type="text" class="form-select" id="estado" name="estado"> 
                                <option selected disabled value="${estado}">Escolha um estado...</option>
                                <option value="AC">AC</option>
                                <option value="AL">AL</option>
                                <option value="AP">AP</option>
                                <option value="AM">AM</option>
                                <option value="BA">BA</option>
                                <option value="CE">CE</option>
                                <option value="DF">DF</option>
                                <option value="ES">ES</option>
                                <option value="GO">GO</option>
                                <option value="MA">MA</option>
                                <option value="MT">MT</option>
                                <option value="MS">MS</option>
                                <option value="MG">MG</option>
                                <option value="PA">PA</option>
                                <option value="PB">PB</option>
                                <option value="PR">PR</option>
                                <option value="PE">PE</option>
                                <option value="PI">PI</option>
                                <option value="RJ">RJ</option>
                                <option value="RN">RN</option>
                                <option value="RS">RS</option>
                                <option value="RO">RO</option>
                                <option value="RR">RR</option>
                                <option value="SC">SC</option>
                                <option value="SP">SP</option>
                                <option value="SE">SE</option>
                                <option value="TO">TO</option>
                            </select>`);
        if (!estado){
            resposta.write(`<div class="alert alert-danger" role="alert">
                            Por favor, selecione o estado!
                            </div>`);
        }
        resposta.write(`</div>
                        <div class="col-md-4">
                            <label for="cep" class="form-label">CEP:</label><br>
                            <input type="text" class="form-control" id="cep" name="cep" value="${cep}"
                                placeholder="CEP">`);
        if(cep == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                            Por favor, informe o CEP!
                            </div>`);
        }
        resposta.write(`</div>
                        <div class="col-md-6">
                            <label for="email" class="form-label">E-mail:</label><br>
                            <input type="text" class="form-control" id="email" name="email" value="${email}" 
                                placeholder="E-mail">`); 
        if (email == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                            Por favor, informe o E-mail!
                            </div>`);
        } 
        resposta.write(`</div>
                        <div class="col-md-4">
                            <label for="telefone" class="form-label">Telefone:</label><br>
                            <input type="text" class="form-control" id="telefone" name="telefone" value="${telefone}" 
                                placeholder="(99)99999-9999">`);
        if (telefone == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                            Por favor, informe o Telefone!
                            </div>`);
        } 
        resposta.write(`</div>
                        <div class="text-center">
                        <div class="col-12 mb-3 mt-3">
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
    resp.write('<th class="text-center">Razão social</th>');
    resp.write('<th class="text-center">Nome fantasia</th>');
    resp.write('<th class="text-center">CNPJ</th>');
    resp.write('<th class="text-center">Endereço</th>');
    resp.write('<th class="text-center">Cidade</th>');
    resp.write('<th class="text-center">UF</th>');
    resp.write('<th class="text-center">CEP</th>');
    resp.write('<th class="text-center">E-mail</th>');
    resp.write('</tr>');
    for(let i=0; i<lista.length; i++){
        resp.write('<tr>');
        resp.write(`<td>${lista[i].razao}`);
        resp.write(`<td>${lista[i].nome}`);
        resp.write(`<td>${lista[i].cnpj}`);
        resp.write(`<td>${lista[i].endereco}`);
        resp.write(`<td>${lista[i].cidade}`);
        resp.write(`<td>${lista[i].estado}`);
        resp.write(`<td>${lista[i].cep}`);
        resp.write(`<td>${lista[i].email}`);
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