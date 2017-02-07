import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import styles from './carnoKeyBoard.scss'

 /**
 * [CarnoKeyBoard description]
 * @prop  {[bool]} keyboardOpen [keyboard status]
 * @prop  {[func]} press        [callback function called after press the keys]
 * @prop  {[func]} done         [callback function called after done]
 * @prop  {[func]} inputBlur    [callback function called when input onBlur]
 * @prop  {[string]} level1     [provinces keyboard]
 * @prop  {[string]} level2     [letters keyboard]
 */
class CarnoKeyBoard extends Component {
    static propTypes = {
        keyboardOpen: PropTypes.bool.isRequired,
        press: PropTypes.func.isRequired,
        done: PropTypes.func,
        inputBlur: PropTypes.func,
        level1: PropTypes.string.isRequired,
        level2: PropTypes.string.isRequired
    };

    static defaultProps = {
        keyboardOpen: false,
        done: () => {}
    }

    state = {
        inputValue: ''
    };

    constructor(props) {
        super(props)
        this.backspace = ::this.backspace
        this.preventTouchMove = ::this.preventTouchMove
    }

    componentWillReceiveProps(){
        //this.setState({inputValue: this.props.carnum});
    }

    selectLevel1(e,level1) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            inputValue: level1
        })
        this.props.press(level1)
        if(level1 == "无牌"){
            this.props.done(e)
        }
    }

    selectLevel2(e,level2) {
        if(this.props.carnum.length >= 7){
            e.stopPropagation();
            e.preventDefault();
            this.props.done(e)
            return false
        }
        //e.stopPropagation();
        //e.preventDefault();
        let inputValue = this.props.carnum + level2

        this.setState({
            inputValue: inputValue
        })

        this.props.press(inputValue)

        if (inputValue.length >= 7) {
            this.props.done(e)
            return false
        }

    }

    backspace() {
        let inputValue = this.props.carnum
        let backspaceValue = inputValue.substr(0, inputValue.length - 1)

        this.setState({
            inputValue: backspaceValue
        })

        this.props.press(backspaceValue)
    }

    preventTouchMove(e) {
        e.preventDefault()
    }

    render() {
        let keyboardHeightRate;
        const winH = window.innerHeight;
        const winW=window.innerWidth;
        const level1 = this.props.level1.split('');
        const level2 = this.props.level2.split('');
        const keyboardClass = classnames({
            [styles.keyboard]: true,
            [styles.keyboardOpen]: this.props.keyboardOpen
        });
        const { keyboardOpen, inputBlur,carnum } = this.props;

        const AStyle = {
            marginLeft: "5px"
        };
        if(carnum && !this.props.carnum){
            //this.props.carnum == carnum;
        }
        if(winW<375){
            keyboardHeightRate=0.38;
        }
        if(winW>=375){
            keyboardHeightRate=0.323;
        }

        return (
            <div style={{display:(keyboardOpen?"block":"none")}}>
                {keyboardOpen &&
                    <div className={styles.keyboardMask} onTouchTap={inputBlur} onTouchMove={this.preventTouchMove} />
                }
                <div className={keyboardClass} onTouchMove={this.preventTouchMove} style={{height: winH * keyboardHeightRate}}>
                    <div className={classnames({
                        [styles.keyboardLayout]: true,
                        [styles.hide]: this.props.carnum.length >= 1
                    })}>
                        {level1.map((item, i) =>
                            <span key={'keybtn1' + i} className={styles.btnKey} >
                                <button className={styles.button} type="button" onTouchTap={(e) => this.selectLevel1(e,item)}>
                                    {item}
                                </button>
                                <div className={styles.btnActive}>
                                    <span>{item}</span>
                                </div>
                            </span>
                        )}
                        <span className={styles.btnKey}>
                            <button className={styles.button} type="button" onTouchTap={(e) => this.selectLevel1(e,"无牌")}>
                                    {"无牌"}
                                </button>
                                <div className={styles.btnActive}>
                                    <span>{"无牌"}</span>
                                </div>

                        </span>
                    </div>
                    <div className={classnames({
                        [styles.keyboardLayout]: true,
                        [styles.hide]: true,
                        [styles.show]: this.props.carnum.length >= 1
                    })}>
                        {level2.map((item, i) =>
                            <span key={'keybtn2' + i} className={styles.btnKey} style = {item=="A"?AStyle: {marginLeft:"0px"}} >
                                <button className={styles.button} type="button" onTouchTap={(e) => this.selectLevel2(e,item)}>
                                    {item}
                                </button>
                                <div className={styles.btnActive}>
                                    <span>{item}</span>
                                </div>
                            </span>
                        )}
                        <span className={styles.btnKey + ' ' + styles.backspace}>
                            <button className={styles.button} type="button" onTouchTap={this.backspace}>
                                <i className="icon iconfont">&#xe61b;</i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default CarnoKeyBoard

