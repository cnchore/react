import React, { Component, PropTypes } from 'react';
import Stepper from '../../components/Stepper/Stepper';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import styles from './checkIn.scss';

class CheckIn extends Component {
    static propTypes = {

    };

    state = {
        value: 1
    };

    constructor(props) {
        super(props);
        this.handleChange = ::this.handleChange;
    }

    handleChange(e, index, value) {
        console.log(e, index, value)
        this.setState({ value });
    }

    render() {
        return(
            <div>
                <Stepper currentStep={2} />
                <div className={styles.field}>
                    <div className={styles.fieldTitleSelect}>已选服务</div>
                    <div className={styles.serviceListSelect}>
                        <p className={styles.listTitle}>釉蜡内外洗</p>
                        <p className={styles.listTime}>30分钟</p>
                        <p className={styles.listPrice}>¥<span>9.9</span></p>
                    </div>
                </div>
                <div className={styles.field}>
                    <div className={styles.fieldTitle}>添加服务</div>
                    <div className={styles.serviceList}>
                        <div className={styles.listTitle}>
                            <Checkbox
                                label="雨刮水添加"
                            />
                        </div>
                        <p className={styles.listTime}>2分钟</p>
                        <p className={styles.listPrice}>¥<span>9.9</span></p>
                    </div>
                    <div className={styles.serviceList}>
                        <div className={styles.listTitle}>
                            <Checkbox
                                label="雨刮水添加"
                            />
                        </div>
                        <p className={styles.listTime}>2分钟</p>
                        <p className={styles.listPrice}>¥<span>9.9</span></p>
                    </div>
                    <div className={styles.serviceList}>
                        <div className={styles.listTitle}>
                            <Checkbox
                                label="雨刮水添加"
                            />
                        </div>
                        <p className={styles.listTime}>2分钟</p>
                        <p className={styles.listPrice}>¥<span>9.9</span></p>
                    </div>
                </div>
                <div className={styles.field}>
                    <div className={styles.inputs}>
                        <div className={styles.label}>手<span className="spacing2">机</span></div>
                        <div className={styles.input}>
                            <TextField id="phone1" fullWidth={true} />
                        </div>
                    </div>
                    <div className={styles.inputs}>
                        <div className={styles.label}>停<span className="spacing05">车</span><span className="spacing05">点</span></div>
                        <div className={styles.input}>
                            <TextField id="phone2" fullWidth={true} />
                        </div>
                    </div>
                    <div className={styles.inputs}>
                        <div className={styles.label}>手<span className="spacing2">机</span></div>
                        <div className={styles.input}>
                            <TextField id="phone3" fullWidth={true} />
                        </div>
                    </div>
                    <div className={styles.inputs}>
                        <div className={styles.label}>手<span className="spacing2">机</span></div>
                        <div className={styles.input}>
                            <SelectField id="phone4" value={this.state.value} onChange={this.handleChange} fullWidth={true}>
                                <MenuItem value={1} primaryText="Never" />
                                <MenuItem value={2} primaryText="Every Night" />
                            </SelectField>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CheckIn;
