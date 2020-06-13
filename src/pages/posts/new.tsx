import { useState } from 'react';
import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '40ch',
        
      },
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      marginTop: 50,
    },
    h: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 50
    },
    created: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20
    },
    button: {
      margin: "10px 270px",
      display: 'flex',
      marginTop: 10,
      textDecoration: 'none',
      border: '2px solid blue',
      justifyContent: 'center',
      borderRadius: 3,
    },
    createButton: {
      margin: "0px 150px"
    }
  }),
);


export default function NewPost() {
  const classes = useStyles()

  const [body, setBody] = useState('')
  const [title, setTitle] = useState('')
  const [created, setCreated] = useState(false)

  const bodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  }
  const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const createPostHandler = () => {
    let data = JSON.stringify({
      title: title,
      body: body
    })
    axios.post('https://simple-blog-api.crew.red/posts', data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    setTitle('')
    setBody('')
    setCreated(true)
  }

  return (
    <div>
      {created 
        ? <h4 className={classes.created}>Ваш пост успешно создан!</h4>
        : null
      }

      <h1 className={classes.h}>Создайте ваш пост</h1>
        <div className={classes.wrapper}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-multiline-flexible"
              label="Title"
              value={title}
              onChange={titleChange}
              multiline
              rowsMax={4}
              variant="outlined"
            />
            <TextField
              id="outlined-multiline-static"
              label="Body"
              value={body}
              onChange={bodyChange}
              multiline
              rows={6}
              variant="outlined"
            />
          </form>

          <Button 
            variant="contained" 
            color="primary"
            onClick={createPostHandler}
            className={classes.createButton}
          >
            Создать пост
          </Button>

          <div className={classes.button}>
            <Link href="/">
              <a>На главную</a>
            </Link>
          </div>
        </div>
    </div>
  )
}


