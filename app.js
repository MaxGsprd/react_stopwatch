function Title() {
    return (
        <h1 id="title">Stop<span id="watch">watch</span></h1>
    );
}

class Stopwatch extends React.Component {
    constructor(props) {
        super(props),
        this.state = {s:0, timer: null};
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
            {s: state.s + 1 }
        ));
    }

    getSeconds() {
        return ('0' + this.state.s % 60).slice(-2);
    }

    getMinutes() {
        return ('0' + Math.floor(this.state.s / 60)).slice(-2);
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
        this.setState(({timer: null, s: 0 }));
    }

    render() {
        return (
            <React.Fragment>
                <div id="time">
                    <p>
                        {this.getMinutes()} 
                        :
                        {this.getSeconds()}
                    </p>
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