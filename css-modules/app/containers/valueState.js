import React from "react"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {changeNewValue} from './../actions'

import HelloWorld from './../components/HelloWorld/HelloWorld'

const mapStateToProps = (state) => {
	console.log("Helloworld: mapStateToProps", state);
	return {
		helloWorldLabel: state.helloWorldValue
	}
}

function mapDispatchToProps(dispatch) {
	console.log("Helloworld: mapDispatchToProps", dispatch);
	return {
		onChangeNewValue: bindActionCreators(changeNewValue, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HelloWorld);
