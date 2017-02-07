## Redux

### 目的

1. 理解 Redux 架构

### 操作步骤

（1） 命令行下进入`redux-demo`目录，执行如下的命令。

```bash
$ npm install
$ npm start
```

（2）打开浏览器，访问 http://localhost:8080，查看结果，并仔细研究代码。

### 注意事项

（1） Redux 要求 UI 的渲染组件都是纯组件，即不包含任何状态（`this.state`）的组件。

```javascript
<div className="index">
  <p>{this.props.text}</p>
  <input
    defaultValue={this.props.name}
    onChange={this.props.onChange}
  />
</div>
```

（2） 进行数据处理、并包含状态的组件，称为”容器组件“。Redux 使用`connect`方法，自动生成 UI 组件对应的”容器组件“。

```javascript、
// MyComponent 是纯的 UI 组件
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyComponent);
```

（3） `mapStateToProps`函数返回一个对象，表示一种映射关系，将 UI 组件的参数映射到`state`。

```javascript
function mapStateToProps(state) {
  return {
    text: state.text,
    name: state.name
  };
}
```

（4） `mapDispatchToProps`函数也是返回一个对象，表示一种映射关系，但定义的是哪些用户的操作应该当作`Action`，传给`Store`。

```javascript
function mapDispatchToProps(dispatch) {
  return {
    onChange: (e) => dispatch({
      type: 'change',
      payload: e.target.value
    })
  }
}
```

（5） `reducer`函数用来接收`action`，算出新的`state`。

```javascript
function reducer(state = {
  text: '你好，访问者',
  name: '访问者'
}, action) {
  switch (action.type) {
    case 'change':
      return {
        name: action.payload,
        text: '你好，' + action.payload
      };
  }
}
```

`Store`由 Redux 提供的`createStore`方法生成，该方法接受`reducer`作为参数。

```javascript
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body.appendChild(document.createElement('div'))
);
```

为了把`Store`传入组件，必须使用 Redux 提供的`Provider`组件在应用的最外面，包裹一层。
# react
