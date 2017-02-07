/**
 * Created by jianxuanbing on 2016/6/1 0001.
 */
import React, {Component, PropTypes} from "react";
import styles from './CarProblem.scss';
import one from './images/1.jpg';
import News from './News';
import ZoomPicture from '../../components/ZoomPicture/ZoomPicture'

class CarProblem extends Component {
    state = {
        items: []
    };

    componentWillMount() {
        this.initImgData();
    }

    constructor(props) {
        super(props);
    }
    addtelPhone = function (e, phone) {
        var $this = e.target;
        var _phone = "tel:" + phone;
        $this.setAttribute("href", _phone);
    };


    initImgData() {
        var imgList = []
        this.props.info.imgs.map((item, i)=> {
            var temp = {};
            temp.index = i;
            temp.txt = item.txt;
            temp.url = item.url;
            temp.isOpen = false;
            imgList.push(temp)
        });
        this.setState({items: imgList});
    }

    zoomPicture(index,isOpen) {
        this.setState({
            items: this.state.items.map((item, i)=> {
                if (index == i) {
                    item.isOpen = isOpen;

                } else {
                    item.isOpen = false;
                }
                return item;
            })
        });
    }

    renderImgList() {
        return this.state.items.map((item, i)=>
            <News
                key={i}
                txt={item.txt}
                url={item.url}
                index={i}
                isOpen={item.isOpen}
                zoomPicture={this.zoomPicture.bind(this)}
            />
        )
    }

    renderZoomList() {
        return this.state.items.map((item, i)=>
            <ZoomPicture
                key={i}
                text={item.txt}
                src={item.url}
                index={i}
                isOpen={item.isOpen}
                zoomPicture={this.zoomPicture.bind(this)}
            />
        )
    }

    render() {
        var zoomPicture = [];
        var info = this.props.info;
        return (
            <div className={styles.carProblem}>
                <div className={styles.title}>车问题:</div>
                <div className={styles.imgContent}>
                    {::this.renderImgList()}
                </div>
                <div className={styles.content}>
                    <li>
                        <div className={styles.left}>站长电话:</div>
                        <div className={styles.right+" "+styles.phone}
                             onTouchTap={(e)=>::this.addtelPhone(e,info.phone)}><a>{info.phone}</a></div>
                    </li>
                    <li>
                        <div className={styles.left}>温馨提示:</div>
                        <div className={styles.right+" "+styles.keys}>{info.tips}</div>
                    </li>
                </div>
                {::this.renderZoomList()}
            </div>
        );
    }
}
CarProblem.propTypes = {
    info: PropTypes.object
};
export default CarProblem;
