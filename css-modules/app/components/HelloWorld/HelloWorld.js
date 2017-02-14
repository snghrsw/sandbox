import React from "react"
import {Link} from 'react-router'

import styles from './HelloWorld.styl'

class HelloWorld extends React.Component {

    componentDidMount(){
        console.log("HelloWorld: componentDidMount", this.props);
    }

	onChangeNewValue(){
		return this.props.onChangeNewValue('new value')
	}

    render() {
        return(
            <div className={styles.helloWorld}>
                <input type="button" onClick={onChangeNewValue} value="適応" />
                <div>value: {this.props.helloWorldLabel}</div>

                <ul className={styles.menuList}>
                    <li><Link to={`/detail`}>詳細ページへ(SPA)</Link></li>
                    <li><a href="./detail">詳細ページへ(HTTP:GET)</a></li>
                </ul>
            </div>
        )
    }
}

export default HelloWorld;
