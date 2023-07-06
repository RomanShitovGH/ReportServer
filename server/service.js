const oracledb = require('oracledb');
//{outFormat: OUT_FORMAT_OBJECT}

/* Подключаем библиотеки Client Oracle */
try {
    oracledb.initOracleClient({libDir: 'D:\\Distrib\\instantclient_11_2'});
} catch (err) {
    console.error('Whoops!');
    console.error(err);
    process.exit(1);
}

let pool;

pool = oracledb.createPool({
        user: 'xxx',
        password: 'xxx',
        connectString: 'xxx.xxx.xxx.xxx:1522/xxxxxxxxxxx',
        poolAlias: 'hr_pool'
    });

module.exports = {

    async anyQuery (statement, binds = [], opts = {}) {

        opts = {outFormat: oracledb.OUT_FORMAT_OBJECT}; // вместо этого надо написать процедуру сканирования приходящих
        // opts т.к. подключение oracledb. в другие модули не желательно и параметры в opts должны преобразовываться
        // например из {outFormat: OUT_FORMAT_OBJECT} в {outFormat: oracledb.OUT_FORMAT_OBJECT}

        // есть пример в text.txt в корне проекта
        //console.log('пришли binds - ', binds);
        let pul = await pool; // Получаем пулл
        let connection = await pul.getConnection(); // создаем соединение
        let res;

        try {
            res = await connection.execute(statement, binds, opts); // отправялем подключение на выполнение запроса и получаем
        } catch (err) {
            res = { metaData: [ { name: 'ERROR' } ], rows: [ [ err.message ] ] };
        }

        connection.release(); // завершаем подключение
        return res; // возвращаем данные
    }
}




