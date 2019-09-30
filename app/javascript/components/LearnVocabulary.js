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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing(1),
    fontSize: theme.typography.pxToRem(10),
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

const MyExpand = props => {
  
  const classes = useStyles();
  if(props.data.state.vocabularies.length!=0){
    let lists = props.data.state.vocabularies.map((vocabularies,i) =>
     <ExpansionPanel key = {vocabularies.id}>
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
    <Divider/>
    <ExpansionPanelDetails>
      <Typography>
       [例句]:{vocabularies.jpSentence}
       <br/>
       [中譯]:{vocabularies.cnSentence}
       <br/>
       <Button variant="contained" color="primary" className={classes.button}>
        Add
      </Button>
      </Typography>
      
      
    </ExpansionPanelDetails>
  </ExpansionPanel>)
    return (
       <div>
        {lists}
       </div>
    )
  }
  else{
    return null;
  }
};

var allVocabularies = null;
var jpCheck = new RegExp("^[\u0800-\\u4e00]*$"); 
export default function LearnVocabulary() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    level: '',
    input: '',
  });
 const [state,setState] = React.useState({
  vocabularies: []
 });
  const [search,setSearch] = React.useState(0);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    values.level = 0;
   
    axios
      .get('/api/vocabularies')
      .then(response => {

        setState({ vocabularies: response.data.vocabularies });
        allVocabularies = response.data.vocabularies;
      })
      
  }, []);


  const handleChange = event => {
 
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
   if(search==''){
    setState({vocabularies: allVocabularies.filter(vocabulary => {
      if(event.target.value ==0) return allVocabularies;
      return vocabulary.level == event.target.value;
    })});
  }
  else{
    setState({vocabularies: allVocabularies.filter(vocabulary => {
      if(event.target.value ==0) return vocabulary.cnVocabulary.includes(search)||vocabulary.katakana.includes(search);
      return vocabulary.level == event.target.value && (vocabulary.katakana.includes(search)==true||vocabulary.cnVocabulary.includes(search));
    })});
  }
  };
  
  const handleSearch = event =>{
    setSearch(event.target.value);
     if(event.target.value.length==0){
       setState({vocabularies: allVocabularies.filter(vocabulary => {
        if(values.level ==0) return allVocabularies;
        return vocabulary.level == values.level;
      })});
     }
     else{
       var temp = allVocabularies.filter(vocabulary => {
          if(values.level == 0) return vocabulary.katakana.includes(event.target.value)||vocabulary.cnVocabulary.includes(event.target.value);
          return (vocabulary.katakana.includes(event.target.value)||vocabulary.cnVocabulary.includes(event.target.value)) && values.level == vocabulary.level;
       })
       setState({vocabularies: temp});
     }
  }
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

      {/* <FormControl className={classes.formControl}>
        <InputLabel >詞性</InputLabel>
        <Select
        value={values.ops}
          onChange={handleChange}
          inputProps={{
            name: 'ops',
          }}
        >
          <MenuItem value={1}>動詞</MenuItem>
          <MenuItem value={2}>名詞</MenuItem>
          <MenuItem value={3}>副詞</MenuItem>
        </Select>
      </FormControl> */}
      <FormControl className={classes.margin} >
        <InputLabel>查詢單字</InputLabel>
        <Input
          
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          onChange = {handleSearch}
        />
      </FormControl>
    </form>
    <Divider style ={{'marginTop': '20px'}}/>
    <MyExpand data = {{state}}/>
  </div>
  );
}