//  Declare SQL Query for SQLite

var createContato = "CREATE TABLE IF NOT EXISTS Contatos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, telefone TEXT, mensagem TEXT)";

var createCotacao = "CREATE TABLE IF NOT EXISTS Cotacoes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, telefone TEXT, mensagem TEXT)";

var selectAllStatement = "SELECT * FROM Contatos";

var selectAllCotacoes = "SELECT * FROM Cotacoes";

var insertMensagemContato = "INSERT INTO Contatos (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)";

var insertCotacoes = "INSERT INTO Cotacoes (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)";

var updateStatement = "UPDATE Contatos SET nome = ?, nome = ? WHERE id=?";

var deleteStatement = "DELETE FROM Contatos WHERE id=?";

var deleteStatementCotacao = "DELETE FROM Cotacoes WHERE id=?";

var dropStatement = "DROP TABLE Contatos";

var db = openDatabase("AddressBook", "1.0", "Address Book", 200000);  // Open SQLite Database

var dataset;

var DataType;

function initDatabase()  // Function Call When Page is ready.

{

    try {

        if (!window.openDatabase)  // Check browser is supported SQLite or not.

        {

            alert('Databases are not supported in this browser.');

        }

        else {

            createTable();  // If supported then call Function for create table in SQLite

        }

    }

    catch (e) {

        if (e == 2) {

            // Version number mismatch.

            console.log("Invalid database version.");

        } else {

            console.log("Unknown error " + e + ".");

        }

        return;

    }

}

function createTable()  // Function for Create Table in SQLite.

{

    db.transaction(function (tx) { tx.executeSql(createContato, [], exibeMensagen(), onError); });
    db.transaction(function (tx) { tx.executeSql(createCotacao, [], exibeCotacoes(), onError); });

}

function insertContatos() // Get value from Input and insert record . Function Call when Save/Submit Button Click..

{

    var nometemp = $('#nomeMensagem').val();
    var emailtemp = $('#emailMensagem').val();
    var telefonetemp = $('#telefoneMensagem').val();
    var mensagemtemp = $('#mensagemContato').val();
    if(nometemp != "" && emailtemp != "" && telefonetemp != "" && mensagemtemp != "" ) {
        db.transaction(function (tx) {
            tx.executeSql(insertMensagemContato, [nometemp, emailtemp, telefonetemp, mensagemtemp], loadAndResetContato(), onError);
        });
    }else{
        onError();
    }
    //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );

}

function inserirCotacoes() // Get value from Input and insert record . Function Call when Save/Submit Button Click..

{

    var nomeContatotemp = $('#nomeCotacao').val();
    var emailContatotemp = $('#emailCotacao').val();
    var telefoneContatotemp = $('#telefoneCotacao').val();
    var mensagemContatotemp = $('#mensagemCotacao').val();
    if(nomeContatotemp != "" && emailContatotemp != "" && telefoneContatotemp != "" && mensagemContatotemp != "" ) {
        db.transaction(function (tx) {
            tx.executeSql(insertCotacoes, [nomeContatotemp, emailContatotemp, telefoneContatotemp, mensagemContatotemp], loadAndResetCotacoes, onError);
        });
    }else{
      onError();
    }
    //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );

}

function deleteRecordContatos(id) // Get id of record . Function Call when Delete Button Click..

{

    var iddelete = id.toString();

    db.transaction(function (tx) { tx.executeSql(deleteStatement, [id], exibeMensagen(), onError);
        swal("Sucesso!", "Contato deletado com sucesso!!", "success"); });

    //resetForm();

}

function deleteRecordCotacoes(id) // Get id of record . Function Call when Delete Button Click..

{

    var iddelete = id.toString();

    db.transaction(function (tx) { tx.executeSql(deleteStatementCotacao, [id], exibeCotacoes, onError);
        swal("Sucesso!", "Cotação deletada com sucesso!!", "success"); });

    //resetFormCotacoes();
    //loadRecordCotacao();

}

function updateRecord() // Get id of record . Function Call when Delete Button Click..

{

    var usernameupdate = $('input:text[id=username]').val().toString();

    var useremailupdate = $('input:text[id=useremail]').val().toString();

    var useridupdate = $("#id").val();

    db.transaction(function (tx) { tx.executeSql(updateStatement, [usernameupdate, useremailupdate, Number(useridupdate)], loadAndReset, onError); });

}

function dropTable() // Function Call when Drop Button Click.. Talbe will be dropped from database.

{

    db.transaction(function (tx) { tx.executeSql(dropStatement, [], onError); });

    resetForm();

    initDatabase();

}

function loadRecordContatos(i) // Function for display records which are retrived from database.

{

    var item = dataset.item(i);

    $("#nomeMensagem").val((item['nome']).toString());

    $("#emailMensagem").val((item['email']).toString());

    $("#telefoneMensagem").val((item['telefone']).toString());

    $("#mensagemContato").val((item['mensagem']).toString());

    $("#id").val((item['id']).toString());

}

function loadRecordCotacao(i) // Function for display records which are retrived from database.

{

    var item = dataset.item(i);

    $("#nomeCotacao").val((item['nome']).toString());

    $("#emailCotacao").val((item['email']).toString());

    $("#telefoneCotacao").val((item['telefone']).toString());

    $("#mensagemCotacao").val((item['mensagem']).toString());

    $("#id").val((item['id']).toString());

}

function resetFormContato() // Function for reset form input values.

{

    $("#nomeMensagem").val("");

    $("#emailMensagem").val("");

    $("#telefoneMensagem").val("");

    $("#mensagemContato").val("");

    $("#id").val("");

}

function resetFormCotacoes() // Function for reset form input values.

{

    $("#nomeCotacao").val("");

    $("#emailCotacao").val("");

    $("#telefoneCotacao").val("");

    $("#mensagemCotacao").val("");

}

function loadAndResetContato() //Function for Load and Reset...

{

    resetFormContato();

    swal("Sucesso!", "Mensagem enviada com sucesso!!", "success");

    exibeMensagen();

}
function loadAndResetCotacoes() //Function for Load and Reset...

{

    resetFormCotacoes();
    $("#myModal").modal('hide');
    swal("Sucesso!", "Cotação enviada com sucesso!!", "success")

    exibeCotacoes();

}

function onError(tx, error) // Function for Hendeling Error...

{

    swal("Oops...", "houve algum erro, por favor verifique os dados", "error")

}

function showRecords() // Function For Retrive data from Database Display records as list

{

    $("#results").html('')

    db.transaction(function (tx) {

        tx.executeSql(selectAllStatement, [], function (tx, result) {

            dataset = result.rows;

            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);

                var linkeditdelete = '<li>' + item['nome'] + ' , ' + item['email'] + ' , ' + item['telefone'] + ' , ' + item['mensagem'] + '   '
                    + '<a href="#" onclick="loadRecordContatos(' + i + ');">edit</a>' + '    '
                    + '<a href="#" onclick="deleteRecordContatos(' + item['id'] + ');">delete</a></li>';

                $("#results").append(linkeditdelete);

            }

        });

    });

}

function exibeCotacoes() // Function For Retrive data from Database Display records as list

{

    $("#results").html('')

    db.transaction(function (tx) {

        tx.executeSql(selectAllCotacoes, [], function (tx, result) {

            dataset = result.rows;

            var linkeditdelete = '<table class="table table-hover"><thead><tr>'
                + '<th>Nome</th>'
                + '<th>Email</th>'
                + '<th>Telefone</th>'
                + '<th>Mensagem</th>'
                + '<th>Ação</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody>';

            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);

                linkeditdelete += '<tr>' +
                    '<td>' + item['nome'] + '</td>' +
                    '<td>' + item['email'] + '</td>' +
                    '<td>' + item['telefone'] + '</td>' +
                    '<td>' + item['mensagem'] + '</td>' +
                    '<td> ' +
                    '<button type="button" class="btn btn-danger" aria-label="Left Align" onclick="deleteRecordCotacoes(' + item['id'] + ')">' +
                    '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>' +
                    '</button>' +
                    '</td></tr>'

                    /*'<li>' + item['nome'] + ' , ' + item['email'] + ' , ' + item['telefone'] + ' , ' + item['mensagem'] + '   '
                    + '<a href="#" onclick="loadRecordCotacao(' + i + ');">edit</a>' + '    '
                    + '<a href="#" onclick="deleteRecordCotacoes(' + item['id'] + ');">delete</a></li>';
*/

            }
            linkeditdelete += '</tbody></table>';
            $("#results").append(linkeditdelete);
        });

    });

}

function exibeMensagen() // Function For Retrive data from Database Display records as list

{

    $("#result").html('')

    db.transaction(function (tx) {

        tx.executeSql(selectAllStatement, [], function (tx, result) {

            dataset = result.rows;

            var linkeditdelete = '<table class="table table-hover"><thead><tr>'
                + '<th>Nome</th>'
                + '<th>Email</th>'
                + '<th>Telefone</th>'
                + '<th>Mensagem</th>'
                + '<th>Ação</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody>';

            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);

                linkeditdelete += '<tr>' +
                    '<td>' + item['nome'] + '</td>' +
                    '<td>' + item['email'] + '</td>' +
                    '<td>' + item['telefone'] + '</td>' +
                    '<td>' + item['mensagem'] + '</td>' +
                    '<td> ' +
                    '<button type="button" class="btn btn-danger" aria-label="Left Align" onclick="deleteRecordContatos(' + item['id'] + ')">' +
                    '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>' +
                    '</button>' +
                    '</td></tr>'

                /*'<li>' + item['nome'] + ' , ' + item['email'] + ' , ' + item['telefone'] + ' , ' + item['mensagem'] + '   '
                 + '<a href="#" onclick="loadRecordCotacao(' + i + ');">edit</a>' + '    '
                 + '<a href="#" onclick="deleteRecordCotacoes(' + item['id'] + ');">delete</a></li>';
                 */

            }
            linkeditdelete += '</tbody></table>';
            $("#result").append(linkeditdelete);
        });

    });

}

$(document).ready(function () // Call function when page is ready for load..

{


    $("body").fadeIn(2000); // Fede In Effect when Page Load..

    initDatabase();

    $("#enviar").click(inserirCotacoes);

    $("#enviarMensagem").click(insertContatos);

    $("#btnUpdate").click(updateRecord);

    //$("#btnReset").click(resetForm);

    $("#btnDrop").click(dropTable);

    $("#myModalCotacoes").load(exibeCotacoes);
    $("#myModalMensagens").load(exibeMensagen);

});

