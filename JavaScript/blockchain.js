var enderecoContrato = "0x6aBf4798b43B3aE306d0e774d4e100c03036e81f";
var provedor = new ethers.providers.Web3Provider(web3.currentProvider);
ethereum.enable();
var signatario = provedor.getSigner();
var contrato = new ethers.Contract(enderecoContrato, abiContrato, signatario);
var campoStatus = document.getElementById("campoStatus");

function tempodearrecadacao() {
    contrato.tempodearrecadacao()
        .then((resultado) => {
            campoStatus.innerHTML = resultado;
        })
        .catch((err) => {
            console.error(err);
            campoStatus.innerHTML = err.message;
        });
}


function doacao() {
    var amount = document.frmEntrar.valorContrib.value;
    
    var boxCommStatus = document.getElementById("boxCommStatus");
    boxCommStatus.innerHTML = "Sending transaction...";
    var additionalSettings = {
        value: ethers.utils.parseUnits(amount, 'ether')
    };
    contrato.doacao (additionalSettings)
        .then((tx) => {
            console.log("executePayment - Transaction ", tx);
            boxCommStatus.innerHTML = "Doação Realizada!";
            
                .catch((err) => {
                    console.error("executePayment - after tx being mint");
                    console.error(err);
                    boxCommStatus.innerHTML = "Ops! Algo deu errado!" + err.message;
                })
        })
        .catch((err) => {
            console.error("executePayment - tx has been sent");
            console.error(err);
            boxCommStatus.innerHTML = "Something went wrong: " + err.message;
        })
}
