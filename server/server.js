const express = require("express");
const cors = require("cors");
const config = require("config");
const service = require("./service");
const fs = require('fs');
const app = express();
const PORT = config.get('serverPort');
const path = require('path');
const bodyParser = require('body-parser');

app.use(cors());

const JasperNode = require('jaspernode');

async function jasper (req, res) {
    try {
        const inputFile = path.join(__dirname, 'tmp/JasperNode/params.jrxml')
        const outputFile = path.join(__dirname, 'tmp/JasperNode/output/params')

        const jasper = new JasperNode()

        const connections = {
            driver:   'generic',
            username: 'xxxxxxx',
            password: 'xxxxxxx',
            dbdriver: 'oracle.jdbc.driver.OracleDriver',
            dburl:    'jdbc:oracle:thin:@xxxxxxx:1521/xxxxxxx'
        }

        const params = {
            myString: jasper.quotes('My String')
        }

        try {
            const filePath = await jasper.process(inputFile, outputFile, params, connections).execute();

            res.sendFile(filePath, function(err, norm){
                if (err === undefined) {  // если ошибок при отправке файла нет
                    fs.unlinkSync(filePath);  // подчищаем за собой созданный отчет
                }
            });
        } catch (err) {
        console.log(err.message);
        }
    // +++ res.sendFile(filePath); // отсылает файл на клиент и открывает его
    // +++ fs.unlinkSync(filePath); походу удаляет файл по пути filePath
    // +++ res.download(filePath); // скачивание файла
    } catch (e) {
        console.log(e);
    }
}

/*
function servApp (req, res) {
    const spa = fs.readFileSync('public/index.html');
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(spa.toString());
}
*/

async function anyQuery(req, res) {
    let rez = await service.anyQuery(
        req.body.textQuery,
        req.body.textBinds,
        req.body.textOpts,
    );
    res.setHeader("Content-Type", "application/json");
    res.json(rez);
}

//app.use(express.static('./public/'));
app.use(bodyParser.json());
//app.get('/', servApp);
//app.get('/query', servApp);

app.get('/j', jasper);


app.post('/test/test', anyQuery);
app.post('/getCatalog', anyQuery);

app.listen(PORT, () =>{
           console.log('Server started on port ', PORT)});