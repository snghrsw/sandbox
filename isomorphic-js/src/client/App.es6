import React from 'react/addons';
import Router from 'react-router';
import routes from './../routes';

const router = Router.create({
  routes: routes,
  location: Router.HistoryLocation
});

router.run(Root => {
  React.render(<Root initialState={initialState} params={initialState} />, document.getElementById('app'));
});
