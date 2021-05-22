import React, {useState} from 'react'
import '../resources/style.css'


export default function App ( dt ) {
    const [activeRow, setActiveRow] = useState([]);
    const [countStr, setCountStr] = useState(5);

    function minMas(str) {

    }

    function Table() {

        return (
            <>
                <div >
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Кол-во строк</label>
                        <select className="form-control" id="exampleFormControlSelect1" onChange={(e)=>{
                            minMas(e.target.options.selectedIndex === 0 ? 5 : e.target.options.selectedIndex * 10 + e.target.options.selectedIndex * 5)
                        }}>
                            <option>5</option>
                            <option>15</option>
                            <option>30</option>
                        </select>
                    </div>
                </div>

                <div className="my-class">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <div className="container-fluid">
                            <div className="row flex-xl-nowrap">
                                <th className="col-1">ID_REPORT</th>
                                <th className="col-3">NM_UUID</th>
                                <th className="col-4">NM_REPORT</th>
                                <th className="col-3">DT_CHANGE</th>
                                <th className="col-1">NN_REPORT</th>
                            </div>
                        </div>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        dt.map(str =>
                            <tr id={str.ID_REPORT} className="" key={`key-${str.ID_REPORT}`} onClick={(e) => { console.log(e) }}
                                onDoubleClick={(e) => { alert(e.target.parentElement.parentElement.parentNode.id) }}>
                                <div className="container-fluid">
                                    <div className="row flex-xl-nowrap">
                                        <td className="col-1">{str.ID_REPORT}</td>
                                        <td className="col-3">{str.NM_UUID}</td>
                                        <td className="col-4">{str.NM_REPORT}</td>
                                        <td className="col-3">{str.DT_CHANGE}</td>
                                        <td className="col-1">{str.NN_REPORT}</td>
                                    </div>
                                </div>
                            </tr>
                        )
                    }

                    </tbody>
                </table>
                </div>
            </>
        )
    }

    if (JSON.stringify(dt) === '{}') {
        return <div>Нет отчетов в данном пункте</div>
    } else {
        return (
                <Table/>
        )
    }
}