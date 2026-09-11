package admin

import "github.com/mobn0/filestore/utilities/users"

type GetUsersResponse struct {
	Users []users.User `json:"users"`
}
