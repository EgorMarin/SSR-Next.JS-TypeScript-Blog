import { useRouter } from 'next/router'
import axios from 'axios'
// import { AllPost, PostComments } from '../../inteface';
import { NextPageContext } from 'next';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid} from '@material-ui/core';
import Link from 'next/link'
import TextField from '@material-ui/core/TextField';

//Чтобы взять query пар-р в getInitialState используй ctx.query
//Чтобы взять query в компоненте используй useRouter

const useStyles = makeStyles({
  root: {
    minWidth: 500,
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
  grid: {
    marginLeft: 20,
    marginRight: 20
  },
  wrapper: {
    display: "flex",
    margin: "50px 100px",
    flexDirection: 'column',
    alignItems: 'center'

  }
});

export interface Post extends AllPost {
  comments?: PostComments[]
}
export interface PostData {
  data?: Post
}

export default function PostIdBack({data} : PostData) {
  const classes = useStyles()
  const router = useRouter()
  
  return (
    <div className={classes.wrapper}>
      <h1>Post ID: {router.query.postId}</h1>

      <Grid item xs={6}>
    
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-multiline-flexible"
            label="Title"
            value={data?.title}
            // onChange={titleChange}
            multiline
            rowsMax={4}
            variant="outlined"
          />
          <TextField
            id="outlined-multiline-static"
            label="Body"
            value={data?.body}
            // onChange={bodyChange}
            multiline
            rows={6}
            variant="outlined"
          />
        </form>

        <Button 
          variant="contained" 
          color="primary"
          // onClick={createPostHandler}
        >
          Создать пост
        </Button>

      </Grid>
    </div>
  )
}

PostIdBack.getInitialProps = async (ctx: NextPageContext) => {
  const {query} = ctx
  const {data} : PostData = await axios.get("https://simple-blog-api.crew.red/posts/" + query.postId + "?_embed=comments")
  
  return {data}
}