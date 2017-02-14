var React = require('react/addons');

var ReactApp = React.createClass({

  render: function () {
    return (
      <div id="employeeSignIn">

        <div className="contentWrapper">
          <div className="contentTable">
            <h1>REFCOME</h1>
            <a className="facebookLogin" href="./auth/facebook/">
              <div className="imageLogo" />
              <span className="innerText">FaceBookアカウントを連携して始める</span>
            </a>
          </div>
        </div>

      </div>
    )
  }

});

export default ReactApp;
