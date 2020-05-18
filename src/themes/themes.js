import { makeStyles } from '@material-ui/core/styles';


const MainTheme = '#5b3964;'

export const gridStyles = makeStyles((theme) => ({

  root: {
    marginLeft: '50px',
    marginBottom: '0px',
    marginTop: '50px',
    flexGrow: 1,
  },

  container: {

  },

  paper: {
    position: 'relative',
    minHeight: '10vh',
    maxHeight: 'calc(100vh - 150px)',
    width: '30vh',

  },

  inputName: {
    visibility: 'hidden',
    marginBottom: '50px',
  },
  cardButton: {
    position: 'absolute',
    bottom: '0',
    color: MainTheme,
    fontWeight: 'bold',
  },
  control: {
    padding: theme.spacing(2),
  },

  listButton: {
    height: '50px',
    marginTop: '30px',
  }

}));
