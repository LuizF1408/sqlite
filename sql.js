const sqlite3 = require('sqlite3')
var rs = require('readline-sync')
let db = new sqlite3.Database('Carros2.db', (err) => {
    if (err) {
        console.error(err.message)

    }
    console.log('Conectada com Sucesso!')
    pegaDados()

    // db.run('CREATE TABLE carros (marca text,modelo text,cor text,ano integer,valor integer)');

})
var deletaCarros = () => {
var insert = "DELETE FROM carros WHERE modelo = ?"
    var modeloCarro= rs.question('Qual o modelo do veiculo ? ').toLowerCase()
    db.run(insert,modeloCarro,(erro) =>{
        if (erro) {
            console.log(erro.message)
            return
        }
        console.log('Carro apagado com sucesso!')
        pegaDados()
    })


    
}
var cadastraCarro = () => {
    var marca = rs.question('Marca :')
    var modelo = rs.question('Modelo : ')
    var cor = rs.question('Cor :')
    var ano = rs.questionInt('Ano :')
    var valor = rs.questionInt('Valor :')
    var insert = 'INSERT INTO carros (marca,modelo,cor,ano,valor) values(?,?,?,?,?)'
    var arg = [marca, modelo, cor, ano, valor]

    db.run(insert, arg, (erro) => {
        if (erro) {
            console.log(erro.message)
            return
        }
        console.log('Inserido com sucesso!')
        pegaDados()
    }
    )
}

var verVeiculos = () => {

    var visu = 'select * from carros'
    db.all(visu, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {


            console.log(row)

        }
        )
        pegaDados()
    })
}


var pegaDados = () => {
    console.log('Digite "1" Para Cadastrar um Veículo')
    console.log('Digite "2" Para Remover um Veículo')
    console.log('Digite "3" Para ver os veículos')
    console.log('Digite "4" Sair do programa')
    var resp = rs.questionInt('R: ')


    if (resp == 1) {
        cadastraCarro()

    }
    if (resp == 2) {
        deletaCarros()

    }
    if (resp == 3) {
        verVeiculos()

    }
    if (resp == 4) {
        console.log('Saiu')
        return


    }
}

