import * as React from "react";

interface HelloWorldComponentProps extends React.Props<any> {
    value: number,
    onIncrement: any
}

class HelloWorldComponent extends React.Component<HelloWorldComponentProps, {}> {
  constructor(props) {
    super(props)
  }

    render() {
        return(
          <div onClick={this.props.onIncrement}>
            Hello {this.props.value}
          </div>
        )
    }
}

export default HelloWorldComponent;
