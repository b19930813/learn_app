import React from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import AddCircleIcon from '@material-ui/icons/AddCircle';

const theme = createMuiTheme();

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
   
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function LearnVocabulary(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    level: 0,
    values: '',
    typingTimeout:0,
    searchV: '',
  });
  const [state, setState] = React.useState({
    vocabularies: [],
  });
  const [count,setCount] = React.useState(false);
  const [search, setSearch] = React.useState(0);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [offset , setOffset] = React.useState(0);
  React.useEffect(() => {
        //console.log(props.userData.access_token);
        setState({ vocabularies: props.vocabularies });
        setCount(props.vocabulariesCount)
  },[]);

  
  const handleAdd = (vID) => event =>{
    const post = {
      vocabularyID: vID,
      access_token: props.userData.access_token
    }
    axios
    .post('/api/my_vocabularies',post)
    .then(response => {
      if(response.data.state == 200){
        alert('新增成功');
      }
      else if(response.data.state == 400){
        alert('新增失敗');
      }
      else if(response.data.state == 401){
        alert("請先登入");
      }
    })
  }

  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    axios
      .get('/api/vocabularies', {
        params: {
          ID: event.target.value,
          searchV: values.searchV
        }
      })
      .then(response => {
        setState({ vocabularies: response.data.vocabularies });
        setCount(response.data.vocabulariesCount);
      })
  };

  const handleSearch = event => {
    let sendV = event.target.value;
    event.persist();
    clearTimeout(values.typingTimeout);
    setValues(oldValues => ({
      ...oldValues,
      searchV: sendV,
      typingTimeout: setTimeout(()=>{
        axios
        .get('/api/vocabularies', {
          params: {
            ID: values.level,
            searchV: sendV
          }
        })
        .then(response => {
          setState({ vocabularies: response.data.vocabularies });
        })
     },1000)
    }));
  }

  const handlePageClick = event => {
     axios
      .get('/api/vocabularies', {
        params: {
          ID: values.level,
          searchV: values.searchV,
          page: (event/5)+1
        }
      })
      .then(response => {
        setState({ vocabularies: response.data.vocabularies });
        setCount(response.data.vocabulariesCount);
      })
    setOffset(event);
  }

  let lists = state.vocabularies.map((vocabularies, i) =>
  <ExpansionPanel key={vocabularies.id}>
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography className={classes.heading}>
        <span>
          {vocabularies.jpVocabulary}
        </span>
        <span>
          [{vocabularies.katakana}] :
    </span>
        <span>
          {vocabularies.cnVocabulary} /
    </span>
        <span>
          {vocabularies.pos}
        </span>
      </Typography>
    </ExpansionPanelSummary>
    <Divider />
    <ExpansionPanelDetails>
      <Typography>
        [例句]:{vocabularies.jpSentence}
        <br />
        [中譯]:{vocabularies.cnSentence}
        <br />
        {/* <Button variant="contained" color="primary" className={classes.button} onClick = {handleAdd(vocabularies.id)}  >
           加入我的單字本
        </Button> */}
        <AddCircleIcon className={classes.button} onClick = {handleAdd(vocabularies.id)}/>
      </Typography>
    </ExpansionPanelDetails>
  </ExpansionPanel>)

  return (
    <div>
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel >單字程度</InputLabel>
          <Select
            value={values.level}
            onChange={handleChange}
            inputProps={{
              name: 'level',
            }}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={1}>N1</MenuItem>
            <MenuItem value={2}>N2</MenuItem>
            <MenuItem value={3}>N3</MenuItem>
            <MenuItem value={4}>N4</MenuItem>
            <MenuItem value={5}>N5</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.margin} >
          <InputLabel>查詢單字</InputLabel>
          <Input

            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            onChange={handleSearch}
          />
        </FormControl>
      </form>
      <Divider style={{ 'marginTop': '20px' }} />
      {lists}
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Pagination
          limit={5}
          offset={offset}
          total={count}
          onClick={(e, offset) => handlePageClick(offset)}
        />
      </MuiThemeProvider>
    </div>
  );
}