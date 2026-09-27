package users

import "github.com/mobn0/filestore/utilities/roles"

type User struct {
	Username string       `json:"username"`
	UID      string       `json:"uid"`
	Roles    []roles.Role `json:"roles"`
}
