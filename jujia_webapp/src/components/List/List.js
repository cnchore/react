import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './list.scss';
import { Link } from 'react-router';

export default class List extends Component {
    static propTypes = {
        lists: PropTypes.array.isRequired
    };

    render() {
        const listClass = classnames(
            'table-row',
            styles.lists
        );

        return (
            <div>
                {this.props.lists.map((list, i) =>
                    <Link to={list.href} key={i}>
                        <div className={listClass}>
                            <div className="cell">{list.listTitle}</div>
                            <div className="cell text-right">
                                <span className={styles.listName}>{list.listName}</span>
                                <i className="icon iconfont">&#xe601;</i>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        )
    }
}
