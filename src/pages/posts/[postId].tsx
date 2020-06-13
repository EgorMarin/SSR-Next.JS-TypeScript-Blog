import { useState } from 'react';
import Link from 'next/link'
import { NextPageContext } from 'next';
import { AllPost, PostComments } from '../../inteface';
import { makeStyles, Theme,  createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'

//Чтобы взять query пар-р в getInitialState используй ctx.query
//Чтобы взять query в компоненте используй useRouter

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formInput: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '40ch',
      },
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      flexDirection: 'column'
    },
    h: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 50
    },
    deleted: {
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
      margin: "10px 150px"
    },
    deleteButton: {
      margin: "0px 150px"
    }
  }),
);

export interface Post extends AllPost {
  comments?: PostComments[]
}
export interface PostData {
  data?: Post
}

export default function PostId({data} : PostData) {
  const classes = useStyles()
  console.log(data);
  
  const [body, setBody] = useState(data?.body)
  const [title, setTitle] = useState(data?.title)
  const [deleted, setDeleted] = useState(false)
  const [edited, setEdited] = useState(false)
  const [comment, setComment] = useState(data?.comments?.[0]?.body)

  const bodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  }
  const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }
  const commentChange = (event: React.ChangeEvent<HTMLInputElement>) => {   
    setComment(event.target.value)
  }                                                                         

  const editPostHandler = () => {
    //put
    let dataEdit = JSON.stringify({
      title: title,
      body: body
    })
    axios.put(`https://simple-blog-api.crew.red/posts/${data?.id.toString()}`, dataEdit, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    //comment
    let bodyComment = JSON.stringify({                                            
      postId: data?.id,
      body: comment,
    })
    axios.post('https://simple-blog-api.crew.red/comments', bodyComment, {
      headers: {
        'Content-Type': 'application/json',
      }
    })         
    setEdited(true) 
  }                     

  const deletePostHandler = () => {
    //delete
    axios.delete(`https://simple-blog-api.crew.red/posts/${data?.id.toString()}`)
    setDeleted(true)
  }

  return (
    <div>
      {deleted 
        ? <h4 className={classes.deleted}>Ваш пост успешно удалён!</h4>
        : null
      }
      {edited 
        ? <h4 className={classes.deleted}>Ваш пост успешно редактирован!</h4>
        : null
      }

      <h1 className={classes.h}>Редактировать пост</h1>
        <div className={classes.wrapper}>

          <form className={classes.formInput} noValidate autoComplete="off">
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

          <TextField                                  
              id="outlined-multiline-flexible"
              label="Comment"
              value={comment}
              onChange={commentChange}
              multiline
              rowsMax={4}
              variant="outlined"
            />                                           

          <Button 
            variant="contained" 
            color="primary"
            onClick={editPostHandler}
            className={classes.createButton}
          >
            Редактировать
          </Button>

          <Button 
            variant="contained"
            onClick={deletePostHandler}
            className={classes.deleteButton}
          >
            Удалить
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


PostId.getInitialProps = async (ctx: NextPageContext) => {
  const {query} = ctx
  const {data} : PostData = await axios.get("https://simple-blog-api.crew.red/posts/" + query.postId + "?_embed=comments")
  
  return {data}
}