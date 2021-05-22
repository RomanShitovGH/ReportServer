import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
//import tableReports from "../components/TableReports.jsx";
import table from "../components/Table.jsx";
import tableRDT from "../components/TableRDT.jsx";

import axios from "../utils/axios";

export default function IndexPage() {
    const [dataCatalog, setDataCatalog] = useState({});
    const [catalogRows, setCatalogRows] = useState([]);


    async function onClick(id){
        const response = await axios.post('http://localhost:5000/getCatalog', {
            textQuery: 'select t.id_report, t.nm_uuid, t.nm_report, t.dt_change, t.nn_report from jr_reports t where t.id_catalog = :id_catalog',
            textBinds: [id],
            textOpts: {outFormat: 'OUT_FORMAT_OBJECT'}
        });

        setDataCatalog(response.data.rows);
    }

    function Catalog() {
        useEffect(() => {
            const getData = async() => {
                const response = await axios.post('http://localhost:5000/getCatalog', {
                    textQuery: 'select c.id_catalog, c.nm_catalog from jr_catalogs c',
                    textBinds: [],
                    textOpts: {outFormat: 'OUT_FORMAT_OBJECT'}
                });
                setCatalogRows(response.data.rows);
            }
            getData();
        },[]);

        function CatalogRows(rows) {
            return rows.map(str =>
                <div key={`${str.ID_CATALOG}`}>
                    <button type="button" className="btn btn-outline-info btn-block" key={`${str.ID_CATALOG}`} id={`${str.ID_CATALOG}`}
                            onClick={(me) => onClick(me.target.id)}>
                        {str.NM_CATALOG}
                    </button>
                </div>
            )
        }
        return (
            <div className="row">
                <div className="col-12">
                    { CatalogRows(catalogRows) }
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header/>
            <main>
                <div className="container-fluid h-100">
                    <div className="row flex-xl-nowrap h-100">
                        <div className="col-12 col-md-3 col-xl-2 bd-sidebar border-right">
                            Каталог
                            {Catalog()}
                        </div>
                        <div className="col-12 col-md-9 col-xl-10 bd-content">
                            Список отчетов

                            { dataCatalog === {} ? 'Нет данных' : table(dataCatalog)}

                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}