import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

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
  card: {
    margin: '0 auto',
    width: '90%',
  },
  inputName: {
    visibility: 'hidden',
    marginBottom: '50px',
  },
  cardButton: {
    width: '100%',
  },
  addCard: {
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


export const infoStyles = makeStyles((theme) => ({

  root: {
    width: '50vw',
    height: '50vh',
  },
  content: {
    display: 'flex',
  },

  main: {
    width: '80%',
  },

  descTitle: {
    display: 'flex',
  },

  descInput: {
    width: '100%',
  },

  descBtnGroup: {
    marginTop: '15px',
  },

  descSave: {
    marginRight: '10px',
  },

  descClose: {
    display: 'inlineFlex',
    verticalAlign: 'middle',

    '&:hover': {
      cursor: 'pointer',
    }
  },

  aside: {
    width: '20%',
  }
}))

export const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

export const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
