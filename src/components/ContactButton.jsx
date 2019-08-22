import React from "react";
import { Button } from "reactstrap";

class ContactButton extends React.Component {
    render() {

        const { icon, url } = this.props;

        return (
            <Button
                className="btn-icon btn-round"
                target="_blank"
                size="lg"
                href={url ? url : ""}
            >
                <i className={"fab fa-" + icon} />
            </Button>
        );
    }
}

ContactButton.defaultProps = {
    url: "https://www.facebook.com/blockevent.live/"
}

export default ContactButton;
