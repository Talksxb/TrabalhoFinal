pragma solidity 0.5.13;

contract FinanciamentoColetivo {
    
    address criador;
    uint256 prazofinal;
    uint256 metadeFundos;
    mapping(address => uint256) public doacaoDe;
    
    constructor(
        string memory nomeCriador )
        
    public {
        criador = msg.sender;
        
    }

 function tempodearrecadacao (uint256 prazo, uint256 _metadeFundos) public {
        
        prazofinal = now + (prazo * 1 days);
        metadeFundos = _metadeFundos;
    }

    function doacao(uint256 quantia) public payable {
        require(now < prazofinal);                
        require(msg.value == quantia);

        doacaoDe[msg.sender] += quantia;
    }

    function arrecadarfundos() public {
        require(address(this).balance >= metadeFundos); 
        require(now >= prazofinal);               
        require(msg.sender == criador);

        msg.sender.transfer(address(this).balance);
    }

    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }
    
    function retornodoacao() public {
        require(address(this).balance < metadeFundos);  
        require(now >= prazofinal);               

        uint256 quantia = doacaoDe [msg.sender];
        doacaoDe[msg.sender] = 0;
        msg.sender.transfer(quantia);
    }
}
