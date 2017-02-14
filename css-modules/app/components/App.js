import React from "react";
import {connect} from 'react-redux';

class App extends React.Component{

    componentDidMount(){
        console.log("App: componentDidMount", this.state, this.props);
    }

    render(){
        return(
            <div className="application">
                {this.props.children}
            </div>
        )
    }
}

export default App;
