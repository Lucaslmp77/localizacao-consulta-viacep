const inputRua = document.querySelector('#rua');
const inputBairro = document.querySelector('#bairro');
const inputCidade = document.querySelector('#cidade');
const inputUf = document.querySelector('#uf');
const inputIbge = document.querySelector('#ibge');
const inputDdd = document.querySelector('#ddd');

inputRua.disabled = true;
inputBairro.disabled = true;
inputCidade.disabled = true;
inputUf.disabled = true;
inputIbge.disabled = true;
inputDdd.disabled = true;

const limparFormulario = (endereco) =>{
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('uf').value = '';
    document.getElementById('ibge').value = '';
    document.getElementById('ddd').value = '';
}
const preencherFormulario = (endereco) =>{
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('uf').value = endereco.uf;
    document.getElementById('ibge').value = endereco.ibge;
    document.getElementById('ddd').value = endereco.ddd;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep); 
const cepAux = document.getElementById('cep');

const pesquisarCep = async() => {
    limparFormulario();
    const cep = document.getElementById('cep').value.replace("-","");
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    addHideLoader();
    if (cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')){
            addErro(cepAux, "CEP NÃO ENCONTRADO!");
            removeHideLoader();
        }else {
            addSucesso(cepAux);
            preencherFormulario(endereco);
            removeHideLoader();
        }
    }else{
        addErro(cepAux, "CEP INVÁLIDO!");
        removeHideLoader();
    }
}
/* ==============ADD ERRO============== */
function addErro(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;
    formControl.className = "caixaForm erro";
}
/* ==============ADD SUCESSO============== */
function addSucesso(input) {
    const formControl = input.parentElement;
    formControl.className = "caixaForm success";
}
/* ==============LOADING============== */
function addHideLoader() {
    const divRua = document.getElementById('divRua');
    const divBairro = document.getElementById('divBairro');
    const divCidade = document.getElementById('divCidade');
    const divUf = document.getElementById('divUf');
    const divIbge = document.getElementById('divIbge');
    const divDdd = document.getElementById('divDdd');

    divRua.className = "loader hide-loader";
    divBairro.className = "loader hide-loader";
    divCidade.className = "loader hide-loader";
    divUf.className = "loader hide-loader";
    divIbge.className = "loader hide-loader";
    divDdd.className = "loader hide-loader";
}
function removeHideLoader() {
    const divRua = document.getElementById('divRua');
    const divBairro = document.getElementById('divBairro');
    const divCidade = document.getElementById('divCidade');
    const divUf = document.getElementById('divUf');
    const divIbge = document.getElementById('divIbge');
    const divDdd = document.getElementById('divDdd');
    
    divRua.className = "loader";
    divBairro.className = "loader";
    divCidade.className = "loader";
    divUf.className = "loader";
    divIbge.className = "loader";
    divDdd.className = "loader";
}
document.getElementById('cep')
        .addEventListener('focusout',pesquisarCep);