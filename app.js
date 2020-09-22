function Title() {
    return (
        <h1 id="title">Stop<span id="watch">watch</span></h1>
    );
}

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
        this.setState(({timer: null}));
    }

    play() {
        window.clearInterval(this.state.timer);
        this.setState({
            timer: window.setInterval(this.tick, 1000)
        });
    }

    reset() {
        window.clearInterval(this.state.timer);
        this.setState(({timer: null, n:0}));
    }

    render() {
        return (
            <React.Fragment>
                <div id="time">
                    <p>{this.state.n}</p><span id="secs">seconds</span>
                </div>
                <div id="buttonsDiv">
                    {this.state.timer ?
                        <button id="pause" className="btn" onClick={this.pause}>
                            Pause
                        </button> :
                        <button id="play" className="btn" onClick={this.play}>
                            Start
                        </button>      
                    }
                    <button id="reset" className="btn" onClick={this.reset}>
                        Reset
                    </button>    
                </div>
            </React.Fragment>
        );
    }
}

class App extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Title/>
                <Stopwatch/>
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);