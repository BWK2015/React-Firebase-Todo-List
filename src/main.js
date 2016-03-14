var React = require('react');
var ReactDOM = require('react-dom');
var Firebase = require('firebase');
var ReactFire = require('reactfire');
var Header = require('./header');
var List = require('./list');

var rootUrl = require('./root');

var App = React.createClass({
    mixins: [ReactFire],
    getInitialState: function(){
        return {
            items: {},
            loaded: false
        }  
    },
    componentWillMount: function(){
        this.fb = new Firebase(rootUrl + 'items/');
        this.bindAsObject(this.fb, 'items');
        this.fb.on('value', this.handleDataLoad);
    },
    handleDataLoad: function(){
        this.setState({loaded: true});
    },
    deleteButton: function(){
        if(this.state.loaded){
            return (
                <div className="text-center clear-complete">
                    <hr />
                    <button onClick={this.onDeleteClick} type="button" className="btn btn-default">
                        Clear Complete
                    </button>
                </div>
            );   
        } else {
            return
        }
    },
    onDeleteClick: function(){
      for(var key in this.state.items){
        if(this.state.items[key].done){
            this.fb.child(key).remove();
        }
      }  
    },
    render: function(){
        return (
            <div className="container">
                <div className="row panel panel-default">
                    <div className="col-md-8 col-md-offset-2">
                        <h2 className="text-center">Todo List</h2>
                        <Header itemStore={this.firebaseRefs.items} />
                        <hr />
                        <List items={this.state.items} class={this.state.loaded}/>
                        {this.deleteButton()}
                    </div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('container'));