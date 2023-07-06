import React from "react";

export default class IndexPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputText: {
                textQuery: '',
                textBinds: []},
            tableText: {
                tableTitle: [],
                tableBody: []
            }
        };
    }

    onLogin(event){
        fetch(`/test/test`, {
            method: "post",
            body: JSON.stringify({
                textQuery: this.state.inputText.textQuery,
                textBinds: this.state.inputText.textBinds
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(json => {
                let prod = this.state.tableText;
                prod.tableTitle = json.metaData;
                prod.tableBody = json.rows;
                this.setState({
                    tableText: prod
                });
                }
            )
            .catch(error => {
                console.log("Ошибка - " + error);
            })
    }

    onChange(event) {
        let name = event.target.name;
        let prod = this.state.inputText;
        if (name === 'textBinds') {
            if (event.target.value === '') {
                prod[name] = [];
            } else {
                prod[name] = event.target.value.split('#');
            }
        } else {
            prod[name] = event.target.value;
        }
        this.setState({ inputText: prod });

    }

    renderTable() {
        let st_title = this.state.tableText.tableTitle;
        let st_body = this.state.tableText.tableBody;
        let s_title;
        let s_body;
        if (st_title) {
            s_title = st_title.map((stolb, index) =>
                <th scope="col" key={`stolb-${index}`}>{stolb.name}</th>
            )
        }

        if (st_body) {
            s_body = st_body.map((str, index) =>
                  <tr className="table-light" key={`str-${index}`}>
                      {str.map((st, index) =>
                          <th key={`st-${index}`}>{ st }</th>
                      )}
                  </tr>
            )
            console.log('s_body - ', s_body)
        }

        return (
            <div className="container px-1 table-responsive">
                <table className="table table-bordered">
                    <thead className="table-primary">
                        <tr>
                            { s_title }
                        </tr>
                    </thead>
                    <tbody>
                        { s_body }
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return <div className="container px-1">
            <br className="hidden-xs"/>
            <div className="container px-1">Запросы в базу</div>
            <br className="hidden-xs"/>
            <br className="hidden-xs"/>
            <form>
                <div className="input-group mb-3">
                    <textarea className="form-control" placeholder="Запрос" id="exampleFormControlTextarea1" rows="3" name="textQuery" value={ this.state.inputText.textQuery } onChange={ this.onChange.bind(this) }/>
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Параметры"
                           aria-label="Параметры" aria-describedby="button-addon2"
                           name="textBinds" value={ this.state.inputText.textBinds } onChange={ this.onChange.bind(this) }/>
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2"
                            onClick={ this.onLogin.bind(this) }>Выполнить</button>
                </div>

                <br className="hidden-xs"/>
                <div className="mb-3">
                    { this.renderTable() }
                </div>
            </form>


        </div>
    }
}