/**
 * Created by Administrator on 2016/7/14.
 */
import React, { Component, PropTypes } from 'react';
import styles from './MyCustomService.scss';
import Divider from 'material-ui/Divider';
class OneQuestion extends Component {
    static propTypes = {};
    state = {
        question: "",
        open: false
    };

    /**
     * 注册问题展开关闭事件
     * @param question
     */
    handlerClick(question) {
        var self=this;
        var open = !this.state.open;
        this.setState({open: open});
        setTimeout(function () {
            if (self.state.open) {
                self.setState(
                    {
                        question: question
                    }
                )
            } else {
                self.setState(
                    {
                        question: ""
                    }
                )
            }
        }, 200)
    }

    render() {
        const {question,answer}=this.props;
        return (
            <div>
                <div onTouchTap={::this.handlerClick.bind(this,question)} className={styles.question}>{question}</div>
                <Divider inset={true} className={styles.dividerLine}/>
                <div className={this.state.question==question?styles.visible:styles.hidden}>{answer}</div>
                <Divider inset={true} className={styles.dividerLine}/>
            </div>
        )
    }

}
OneQuestion.propTypes = {
    question: PropTypes.string,
    answer: PropTypes.string
};
export  default OneQuestion
