var localDB = null;

function onInit() {
    try {
        if (!window.openDatabase) {
            updateStatus("Erro: Seu navegador não permite banco de dados.");
        }
        else {
            initDB();
            createTables();
            queryAndUpdateOverview();
        }
    }
    catch (e) {
        if (e == 2) {
            updateStatus("Erro: Versão de banco de dados inválida.");
        }
        else {
            updateStatus("Erro: Erro desconhecido: " + e + ".");
        }
        return;
    }
}

function initDB() {
    var shortName = 'stuffDB';
    var version = '1.0';
    var displayName = 'MyStuffDB';
    var maxSize = 65536; // Em bytes
    localDB = window.openDatabase(shortName, version, displayName, maxSize);
}

function createTables() {
    var query = 'CREATE TABLE IF NOT EXISTS rpgsheet(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
        'nome VARCHAR, ' +
        'classenivel VARCHAR, ' +
        'historia VARCHAR, ' +
        'jogador VARCHAR, ' +
        'raca VARCHAR, ' +
        'alinhamento VARCHAR, ' +
        'experiencia INTEGER, ' +
        'hpatual INTEGER, ' +
        'hpmaximo INTEGER, ' +
        'ac INTEGER, ' +
        'iniciativa INTEGER, ' +
        'velocidade INTEGER, ' +
        'valorforca INTEGER, ' +
        'valordestreza INTEGER, ' +
        'valorconstituicao INTEGER, ' +
        'valorsabedoria INTEGER, ' +
        'valorinteligencia INTEGER, ' +
        'valorcarisma INTEGER, ' +
        'acrobacia INTEGER, ' +
        'arcana INTEGER, ' +
        'atletismo INTEGER, ' +
        'enganacao INTEGER, ' +
        'intimidacao INTEGER, ' +
        'medicina INTEGER, ' +
        'percepcao INTEGER, ' +
        'persuasao INTEGER, ' +
        'furtividade INTEGER, ' +
        'sobrevivencia INTEGER);';

    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            updateStatus("Tabela 'rpgsheet' status: OK.");
        });
    }
    catch (e) {
        updateStatus("Erro: Data base 'rpgsheet' não criada " + e + ".");
        return;
    }
}

function onUpdate() {
    var id = document.itemForm.id.value;
    var nome = document.itemForm.nome.value;
    var classenivel = document.itemForm.classenivel.value;
    var historia = document.itemForm.historia.value;
    var jogador = document.itemForm.jogador.value;
    var raca = document.itemForm.raca.value;
    var alinhamento = document.itemForm.alinhamento.value;
    var experiencia = document.itemForm.experiencia.value;
    var hpatual = document.itemForm.hpatual.value;
    var hpmaximo = document.itemForm.hpmaximo.value;
    var ac = document.itemForm.ac.value;
    var iniciativa = document.itemForm.iniciativa.value;
    var velocidade = document.itemForm.velocidade.value;
    var valorforca = document.itemForm.valorforca.value;
    var valordestreza = document.itemForm.valordestreza.value;
    var valorconstituicao = document.itemForm.valorconstituicao.value;
    var valorinteligencia = document.itemForm.valorinteligencia.value;
    var valorsabedoria = document.itemForm.valorsabedoria.value;
    var valorcarisma = document.itemForm.valorcarisma.value;
    var acrobacia = document.itemForm.acrobacia.value;
    var arcana = document.itemForm.arcana.value;
    var atletismo = document.itemForm.atletismo.value;
    var enganacao = document.itemForm.enganacao.value;
    var intimidacao = document.itemForm.intimidacao.value;
    var medicina = document.itemForm.medicina.value;
    var percepcao = document.itemForm.percepcao.value;
    var persuasao = document.itemForm.persuasao.value;
    var furtividade = document.itemForm.furtividade.value;
    var sobrevivencia = document.itemForm.sobrevivencia.value;


    if (nome == "") {
        updateStatus("'Nome' é um campo obrigatório!");
    }
    else {
        var query = "update rpgsheet set nome=? where id=?;";
        try {
            localDB.transaction(function (transaction) {
                transaction.executeSql(query, [nome, classenivel, historia, jogador, id, raca, alinhamento, experiencia, hpatual, hpmaximo,
                    ac, iniciativa, velocidade, valorforca, valordestreza, valorconstituicao, valorinteligencia,
                    valorsabedoria, valorcarisma, acrobacia, arcana, atletismo, enganacao, intimidacao, medicina,
                    percepcao, persuasao, furtividade, sobrevivencia], function (transaction, results) {
                        if (!results.rowsAffected) {
                            updateStatus("Erro: Update não realizado.");
                        }
                        else {
                            updateForm("", "", "", "", "", "", "", "", "", "",
                                "", "", "", "", "", "", "",
                                "", "", "", "", "", "", "", "",
                                "", "", "", "");
                            updateStatus("Update realizado:" + results.rowsAffected);
                            queryAndUpdateOverview();
                        }
                    }, errorHandler);
            });
        }
        catch (e) {
            updateStatus("Erro: UPDATE não realizado " + e + ".");
        }
    }
}

function onDelete() {
    var id = document.itemForm.id.value;

    var query = "delete from rpgsheet where id=?;";
    try {
        localDB.transaction(function (transaction) {

            transaction.executeSql(query, [id], function (transaction, results) {
                if (!results.rowsAffected) {
                    updateStatus("Erro: Delete não realizado.");
                }
                else {
                    updateForm("", "", "", "", "", "", "", "", "", "",
                        "", "", "", "", "", "", "",
                        "", "", "", "", "", "", "", "",
                        "", "", "", "");
                    updateStatus("Linhas deletadas:" + results.rowsAffected);
                    queryAndUpdateOverview();
                }
            }, errorHandler);
        });
    }
    catch (e) {
        updateStatus("Erro: DELETE não realizado " + e + ".");
    }

}

function onCreate() {
    var nome = document.itemForm.nome.value;
    if (nome == "") {
        updateStatus("Erro: 'Nome' é um campo obrigatório!");
    }
    else {
        var query = "insert into rpgsheet (nome, classenivel, historia, jogador, id, raca, alinhamento, experiencia, hpatual, hpmaximo," +
            " ac, iniciativa, velocidade, valorforca, valordestreza, valorconstituicao, valorinteligencia, " +
            " valorsabedoria, valorcarisma, acrobacia, arcana, atletismo, enganacao, intimidacao, medicina, " +
            " percepcao, persuasao, furtividade, sobrevivencia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        try {
            localDB.transaction(function (transaction) {
                transaction.executeSql(query, [nome, classenivel, historia, jogador, id, raca, alinhamento, experiencia, hpatual, hpmaximo,
                    ac, iniciativa, velocidade, valorforca, valordestreza, valorconstituicao, valorinteligencia,
                    valorsabedoria, valorcarisma, acrobacia, arcana, atletismo, enganacao, intimidacao, medicina,
                    percepcao, persuasao, furtividade, sobrevivencia], function (transaction, results) {
                        if (!results.rowsAffected) {
                            updateStatus("Erro: Inserção não realizada");
                        }
                        else {
                            updateForm("", "", "", "", "", "", "", "", "", "",
                                "", "", "", "", "", "", "",
                                "", "", "", "", "", "", "", "",
                                "", "", "", "");
                            updateStatus("Inserção realizada, linha id: " + results.insertId);
                            queryAndUpdateOverview();
                        }
                    }, errorHandler);
            });
        }
        catch (e) {
            updateStatus("Erro: INSERT não realizado " + e + ".");
        }
    }
}

function onSelect(htmlLIElement) {
    var id = htmlLIElement.getAttribute("id");

    query = "SELECT * FROM rpgsheet where id=?;";
    try {
        localDB.transaction(function (transaction) {

            transaction.executeSql(query, [id], function (transaction, results) {

                var row = results.rows.item(0);

                updateForm(row['id'], row['nome'], row['classenivel'], row['historia'], row['jogador'], row['raca'],
                    row['alinhamento'], row['experiencia'], row['hpautal'], row['hpmaximo'], row['ac'], row['iniciativa'],
                    row['velocidade'], row['velocidade'], row['valorforca'], row['valordestreza'], row['valorconstituicao'],
                    row['valorsabedoria'], row['valorinteligencia'], row['valorcarisma'], row['acrobacia'],
                    row['arcana'], row['atletismo'], row['enganacao'],
                    row['intimidacao'], row['medicina'], row['percepcao'],
                    row['furtividade'], row['sobrevivencia']);


            }, function (transaction, error) {
                updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    }
    catch (e) {
        updateStatus("Error: SELECT não realizado " + e + ".");
    }

}

function queryAndUpdateOverview() {

    //Remove as linhas existentes para inserção das novas
    var dataRows = document.getElementById("itemData").getElementsByClassName("data");

    while (dataRows.length > 0) {
        row = dataRows[0];
        document.getElementById("itemData").removeChild(row);
    };

    //Realiza a leitura no banco e cria novas linhas na tabela.
    var query = "SELECT * FROM rpgsheet;";
    try {
        localDB.transaction(function (transaction) {

            transaction.executeSql(query, [], function (transaction, results) {
                for (var i = 0; i < results.rows.length; i++) {

                    var row = results.rows.item(i);
                    var li = document.createElement("li");
                    li.setAttribute("id", row['id']);
                    li.setAttribute("class", "data");
                    li.setAttribute("onclick", "onSelect(this)");

                    var liText = document.createTextNode(row['nome'] + " x " + row['idade']);
                    li.appendChild(liText);

                    document.getElementById("itemData").appendChild(li);
                }
            }, function (transaction, error) {
                updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    }
    catch (e) {
        updateStatus("Error: SELECT não realizado " + e + ".");
    }
}

// 3. Funções de tratamento e status.

// Tratando erros

errorHandler = function (transaction, error) {
    updateStatus("Erro: " + error.message);
    return true;
}

nullDataHandler = function (transaction, results) {
}

// Funções de update

function updateForm(nome, classenivel, historia, jogador, id, raca, alinhamento, experiencia, hpatual, hpmaximo,
    ac, iniciativa, velocidade, valorforca, valordestreza, valorconstituicao, valorinteligencia,
    valorsabedoria, valorcarisma, acrobacia, arcana, atletismo, enganacao, intimidacao, medicina,
    percepcao, persuasao, furtividade, sobrevivencia) {
    document.itemForm.id.value = id;
    vdocument.itemForm.nome.value = nome;
    document.itemForm.classenivel.value = classenivel;
    document.itemForm.historia.value = historia;
    document.itemForm.jogador.value = jogador;
    document.itemForm.raca.value = raca;
    document.itemForm.alinhamento.value = alinhamento;
    document.itemForm.experiencia.value = experiencia;
    document.itemForm.hpatual.value = hpatual;
    document.itemForm.hpmaximo.value = hpmaximo;
    document.itemForm.ac.value = ac;
    document.itemForm.iniciativa.value = iniciativa;
    document.itemForm.velocidade.value = velocidade;
    document.itemForm.valorforca.value = valorforca;
    document.itemForm.valordestreza.value = valordestreza;
    document.itemForm.valorconstituicao.value = valorconstituicao;
    document.itemForm.valorinteligencia.value = valorinteligencia;
    document.itemForm.valorsabedoria.value = valorsabedoria;
    document.itemForm.valorcarisma.value = valorcarisma;
    document.itemForm.acrobacia.value = acrobacia;
    document.itemForm.arcana.value = arcana;
    document.itemForm.atletismo.value = atletismo; 
    document.itemForm.enganacao.value = enganacao;
    document.itemForm.intimidacao.value = intimidacao;
    document.itemForm.medicina.value = medicina;
    document.itemForm.percepcao.value = percepcao;
    document.itemForm.persuasao.value = persuasao;
    document.itemForm.furtividade.value = furtividade;
    document.itemForm.sobrevivencia.value = sobrevivencia;
}

function updateStatus(status) {
    document.getElementById('status').innerHTML = status;
}