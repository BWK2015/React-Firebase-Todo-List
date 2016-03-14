var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://todosreactproject.firebaseio.com/';

var ListItem = React.createClass({
    getInitialState: function(){
        return {
            text: this.props.todo.text,
            done: this.props.todo.done,
            textChanged: false
        }
    },
    componentWillMount: function(){
        this.fb = new Firebase(rootUrl + "items/" + this.props.todo.id);
    },
    handleDoneChange: function(e){
        var update = e.target.checked;
        this.setState({done: update});
        this.fb.update({done: update});
    },
    handleDelete: function(){
        this.fb.remove();  
    },
    handleTextChange: function(e){
        this.setState({
            text: e.target.value,
            textChanged: true
        });     
    },
    handleButtonChange: function(){
        if(this.state.textChanged){
            return [
                    <button className="btn btn-default" onClick={this.handleSave} key={1}>Save</button>,
                    <button className="btn btn-default" onClick={this.handleUndo} key={2}>Undo</button>
            ];
        }else {
            return null;   
        }
    },
    handleSave: function(){
        this.fb.update({text: this.state.text});
        this.setState({textChanged: false});
    },
    handleUndo: function(){
        this.setState({
            text: this.props.todo.text,
            textChanged: false
        });  
    },
    render: function(){
        return (
            <div className="input-group">
                <span className="input-group-addon">
                    <input type="checkbox" checked={this.state.done} onChange={this.handleDoneChange}/>
                </span>
                <input type="text" className="form-control" disabled={this.state.done} value={this.state.text} onChange={this.handleTextChange} />
                <span className="input-group-btn">
                    {this.handleButtonChange()}
                    <button className="btn btn-default" onClick={this.handleDelete}>Delete</button>
                </span>
            </div>
        );   
    }
});

module.exports = ListItem;