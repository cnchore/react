/**
 * Created by Administrator on 2016/7/14.
 */
import React, { Component, PropTypes } from 'react';
import styles from './MyCustomService.scss';
import Divider from 'material-ui/Divider';
import OneQuestion from './OneQuestion';
class QuestionItem extends Component {
    static propTypes = {};

    state = {
        title: "",
        open: false
    };

    componentWillMount() {

    }

    constructor(props) {
        super(props);
    }

    /**
     * 渲染单个的问题
     * @returns {*}
     */
    initOneQuestion() {
        return this.props.qa.map((_qa)=>
            <OneQuestion
                question={_qa.question}
                answer={_qa.answer}
            />
        )
    };

    handlerTouch(title){
        var self=this;
        var open = !this.state.open;
        this.setState({open: open});
        setTimeout(function () {
            if (self.state.open) {
                self.setState(
                    {
                        title: title
                    }
                )
            } else {
                self.setState(
                    {
                        title: ""
                    }
                )
            }
        }, 200)
    }

    render() {

        const {type,qa,title}=this.props;
        return (
            <div className={styles.QuestionItem}>
                <div className={styles.title} onTouchTap={::this.handlerTouch.bind(this,title)}>{title}</div>
                <Divider inset={true} className={styles.dividerLine}/>
                <div style={this.state.title==title?{display:"block"}:{display:"none"}}>
                    {::this.initOneQuestion()}
                </div>
            </div>
        )
    }
}

QuestionItem.propTypes = {
    type: PropTypes.number,
    qa: PropTypes.array,
    title: PropTypes.string
};
export default QuestionItem;
