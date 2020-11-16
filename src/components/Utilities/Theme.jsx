import { createMuiTheme } from '@material-ui/core/styles'


const theme = createMuiTheme({
  overrides: {
    MuiListItem: {
      root: {
        "&$selected": {
           color: "#ffffff",
      borderColor: "#4578e0",
    //   background: "rgba(52,58,153,0.36)",
        }
      }
    }
}
})

export default theme