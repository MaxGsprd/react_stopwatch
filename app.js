class Stopwatch extends React.Component {
    constructor(props) {
        super(props),
        this.state = {n: 0, timer: null};
        this.pause = this.pause.bind(this);
        this.play = this.play.bind(this);
        this.tick = this.tick.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        this.pause();
    }

    componentWillUnmount() {
        window.clearInterval(this.state.timer);
    }

    tick() {
        this.setState( (state) => (
            {n: state.n + 1 }
        ));
    }

    pause() {
        window.clearInterval(this.state.timer);
        this.setState(({timer: null}))
    }

    play() {
        window.clearInterval(this.state.timer);
        this.setState({
            timer: window.setInterval(this.tick, 1000)
        });
    }

    reset() {
        window.clearInterval(this.state.timer);
        this.setState(({timer: null, n:0}))
    }

    render() {
        return (
            <React.Fragment>
                {this.state.timer ?
                    <button id="pause" onClick={this.pause}>
                        Pause
                    </button> :
                    <button id="play" onClick={this.play}>
                        Start
                    </button>      
                }
                <button id="reset" onClick={this.reset}>
                    Reset
                </button> 
                <h3>Time elapsed: {this.state.n}</h3>
            </React.Fragment>
        );
    }
}

class App extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Stopwatch/>
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);