import Link from 'next/link'
import { AllPost } from '../inteface'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'

//сделать карточку и засунуть в карточку Link
//вывести масив постов через map и динамически
//добавить данные через {`/${}`} в карточку

//чтобы присвоить тип развернутому параметру как {data} что === response.data
//используй вспомогательный interface как IndexProps

export interface IndexProps {
  data: AllPost[] | undefined
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin: '50px 10px'
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
})

export default function Index({data}: IndexProps) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {data?.map((post, index) => {
          return (
            <Grid  item xs={3} key={index}>
              <Card variant="outlined"  >
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {post.body}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">
                    <Link href="/posts/[postId]" as={`/posts/${post.id}`}>
                      <a>Редактировать</a>
                    </Link>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}



Index.getInitialProps = async () => {
  const response = await axios.get("https://simple-blog-api.crew.red/posts")
  const data: AllPost[] | undefined = response.data
  return {data}
}

