package msgboard

import (
	"context"

	"gorm.io/gorm"
)

func Ping(request PingRequest) PingResponse {

	return PingResponse{
		Recieved: request.Pinger,
		Message:  "pong",
	}
}

func Post(request PostRequest, db *gorm.DB) (error, PostResponse) {
	ctx := context.Background()

	newMsg := DBMessage{Message: request.Post}

	err := gorm.G[DBMessage](db).Create(ctx, &newMsg)
	if err != nil {
		return err, PostResponse{}
	}

	return nil, PostResponse{Message: "Successfully added!"}
}

func GetPosts(db *gorm.DB) (error, GetPostsResponse) {
	ctx := context.Background()

	rawMessages, err := gorm.G[DBMessage](db).Find(ctx)
	if err != nil {
		return err, GetPostsResponse{}
	}

	var messages GetPostsResponse

	for _, msg := range rawMessages {
		messages.Posts = append(messages.Posts, msg.Message)
	}

	return nil, messages
}
