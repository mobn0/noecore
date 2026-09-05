package msgboard

type PingRequest struct {
	Pinger string `json:"pinger" binding:"required" validate:"ping-pinger"`
}
type PingResponse struct {
	Message  string `json:"message"`
	Recieved string `json:"recieved"`
}

type PostRequest struct {
	Post string `json:"post" binding:"required" validate:"post-post"`
}
type PostResponse struct {
	Message string `json:"message"`
}

type GetPostsResponse struct {
	Posts []string `json:"posts"`
}
