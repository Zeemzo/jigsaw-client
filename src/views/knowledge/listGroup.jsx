import React from 'react';
import { ListGroupItem, Collapse, UncontrolledTooltip, Button } from 'reactstrap';
import { DiffieHellman } from 'crypto';

class ListGroupCollapse extends React.Component {
    constructor(props) {
        super(props);


        this.toggle = this.toggle.bind(this);
        this.state = { collapse: this.props.collapse };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        const { item, html, no, diff } = this.props;
        return (
            <ListGroupItem className="card-plain">
                <p style={{ "textAlign": "center" }}
                    onClick={this.toggle}><strong width="300px">{(item.hash).substring(0, 30) + "... By: " + item.alias}</strong>
                </p>
                <Collapse isOpen={this.state.collapse}>
                    <hr className="line-primary" />
                    <p dangerouslySetInnerHTML={{ __html: html }} />
                    <UncontrolledTooltip placement="bottom" target={item.alias + no} delay={0}>{item.alias + " contributed at: " + item.timestamp}</UncontrolledTooltip>
                </Collapse>
            </ListGroupItem>
        );
    }
}

export default ListGroupCollapse