var React = require('react');
var ListItem = require('./list-item');

var List = React.createClass({
    renderList: function(){
        if(this.props.items['.value'] === null){
            return (
                <h4>Add a TODO</h4>
            )
        } else {
            var children = [];
            for(var key in this.props.items){
                var item = this.props.items[key];
                item.id = key;
                children.push(
                    <ListItem key={key} todo={item}></ListItem>
                );
            };
            children.pop(children.length - 1);
            return children;
        }
    },
    render: function(){
        return (
            <div className={this.props.class ? 'content loaded':'content'}>
                {this.renderList()}
            </div>
        )   
    }
});

module.exports = List;