import React, { Component, PropTypes } from 'react';

export default class ToggleDisplay extends Component {
    static propTypes = {
        show: PropTypes.bool.isRequired
    }

    render() {
        const { show } = this.props;

        if (!show) {
            return null;
        } else {
            return this.props.children;
        }
    }
}
