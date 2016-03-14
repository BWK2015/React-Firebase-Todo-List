var React = require('react');

var Header = React.createClass({
    getInitialState: function(){
        return {
            text: ""
        }  
    },
    handleClick: function(){
        this.props.itemStore.push({
            text: this.state.text,
            done: false
        });
        this.setState({text: ""});
    },
    handleInputValue: function(e){
        this.setState({text: e.target.value})
    },
    render: function(){
        return (
            <div className="input-group">
                <input value={this.state.text} onChange={this.handleInputValue} type="text" className="form-control" />
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button" onClick={this.handleClick}>Add</button>
                </span>
            </div>
        )   
    }
});

module.exports = Header;
