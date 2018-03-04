import React from 'react';
import ReactDOM from 'react-dom';
import { createFetcher, Placeholder, Loading } from './future';
import { fetchSometingApi } from './api';
import { Spin } from './spin';

import "./style.css";



const getData = createFetcher(fetchSometingApi);

const FangZheng = ({ name }) => {
    return <h1>{getData()}!</h1>
}

class App extends React.Component {
    state = {
        show: false
    }

    handleClick = () => {
        this.setState({
            show: true
        })
    }

    handleClickBack = () => {
        this.setState({
            show: false
        })
    }
    handleClickClear = () => {
        location.reload();
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>加载</button>
                <button onClick={this.handleClickBack}>回退</button>
                <button onClick={this.handleClickClear}>清除缓存</button>
                <div>
                    {this.state.show ?
                        <Loading>
                            {isLoading => isLoading ? <Spin /> : <FangZheng />}
                        </Loading> :
                        null
                    }
                </div>
            </div>
        );
    }
}



ReactDOM.render(
    <App />,
    document.getElementById('root')
);