var React = require('react/addons');

var AdminSignIn = React.createClass({

  render: function () {
    return (
      <div id="adminSignIn">

        <div className="contentWrapper">

          <div className="contentTable">
            <h1>REFCOME -admin-</h1>
            <form action="./auth/local" method="post">
              <input className="input input-username" type="text" name="username" placeholder="ユーザー名を入力..." />
              <input className="input input-password" type="password" name="password" placeholder="パスワードを入力..." />
              <input className="button button-submit" type="submit" value="ログイン" />
            </form>
          </div>
        </div>

      </div>
    )
  }

});

export default AdminSignIn;
