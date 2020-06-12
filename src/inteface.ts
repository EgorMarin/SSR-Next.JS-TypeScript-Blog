export interface AllPost {
  id: number
  title: string
  body: string
}

export interface PostComments {
  id: number
  postId: number
  body: string
}
