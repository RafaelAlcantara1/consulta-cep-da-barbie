function buscarCEP() {     
    const cep = document.getElementById('cep').value.replace(/\D/g, '');     
    const resultadoDiv = document.getElementById('resultado');      

    if (cep.length !== 8) {         
        resultadoDiv.innerHTML = '<p style="color: red;">Por favor, insira um CEP válido com 8 dígitos.</p>';         
        return;     
    }      

    const url = `https://viacep.com.br/ws/${cep}/json/`;      

    fetch(url)         
        .then(response => {             
            if (!response.ok) {                 
                throw new Error(`Erro na requisição: ${response.status}`);             
            }             
            return response.json();         
        })         
        .then(data => {             
            if (data.erro) {                 
                resultadoDiv.innerHTML = '<p style="color: red;">CEP não encontrado.</p>';             
            } else {                 
                resultadoDiv.innerHTML = `                     
                    <p><strong>CEP:</strong> ${data.cep}</p>                     
                    <p><strong>Logradouro:</strong> ${data.logradouro || 'Não informado'}</p>                     
                    <p><strong>Bairro:</strong> ${data.bairro || 'Não informado'}</p>                     
                    <p><strong>Cidade:</strong> ${data.localidade || 'Não informado'}</p>                     
                    <p><strong>Estado:</strong> ${data.uf || 'Não informado'}</p>                 
                `;             
            }         
        })         
        .catch(error => {             
            resultadoDiv.innerHTML = `<p style="color: red;">Erro ao buscar CEP: ${error.message}</p>`;         
        }); 
}
