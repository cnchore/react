import React, { PropTypes } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { red700 } from 'material-ui/styles/colors';
import '../../styles/core.scss';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: red700
    },
    fontFamily: '"Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", FontAwesome, sans-serif'
});


function App ({ children }) {
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            {children}
        </MuiThemeProvider>
    )
}

App.propTypes = {
    children: PropTypes.element
}

export default App;
