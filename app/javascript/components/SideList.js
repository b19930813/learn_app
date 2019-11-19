import React from 'react'
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import CommentIcon from '@material-ui/icons/Comment';
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
}));

function geticon(index){
  if(index == 0){
    return(<HomeIcon/>);
  }
  else if(index == 1){
    return(<BookIcon/>);
  }
  else if(index == 2){
    return (<LocalLibraryIcon/>)
  }
  else if(index == 3){
     return (<ImportContactsIcon/>)
  }
  else if(index == 4){
    return (<CommentIcon/>)
  }
  else{
    return(<MailIcon/>)
  }
}

export default function SideList(props){
  const { toggleDrawer, changePage, side } = props;
  return (
    <div
      className={useStyles.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['首頁','日語學習', '必背單字', '我的單字本', '討論區'].map((text, index) => (
          <ListItem button key={text} onClick={() => changePage(text)}>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              {geticon(index)}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}