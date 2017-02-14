import React from 'react';
import classNames from 'classnames';
import actions from './../actions/employeeAction';

const AdopterItem = React.createClass({

  getDefaultProps(){
    return{
      isReview: false
    }
  },

  doMatch(){
    actions.match(this.props.adopter);
  },

  doKeep(){
    actions.keep(this.props.adopter);
  },

  doCancel(){
    actions.cancel(this.props.adopter);
  },


  render(){

    let i = this.props.adopter;

    let adopterItemClasses = classNames(
      {'adopterItem': true},
      {'adopterItem-isMatchTrue': i.isMatch},
      {'adopterItem-isKeepTrue': i.isKeep},
      {'adopterItem-isMatchFalse': !i.isMatch},
      {'adopterItem-isKeepFalse': !i.isKeep}
    );

    return (
      <div className={adopterItemClasses}>
        <img className="thumbnail" src={i.thumbnailUrl} />
        <div className="adopterName">{i.name}</div>

        {!i.isMatch && !this.props.isReview ?
          <div className="button buttonMatch" onClick={this.doMatch}>推薦する</div>
         : ''}

        {!i.isKeep && !this.props.isReview?
          <div className="button buttonKeep" onClick={this.doKeep}>候補にする</div>
         : ''}

        {(i.isMatch || i.isKeep) && !this.props.isReview ?
          <div className="button buttonCancel" onClick={this.doCancel}>取り下げ</div>
         : ''}

      </div>
    )
  }

});

export default AdopterItem;
