import React, { useState, useEffect } from "react";
import axios from '../utils/axios';

export default function Catalog_ () {
    const [textQuery, setTextQuery] = useState('select c.id_catalog, c.nm_catalog from jr_catalogs c');
    const [textBinds, setTextBinds] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const getData = async() => {
            const response = await axios.post('http://localhost:5000/getCatalog', {
                textQuery: textQuery,
                textBinds: textBinds,
                textOpts: {outFormat: 'OUT_FORMAT_OBJECT'}
            });
            setRows(response.data.rows);
        }
        getData();
    },[]);

    function Catalog(rows) {
        return rows.map(str =>
            <button type="button" className="btn btn-outline-info" id={`${str.ID_CATALOG}`}>{str.NM_CATALOG}</button>
        )
    }

    return (
        <div className="border border-info bg-light rounded">
            <div className="row">
                <div className="col-3">
                    <div className="nav" aria-orientation="vertical">
                        { Catalog(rows) }
                    </div>
                </div>
            </div>
        </div>
    )

}