## 1.Getting Start
```
    npm install
    npm start
```
Manual your brower, open [http://localhost:9060](http://localhost:9060).

## 2.Compile and Deploy
```
    npm run compile
    npm run deploy:pro
```

## 3.Create module
```bash
    npm i redux-cli -g
    cd ctauto_webapp

    #mac create smart component:
    redux g smart moduleName

    #windows create smart component:
    redux-g smart moduleName

    #mac create dumb component:
    redux g dumb componentName

    #windows create dumb component:
    redux g dumb componentName
```

## 4.Component Useage
### 1.react router

```js
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    //linkTo
    this.context.router.push({
            pathname: '/home',
            query: { a: 1 }
        });

    //or
    this.context.router.push(path)
```

```html
    <!-- Link useage -->
    <Link to={{pathname: '/login', query: { a: 'aaa', c: 'ccc' }}}>
        click me
    </Link>
```

### 2.Css Modules
```html   
	import styles from './toolbar.scss';

    <div className={styles['page-container']}>
        {children}
    </div>

    <!-- or  -->

    <div className={styles.container}>
        {children}
    </div>
```

## 5. Framework
```js
	//mui
	http://www.material-ui.com/#/get-started/server-rendering

	//react
	http://reactjs.cn/react/docs/

	//image-loader
	https://www.zhihu.com/question/46508339

	//redux
	http://cn.redux.js.org/
```

## 6. Sublime Plugins
1. babel
2. sass
3. OmniMarkupPreviewer

## 7.How To Developing
### 7.1 jump router
```js
	//router define
	static contextTypes = {
	       router: React.PropTypes.object.isRequired
	 };

	//method action
	onTouchTab={::this.methodName}

	//method init
	methodName(){    	
		this.context.router.push(xxxx);
	} 

```

### 7.2 bind customer param
```js
	//method define
	methodName(param){
	}
	
	//method action
	onTouchTab={this.methodName.bind(this,param)}
```

###7.3 multi className
```js
	<span className={styles.xxx+" "+styles.xxx+" "+styles.xxx}></span>
```
## 8.Add PostCSS to transform styles with JS plugins for compatiable multiple browsers
### 8.1 install
```bash
    npm install postcss-loader
```

## 9.版本更新
###3.3.3 (20160818)
        
        1.预计施工和完工时间新算法；
        2.无柜子内洗，在登录信息页面提示技师将致电取钥匙；
        3.用manifest的h5特性，使用本地缓存；
        4.cookie 有效延长，且把登录移到请求返回 401 时再作登录；
###3.3.4 (20160824)

        1.开通东陵广场下单服务;
        2.修复手动输入新停车点再修改车牌后要重新输入停车点的bug;

###3.3.5 (20160902)
        
        1.拉新；
        2.验证手机送券活动； 
        3.登记信息页面，已验证手机，不许直接修改手机号，需重新验证；
        4.大牌保养页面，已验证手机，不许直接修改手机号；
        5.单独的手机验证页面；

###3.3.6 (20160929)

        1.添加地库站、上门洗车提示配置

