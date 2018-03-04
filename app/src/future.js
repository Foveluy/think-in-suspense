import React from 'react';

var cached = {};
export const createFetcher = (promiseTask) => {
    let ref = cached;
    return () => {
        const task = promiseTask();
        task.then(res => {
            ref = res
        });
        if (ref === cached) {
            throw task
        }
        return ref
    }
}


export class Base extends React.Component {
    state = {
        error: false
    };

    componentDidCatch(error) {
        if (this._mounted) {
            if (typeof error.then === 'function') {
                this.setState({ error: true });
                error.then(() => {
                    if (this._mounted) {
                        this.setState({ error: false })
                    }
                });
            }
        }
    }
    componentDidMount() {
        this._mounted = true;
    }
    componentWillUnmount() {
        console.log('unm')
        this._mounted = false;
    }

}


export class Placeholder extends Base {

    render() {
        const { children } = this.props;
        const { error } = this.state;

        return error ? '加载数据中，请稍后...' : children;
    }
}

export class Loading extends Base {

    render() {
        const { children } = this.props;
        const { error } = this.state;

        return children(error)
    }
}

