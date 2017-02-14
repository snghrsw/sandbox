import Reflux from 'reflux';

var employeeActions = Reflux.createActions([
  'getAdopters',
  'match',
  'keep',
  'cancel',
  'getFriends',
  'getMatches',
  'getKeeps'
]);


// employeeActions.getAdopters.listen(()=>{
//   console.log(32);
// });

export default employeeActions;
