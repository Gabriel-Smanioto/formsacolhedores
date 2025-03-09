let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

document.addEventListener("DOMContentLoaded", () => {
    atualizarTabela();
});

function adicionarAluno() {
    let nome = document.getElementById("nome").value;
    let serie = document.getElementById("serie").value;
    let idade = document.getElementById("idade").value;
    
    if (nome && serie && idade) {
        alunos.push({ Nome: nome, Série: serie, Idade: idade });
        localStorage.setItem("alunos", JSON.stringify(alunos));
        atualizarTabela();
        document.getElementById("alunoForm").reset();
    } else {
        alert("Preencha todos os campos!");
    }
}

function atualizarTabela() {
    let tabela = document.getElementById("tabelaAlunos");
    tabela.innerHTML = "<tr><th>Nome</th><th>Série</th><th>Idade</th></tr>";
    alunos.forEach(aluno => {
        let linha = tabela.insertRow();
        linha.insertCell(0).innerText = aluno.Nome;
        linha.insertCell(1).innerText = aluno.Série;
        linha.insertCell(2).innerText = aluno.Idade;
    });
}

function exportarParaExcel() {
    let ws = XLSX.utils.json_to_sheet(alunos);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Alunos");
    XLSX.writeFile(wb, "alunos.xlsx");
}

function limparDados() {
    localStorage.removeItem("alunos");
    alunos = [];
    atualizarTabela();
}
