import express from 'express'
import bodyParser from 'body-parser'
import sql from 'msnodesqlv8'

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
const connectionString = "server=DSN119-002;Database=alaskadb;Trusted_Connection=Yes;Driver={Sql Server Native Client 11.0}";
app.listen(PORT, ()=> {
    console.log(`Server rodando na porta ${PORT}`)
})

app.route("/bebidas")

    .get((req, res)=> {
        sql.query(connectionString, "SELECT * FROM bebidas", (erro, rows)=> {
            if(erro){
                res.status(500).json("Erro de servidor", erro)
            }else{
                res.status(200).json(rows);
            }
        })
    })

    .post((req, res)=> {
        const {nome, preco, quantidade, descricao} = req.body;
        sql.query(connectionString, 
            `INSERT INTO bebidas VALUES ('${nome}', '${preco}', '${quantidade}', '${descricao}')`, (erro, rows)=> {
            if(erro){
                res.status(500).json("Erro de servidor", erro)
            }else{
                res.status(200).json("Adicionado com sucesso!");
            }
        })
    });


app.route("/bebidas/:id")
    .put((req, res)=> {
        const id = req.params.id
        const {nome, preco, quantidade, descricao} = req.body;
        sql.query(connectionString, 
            `UPDATE bebidas SET nome='${nome}', preco='${preco}', quantidade='${quantidade}', descricao='${descricao}' WHERE id=${id}`, (erro, rows)=> {
            if(erro){
                res.status(500).json("Erro de servidor", erro)
            }else{
                res.status(200).json("Editado com sucesso!");
            }
        })
    })
    .get((req, res)=> {
        const id = req.params.id
        sql.query(connectionString, 
            `SELECT * FROM bebidas WHERE id='${id}'`, (erro, rows)=> {
            if(erro){
                res.status(500).json("Erro de servidor", erro)
            }else{
                res.status(200).json(rows);
            }
        })
    })
    .delete((req, res)=> {
        const id = req.params.id
        sql.query(connectionString, 
            `DELETE FROM bebidas WHERE id='${id}'`, (erro, rows)=> {
            if(erro){
                res.status(500).json("Erro de servidor", erro)
            }else{
                res.status(200).json("Deletado com sucesso");
            }
        })
    })
